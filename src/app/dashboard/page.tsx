import Content from "@/components/dashboard-layout/content";
import Layout from "@/components/dashboard-layout/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function DashboardPage() {
  return (
    <Layout>
      <Content>
        {/* Dashboard content goes here */}
        <div className="text-gray-600 dark:text-gray-400">
          Welcome to your CMS Dashboard
        </div>
      </Content>
    </Layout>
  );
}
