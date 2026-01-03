import { useAppSelector } from "@/redux/hooks";
import { fmt } from "@/utils/currency";
import dayjs from "dayjs";

interface ReportColumn {
  title: string;
  key: string;
  align?: "left" | "center" | "right";
}

interface UseCommonReportPrintProps<T = Record<string, unknown>> {
  title: string;
  subtitle?: string;
  dateRange?: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  filters?: Record<string, string>;
  entityName?: string;
  columns: ReportColumn[];
  data: T[];
  summary?: Record<string, unknown>;
  fileName?: string;
}

export const useCommonReportPrint = ({
  title,
  subtitle,
  dateRange,
  filters = {},
  entityName,
  columns,
  data,
  summary,
  fileName,
}: UseCommonReportPrintProps) => {
  const user = useAppSelector((state) => state.auth.user);

  const printReport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      console.error("Failed to open print window");
      return;
    }

    // Generate table header
    let tableHeaderHtml = "<tr>";
    columns.forEach((col) => {
      const align = col.align ? `text-align:${col.align}` : "";
      tableHeaderHtml += `<th style="${align}">${col.title}</th>`;
    });
    tableHeaderHtml += "</tr>";

    // Generate table body
    let tableBodyHtml = "";
    data.forEach((item) => {
      tableBodyHtml += "<tr>";
      columns.forEach((col) => {
        let cellValue = item[col.key];
        let cellStyle = "";

        // Apply alignment
        if (col.align) {
          cellStyle += `text-align:${col.align};`;
        }

        // Format currency values
        if (
          typeof cellValue === "number" &&
          col.key.toLowerCase().includes("amount")
        ) {
          cellValue = fmt(cellValue);
          cellStyle += col.align ? "" : "text-align:right;";
        }

        // Handle date formatting
        if (col.key.toLowerCase().includes("date") && cellValue) {
          if (
            typeof cellValue === "string" ||
            typeof cellValue === "number" ||
            cellValue instanceof Date
          ) {
            cellValue = dayjs(cellValue).format("DD-MM-YYYY");
          }
        }

        tableBodyHtml += `<td style="${cellStyle}">${cellValue || ""}</td>`;
      });
      tableBodyHtml += "</tr>";
    });

    // Generate summary row if provided
    if (summary) {
      tableBodyHtml +=
        '<tr style="font-weight:bold; background-color:#f0f0f0;">';
      columns.forEach((col) => {
        const summaryValue = summary[col.key];
        let cellStyle = "";

        if (col.align) {
          cellStyle += `text-align:${col.align};`;
        }

        if (
          typeof summaryValue === "number" &&
          col.key.toLowerCase().includes("amount")
        ) {
          cellStyle += col.align ? "" : "text-align:right;";
        }

        tableBodyHtml += `<td style="${cellStyle}">${summaryValue !== undefined ? (typeof summaryValue === "number" && col.key.toLowerCase().includes("amount") ? fmt(summaryValue) : summaryValue) : ""}</td>`;
      });
      tableBodyHtml += "</tr>";
    }

    const tableHtml = `
      <table class="ledger-table">
        <thead>${tableHeaderHtml}</thead>
        <tbody>${tableBodyHtml}</tbody>
      </table>
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${fileName || title}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 40px;
            color: #333;
            line-height: 1.4;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
          }
          .header h1 {
            margin: 0;
            font-size: 22px;
            font-weight: bold;
          }
          .header h2 {
            margin: 5px 0;
            font-size: 16px;
            color: #666;
          }
          .info-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            font-size: 14px;
          }
          .info-section {
            flex: 1;
          }
          .info-row {
            margin-bottom: 6px;
          }
          .info-label {
            font-weight: bold;
            min-width: 100px;
            display: inline-block;
          }
          .ledger-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            margin-top: 15px;
          }
          .ledger-table th, .ledger-table td {
            border: 1px solid #aaa;
            padding: 8px;
          }
          .ledger-table th {
            background-color: #f0f0f0;
          }
          .ledger-table tr:nth-child(even) {
            background-color: #fafafa;
          }
          .ledger-table tfoot td {
            font-weight: bold;
            background-color: #f0f0f0;
          }
          .footer {
            margin-top: 40px;
            font-size: 12px;
            text-align: center;
            color: #777;
          }
          .signatures {
            display: flex;
            justify-content: space-between;
            margin-top: 60px;
            font-size: 13px;
          }
          .sign-box {
            text-align: center;
            flex: 1;
          }
          .sign-box:not(:last-child) {
            margin-right: 20px;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
          .text-right {
            text-align: right;
          }
          .no-print {
            text-align: center;
            margin-top: 20px;
          }
          .print-button {
            padding: 10px 20px;
            background-color: #1890ff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }
          .print-button:hover {
            background-color: #40a9ff;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title} Report</h1>
          ${subtitle ? `<h2>${subtitle}</h2>` : ""}
        </div>

        <div class="info-container">
          <div class="info-section">
            ${entityName ? `<div class="info-row"><span class="info-label">Entity:</span> ${entityName}</div>` : ""}
            ${
              dateRange && dateRange[0] && dateRange[1]
                ? `<div class="info-row"><span class="info-label">Period:</span> ${dateRange[0].format("DD-MM-YYYY")} to ${dateRange[1].format("DD-MM-YYYY")}</div>`
                : ""
            }
            ${Object.entries(filters)
              .map(
                ([key, value]) =>
                  `<div class="info-row"><span class="info-label">${key}:</span> ${value}</div>`,
              )
              .join("")}
          </div>
          <div class="info-section">
            <div class="info-row"><span class="info-label">Printed By:</span> ${user?.fullName || "System User"}</div>
            <div class="info-row"><span class="info-label">Print Date:</span> ${dayjs().format("DD-MM-YYYY HH:mm:ss")}</div>
          </div>
        </div>

        ${tableHtml}

        <div class="footer">
          Printed on ${dayjs().format("DD-MM-YYYY HH:mm:ss")}
        </div>

        <div class="no-print">
          <button class="print-button" onclick="window.print()">Print Report</button>
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  return {
    printReport,
  };
};
