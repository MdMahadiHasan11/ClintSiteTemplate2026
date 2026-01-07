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
      <Content />
    </Layout>
  );
}
