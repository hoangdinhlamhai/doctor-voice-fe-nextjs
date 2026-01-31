"use client";

import { useState } from "react";

// Mock data - sẽ fetch từ /mea/dashboard/bookings
const mockBookings = [
    {
        id: "book-001",
        patientName: "Nguyễn Văn B",
        patientPhone: "0901234567",
        service: "Khám tổng quát",
        date: "2026-01-29",
        time: "09:30",
        status: "completed",
        hasSession: true,
    },
    {
        id: "book-002",
        patientName: "Trần Thị C",
        patientPhone: "0912345678",
        service: "Khám nội khoa",
        date: "2026-01-29",
        time: "10:15",
        status: "in_progress",
        hasSession: true,
    },
    {
        id: "book-003",
        patientName: "Lê Văn D",
        patientPhone: "0923456789",
        service: "Khám tiêu hóa",
        date: "2026-01-29",
        time: "11:00",
        status: "completed",
        hasSession: true,
    },
    {
        id: "book-004",
        patientName: "Phạm Thị E",
        patientPhone: "0934567890",
        service: "Tái khám",
        date: "2026-01-29",
        time: "14:30",
        status: "completed",
        hasSession: true,
    },
    {
        id: "book-005",
        patientName: "Hoàng Văn F",
        patientPhone: "0945678901",
        service: "Khám tổng quát",
        date: "2026-01-29",
        time: "15:00",
        status: "pending",
        hasSession: false,
    },
    {
        id: "book-006",
        patientName: "Đặng Thị G",
        patientPhone: "0956789012",
        service: "Tái khám",
        date: "2026-01-29",
        time: "15:30",
        status: "pending",
        hasSession: false,
    },
    {
        id: "book-007",
        patientName: "Vũ Văn H",
        patientPhone: "0967890123",
        service: "Khám tổng quát",
        date: "2026-01-29",
        time: "16:00",
        status: "pending",
        hasSession: false,
    },
    {
        id: "book-008",
        patientName: "Bùi Thị I",
        patientPhone: "0978901234",
        service: "Khám tim mạch",
        date: "2026-01-30",
        time: "08:00",
        status: "confirmed",
        hasSession: false,
    },
    {
        id: "book-009",
        patientName: "Đỗ Văn K",
        patientPhone: "0989012345",
        service: "Khám tổng quát",
        date: "2026-01-30",
        time: "09:00",
        status: "confirmed",
        hasSession: false,
    },
];

export default function BookingsPage() {
    const [filterDate, setFilterDate] = useState("2026-01-29");
    const [filterStatus, setFilterStatus] = useState("all");

    const filteredBookings = mockBookings.filter((b) => {
        const dateMatch = b.date === filterDate;
        const statusMatch = filterStatus === "all" || b.status === filterStatus;
        return dateMatch && statusMatch;
    });

    const todayStats = {
        total: mockBookings.filter((b) => b.date === "2026-01-29").length,
        completed: mockBookings.filter((b) => b.date === "2026-01-29" && b.status === "completed").length,
        pending: mockBookings.filter((b) => b.date === "2026-01-29" && b.status === "pending").length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Lịch hẹn</h1>
                    <p className="text-muted">Quản lý lịch hẹn khám bệnh</p>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="px-4 py-2 rounded-xl bg-card border border-card-border text-foreground cursor-pointer"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-card rounded-2xl border border-card-border p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{todayStats.total}</p>
                        <p className="text-sm text-muted">Tổng lịch hẹn</p>
                    </div>
                </div>
                <div className="bg-card rounded-2xl border border-card-border p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{todayStats.completed}</p>
                        <p className="text-sm text-muted">Đã hoàn thành</p>
                    </div>
                </div>
                <div className="bg-card rounded-2xl border border-card-border p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{todayStats.pending}</p>
                        <p className="text-sm text-muted">Chờ khám</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {[
                    { value: "all", label: "Tất cả" },
                    { value: "pending", label: "Chờ khám" },
                    { value: "in_progress", label: "Đang khám" },
                    { value: "completed", label: "Hoàn thành" },
                    { value: "confirmed", label: "Đã xác nhận" },
                ].map((filter) => (
                    <button
                        key={filter.value}
                        onClick={() => setFilterStatus(filter.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${filterStatus === filter.value
                            ? "bg-primary text-white"
                            : "bg-card border border-card-border text-muted hover:text-foreground"
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Bookings Table */}
            <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-background">
                                <th className="text-left py-4 px-6 text-sm font-medium text-muted">Thời gian</th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-muted">Bệnh nhân</th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-muted">Dịch vụ</th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-muted">Trạng thái</th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-muted">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-muted">
                                        Không có lịch hẹn nào
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr
                                        key={booking.id}
                                        className="border-t border-card-border hover:bg-background/50 transition-colors"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                                                    {booking.time}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="font-medium text-foreground">{booking.patientName}</p>
                                            <p className="text-xs text-muted">{booking.patientPhone}</p>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-muted">{booking.service}</td>
                                        <td className="py-4 px-6">
                                            <StatusBadge status={booking.status} />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                {booking.hasSession ? (
                                                    <a
                                                        href={`/dashboard/sessions?bookingId=${booking.id}`}
                                                        className="px-3 py-1.5 bg-secondary/10 text-secondary text-sm font-medium rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer"
                                                    >
                                                        Xem hồ sơ
                                                    </a>
                                                ) : (
                                                    <a
                                                        href={`/dashboard/recording?bookingId=${booking.id}`}
                                                        className="px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all cursor-pointer"
                                                    >
                                                        Bắt đầu khám
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const statusConfig: Record<string, { label: string; className: string }> = {
        completed: { label: "Hoàn thành", className: "bg-emerald-500/10 text-emerald-500" },
        in_progress: { label: "Đang khám", className: "bg-amber-500/10 text-amber-500" },
        pending: { label: "Chờ khám", className: "bg-blue-500/10 text-blue-500" },
        confirmed: { label: "Đã xác nhận", className: "bg-purple-500/10 text-purple-500" },
        cancelled: { label: "Đã hủy", className: "bg-red-500/10 text-red-500" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${config.className}`}>
            {config.label}
        </span>
    );
}
