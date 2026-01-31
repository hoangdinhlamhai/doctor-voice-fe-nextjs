"use client";

import { useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="lg:ml-64">
                <DashboardHeader
                    onMenuClick={() => setIsSidebarOpen(true)}
                    title="Dashboard"
                />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
