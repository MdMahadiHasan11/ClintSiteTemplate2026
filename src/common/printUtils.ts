/* eslint-disable @typescript-eslint/no-explicit-any */

export const getPrintHTML = (
  content: string,
  orientation: "landscape" | "portrait",
  options?: {
    title?: string;
    dateRange?: string;
    ledgerType?: string;
    ledgerName?: string;
    printBy?: string;
  },
) => `
<html>
  <head>
    <title>${options?.title || "Report"}</title>
    <style>
      @page { size: A4 ${orientation}; margin: 15mm; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: Arial, sans-serif; -webkit-print-color-adjust: exact; }
      
      /* Enhanced header styles */
      .report-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e1e2e9;
      }
      
      .company-section {
        flex: 1;
      }
      
      .company-name  {
      font-size: 24px;
      font-weight: bold;
      color: #494a51;
      margin-bottom: 5px;
      }
      
      .company-details {
        font-size: 12px;
        color: #666;
        line-height: 1.4;
      }
      
      .company-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 50%;
        }
      
      
      .report-title {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin: 15px 0;
        text-transform: uppercase;
        color: #333;
      }
      
      .report-subtitle {
        text-align: center;
        font-size: 14px;
        margin-bottom: 20px;
        color: #666;
      }
      
      .report-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        font-size: 12px;
      }
      
      .info-section {
        flex: 1;
      }
      
      .info-item {
        margin-bottom: 5px;
      }
      
      .info-label {
        font-weight: bold;
        display: inline-block;
        min-width: 80px;
      }
      
      .print-footer {
        text-align: center;
        font-size: 12px;
        margin-top: 30px;
        padding-top: 10px;
        border-top: 1px solid #eee;
        color: #666;
      }
      
      table { 
        width: 100%; 
        border-collapse: collapse; 
        table-layout: auto; 
        word-wrap: break-word; 
        page-break-inside: auto;
        margin: 15px 0;
      }
      
      th, td { 
        border: 1px solid #ddd; 
        padding: 8px; 
        font-size: 12px; 
        text-align: left;
      }
      
      th { 
        background: #f2f2f2;
        font-weight: bold;
        text-align: left;
      }
      
      tr:nth-child(even) {
        background-color: #f9f9f9;
      }
      
      thead { display: table-header-group; }
      tr { page-break-inside: avoid; page-break-after: auto; }
      
      @media print { 
        body { zoom: 0.8; } 
        button { display: none; } 
        a { color: inherit; text-decoration: none; }
        .ant-pagination { display: none !important; }
        .ant-table-column-sorter-inner { display: none !important; }
        .ant-table-filter-dropdown { display: none !important; }
      }
    </style>
  </head>
  <body>
    <!-- Enhanced Report Header -->
    <div class="report-header">
      <div class="company-section">
        <div class="company-name">Naria Holidays</div>
        <div class="company-details">
          <div>Sky View Trade Valley, (13th Floor)</div>
          <div>66/1 VIP Road Naya Paltan, Dhaka-1000, Bangladesh</div>
          <div>Phone: +880 2222225357 | Email: info@nariaholidays.com</div>
          <div>Website: https://www.nariaholidays.com</div>
        </div>
      </div>
      <div class="company-logo">
        <img src="/logo.png" alt="Company Logo" style="width: 200px; height: 100px; object-fit: contain;" />
      </div>
    </div>
    
    ${options?.title ? `<div class="report-title">${options.title}</div>` : ""}
    
    <div class="report-info">
      <div class="info-section">
        <div class="info-item"><span class="info-label">Printed:</span> ${new Date().toLocaleString()}</div>
        ${
          options?.printBy
            ? `<div class="info-item"><span class="info-label">Printed By:</span> ${options.printBy}</div>`
            : ""
        }
      </div>

      <div class="info-section" style="text-align: right;">
      ${
        options?.ledgerName
          ? `
        <div class="info-item"><span class="info-label">${options.ledgerType} Name:</span> ${options.ledgerName}</div>`
          : ""
      }
      ${
        options?.dateRange
          ? `
        <div class="info-item"><span class="info-label">Date Range:</span> ${options.dateRange}</div>`
          : ""
      }
     
      </div>

      </div>
      
    </div>
    
    ${content}
    <div class="print-footer">Generated on ${new Date().toLocaleString()} | Naria Holidays</div>
  </body>
</html>
`;

// Print to browser
export const printReport = (
  element: HTMLElement | null,
  orientation: "landscape" | "portrait",
  options?: {
    title?: string;
    dateRange?: string;
    ledgerName?: string;
    ledgerType?: string;
    printBy?: string;
  },
) => {
  if (!element) return;
  const html = getPrintHTML(element.innerHTML, orientation, options);
  const win = window.open("", "", "width=900,height=650");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.print();
};

// Download as PDF
export const downloadPDF = async (
  element: HTMLElement | null,
  orientation: any = "landscape",
  options?: { title?: string; dateRange?: string },
) => {
  if (!element) return;

  // Dynamically import html2pdf to avoid SSR issues
  const html2pdf = (await import("html2pdf.js")).default;

  const opt = {
    filename: `${options?.title || "Report"}.pdf`,
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: { scale: 5 },
    jsPDF: { unit: "in", format: "a4", orientation: orientation },
  };

  html2pdf().set(opt).from(element).save();
};
