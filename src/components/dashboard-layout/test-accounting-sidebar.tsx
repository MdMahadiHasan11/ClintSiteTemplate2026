// "use client";
// import type React from "react";

// import { useAppSelector } from "@/redux/hooks";
// import type { TSession } from "@/types";
// import {
//   BankOutlined,
//   CloseCircleOutlined,
//   CreditCardOutlined,
//   DashboardOutlined,
//   DatabaseOutlined,
//   DollarOutlined,
//   FileSearchOutlined,
//   FileTextOutlined,
//   SearchOutlined,
//   SettingOutlined,
//   UsergroupAddOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { Input, Layout, Menu, type MenuProps } from "antd";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ReactElement, useState } from "react";
// import { GiPassport } from "react-icons/gi";
// import { MdOutlineProductionQuantityLimits } from "react-icons/md";
// import CustomImage from "../ui/image";
// import actionChecker from "./action-checker";
// import moduleChecker from "./modue-checker";
// const { Sider } = Layout;

// interface SidebarProps {
//   collapsed: boolean;
//   session: TSession;
// }
// interface SubMenuItem {
//   key: string;
//   label: JSX.Element;
//   allowedRoles: string[];
// }
// interface MenuItem {
//   key: string;
//   icon?: React.ReactNode;
//   label: React.ReactNode;
//   children?: MenuItem[];
//   link?: string;
// }

// export default function Sidebar({ collapsed, session }: SidebarProps) {
//   const pathname = usePathname();
//   const permission = useAppSelector((state) => state.auth.permissions);

//   const menuItems = [
//     ...(moduleChecker("dashboard", permission)
//       ? [
//           {
//             key: "/dashboard",
//             icon: <DashboardOutlined />,
//             label: <Link href="/dashboard">Dashboard</Link>,
//           },
//         ]
//       : []),
//     ...(moduleChecker("invoice_tour_package", permission)
//       ? [
//           {
//             key: "invoice-tour",
//             icon: <FileTextOutlined />,
//             label: "Invoice (Tour)",
//             children: [
//               ...(actionChecker("invoice_tour_package", ["CREATE"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/invoice-tour/create",
//                       label: (
//                         <Link href="/dashboard/invoice-tour/create">
//                           Create Invoice
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "invoice_tour_package",
//                 ["READ", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/invoice-tour/all",
//                       label: (
//                         <Link href="/dashboard/invoice-tour/all">
//                           All Invoices
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//             ],
//           },
//         ]
//       : []),
//     ...(moduleChecker("invoice_visa", permission)
//       ? [
//           {
//             key: "invoice-visa",
//             icon: <FileTextOutlined />,
//             label: "Invoice (Visa)",
//             children: [
//               ...(actionChecker("invoice_visa", ["CREATE"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/invoice-visa/create",
//                       label: (
//                         <Link href="/dashboard/invoice-visa/create">
//                           Create Invoice
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "invoice_visa",
//                 ["READ", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/invoice-visa/all",
//                       label: (
//                         <Link href="/dashboard/invoice-visa/all">
//                           All Invoices
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//             ],
//           },
//         ]
//       : []),
//     ...(moduleChecker("invoice_air_ticket", permission)
//       ? [
//           {
//             key: "invoice-air-ticket",
//             icon: <FileTextOutlined />,
//             label: "Invoice (Air Ticket)",
//             children: [
//               ...(actionChecker("invoice_air_ticket", ["CREATE"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/invoice-air-ticket/create",
//                       label: (
//                         <Link href="/dashboard/invoice-air-ticket/create">
//                           Create Invoice
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "invoice_air_ticket",
//                 ["READ", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/invoice-air-ticket/all",
//                       label: (
//                         <Link href="/dashboard/invoice-air-ticket/all">
//                           All Invoices
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//             ],
//           },
//         ]
//       : []),
//     ...(moduleChecker("invoice_hotel", permission)
//       ? [
//           {
//             key: "invoice-hotel",
//             icon: <FileTextOutlined />,
//             label: "Invoice (Hotel)",
//             children: [
//               ...(actionChecker("invoice_hotel", ["CREATE"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/invoice-hotel/create",
//                       label: (
//                         <Link href="/dashboard/invoice-hotel/create">
//                           Create Invoice
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "invoice_hotel",
//                 ["READ", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/invoice-hotel/all",
//                       label: (
//                         <Link href="/dashboard/invoice-hotel/all">
//                           All Invoices
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//             ],
//           },
//         ]
//       : []),
//     ...(moduleChecker("invoice_hotel", permission)
//       ? [
//           {
//             key: "others",
//             icon: <FileTextOutlined />,
//             label: "Invoice (Others)",
//             children: [
//               ...(actionChecker("invoice_hotel", ["CREATE"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/others/create",
//                       label: (
//                         <Link href="/dashboard/others/create">
//                           Create Invoice
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "invoice_hotel",
//                 ["READ", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/others/all",
//                       label: (
//                         <Link href="/dashboard/others/all">All Invoices</Link>
//                       ),
//                     },
//                   ]
//                 : []),
//             ],
//           },
//         ]
//       : []),
//     ...(moduleChecker("accounts", permission)
//       ? [
//           {
//             key: "accounts",
//             icon: <CreditCardOutlined />,
//             label: "Accounts",

//             children: [
//               ...(actionChecker(
//                 "account",
//                 ["READ", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/accounts",
//                       label: <Link href="/dashboard/accounts">Accounts</Link>,
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "receive_voucher",
//                 ["READ", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/receive-voucher",
//                       label: (
//                         <Link href="/dashboard/receive-voucher">
//                           Receive Voucher
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "payment_voucher",
//                 ["READ", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/payment-voucher",
//                       label: (
//                         <Link href="/dashboard/payment-voucher">
//                           Payment Voucher
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "contra_voucher",
//                 ["READ", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/contra-voucher",
//                       label: (
//                         <Link href="/dashboard/contra-voucher">
//                           Contra Voucher
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "journal_voucher",
//                 ["READ", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/journal-voucher",
//                       label: (
//                         <Link href="/dashboard/journal-voucher">
//                           Journal Voucher
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "adjustment_voucher",
//                 ["READ", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/adjustment-voucher",
//                       label: (
//                         <Link href="/dashboard/adjustment-voucher">
//                           Adjustment Voucher
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "cheque_management",
//                 ["READ", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/cheques",
//                       label: <Link href="/dashboard/cheques">Cheques</Link>,
//                     },
//                   ]
//                 : []),
//             ],
//           },
//         ]
//       : []),
//     ...(actionChecker("clients", ["READ", "UPDATE", "DELETE"], permission)
//       ? [
//           {
//             key: "/dashboard/clients",
//             icon: <UserOutlined />,
//             label: <Link href="/dashboard/clients">Clients</Link>,
//           },
//         ]
//       : []),
//     ...(actionChecker("vendors", ["READ", "UPDATE", "DELETE"], permission)
//       ? [
//           {
//             key: "/dashboard/vendor",
//             icon: <UserOutlined />,
//             label: <Link href="/dashboard/vendor">Vendors</Link>,
//           },
//         ]
//       : []),
//     ...(actionChecker("agents", ["READ", "UPDATE", "DELETE"], permission)
//       ? [
//           {
//             key: "/dashboard/agents",
//             icon: <UserOutlined />,
//             label: <Link href="/dashboard/agents">Agents</Link>,
//           },
//         ]
//       : []),
//     // ...(actionChecker("agents", ["READ", "UPDATE", "DELETE"], permission)
//     //   ? [
//     //       {
//     //         key: "/dashboard/allocation",
//     //         icon: <DollarOutlined />,
//     //         label: "Allocation",
//     //         children: [
//     //           ...(actionChecker("audit_trails", ["READ"], permission)
//     //             ? [
//     //                 {
//     //                   key: "/dashboard/allocation/credits",
//     //                   label: (
//     //                     <Link href="/dashboard/allocation/credits">
//     //                       Get Credits
//     //                     </Link>
//     //                   ),
//     //                 },
//     //               ]
//     //             : []),
//     //           ...(actionChecker("audit_trails", ["READ"], permission)
//     //             ? [
//     //                 {
//     //                   key: "/dashboard/allocation/debits",
//     //                   label: (
//     //                     <Link href="/dashboard/allocation/debits">
//     //                       Get Debits
//     //                     </Link>
//     //                   ),
//     //                 },
//     //               ]
//     //             : []),
//     //           ...(actionChecker("audit_trails", ["READ"], permission)
//     //             ? [
//     //                 {
//     //                   key: "/dashboard/allocation/payment-to",
//     //                   label: (
//     //                     <Link href="/dashboard/allocation/payment-to">
//     //                       Get Payment To Allocation
//     //                     </Link>
//     //                   ),
//     //                 },
//     //               ]
//     //             : []),
//     //           ...(actionChecker("audit_trails", ["READ"], permission)
//     //             ? [
//     //                 {
//     //                   key: "/dashboard/allocation/payment-from",
//     //                   label: (
//     //                     <Link href="/dashboard/allocation/payment-from">
//     //                       Get Payment From Allocation
//     //                     </Link>
//     //                   ),
//     //                 },
//     //               ]
//     //             : []),
//     //           ...(actionChecker("audit_trails", ["READ"], permission)
//     //             ? [
//     //                 {
//     //                   key: "/dashboard/allocation/force-update",
//     //                   label: (
//     //                     <Link href="/dashboard/allocation/force-update">
//     //                       Force Update Allocation
//     //                     </Link>
//     //                   ),
//     //                 },
//     //               ]
//     //             : []),
//     //         ],
//     //       },
//     //     ]
//     //   : []),

//     ...(moduleChecker("dashboard", permission)
//       ? [
//           {
//             key: "/dashboard/allocation",
//             icon: <DollarOutlined />,
//             label: "Allocation",
//             children: [
//               {
//                 key: "/dashboard/allocation/credits",
//                 label: (
//                   <Link href="/dashboard/allocation/credits">Get Credits</Link>
//                 ),
//               },
//               {
//                 key: "/dashboard/allocation/debits",
//                 label: (
//                   <Link href="/dashboard/allocation/debits">Get Debits</Link>
//                 ),
//               },
//               {
//                 key: "/dashboard/allocation/payment-to",
//                 label: (
//                   <Link href="/dashboard/allocation/payment-to">
//                     Get Payment To Allocation
//                   </Link>
//                 ),
//               },
//               {
//                 key: "/dashboard/allocation/payment-from",
//                 label: (
//                   <Link href="/dashboard/allocation/payment-from">
//                     Get Payment From Allocation
//                   </Link>
//                 ),
//               },
//               {
//                 key: "/dashboard/allocation/force-update",
//                 label: (
//                   <Link href="/dashboard/allocation/force-update">
//                     Force Update Allocation
//                   </Link>
//                 ),
//               },
//             ],
//           },
//         ]
//       : []),
//     ...(moduleChecker("reports", permission)
//       ? [
//           {
//             key: "reports",
//             icon: <FileSearchOutlined />,
//             label: "Reports",

//             children: [
//               ...(moduleChecker("system_logs", permission)
//                 ? [
//                     {
//                       key: "system_logs",
//                       label: "System Logs",
//                       children: [
//                         ...(actionChecker("audit_trails", ["READ"], permission)
//                           ? [
//                               {
//                                 key: "/dashboard/reports/system-logs/audit-trails",
//                                 label: (
//                                   <Link href="/dashboard/reports/system-logs/audit-trails">
//                                     Audit Trails
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                       ],
//                     },
//                   ]
//                 : []),

//               ...(moduleChecker("ledgers", permission)
//                 ? [
//                     {
//                       key: "legers",
//                       label: "Ledgers",
//                       children: [
//                         ...(actionChecker(
//                           "account_ledger",
//                           ["READ"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/reports/legers/account-leger",
//                                 label: (
//                                   <Link href="/dashboard/reports/legers/account-leger">
//                                     Account Ledger
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker("client_ledger", ["READ"], permission)
//                           ? [
//                               {
//                                 key: "/dashboard/reports/legers/client-leger",
//                                 label: (
//                                   <Link href="/dashboard/reports/legers/client-leger">
//                                     Client Ledger
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker("vendor_ledger", ["READ"], permission)
//                           ? [
//                               {
//                                 key: "/dashboard/reports/legers/vendor-leger",
//                                 label: (
//                                   <Link href="/dashboard/reports/legers/vendor-leger">
//                                     Vendor Ledger
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker("agent_ledger", ["READ"], permission)
//                           ? [
//                               {
//                                 key: "/dashboard/reports/legers/agent-leger",
//                                 label: (
//                                   <Link href="/dashboard/reports/legers/agent-leger">
//                                     Agent Ledger
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                       ],
//                     },
//                   ]
//                 : []),
//               ...(moduleChecker("sales_report", permission)
//                 ? [
//                     {
//                       key: "sales",
//                       label: "Sales Report",

//                       children: [
//                         ...(actionChecker("sales_reports", ["READ"], permission)
//                           ? [
//                               {
//                                 key: "/dashboard/reports/sales-report/sales-report",
//                                 label: (
//                                   <Link href="/dashboard/reports/sales-report/sales-report">
//                                     Sales Report
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker(
//                           "invoice_tour_report",
//                           ["READ"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/reports/sales-report/invoice-tour-report",
//                                 label: (
//                                   <Link href="/dashboard/reports/sales-report/invoice-tour-report">
//                                     Invoice Tour Report
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker(
//                           "invoice_visa_report",
//                           ["READ"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/reports/sales-report/invoice-visa-report",
//                                 label: (
//                                   <Link href="/dashboard/reports/sales-report/invoice-visa-report">
//                                     Invoice Visa Report
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker(
//                           "invoice_air_ticket_report",
//                           ["READ"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/reports/sales-report/air-ticket-report",
//                                 label: (
//                                   <Link href="/dashboard/reports/sales-report/air-ticket-report">
//                                     Invoice Air Ticket Report
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker(
//                           "invoice_hotel_report",
//                           ["READ"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/reports/sales-report/invoice-hotel-report",
//                                 label: (
//                                   <Link href="/dashboard/reports/sales-report/invoice-hotel-report">
//                                     Invoice Hotel Report
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker(
//                           "visa_item_report",
//                           ["READ"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/reports/sales-report/visa-reports",
//                                 label: (
//                                   <Link href="/dashboard/reports/sales-report/visa-reports">
//                                     Visa Item Report
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker(
//                           "air_ticket_item_report",
//                           ["READ"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/reports/sales-report/air-ticket-item-report",
//                                 label: (
//                                   <Link href="/dashboard/reports/sales-report/air-ticket-item-report">
//                                     Air Ticket Item Report
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker(
//                           "hotel_item_report",
//                           ["READ"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/reports/sales-report/hotel-item-report",
//                                 label: (
//                                   <Link href="/dashboard/reports/sales-report/hotel-item-report">
//                                     Hotel Item Report
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker(
//                           "transport_item_report",
//                           ["READ"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/reports/sales-report/transport-item-report",
//                                 label: (
//                                   <Link href="/dashboard/reports/sales-report/transport-item-report">
//                                     Transport Item Report
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker(
//                           "food_item_report",
//                           ["READ"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/reports/sales-report/food-item-report",
//                                 label: (
//                                   <Link href="/dashboard/reports/sales-report/food-item-report">
//                                     Food Item Report
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker(
//                           "invoice_others_report",
//                           ["READ"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/reports/sales-report/other-report",
//                                 label: (
//                                   <Link href="/dashboard/reports/sales-report/other-report">
//                                     Invoice Others Report
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                       ],
//                     },
//                   ]
//                 : []),
//               ...(moduleChecker("account_reports", permission)
//                 ? [
//                     {
//                       key: "accountReports",
//                       label: "Account Report",

//                       children: [
//                         ...(actionChecker(
//                           "account_report",
//                           ["READ"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/reports/account/account-report",
//                                 label: (
//                                   <Link href="/dashboard/reports/account/account-report">
//                                     Account Report
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker(
//                           "account_statement",
//                           ["READ"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/reports/account/account-statement",
//                                 label: (
//                                   <Link href="/dashboard/reports/account/account-statement">
//                                     Account Statement
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                       ],
//                     },
//                   ]
//                 : []),
//               ...(actionChecker("client_wise_due_advance", ["READ"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/reports/client-due-advanced-report",
//                       label: (
//                         <Link href="/dashboard/reports/client-due-advanced-report">
//                           Client Wise Due/Advanced
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker("vendor_wise_due_advance", ["READ"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/reports/vendor-due-advanced-report",
//                       label: (
//                         <Link href="/dashboard/reports/vendor-due-advanced-report">
//                           Vendor Wise Due/Advanced
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker("receive_voucher_report", ["READ"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/reports/receive-voucher-report",
//                       label: (
//                         <Link href="/dashboard/reports/receive-voucher-report">
//                           Receive Voucher Report
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker("payment_voucher_report", ["READ"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/reports/payment-voucher-report",
//                       label: (
//                         <Link href="/dashboard/reports/payment-voucher-report">
//                           Payment Voucher Report
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               {
//                 key: "/dashboard/reports/inventory-report",
//                 label: (
//                   <Link href="/dashboard/reports/inventory-report">
//                     Inventory Report
//                   </Link>
//                 ),
//               },
//               ...(actionChecker("expense_report", ["READ"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/reports/expense-report",
//                       label: (
//                         <Link href="/dashboard/reports/expense-report">
//                           Expense Report
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker("day_book", ["READ"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/reports/day-book",
//                       label: (
//                         <Link href="/dashboard/reports/day-book">Day Book</Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker("balance_sheet", ["READ"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/reports/balance-sheet",
//                       label: (
//                         <Link href="/dashboard/reports/balance-sheet">
//                           Balance Sheet
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker("balance_sheet", ["READ"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/reports/client-wise-due-invoice",
//                       label: (
//                         <Link href="/dashboard/reports/client-wise-due-invoice">
//                           Client Wise Due Invoice
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker("balance_sheet", ["READ"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/reports/client-wise-advance",
//                       label: (
//                         <Link href="/dashboard/reports/client-wise-advance">
//                           Client Wise Advance
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker("overall_profit_loss", ["READ"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/reports/overall-profit-loss",
//                       label: (
//                         <Link href="/dashboard/reports/overall-profit-loss">
//                           Overall Profit Loss
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//             ],
//           },
//         ]
//       : []),
//     ...(moduleChecker("configuration", permission)
//       ? [
//           {
//             key: "configuration",
//             icon: <SettingOutlined />,
//             label: "Configuration",

//             children: [
//               ...(moduleChecker("products", permission)
//                 ? [
//                     {
//                       key: "products",
//                       icon: <MdOutlineProductionQuantityLimits />,
//                       label: "Products",

//                       children: [
//                         ...(actionChecker(
//                           "product",
//                           ["READ", "CREATE", "UPDATE", "DELETE"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/configuration/products/all-products",
//                                 label: (
//                                   <Link href="/dashboard/configuration/products/all-products">
//                                     All Products
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker(
//                           "inventory",
//                           ["READ", "CREATE", "UPDATE", "DELETE"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/configuration/products/inventory",
//                                 label: (
//                                   <Link href="/dashboard/configuration/products/inventory">
//                                     Inventory
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                       ],
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "passport",
//                 ["READ", "CREATE", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/configuration/passport",
//                       icon: <GiPassport />,
//                       label: (
//                         <Link href="/dashboard/configuration/passport">
//                           Passport
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "employee",
//                 ["READ", "CREATE", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/configuration/employee",
//                       icon: <UsergroupAddOutlined />,
//                       label: (
//                         <Link href="/dashboard/configuration/employee">
//                           Employee
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(moduleChecker("users", permission)
//                 ? [
//                     {
//                       key: "users",
//                       icon: <UserOutlined />,
//                       label: "Users",

//                       children: [
//                         ...(actionChecker(
//                           "user",
//                           ["READ", "CREATE", "UPDATE", "DELETE"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/configuration/users/all",
//                                 label: (
//                                   <Link href="/dashboard/configuration/users/all">
//                                     View Users
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker(
//                           "role_permission",
//                           ["READ", "CREATE", "UPDATE", "DELETE"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/configuration/users/roles",
//                                 label: (
//                                   <Link href="/dashboard/configuration/users/roles">
//                                     View Roles
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                       ],
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "tour_groups",
//                 ["READ", "CREATE", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/configuration/tour-group",
//                       icon: <UsergroupAddOutlined />,
//                       label: (
//                         <Link href="/dashboard/configuration/tour-group">
//                           Tour Groups
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(actionChecker(
//                 "expense_head",
//                 ["READ", "CREATE", "UPDATE", "DELETE"],
//                 permission
//               )
//                 ? [
//                     {
//                       key: "/dashboard/configuration/expense-head",
//                       icon: <MdOutlineProductionQuantityLimits />,
//                       label: (
//                         <Link href="/dashboard/configuration/expense-head">
//                           Expense Head
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//               ...(moduleChecker("company", permission)
//                 ? [
//                     {
//                       key: "company",
//                       icon: <BankOutlined />,
//                       label: "Company",

//                       children: [
//                         ...(actionChecker(
//                           "company_info",
//                           ["READ", "UPDATE"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/configuration/company/info",
//                                 label: (
//                                   <Link href="/dashboard/configuration/company/info">
//                                     Company Info
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                         ...(actionChecker(
//                           "company_config",
//                           ["READ", "UPDATE"],
//                           permission
//                         )
//                           ? [
//                               {
//                                 key: "/dashboard/configuration/company/config",
//                                 label: (
//                                   <Link href="/dashboard/configuration/company/config">
//                                     Company Config
//                                   </Link>
//                                 ),
//                               },
//                             ]
//                           : []),
//                       ],
//                     },
//                   ]
//                 : []),

//               ...(actionChecker("database_backup", ["READ"], permission)
//                 ? [
//                     {
//                       key: "/dashboard/configuration/download-db",
//                       icon: <DatabaseOutlined />,
//                       label: (
//                         <Link href="/dashboard/configuration/download-db">
//                           Database Backup
//                         </Link>
//                       ),
//                     },
//                   ]
//                 : []),
//             ],
//           },
//         ]
//       : []),
//   ];

//   const [search, setSearch] = useState("");

//   // Filter function for menu items
//   const filterMenuItems = (items: MenuItem[], query: string): MenuItem[] => {
//     if (!query.trim()) return items;

//     const searchLower = query.toLowerCase();

//     const filterRecursive = (
//       item: MenuItem | SubMenuItem
//     ): MenuItem | SubMenuItem | null => {
//       // Extract label text, handling both string and JSX.Element (e.g., <Link>)
//       const labelText =
//         item.label !== null && item.label !== undefined
//           ? typeof item.label === "string"
//             ? item.label
//             : (item.label as ReactElement).props.children?.toString() || ""
//           : "";
//       const matchesLabel = labelText.toLowerCase().includes(searchLower);

//       if ("children" in item && item.children) {
//         const filteredChildren = item.children
//           .map((child) => filterRecursive(child))
//           .filter(Boolean) as SubMenuItem[];

//         if (matchesLabel || filteredChildren.length > 0) {
//           return {
//             ...item,
//             children:
//               filteredChildren.length > 0 ? filteredChildren : item.children,
//           };
//         }
//       } else if (matchesLabel) {
//         return item;
//       }

//       return null;
//     };

//     return items
//       .map((item) => filterRecursive(item))
//       .filter(Boolean) as MenuItem[];
//   };

//   const menuItems2 = filterMenuItems(menuItems, search);
//   const handleClear = () => {
//     setSearch("");
//   };

//   const filterMenuByRole = (
//     items: MenuItem[],
//     userType: string
//   ): MenuItem[] => {
//     return items.map((item) => {
//       if (item.children) {
//         const filteredChildren = filterMenuByRole(item.children, userType);
//         return { ...item, children: filteredChildren };
//       }
//       return item;
//     });
//   };

//   const filteredMenuItems = filterMenuByRole(
//     menuItems2,
//     session?.user_type ?? ""
//   );

//   const getLevelKeys = (items: MenuItem[]) => {
//     const key: Record<string, number> = {};
//     const func = (items2: MenuItem[], level = 1) => {
//       items2.forEach((item) => {
//         if (item.key) key[item.key] = level;
//         if (item.children) func(item.children, level + 1);
//       });
//     };
//     func(items);
//     return key;
//   };

//   const levelKeys = getLevelKeys(menuItems2);

//   const [stateOpenKeys, setStateOpenKeys] = useState([pathname.split("/")[1]]);

//   const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
//     const currentOpenKey = openKeys.find((key) => !stateOpenKeys.includes(key));
//     if (currentOpenKey !== undefined) {
//       const repeatIndex = openKeys
//         .filter((key) => key !== currentOpenKey)
//         .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
//       setStateOpenKeys(
//         openKeys
//           .filter((_, index) => index !== repeatIndex)
//           .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
//       );
//     } else {
//       setStateOpenKeys(openKeys);
//     }
//   };

//   return (
//     <Sider
//       trigger={null}
//       collapsible
//       collapsed={collapsed}
//       style={{
//         overflow: "hidden",
//         height: "100vh",
//         position: "fixed",
//         left: 0,
//         top: 0,
//         bottom: 0,
//         zIndex: 1000,
//         boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
//         borderRight: `1px solid #e2e8f0`,
//         background: "#ffffff",
//         color: "#1e293b",
//         transition: "all 0.3s ease",
//       }}
//       width={285}
//       theme="light"
//     >
//       {/* Logo */}
//       <Link
//         className="logo"
//         style={{
//           height: "80px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: collapsed ? "center" : "flex-start",
//           padding: collapsed ? "16px" : "16px 24px",
//           background: "#ffffff",
//           color: "#1e293b",
//           borderBottom: `1px solid #e2e8f0`,
//           transition: "all 0.3s ease",
//         }}
//         href="/dashboard"
//       >
//         {collapsed ? (
//           <CustomImage
//             width={50}
//             height={50}
//             src={"/logo-square-1.png"}
//             alt="Logo"
//             className="mx-auto"
//           />
//         ) : (
//           <CustomImage
//             width={200}
//             height={80}
//             src={"/logo-1.png"}
//             alt="Logo"
//             className="mx-auto"
//           />
//         )}
//       </Link>
//       {/* Menu */}
//       <div
//         style={{
//           padding: "12px 0",
//           height: "calc(100vh - 80px)",
//           overflowY: "auto",
//           background: "#ffffff",
//         }}
//       >
//         {collapsed ? (
//           <></>
//         ) : (
//           <div className="px-4 py-2">
//             <Input
//               placeholder="Search ..."
//               prefix={<SearchOutlined />}
//               suffix={
//                 search ? (
//                   <CloseCircleOutlined
//                     onClick={handleClear}
//                     style={{ cursor: "pointer", color: "#bfbfbf" }}
//                   />
//                 ) : null
//               }
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//               }}
//             />
//           </div>
//         )}
//         <Menu
//           mode="inline"
//           defaultOpenKeys={[pathname.split("/")[1]]}
//           selectedKeys={[pathname]}
//           style={{ borderRight: 0, background: "transparent" }}
//           openKeys={stateOpenKeys}
//           onOpenChange={onOpenChange}
//           items={filteredMenuItems as MenuProps["items"]}
//           theme="light"
//           className="custom-sidebar-menu"
//         />
//       </div>
//     </Sider>
//   );
// }
