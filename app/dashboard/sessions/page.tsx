"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data - sẽ fetch từ /mea/sessions
const mockSessions = [
    {
        id: "sess-001",
        bookingId: "book-001",
        patientName: "Nguyễn Văn B",
        patientPhone: "0901234567",
        chiefComplaint: "Đau đầu, sốt nhẹ 2 ngày",
        status: "completed",
        createdAt: "2026-01-29T09:30:00",
        soap: {
            subjective: "Bệnh nhân than phiền đau đầu vùng trán và sốt nhẹ 2 ngày...",
            objective: "Nhiệt độ 37.8°C, huyết áp 120/80mmHg...",
            assessment: "Nhiễm trùng đường hô hấp trên cấp tính",
            plan: "Nghỉ ngơi, uống nhiều nước, Paracetamol 500mg...",
        },
        icdCodes: ["J06.9", "R51"],
        matchScore: 94,
    },
    {
        id: "sess-002",
        bookingId: "book-002",
        patientName: "Trần Thị C",
        patientPhone: "0912345678",
        chiefComplaint: "Ho khan kéo dài 1 tuần",
        status: "in_progress",
        createdAt: "2026-01-29T10:15:00",
        soap: null,
        icdCodes: [],
        matchScore: null,
    },
    {
        id: "sess-003",
        bookingId: "book-003",
        patientName: "Lê Văn D",
        patientPhone: "0923456789",
        chiefComplaint: "Đau bụng vùng thượng vị sau ăn",
        status: "completed",
        createdAt: "2026-01-29T11:00:00",
        soap: {
            subjective: "Bệnh nhân than đau bụng vùng thượng vị...",
            objective: "Bụng mềm, ấn đau thượng vị...",
            assessment: "Viêm dạ dày cấp",
            plan: "Omeprazole 20mg, PPI, chế độ ăn...",
        },
        icdCodes: ["K29.7"],
        matchScore: 89,
    },
    {
        id: "sess-004",
        bookingId: "book-004",
        patientName: "Phạm Thị E",
        patientPhone: "0934567890",
        chiefComplaint: "Chóng mặt, buồn nôn",
        status: "completed",
        createdAt: "2026-01-29T14:30:00",
        soap: {
            subjective: "Bệnh nhân than chóng mặt khi thay đổi tư thế...",
            objective: "Huyết áp tư thế: nằm 110/70, đứng 100/65...",
            assessment: "Hạ huyết áp tư thế",
            plan: "Uống đủ nước, đứng dậy từ từ...",
        },
        icdCodes: ["R42", "R11"],
        matchScore: 96,
    },
    {
        id: "sess-005",
        bookingId: "book-005",
        patientName: "Hoàng Văn F",
        patientPhone: "0945678901",
        chiefComplaint: "Đau lưng mạn tính",
        status: "pending",
        createdAt: "2026-01-29T15:00:00",
        soap: null,
        icdCodes: [],
        matchScore: null,
    },
];

type Session = (typeof mockSessions)[0];

export default function SessionsPage() {
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>("all");

    const filteredSessions = mockSessions.filter(
        (s) => filterStatus === "all" || s.status === filterStatus
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Phiên khám</h1>
                    <p className="text-muted">Quản lý và xem chi tiết các phiên khám</p>
                </div>
                <Link
                    href="/dashboard/new-session"
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Phiên khám mới
                </Link>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {[
                    { value: "all", label: "Tất cả" },
                    { value: "pending", label: "Chờ khám" },
                    { value: "in_progress", label: "Đang khám" },
                    { value: "completed", label: "Hoàn thành" },
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

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Sessions List */}
                <div className="lg:col-span-2 space-y-4">
                    {filteredSessions.map((session) => (
                        <div
                            key={session.id}
                            onClick={() => setSelectedSession(session)}
                            className={`bg-card rounded-2xl border p-4 transition-all cursor-pointer ${selectedSession?.id === session.id
                                ? "border-primary shadow-lg shadow-primary/10"
                                : "border-card-border hover:border-primary/30"
                                }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                                        {session.patientName.split(" ").pop()?.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">{session.patientName}</h3>
                                        <p className="text-xs text-muted">{session.patientPhone}</p>
                                    </div>
                                </div>
                                <StatusBadge status={session.status} />
                            </div>

                            <p className="text-sm text-muted mb-3 line-clamp-2">{session.chiefComplaint}</p>

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted">
                                    {new Date(session.createdAt).toLocaleString("vi-VN", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        day: "2-digit",
                                        month: "2-digit",
                                    })}
                                </span>
                                <div className="flex items-center gap-2">
                                    {session.icdCodes.length > 0 && (
                                        <span className="px-2 py-0.5 bg-accent/10 text-accent rounded">
                                            {session.icdCodes.length} ICD
                                        </span>
                                    )}
                                    {session.matchScore && (
                                        <span className={`font-semibold ${getScoreColor(session.matchScore)}`}>
                                            {session.matchScore}%
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Session Detail */}
                <div className="bg-card rounded-2xl border border-card-border p-6 h-fit sticky top-24">
                    {selectedSession ? (
                        <div className="space-y-6">
                            {/* Patient Info */}
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                        {selectedSession.patientName.split(" ").pop()?.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-foreground">
                                            {selectedSession.patientName}
                                        </h2>
                                        <p className="text-sm text-muted">{selectedSession.patientPhone}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-foreground bg-background p-3 rounded-xl border border-card-border">
                                    <span className="text-muted">Lý do khám:</span> {selectedSession.chiefComplaint}
                                </p>
                            </div>

                            {/* SOAP Notes */}
                            {selectedSession.soap ? (
                                <div className="space-y-3">
                                    <h3 className="font-semibold text-foreground">SOAP Notes</h3>
                                    {[
                                        { key: "subjective", label: "S", color: "primary" },
                                        { key: "objective", label: "O", color: "secondary" },
                                        { key: "assessment", label: "A", color: "accent" },
                                        { key: "plan", label: "P", color: "emerald-500" },
                                    ].map((item) => (
                                        <div key={item.key} className="p-3 rounded-xl bg-background border border-card-border">
                                            <span className={`inline-block w-6 h-6 rounded text-center text-xs font-bold leading-6 mr-2 bg-${item.color}/10 text-${item.color}`}>
                                                {item.label}
                                            </span>
                                            <span className="text-sm text-foreground">
                                                {selectedSession.soap[item.key as keyof typeof selectedSession.soap]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-muted">Chưa có SOAP Notes</p>
                                    <Link
                                        href={`/recording?sessionId=${selectedSession.id}`}
                                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-white rounded-xl text-sm cursor-pointer"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        </svg>
                                        Bắt đầu ghi âm
                                    </Link>
                                </div>
                            )}

                            {/* ICD Codes */}
                            {selectedSession.icdCodes.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-foreground mb-3">Mã ICD-10</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedSession.icdCodes.map((code) => (
                                            <span
                                                key={code}
                                                className="px-3 py-1.5 bg-accent/10 text-accent text-sm font-mono font-bold rounded-lg"
                                            >
                                                {code}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2 pt-4 border-t border-card-border">
                                <button className="flex-1 py-2.5 bg-card-border/50 text-foreground font-medium rounded-xl hover:bg-card-border transition-colors cursor-pointer">
                                    Chỉnh sửa
                                </button>
                                <button className="flex-1 py-2.5 bg-primary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all cursor-pointer">
                                    Xuất PDF
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 mx-auto text-card-border mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-muted">Chọn một phiên khám để xem chi tiết</p>
                        </div>
                    )}
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
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${config.className}`}>
            {config.label}
        </span>
    );
}

function getScoreColor(score: number): string {
    if (score >= 90) return "text-emerald-500";
    if (score >= 80) return "text-amber-500";
    return "text-red-500";
}
