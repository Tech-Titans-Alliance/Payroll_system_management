

## 🎯 **Project Overview**

Welcome to **PayXpert**, a COBOL-based **Payroll Processing System** designed to automate employee salary calculations, apply tax deductions, process benefits, and generate payslips. This system helps organizations manage payroll efficiently while ensuring compliance with tax regulations. 🚀

### Key Features:
- **🔒 User Authentication**: Secure login system with email verification to access the system.
- **📊 Dashboard**: Interactive dashboard with clickable cards, charts, and an overview of payroll metrics.
- **👨‍💼 Employee Management**: View and manage employee details and payslips.
- **💸 Payroll Form**: Generate payslips for employees by filling in required details.
- **📋 Reports**: View and generate comprehensive reports for payroll processing.

---

## 📦 **How to Access and Run the Project**

This is a **group project** developed by **Tech Titans** 👨‍💻:
- **Rolivhuwa Muzila**
- **Asanda Ngwenya**
- **Palesa Mashabela**
- **Atlehang Semela**
- **Xolani Vilakazi**

### 🔧 **Prerequisites**

Before you start, make sure you have the following:

1. **Clone the repository**:
   Clone the project repository to your local machine using the command below:

   ```bash
   git clone https://github.com/your-repository/payroll_system_management.git
   ```

2. **Install Dependencies (Frontend)**:
   Make sure to install the necessary **Node.js modules** before running the frontend:

   ```bash
   cd payroll-processing-frontend
   npm install
   npm start
   ```

3. **COBOL Setup (Backend)**:
   Ensure that you have **COBOL** set up and configured in your VS Code environment for the backend.

---

## 🖥️ **Running the Backend (COBOL)**

1. **Navigate to the backend directory**:
   Open the terminal in VS Code and change to the backend directory:

   ```bash
   PS C:\Users\Capaciti\OneDrive - Cape IT Initiative\Desktop\Payroll system\Payroll_system_management> cd backend
   ```

2. **Start the Backend Server**:
   Run the following command to start the backend server:

   ```bash
   PS C:\Users\Capaciti\OneDrive - Cape IT Initiative\Desktop\Payroll system\Payroll_system_management\backend> node server
   ```

   You should see the following message indicating that the backend is running:

   ```bash
   Payroll backend running on port 3001...
   ```

---

## 🌐 **Running the Frontend (React)**

1. **Navigate to the frontend directory**:
   
   Open another terminal window and navigate to the frontend folder:

   ```bash
   PS C:\Users\Capaciti\OneDrive - Cape IT Initiative\Desktop\Payroll system\Payroll_system_management> cd payroll-processing-frontend
   ```

2. **Start the Frontend Server**:
   
   To start the frontend, run:

   ```bash
   PS C:\Users\Capaciti\OneDrive - Cape IT Initiative\Desktop\Payroll system\Payroll_system_management\payroll-processing-frontend> npm start
   ```

   The React app will now be running at `http://localhost:3000` 🎉.

---

## 📑 **Features & Flow**

### 1. **Login Page** 🔐:
   - Enter your email to receive a verification code. (NB!!! the email input is CASE sensetive, ensure you put a correct format for your email).
   - After entering the code, you'll be directed to the **Dashboard**.

### 2. **Dashboard** 📊:
   - Upon login, you are redirected to the **Dashboard**.
   - The dashboard contains a **sidebar** with clickable buttons for **Dashboard**, **Payroll Form**, **Reports**, and **Logout**. The buttons have hover effects and are interactive! 👇
   - The **dashboard** shows **3 cards** that provide an overview of payroll data:
     - Total Employees
     - Payroll Form
     - Reports
   - The **charts** on the dashboard visually represent payroll data.

### 3. **Employee List** 👨‍💼:
   - Clicking the "Total Employees" card takes you to a list of employees.
   - You can click on an employee's name to see their **payslip history**.
   - Select a **payslip date** to view the payslip, which is also **downloadable** 📥.

### 4. **Payroll Form** 💵:
   - The **Payroll Form** allows you to enter details for **generating payslips**.
   - Fill in the necessary information and generate a **payslip** for an employee.

### 5. **Reports** 📈:
   - The **Reports** section provides a comprehensive **summary** of payroll data, including total payslips issued and other relevant stats.

---

## 🔑 **Project Structure**

- **Backend (COBOL)**:
  - COBOL scripts that handle payroll processing, tax deductions, salary calculations, and payslip generation.

- **Frontend (React)**:
  - React components for the login page, dashboard, payroll form, reports, and employee management.

---

## ⚙️ **Tech Stack**

- **Backend**: COBOL 🖥️
- **Frontend**: React.js ⚛️
- **State Management**: React Context API 🧠
- **Styling**: Custom CSS 🎨
- **APIs**: Node.js for handling backend requests 🌐

---

## 📈 **Future Enhancements**

- **🌍 Multi-language Support**: Expand the system to support multiple languages for a wider audience.
- **👩‍💻 Employee Portal**: Allow employees to view their payslips and track leave requests.
- **📊 Advanced Data Analytics**: Add more features for payroll data analytics, charts, and insights.

---

## 📜 **License**

This project is open-source and available under the MIT License. Feel free to fork, contribute, or use it for your projects! 🙌

---

**Enjoy using PayXpert!** 🎉  


