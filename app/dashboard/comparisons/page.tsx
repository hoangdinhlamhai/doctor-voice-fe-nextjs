"use client";

import { useState } from "react";

// Mock data - sẽ fetch từ /mea/comparison
const mockComparisons = [
    {
        id: "comp-001",
        sessionId: "sess-001",
        patientName: "Nguyễn Văn B",
        createdAt: "2026-01-29T09:45:00",
        overallScore: 94,
        details: {
            soapMatch: 92,
            icdMatch: 100,
            diagnosisMatch: 90,
        },
        aiResults: {
            diagnosis: "Nhiễm trùng đường hô hấp trên cấp tính (Common cold)",
            icdCodes: ["J06.9", "R51", "R50.9"],
        },
        doctorResults: {
            diagnosis: "Nhiễm trùng đường hô hấp trên",
            icdCodes: ["J06.9", "R51"],
        },
    },
    {
        id: "comp-002",
        sessionId: "sess-003",
        patientName: "Lê Văn D",
        createdAt: "2026-01-29T11:30:00",
        overallScore: 89,
        details: {
            soapMatch: 88,
            icdMatch: 100,
            diagnosisMatch: 85,
        },
        aiResults: {
            diagnosis: "Viêm dạ dày cấp, có thể kèm trào ngược dạ dày thực quản",
            icdCodes: ["K29.7", "K21.0"],
        },
        doctorResults: {
            diagnosis: "Viêm dạ dày cấp",
            icdCodes: ["K29.7"],
        },
    },
    {
        id: "comp-003",
        sessionId: "sess-004",
        patientName: "Phạm Thị E",
        createdAt: "2026-01-29T14:50:00",
        overallScore: 96,
        details: {
            soapMatch: 95,
            icdMatch: 100,
            diagnosisMatch: 94,
        },
        aiResults: {
            diagnosis: "Hạ huyết áp tư thế, chóng mặt lành tính",
            icdCodes: ["I95.1", "R42"],
        },
        doctorResults: {
            diagnosis: "Hạ huyết áp tư thế",
            icdCodes: ["I95.1", "R42"],
        },
    },
];

type Comparison = (typeof mockComparisons)[0];

export default function ComparisonsPage() {
    const [selectedComparison, setSelectedComparison] = useState<Comparison | null>(null);

    // Calculate average score
    const averageScore = Math.round(
        mockComparisons.reduce((sum, c) => sum + c.overallScore, 0) / mockComparisons.length
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">So sánh AI vs Bác sĩ</h1>
                <p className="text-muted">Đánh giá độ chính xác của AI so với chẩn đoán thực tế</p>
            </div>

            {/* Stats Overview */}
            <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-card rounded-2xl border border-card-border p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-emerald-500">{averageScore}%</span>
                    </div>
                    <p className="text-sm text-muted">Độ chính xác trung bình</p>
                </div>
                <div className="bg-card rounded-2xl border border-card-border p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{mockComparisons.length}</span>
                    </div>
                    <p className="text-sm text-muted">Tổng số so sánh</p>
                </div>
                <div className="bg-card rounded-2xl border border-card-border p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-secondary">
                            {mockComparisons.filter((c) => c.overallScore >= 90).length}
                        </span>
                    </div>
                    <p className="text-sm text-muted">Đạt ≥90%</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Comparisons List */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-foreground">Lịch sử so sánh</h2>
                    {mockComparisons.map((comparison) => (
                        <div
                            key={comparison.id}
                            onClick={() => setSelectedComparison(comparison)}
                            className={`bg-card rounded-2xl border p-4 transition-all cursor-pointer ${selectedComparison?.id === comparison.id
                                    ? "border-primary shadow-lg shadow-primary/10"
                                    : "border-card-border hover:border-primary/30"
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h3 className="font-semibold text-foreground">{comparison.patientName}</h3>
                                    <p className="text-xs text-muted">
                                        {new Date(comparison.createdAt).toLocaleString("vi-VN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            day: "2-digit",
                                            month: "2-digit",
                                        })}
                                    </p>
                                </div>
                                <div className={`text-2xl font-bold ${getScoreColor(comparison.overallScore)}`}>
                                    {comparison.overallScore}%
                                </div>
                            </div>

                            {/* Score Breakdown */}
                            <div className="grid grid-cols-3 gap-2">
                                <ScoreMini label="SOAP" score={comparison.details.soapMatch} />
                                <ScoreMini label="ICD-10" score={comparison.details.icdMatch} />
                                <ScoreMini label="Chẩn đoán" score={comparison.details.diagnosisMatch} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comparison Detail */}
                <div className="bg-card rounded-2xl border border-card-border p-6 h-fit sticky top-24">
                    {selectedComparison ? (
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-foreground">
                                        {selectedComparison.patientName}
                                    </h2>
                                    <p className="text-sm text-muted">
                                        {new Date(selectedComparison.createdAt).toLocaleString("vi-VN")}
                                    </p>
                                </div>
                                <div
                                    className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${selectedComparison.overallScore >= 90
                                            ? "bg-emerald-500/10 text-emerald-500"
                                            : selectedComparison.overallScore >= 80
                                                ? "bg-amber-500/10 text-amber-500"
                                                : "bg-red-500/10 text-red-500"
                                        }`}
                                >
                                    {selectedComparison.overallScore}%
                                </div>
                            </div>

                            {/* Score Bars */}
                            <div className="space-y-3">
                                <ScoreBar label="SOAP Notes" score={selectedComparison.details.soapMatch} />
                                <ScoreBar label="Mã ICD-10" score={selectedComparison.details.icdMatch} />
                                <ScoreBar label="Chẩn đoán" score={selectedComparison.details.diagnosisMatch} />
                            </div>

                            {/* Side by Side Comparison */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                                    <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        AI
                                    </h4>
                                    <p className="text-xs text-foreground mb-2">
                                        {selectedComparison.aiResults.diagnosis}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {selectedComparison.aiResults.icdCodes.map((code) => (
                                            <span
                                                key={code}
                                                className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-mono rounded"
                                            >
                                                {code}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                                    <h4 className="text-sm font-semibold text-secondary mb-2 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Bác sĩ
                                    </h4>
                                    <p className="text-xs text-foreground mb-2">
                                        {selectedComparison.doctorResults.diagnosis}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {selectedComparison.doctorResults.icdCodes.map((code) => (
                                            <span
                                                key={code}
                                                className="px-2 py-0.5 bg-secondary/10 text-secondary text-xs font-mono rounded"
                                            >
                                                {code}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Feedback */}
                            <div className="p-4 rounded-xl bg-background border border-card-border">
                                <h4 className="text-sm font-semibold text-foreground mb-2">Ghi chú</h4>
                                <textarea
                                    placeholder="Thêm ghi chú về kết quả so sánh..."
                                    className="w-full bg-transparent border-none outline-none text-sm text-muted resize-none"
                                    rows={2}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg
                                className="w-16 h-16 mx-auto text-card-border mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                            <p className="text-muted">Chọn một kết quả để xem chi tiết</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ScoreMini({ label, score }: { label: string; score: number }) {
    return (
        <div className="text-center p-2 rounded-lg bg-background">
            <p className={`text-sm font-semibold ${getScoreColor(score)}`}>{score}%</p>
            <p className="text-xs text-muted">{label}</p>
        </div>
    );
}

function ScoreBar({ label, score }: { label: string; score: number }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted">{label}</span>
                <span className={`text-sm font-semibold ${getScoreColor(score)}`}>{score}%</span>
            </div>
            <div className="h-2 bg-card-border rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${score >= 90 ? "bg-emerald-500" : score >= 80 ? "bg-amber-500" : "bg-red-500"
                        }`}
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    );
}

function getScoreColor(score: number): string {
    if (score >= 90) return "text-emerald-500";
    if (score >= 80) return "text-amber-500";
    return "text-red-500";
}
