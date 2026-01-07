"use client";

import type React from "react";

interface ContentProps {
  children?: React.ReactNode;
}

/**
 * Content wrapper component for dashboard pages
 * Provides consistent spacing and styling for page content
 */
export default function Content({ children }: ContentProps) {
  return <div className="space-y-4">{children}</div>;
}
