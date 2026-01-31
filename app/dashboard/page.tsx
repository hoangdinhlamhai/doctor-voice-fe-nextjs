import Link from "next/link";

// Mock data - trong thực tế sẽ fetch từ API /mea/dashboard
const mockStats = {
    totalSessions: 156,
    todaySessions: 8,
    averageScore: 92.5,
    pendingBookings: 12,
};

const mockRecentSessions = [
    {
        id: "1",
        patientName: "Nguyễn Văn B",
        chiefComplaint: "Đau đầu, sốt nhẹ",
        status: "completed",
        createdAt: "2026-01-29T09:30:00",
        matchScore: 94,
    },
    {
        id: "2",
        patientName: "Trần Thị C",
        chiefComplaint: "Ho khan kéo dài",
        status: "in_progress",
        createdAt: "2026-01-29T10:15:00",
        matchScore: null,
    },
    {
        id: "3",
        patientName: "Lê Văn D",
        chiefComplaint: "Đau bụng vùng thượng vị",
        status: "completed",
        createdAt: "2026-01-29T11:00:00",
        matchScore: 89,
    },
    {
        id: "4",
        patientName: "Phạm Thị E",
        chiefComplaint: "Chóng mặt, buồn nôn",
        status: "completed",
        createdAt: "2026-01-29T14:30:00",
        matchScore: 96,
    },
];

const mockUpcomingBookings = [
    {
        id: "1",
        patientName: "Hoàng Văn F",
        time: "15:00",
        service: "Khám tổng quát",
    },
    {
        id: "2",
        patientName: "Đặng Thị G",
        time: "15:30",
        service: "Tái khám",
    },
    {
        id: "3",
        patientName: "Vũ Văn H",
        time: "16:00",
        service: "Khám tổng quát",
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Tổng phiên khám"
                    value={mockStats.totalSessions}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    }
                    trend="+12%"
                    trendUp
                    color="primary"
                />
                <StatsCard
                    title="Hôm nay"
                    value={mockStats.todaySessions}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    subtitle="phiên khám"
                    color="secondary"
                />
                <StatsCard
                    title="Độ chính xác AI"
                    value={`${mockStats.averageScore}%`}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                    }
                    trend="+2.5%"
                    trendUp
                    color="success"
                />
                <StatsCard
                    title="Lịch hẹn chờ"
                    value={mockStats.pendingBookings}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    }
                    subtitle="hôm nay"
                    color="accent"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Sessions */}
                <div className="lg:col-span-2 bg-card rounded-2xl border border-card-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-foreground">Phiên khám gần đây</h2>
                        <Link
                            href="/dashboard/sessions"
                            className="text-sm text-primary hover:underline cursor-pointer"
                        >
                            Xem tất cả
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-card-border">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted">Bệnh nhân</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted">Lý do khám</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted">Trạng thái</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted">AI Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockRecentSessions.map((session) => (
                                    <tr
                                        key={session.id}
                                        className="border-b border-card-border/50 hover:bg-card-border/20 transition-colors cursor-pointer"
                                    >
                                        <td className="py-4 px-4">
                                            <p className="font-medium text-foreground">{session.patientName}</p>
                                            <p className="text-xs text-muted">
                                                {new Date(session.createdAt).toLocaleTimeString("vi-VN", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-muted max-w-xs truncate">
                                            {session.chiefComplaint}
                                        </td>
                                        <td className="py-4 px-4">
                                            <StatusBadge status={session.status} />
                                        </td>
                                        <td className="py-4 px-4">
                                            {session.matchScore ? (
                                                <span className={`font-semibold ${getScoreColor(session.matchScore)}`}>
                                                    {session.matchScore}%
                                                </span>
                                            ) : (
                                                <span className="text-muted">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Upcoming Bookings */}
                <div className="bg-card rounded-2xl border border-card-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-foreground">Lịch hẹn sắp tới</h2>
                        <Link
                            href="/dashboard/bookings"
                            className="text-sm text-primary hover:underline cursor-pointer"
                        >
                            Xem tất cả
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {mockUpcomingBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="flex items-center gap-4 p-4 rounded-xl bg-background border border-card-border hover:border-primary/30 transition-colors cursor-pointer"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {booking.time}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-foreground truncate">{booking.patientName}</p>
                                    <p className="text-sm text-muted truncate">{booking.service}</p>
                                </div>
                                <button className="p-2 rounded-lg hover:bg-card-border/50 transition-colors cursor-pointer">
                                    <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Quick Action */}
                    <Link
                        href="/dashboard/new-session"
                        className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                        <span>Bắt đầu ghi âm</span>
                    </Link>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickActionCard
                    href="/dashboard/new-session"
                    icon={
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    }
                    title="Ghi âm mới"
                    description="Bắt đầu phiên khám với STT"
                    color="primary"
                />
                <QuickActionCard
                    href="/dashboard/sessions"
                    icon={
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    }
                    title="SOAP Notes"
                    description="Xem và chỉnh sửa hồ sơ"
                    color="secondary"
                />
                <QuickActionCard
                    href="/dashboard/comparisons"
                    icon={
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    }
                    title="So sánh AI"
                    description="Đánh giá độ chính xác"
                    color="accent"
                />
                <QuickActionCard
                    href="#"
                    icon={
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    }
                    title="Tra cứu y khoa"
                    description="RAG knowledge base"
                    color="success"
                />
            </div>
        </div>
    );
}

// Components
function StatsCard({
    title,
    value,
    icon,
    trend,
    trendUp,
    subtitle,
    color,
}: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: string;
    trendUp?: boolean;
    subtitle?: string;
    color: "primary" | "secondary" | "accent" | "success";
}) {
    const colorClasses = {
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary/10 text-secondary",
        accent: "bg-accent/10 text-accent",
        success: "bg-emerald-500/10 text-emerald-500",
    };

    return (
        <div className="bg-card rounded-2xl border border-card-border p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${colorClasses[color]}`}>{icon}</div>
                {trend && (
                    <span
                        className={`text-sm font-medium ${trendUp ? "text-emerald-500" : "text-red-500"
                            }`}
                    >
                        {trend}
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-sm text-muted">{subtitle || title}</p>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const statusConfig: Record<string, { label: string; className: string }> = {
        completed: {
            label: "Hoàn thành",
            className: "bg-emerald-500/10 text-emerald-500",
        },
        in_progress: {
            label: "Đang khám",
            className: "bg-amber-500/10 text-amber-500",
        },
        pending: {
            label: "Chờ khám",
            className: "bg-blue-500/10 text-blue-500",
        },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${config.className}`}>
            {config.label}
        </span>
    );
}

function getScoreColor(score: number): string {
    if (score >= 90) return "text-emerald-500";
    if (score >= 80) return "text-amber-500";
    return "text-red-500";
}

function QuickActionCard({
    href,
    icon,
    title,
    description,
    color,
}: {
    href: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    color: "primary" | "secondary" | "accent" | "success";
}) {
    const colorClasses = {
        primary: "group-hover:bg-primary/10 group-hover:text-primary",
        secondary: "group-hover:bg-secondary/10 group-hover:text-secondary",
        accent: "group-hover:bg-accent/10 group-hover:text-accent",
        success: "group-hover:bg-emerald-500/10 group-hover:text-emerald-500",
    };

    return (
        <Link
            href={href}
            className="group bg-card rounded-2xl border border-card-border p-6 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer"
        >
            <div className={`w-14 h-14 rounded-xl bg-card-border/50 text-muted flex items-center justify-center mb-4 transition-colors ${colorClasses[color]}`}>
                {icon}
            </div>
            <h3 className="font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted">{description}</p>
        </Link>
    );
}
