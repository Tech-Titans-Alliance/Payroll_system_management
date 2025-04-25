import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getPayrollReport } from "../services/api";
import "./PayrollReport.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const parsePayrollData = (raw) => {
  const lines = raw.trim().split("\n");
  const data = [];
  for (let line of lines) {
    if (line.startsWith("TOTAL NET PAY") || line.startsWith("EMP-ID")) continue;
    const [empId, payDate, basic, overtime, bonus, leave, gross, tax, net] =
      line.split("|").map((x) => x.trim());
    data.push({
      empId,
      payDate,
      basic: parseInt(basic),
      overtime: parseInt(overtime),
      bonus: parseInt(bonus),
      leave: parseInt(leave),
      gross: parseInt(gross),
      tax: parseInt(tax),
      net: parseInt(net),
    });
  }
  return data;
};

const PayrollReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getPayrollReport();
        const parsed = response.data ? parsePayrollData(response.data) : [];
        setReportData(parsed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "EMP-ID", accessor: "empId" },
      { Header: "PAY-DATE", accessor: "payDate" },
      { Header: "BASIC", accessor: "basic" },
      { Header: "OVERTIME", accessor: "overtime" },
      { Header: "BONUS", accessor: "bonus" },
      { Header: "LEAVE", accessor: "leave" },
      { Header: "GROSS", accessor: "gross" },
      { Header: "TAX", accessor: "tax" },
      { Header: "NET", accessor: "net" },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: reportData });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const barChartData = useMemo(() => {
    const employeeData = reportData.reduce((acc, row) => {
      if (!acc[row.empId]) {
        acc[row.empId] = {
          net: 0,
          bonus: 0,
          overtime: 0,
          count: 0,
        };
      }
      acc[row.empId].net += row.net;
      acc[row.empId].bonus += row.bonus;
      acc[row.empId].overtime += row.overtime;
      acc[row.empId].count += 1;
      return acc;
    }, {});

    const labels = Object.keys(employeeData);
    const netData = labels.map(
      (empId) => employeeData[empId].net / employeeData[empId].count
    );
    const bonusData = labels.map(
      (empId) => employeeData[empId].bonus / employeeData[empId].count
    );
    const overtimeData = labels.map(
      (empId) => employeeData[empId].overtime / employeeData[empId].count
    );

    return {
      labels,
      datasets: [
        {
          label: "Net Pay",
          data: netData,
          backgroundColor: "rgba(16, 185, 129, 0.8)",
        },
        {
          label: "Bonus",
          data: bonusData,
          backgroundColor: "rgba(22, 163, 74, 0.8)",
        },
        {
          label: "Overtime",
          data: overtimeData,
          backgroundColor: "rgba(34, 197, 94, 0.8)",
        },
      ],
    };
  }, [reportData]);

  const lineChartData = useMemo(() => {
    const dates = {};
    reportData.forEach((row) => {
      if (!dates[row.payDate]) dates[row.payDate] = 0;
      dates[row.payDate] += row.net;
    });
    const sortedDates = Object.entries(dates)
      .filter(([date]) => !isNaN(new Date(date)))
      .sort((a, b) => new Date(a[0]) - new Date(b[0]));
    return {
      labels: sortedDates.map(([date]) => date),
      datasets: [
        {
          label: "Total Net Pay Over Time",
          data: sortedDates.map(([, net]) => net),
          fill: false,
          borderColor: "rgba(16, 185, 129, 1)",
          tension: 0.3,
          borderWidth: 2,
        },
      ],
    };
  }, [reportData]);

  const taxVsNetPieData = useMemo(() => {
    let totalTax = 0;
    let totalNet = 0;
    reportData.forEach((row) => {
      totalTax += row.tax;
      totalNet += row.net;
    });

    return {
      labels: ["Total Tax", "Total Net Pay"],
      datasets: [
        {
          label: "Tax vs Net Pay",
          data: [totalTax, totalNet],
          backgroundColor: ["#16A34A", "#10B981"],
          hoverOffset: 8,
        },
      ],
      options: {
        responsive: true, // Ensures the chart adjusts with the window size
        plugins: {
          legend: {
            position: "top", // Positioning the legend on top
            align: "start", // Align the legend to the right
            labels: {
              padding: 15, // Adjust padding for legend
            },
          },
          tooltip: {
            enabled: true,
          },
          title: {
            display: true,
            text: "Tax vs Net Pay", // Title for the chart
            position: "top", // Title position
            font: {
              size: 18,
            },
            padding: 20, // Padding around the title
          },
        },
        elements: {
          arc: {
            borderWidth: 1, // Border around the segments of the pie chart
          },
        },
      },
    };
  }, [reportData]);

  if (loading)
    return <div className="loading-spinner">Loading payroll report...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="payroll-report-container">
      <h2>Payroll Report</h2>

      <div className="table-wrapper">
        <table {...getTableProps()} className="payroll-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <div className="chart-section">
        <h3>Net Pay vs Bonus and Overtime (Average Per Employee)</h3>
        <Bar data={barChartData} />
      </div>

      <div className="chart-section">
        <h3>Net Pay Over Time</h3>
        <Line data={lineChartData} />
      </div>

      <div className="chart-section">
        <h3>Tax vs Net Pay</h3>
        <Pie data={taxVsNetPieData} />
      </div> */}
      <div className="charts-row">
        <div className="chart-box">
          {/* <h3 className="text-xl font-semibold mb-2 text-green-800">
            Net Pay vs Bonus and Overtime
          </h3> */}
          <Bar data={barChartData} />
        </div>

        <div className="chart-box">
          {/* <h3 className="text-xl font-semibold mb-2 text-green-800">
            Net Pay Over Time
          </h3> */}
          <Line data={lineChartData} />
        </div>

        <div className="PIE">
          {/* <h3 className="text-lg font-semibold mb-2 text-green-800">
            Tax vs Net Pay
          </h3> */}
          <Pie data={taxVsNetPieData} />
        </div>
      </div>
    </div>
  );
};

export default PayrollReport;
