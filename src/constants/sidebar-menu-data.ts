import type React from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Activity,
  BarChart2,
  Bell,
  Bookmark,
  Building2,
  Check,
  Clock,
  CreditCard,
  Database,
  DollarSign,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  Folder,
  Globe,
  Headphones,
  Home,
  ImageIcon,
  Lock,
  Map,
  MessageSquare,
  MessagesSquare,
  Minus,
  Monitor,
  Package,
  Play,
  Receipt,
  Search,
  Shield,
  ShoppingCart,
  Star,
  Tag,
  Timer,
  TrendingDown,
  TrendingUp,
  Truck,
  Upload,
  UserPlus,
  Users2,
  UserX,
  Wallet,
} from "lucide-react";

export type CRUDOperation = "CREATE" | "READ" | "UPDATE" | "DELETE";

export type PermissionsObject = {
  [key: string]: CRUDOperation[];
};

export interface SubMenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ComponentType<any>;
  badge?: string;
  isNew?: boolean;
  children?: SubMenuItem[];
  permissionKey?: string;
  requiredOperation?: CRUDOperation;
}

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ComponentType<any>;
  badge?: string;
  isNew?: boolean;
  children?: SubMenuItem[];
  permissionKey?: string;
  requiredOperation?: CRUDOperation;
}

export interface MenuSection {
  id: string;
  label: string;
  items: MenuItem[];
}

export const menuData: MenuSection[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard-cms",
        icon: Home,
        badge: "3",
        children: [
          {
            id: "analytics",
            label: "Analytics",
            href: "/dashboard/analytics",
            icon: BarChart2,
            permissionKey: "dashboardAnalytics",
          },
          {
            id: "reports",
            label: "Reports",
            href: "/dashboard/reports",
            icon: FileText,
            children: [
              {
                id: "sales-reports",
                label: "Sales Reports",
                href: "/dashboard-cms/reports/sales",
                icon: TrendingUp,
                permissionKey: "sales_report",
              },
              {
                id: "financial-reports",
                label: "Financial Reports",
                href: "/dashboard/reports/financial",
                icon: DollarSign,
                permissionKey: "profit_loss",
              },
            ],
          },
          {
            id: "real-time",
            label: "Real-time",
            href: "/dashboard/realtime",
            icon: Activity,
            isNew: true,
            permissionKey: "dashboardRealtime",
          },
        ],
      },
      {
        id: "analytics",
        label: "Analytics",
        href: "/analytics",
        icon: BarChart2,
        permissionKey: "analytics",
      },
      {
        id: "organization",
        label: "Organization",
        href: "/organization",
        icon: Building2,
        permissionKey: "organization",
      },
      {
        id: "projects",
        label: "Projects",
        href: "/projects",
        icon: Folder,
        badge: "12",
        permissionKey: "projects",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    items: [
      {
        id: "products",
        label: "Products",
        href: "/products",
        icon: Package,
        permissionKey: "products",
        children: [
          {
            id: "all-products",
            label: "All Products",
            href: "/products/all",
            icon: Package,
            permissionKey: "product",
          },
          {
            id: "categories",
            label: "Categories",
            href: "/products/categories",
            icon: Tag,
            permissionKey: "products",
            children: [
              {
                id: "electronics",
                label: "Electronics",
                href: "/products/categories/electronics",
                icon: Monitor,
                permissionKey: "products",
              },
              {
                id: "clothing",
                label: "Clothing",
                href: "/products/categories/clothing",
                icon: ShoppingCart,
                permissionKey: "products",
              },
              {
                id: "books",
                label: "Books",
                href: "/products/categories/books",
                icon: FileText,
                permissionKey: "products",
              },
            ],
          },
          {
            id: "inventory",
            label: "Inventory",
            href: "/products/inventory",
            icon: Database,
            permissionKey: "products",
            requiredOperation: "UPDATE",
          },
          {
            id: "reviews",
            label: "Reviews",
            href: "/products/reviews",
            icon: Star,
            permissionKey: "products",
          },
        ],
      },
      {
        id: "orders",
        label: "Orders",
        href: "/orders",
        icon: ShoppingCart,
        badge: "5",
        permissionKey: "orders",
        children: [
          {
            id: "all-orders",
            label: "All Orders",
            href: "/orders/all",
            icon: ShoppingCart,
            permissionKey: "orders",
          },
          {
            id: "pending",
            label: "Pending",
            href: "/orders/pending",
            icon: Clock,
            badge: "3",
            permissionKey: "orders",
          },
          {
            id: "processing",
            label: "Processing",
            href: "/orders/processing",
            icon: Timer,
            permissionKey: "orders",
            requiredOperation: "UPDATE",
          },
          {
            id: "shipped",
            label: "Shipped",
            href: "/orders/shipped",
            icon: Truck,
            permissionKey: "orders",
          },
          {
            id: "delivered",
            label: "Delivered",
            href: "/orders/delivered",
            icon: Check,
            permissionKey: "orders",
          },
        ],
      },
      {
        id: "customers",
        label: "Customers",
        href: "/customers",
        icon: Users2,
        permissionKey: "customers",
        children: [
          {
            id: "all-customers",
            label: "All Customers",
            href: "/customers/all",
            icon: Users2,
            permissionKey: "customers",
          },
          {
            id: "segments",
            label: "Segments",
            href: "/customers/segments",
            icon: Filter,
            permissionKey: "customers",
            children: [
              {
                id: "vip",
                label: "VIP Customers",
                href: "/customers/segments/vip",
                icon: Star,
                permissionKey: "customers",
              },
              {
                id: "new",
                label: "New Customers",
                href: "/customers/segments/new",
                icon: UserPlus,
                permissionKey: "customers",
              },
              {
                id: "inactive",
                label: "Inactive",
                href: "/customers/segments/inactive",
                icon: UserX,
                permissionKey: "customers",
              },
            ],
          },
          {
            id: "reviews",
            label: "Customer Reviews",
            href: "/customers/reviews",
            icon: MessageSquare,
            permissionKey: "customers",
          },
        ],
      },
    ],
  },
  {
    id: "invoices",
    label: "Invoices",
    items: [
      {
        id: "invoice-air-ticket",
        label: "Air Ticket Invoice",
        href: "/invoices/air-ticket",
        icon: Receipt,
        permissionKey: "invoice_air_ticket",
      },
      {
        id: "invoice-non-commission",
        label: "Non Commission Invoice",
        href: "/invoices/non-commission",
        icon: Receipt,
        permissionKey: "invoice_non_commission",
      },
      {
        id: "invoice-reissue",
        label: "Re-issue Invoice",
        href: "/invoices/reissue",
        icon: Receipt,
        permissionKey: "invoice_re_issue",
      },
      {
        id: "invoice-other",
        label: "Other Invoice",
        href: "/invoices/other",
        icon: Receipt,
        permissionKey: "invoice_other",
      },
      {
        id: "invoice-visa",
        label: "Visa Invoice",
        href: "/invoices/visa",
        icon: Receipt,
        permissionKey: "invoice_visa",
      },
      {
        id: "invoice-tour",
        label: "Tour Package Invoice",
        href: "/invoices/tour-package",
        icon: Receipt,
        permissionKey: "invoice_tour_package",
      },
      {
        id: "invoice-umrah",
        label: "Umrah Invoice",
        href: "/invoices/umrah",
        icon: Receipt,
        permissionKey: "invoice_umrah",
      },
    ],
  },
  {
    id: "refunds",
    label: "Refunds",
    items: [
      {
        id: "air-ticket-refund",
        label: "Air Ticket Refund",
        href: "/refunds/air-ticket",
        icon: TrendingDown,
        permissionKey: "air_ticket_refund",
      },
      {
        id: "other-refund",
        label: "Other Refund",
        href: "/refunds/other",
        icon: TrendingDown,
        permissionKey: "other_refund",
      },
      {
        id: "tour-package-refund",
        label: "Tour Package Refund",
        href: "/refunds/tour-package",
        icon: TrendingDown,
        permissionKey: "tour_package_refund",
      },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    items: [
      {
        id: "transactions",
        label: "Transactions",
        href: "/transactions",
        icon: Wallet,
        permissionKey: "transactions",
        children: [
          {
            id: "all-transactions",
            label: "All Transactions",
            href: "/transactions/all",
            icon: Wallet,
            permissionKey: "transactions",
          },
          {
            id: "income",
            label: "Income",
            href: "/transactions/income",
            icon: TrendingUp,
            permissionKey: "transactions",
          },
          {
            id: "expenses",
            label: "Expenses",
            href: "/transactions/expenses",
            icon: TrendingDown,
            permissionKey: "transactions",
          },
        ],
      },
      {
        id: "invoices",
        label: "Invoices",
        href: "/invoices",
        icon: Receipt,
        badge: "2",
        permissionKey: "invoices",
      },
      {
        id: "payments",
        label: "Payments",
        href: "/payments",
        icon: CreditCard,
        permissionKey: "payments",
        children: [
          {
            id: "payment-methods",
            label: "Payment Methods",
            href: "/payments/methods",
            icon: CreditCard,
            permissionKey: "payments",
          },
          {
            id: "payment-history",
            label: "Payment History",
            href: "/payments/history",
            icon: Clock,
            permissionKey: "payments",
          },
          {
            id: "refunds",
            label: "Refunds",
            href: "/payments/refunds",
            icon: Minus,
            permissionKey: "payments",
            requiredOperation: "UPDATE",
          },
        ],
      },
      {
        id: "cheque-management",
        label: "Cheque Management",
        href: "/finance/cheque",
        icon: CreditCard,
        permissionKey: "cheque_management",
      },
      {
        id: "loan-management",
        label: "Loan Management",
        icon: Wallet,
        permissionKey: "loan_management",
        children: [
          {
            id: "loan-authority",
            label: "Loan Authority",
            href: "/finance/loan/authority",
            icon: Shield,
            permissionKey: "loan_authority",
          },
          {
            id: "loan-information",
            label: "Loan Information",
            href: "/finance/loan/information",
            icon: FileText,
            permissionKey: "loan_information",
          },
          {
            id: "loan-receive",
            label: "Loan Receive",
            href: "/finance/loan/receive",
            icon: Download,
            permissionKey: "loan_receive",
          },
          {
            id: "loan-payment",
            label: "Loan Payment",
            href: "/finance/loan/payment",
            icon: Upload,
            permissionKey: "loan_payment",
          },
        ],
      },
    ],
  },
  {
    id: "client-management",
    label: "Client Management",
    items: [
      {
        id: "clients",
        label: "Clients",
        href: "/clients",
        icon: Users2,
        permissionKey: "clients",
      },
      {
        id: "money-receipt",
        label: "Money Receipt",
        href: "/clients/money-receipt",
        icon: Receipt,
        permissionKey: "money_receipt",
      },
      {
        id: "client-advance-return",
        label: "Client Advance Return",
        href: "/clients/advance-return",
        icon: TrendingDown,
        permissionKey: "client_advance_return",
      },
    ],
  },
  {
    id: "vendor-management",
    label: "Vendor Management",
    items: [
      {
        id: "vendors",
        label: "Vendors",
        href: "/vendors",
        icon: Building2,
        permissionKey: "vendors",
      },
      {
        id: "vendor-payment",
        label: "Vendor Payment",
        href: "/vendors/payment",
        icon: CreditCard,
        permissionKey: "vendor_payment",
      },
      {
        id: "vendor-advance-return",
        label: "Vendor Advance Return",
        href: "/vendors/advance-return",
        icon: TrendingDown,
        permissionKey: "vendor_advance_return",
      },
    ],
  },
  {
    id: "passport",
    label: "Passport",
    items: [
      {
        id: "passport-management",
        label: "Passport Management",
        href: "/passport",
        icon: FileText,
        permissionKey: "passport_management",
      },
    ],
  },
  {
    id: "content",
    label: "Content Management",
    items: [
      {
        id: "pages",
        label: "Pages",
        href: "/pages",
        icon: FileText,
        permissionKey: "pages",
        children: [
          {
            id: "all-pages",
            label: "All Pages",
            href: "/pages/all",
            icon: FileText,
            permissionKey: "pages",
          },
          {
            id: "blog",
            label: "Blog",
            href: "/pages/blog",
            icon: Edit,
            permissionKey: "pages",
            children: [
              {
                id: "posts",
                label: "Posts",
                href: "/pages/blog/posts",
                icon: FileText,
                permissionKey: "pages",
              },
              {
                id: "categories",
                label: "Categories",
                href: "/pages/blog/categories",
                icon: Tag,
                permissionKey: "pages",
                requiredOperation: "UPDATE",
              },
              {
                id: "tags",
                label: "Tags",
                href: "/pages/blog/tags",
                icon: Bookmark,
                permissionKey: "pages",
                requiredOperation: "UPDATE",
              },
            ],
          },
          {
            id: "landing-pages",
            label: "Landing Pages",
            href: "/pages/landing",
            icon: Globe,
            permissionKey: "pages",
          },
        ],
      },
      {
        id: "media",
        label: "Media",
        href: "/media",
        icon: ImageIcon,
        permissionKey: "media",
        children: [
          {
            id: "images",
            label: "Images",
            href: "/media/images",
            icon: ImageIcon,
            permissionKey: "media",
          },
          {
            id: "videos",
            label: "Videos",
            href: "/media/videos",
            icon: Play,
            permissionKey: "media",
          },
          {
            id: "audio",
            label: "Audio",
            href: "/media/audio",
            icon: Headphones,
            permissionKey: "media",
          },
          {
            id: "documents",
            label: "Documents",
            href: "/media/documents",
            icon: FileText,
            permissionKey: "media",
          },
        ],
      },
      {
        id: "seo",
        label: "SEO",
        href: "/seo",
        icon: Search,
        isNew: true,
        permissionKey: "seo",
        children: [
          {
            id: "keywords",
            label: "Keywords",
            href: "/seo/keywords",
            icon: Search,
            permissionKey: "seo",
          },
          {
            id: "meta-tags",
            label: "Meta Tags",
            href: "/seo/meta-tags",
            icon: Tag,
            permissionKey: "seo",
          },
          {
            id: "sitemap",
            label: "Sitemap",
            href: "/seo/sitemap",
            icon: Map,
            permissionKey: "seo",
          },
        ],
      },
    ],
  },
  {
    id: "team",
    label: "Team & Communication",
    items: [
      {
        id: "members",
        label: "Members",
        href: "/members",
        icon: Users2,
        permissionKey: "members",
        children: [
          {
            id: "all-members",
            label: "All Members",
            href: "/members/all",
            icon: Users2,
            permissionKey: "members",
          },
          {
            id: "roles",
            label: "Roles",
            href: "/members/roles",
            icon: Shield,
            permissionKey: "members",
            requiredOperation: "UPDATE",
            children: [
              {
                id: "admin",
                label: "Administrators",
                href: "/members/roles/admin",
                icon: Shield,
                permissionKey: "members",
              },
              {
                id: "editor",
                label: "Editors",
                href: "/members/roles/editor",
                icon: Edit,
                permissionKey: "members",
              },
              {
                id: "viewer",
                label: "Viewers",
                href: "/members/roles/viewer",
                icon: Eye,
                permissionKey: "members",
              },
            ],
          },
          {
            id: "permissions",
            label: "Permissions",
            href: "/members/permissions",
            icon: Lock,
            permissionKey: "members",
            requiredOperation: "UPDATE",
          },
        ],
      },
      {
        id: "chat",
        label: "Chat",
        href: "/chat",
        icon: MessagesSquare,
        badge: "12",
        permissionKey: "chat",
        children: [
          {
            id: "channels",
            label: "Channels",
            href: "/chat/channels",
            icon: MessagesSquare,
            permissionKey: "chat",
          },
          {
            id: "direct-messages",
            label: "Direct Messages",
            href: "/chat/direct",
            icon: MessageSquare,
            badge: "3",
            permissionKey: "chat",
          },
        ],
      },
      {
        id: "notifications",
        label: "Notifications",
        href: "/notifications",
        icon: Bell,
        permissionKey: "notifications",
      },
      {
        id: "announcements",
        label: "Announcements",
        href: "/announcements",
        icon: MessageSquare,
        permissionKey: "announcements",
      },
    ],
  },
];
