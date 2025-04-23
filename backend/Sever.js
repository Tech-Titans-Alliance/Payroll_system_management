const express = require('express');
const bodyParser = require('body-parser');
const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Constants
const COBOL_DIR = __dirname;
const DATA_DIR = __dirname;

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(COBOL_DIR)) fs.mkdirSync(COBOL_DIR);

const runCobolProgram = (programName, inputParams = '') => {
    try {
        // Convert Windows path (C:\...) to WSL path (/mnt/c/...)
        const windowsPath = COBOL_DIR;
        const driveLetter = windowsPath[0].toLowerCase(); // 'c'
        const linuxPath = `/mnt/${driveLetter}${windowsPath.substring(2).replace(/\\/g, '/')}`;

        // Compose the Linux command to run inside WSL
        const linuxCommand = `cd '${linuxPath}' && cobc -x ${programName}.cbl && ./${programName} ${inputParams}`;
        const command = `wsl bash -c "${linuxCommand}"`;
        console.log(command);
        const output = execSync(command, { stdio: 'pipe' }).toString().trim();
        return { success: true, output };
    } catch (error) {
        return {
            success: false,
            error: error.stderr ? error.stderr.toString() : error.message || 'COBOL program execution failed in WSL'
        };
    }
};


// Parse employee record
const parseEmployeeRecord = (line) => {
    if (!line || line.length < 118) return null;
    return {
        id: line.substring(0, 10).trim(),
        name: line.substring(10, 60).trim(),
        department: line.substring(60, 80).trim(),
        position: line.substring(80, 110).trim(),
        basicSalary: parseFloat(line.substring(110, 118).trim()),
        joinDate: line.substring(118, 128).trim(),
        status: line.substring(128, 129).trim() === 'A' ? 'Active' : 'Inactive'
    };
};

const parsePayslipRecord = (line) => {
    if (!line || line.startsWith("NO MATCH FOUND")) {
        console.error('Invalid payslip record:', line);
        return null;
    }

    const parts = line.trim().split(/\s+/); // split by any whitespace

    if (parts.length < 11) {
        console.error('Unexpected payslip format:', parts);
        return null;
    }

    try {
        return {
            employeeId: parts[0],
            payDate: parts[1],
            basicPay: parseFloat(parts[2]) || 0,
            overtimePay: parseFloat(parts[3]) || 0,
            bonusPay: parseFloat(parts[4]) || 0,
            leaveDays: parseInt(parts[5]) || 0,
            grossPay: parseFloat(parts[6]) || 0,
            taxAmount: parseFloat(parts[7]) || 0,
            otherDeductions: parseFloat(parts[8]) || 0,
            netPay: parseFloat(parts[9]) || 0,
            status: parts[10] === 'G' ? 'Generated' : 'Paid'
        };
    } catch (err) {
        console.error('Error parsing payslip:', err);
        return null;
    }
};

// API Endpoints

app.get('/api/employees', (req, res) => {
    try {
        const result = runCobolProgram('EMPLIST');
        if (!result.success) return res.status(500).json({ error: result.error });

        const employeeData = fs.readFileSync(path.join(COBOL_DIR, 'EMPLIST.OUT'), 'utf8');
        const employees = employeeData.split('\n').map(parseEmployeeRecord).filter(Boolean);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

app.post('/api/employees', (req, res) => {
    const { id, name, department, position, salary, joinDate } = req.body;

    if (!id || !name || !department || !position || !salary || !joinDate) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const inputData = `${id.padEnd(10)}${name.padEnd(50)}${department.padEnd(20)}${position.padEnd(30)}${salary.toString().padStart(8, '0')}${joinDate}A`;
        fs.writeFileSync(path.join(DATA_DIR, 'EMPLOYEE.IN'), inputData);

        const result = runCobolProgram('EMPADD');
        if (!result.success) return res.status(400).json({ error: result.error });

        res.json({ success: true, message: 'Employee added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add employee' });
    }
});

app.get('/api/employees/:id/payslips', (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        fs.writeFileSync(path.join(DATA_DIR, 'PAYSLIP.IN'), id.padEnd(10));
        const result = runCobolProgram('PAYLIST');
        if (!result.success) return res.status(500).json({ error: result.error });

        const datesData = fs.readFileSync(path.join(COBOL_DIR, 'PAYLIST.OUT'), 'utf8');
        const dates = datesData.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        res.json(dates);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch payslip dates' });
    }
});

app.get('/api/employees/:id/payslips/:date', (req, res) => {
    const { id, date } = req.params;

    try {
        // Verify data directory exists
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }

        const inputFile = path.join(DATA_DIR, 'PAYSLIPDET.IN');
        const inputData = `${id.padEnd(10)}${date.padEnd(10)}`;
        
        // Write input file
        fs.writeFileSync(inputFile, inputData);
        console.log(`Input file created at: ${inputFile}`);

        // Rest of your COBOL processing...
        const result = runCobolProgram('PAYSLIP');
        
        if (!result.success) {
            return res.status(500).json({ error: result.error });
        }

        const outFile = path.join(COBOL_DIR, 'PAYSLIP.OUT');
        if (!fs.existsSync(outFile)) {
            return res.status(404).json({ error: 'Payslip output not found' });
        }

        const payslipData = fs.readFileSync(outFile, 'utf8');
        console.log(`Payslp data: ${payslipData}`);
        const payslip = parsePayslipRecord(payslipData);
        console.log('Parsed payslip JSON:', JSON.stringify(payslip, null, 2));
        if (!payslip) {
            return res.status(404).json({ error: 'Payslip not found' });
        }

        res.json(payslip);
        console.log('Sending to frontend:', JSON.stringify(payslip, null, 2));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch payslip' });
    }
});

app.post('/api/process-payroll', (req, res) => {
    const { employeeId, leaveDays, overtimeHours, bonusAmount, payDate } = req.body;

    if (!employeeId || leaveDays === undefined || overtimeHours === undefined || bonusAmount === undefined || !payDate) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const inputData = `${employeeId.padEnd(10)}${leaveDays.toString().padStart(2, '0')}${overtimeHours.toString().padStart(3, '0')}${bonusAmount.toFixed(2).replace('.', '').padStart(7, '0')}${payDate}`;
        fs.writeFileSync(path.join(DATA_DIR, 'PAYROLL.IN'), inputData);

        const result = runCobolProgram('PAYROLL');
        if (!result.success) return res.status(400).json({ error: result.error });

        const outputData = fs.readFileSync(path.join(COBOL_DIR, 'PAYROLL.OUT'), 'utf8');
        const [netPayStr, errorMsg] = outputData.split('|');

        if (errorMsg && errorMsg.trim() !== '') {
            return res.status(400).json({ error: errorMsg.trim() });
        }

        const netPay = parseFloat(netPayStr.trim());
        res.json({ success: true, netPay, message: 'Payroll processed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Payroll processing failed' });
    }
});

app.get('/api/payroll-report', (req, res) => {
    try {
        const result = runCobolProgram('PAYREPORT');
        if (!result.success) return res.status(400).json({ error: result.error });

        const report = fs.readFileSync(path.join(COBOL_DIR, 'PAYREPORT.TXT'), 'utf8');
        res.type('text/plain');
        res.send(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate payroll report' });
    }
});

// Error middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Handle uncaught errors
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

// Start server (only once!)
const server = app.listen(port, () => {
    console.log(`Payroll backend running on port ${port}`);
    console.log(`COBOL programs directory: ${COBOL_DIR}`);
    console.log(`Data directory: ${DATA_DIR}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});


// const express = require('express');
// const bodyParser = require('body-parser');
// const { execSync } = require('child_process');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = 3001;

// // Middleware and CORS setup remains the same
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// // Use absolute paths for directories
// const COBOL_DIR =__dirname;
// const DATA_DIR = __dirname;

// // Ensure directories exist
// if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
// if (!fs.existsSync(COBOL_DIR)) fs.mkdirSync(COBOL_DIR);

// const runCobolProgram = (programName, inputParams = '') => {
//     try {
//         // Convert Windows path to WSL path properly
//         const convertPathToWsl = (windowsPath) => {
//             // Normalize the path first
//             const normalizedPath = path.normalize(windowsPath);
//             // Get the drive letter (C:, D:, etc.)
//             const driveLetter = normalizedPath.split(path.sep)[0].toLowerCase().replace(':', '');
//             // Get the rest of the path after the drive
//             const pathAfterDrive = normalizedPath.substring(normalizedPath.indexOf(path.sep) + 1);
//             // Convert to WSL path format
//             return `/mnt/${driveLetter}/${pathAfterDrive.replace(/\\/g, '/')}`;
//         };

//         const wslCobolDir = convertPathToWsl(COBOL_DIR);
//         const wslDataDir = convertPathToWsl(DATA_DIR);

//         // 1. First compile the COBOL program
//         const compileCmd = `wsl cobc -x "${wslCobolDir}/${programName}.cbl" -o "${wslCobolDir}/${programName}"`;
//         console.log('Compile Command:', compileCmd);
//         execSync(compileCmd, { stdio: 'pipe' });

//         // 2. Run the compiled program
//         const runCmd = `wsl cd "${wslCobolDir}" && ./${programName} ${inputParams}`;
//         console.log('Run Command:', runCmd);
//         const output = execSync(runCmd, { stdio: 'pipe' }).toString().trim();

//         // 3. Read output file if exists
//         let fileOutput = '';
//         const outputFile = path.join(COBOL_DIR, `${programName}.OUT`);
//         if (fs.existsSync(outputFile)) {
//             fileOutput = fs.readFileSync(outputFile, 'utf8').trim();
//         }

//         return { 
//             success: true, 
//             output: fileOutput || output 
//         };
//     } catch (error) {
//         console.error('COBOL Execution Error:', error);
//         return {
//             success: false,
//             error: error.stderr ? error.stderr.toString() : error.message || 'COBOL program execution failed in WSL'
//         };
//     }
// };

// // Rest of your API endpoints remain the same
// app.post('/api/process-payroll', (req, res) => {
//     const { employeeId, leaveDays, overtimeHours, bonusAmount, payDate } = req.body;

//     if (!employeeId || leaveDays === undefined || overtimeHours === undefined || 
//         bonusAmount === undefined || !payDate) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     try {
//         // Prepare input data
//         const bonusStr = Math.round(bonusAmount * 100).toString().padStart(7, '0');
//         const inputData = [
//             employeeId.padEnd(10),
//             leaveDays.toString().padStart(2, '0'),
//             overtimeHours.toString().padStart(3, '0'),
//             bonusStr,
//             payDate
//         ].join('');

//         // Write input file
//         fs.writeFileSync(path.join(DATA_DIR, 'PAYROLL.IN'), inputData);

//         // Run COBOL program
//         const result = runCobolProgram('PAYROLL');
//         if (!result.success) {
//             return res.status(400).json({ 
//                 error: result.error || 'Payroll processing failed' 
//             });
//         }

//         // Parse output
//         const outputLines = result.output.split('\n');
//         const netPayLine = outputLines[0] ? outputLines[0].trim() : '';
//         const netPay = parseFloat(netPayLine);

//         if (isNaN(netPay)) {
//             return res.status(400).json({ 
//                 error: netPayLine || 'Invalid payroll result' 
//             });
//         }

//         res.json({ 
//             success: true, 
//             netPay: netPay,
//             message: 'Payroll processed successfully'
//         });
//     } catch (error) {
//         console.error('Payroll processing error:', error);
//         res.status(500).json({ 
//             error: 'Internal server error during payroll processing' 
//         });
//     }
// });

// // Start server
// app.listen(port, () => {
//     console.log(`Payroll backend running on port ${port}`);
//     console.log(`COBOL programs directory: ${COBOL_DIR}`);
//     console.log(`Data directory: ${DATA_DIR}`);
//     console.log('Using WSL for COBOL execution');
// });