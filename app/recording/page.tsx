"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import ThemeToggle from "../components/ThemeToggle";

type RecordingState = "idle" | "recording" | "processing" | "completed";

interface TranscriptSegment {
    speaker: string;
    text: string;
    timestamp: string;
}

interface AnalysisResult {
    soap: {
        subjective: string;
        objective: string;
        assessment: string;
        plan: string;
    };
    icdCodes: Array<{ code: string; description: string; confidence: number }>;
}

// Mock transcript data
const mockTranscript: TranscriptSegment[] = [
    { speaker: "Bác sĩ", text: "Chào anh, hôm nay anh có triệu chứng gì?", timestamp: "00:00" },
    { speaker: "Bệnh nhân", text: "Dạ chào bác sĩ, em bị đau đầu và sốt nhẹ được 2 ngày rồi ạ.", timestamp: "00:05" },
    { speaker: "Bác sĩ", text: "Anh sốt bao nhiêu độ? Có đo nhiệt độ không?", timestamp: "00:12" },
    { speaker: "Bệnh nhân", text: "Dạ khoảng 37.8 độ ạ, đau đầu vùng trán.", timestamp: "00:18" },
    { speaker: "Bác sĩ", text: "Có kèm theo triệu chứng nào khác không? Ho, sổ mũi?", timestamp: "00:25" },
    { speaker: "Bệnh nhân", text: "Dạ có sổ mũi nhẹ và hơi mệt mỏi ạ.", timestamp: "00:32" },
];

const mockAnalysis: AnalysisResult = {
    soap: {
        subjective: "Bệnh nhân nam, than phiền đau đầu vùng trán và sốt nhẹ 2 ngày. Kèm sổ mũi và mệt mỏi.",
        objective: "Nhiệt độ 37.8°C. Bệnh nhân tỉnh táo, tiếp xúc tốt.",
        assessment: "Nhiễm trùng đường hô hấp trên cấp tính (Common cold). Chẩn đoán phân biệt: Cúm mùa.",
        plan: "1. Nghỉ ngơi, uống nhiều nước\n2. Paracetamol 500mg x 3 lần/ngày khi sốt > 38°C\n3. Tái khám nếu sốt cao > 39°C hoặc triệu chứng nặng hơn sau 3 ngày",
    },
    icdCodes: [
        { code: "J06.9", description: "Nhiễm trùng đường hô hấp trên cấp, không đặc hiệu", confidence: 0.95 },
        { code: "R51", description: "Đau đầu", confidence: 0.88 },
        { code: "R50.9", description: "Sốt, không đặc hiệu", confidence: 0.82 },
    ],
};

function RecordingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const patientInfo = {
        name: searchParams.get("name"),
        age: searchParams.get("age"),
        gender: searchParams.get("gender"),
        history: searchParams.get("history"),
        complaint: searchParams.get("complaint"),
    };

    const [recordingState, setRecordingState] = useState<RecordingState>("idle");
    const [recordingTime, setRecordingTime] = useState(0);
    const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

    // Confirmation states
    const [confirmedSections, setConfirmedSections] = useState({
        soap: false,
        icd: false,
    });

    // Modal State
    const [isIcdModalOpen, setIsIcdModalOpen] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const startRecording = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
                setRecordingState("recording");
                setRecordingTime(0);
                setTranscript([]);
                setAnalysis(null);
                setConfirmedSections({ soap: false, icd: false });
                setIsIcdModalOpen(false);



                timerRef.current = setInterval(() => {
                    setRecordingTime((prev) => prev + 1);
                }, 1000);

                // Simulate transcript appearing
                let index = 0;
                const transcriptInterval = setInterval(() => {
                    if (index < mockTranscript.length) {
                        const nextSegment = mockTranscript[index];
                        if (nextSegment) {
                            setTranscript((prev) => [...prev, nextSegment]);
                        }
                        index++;
                    } else {
                        clearInterval(transcriptInterval);
                    }
                }, 3000);
            }).catch((err) => {
                alert("Vui lòng cấp quyền truy cập microphone để sử dụng tính năng này.");
                console.error("Error accessing microphone:", err);
            });
        } else {
            alert("Trình duyệt của bạn không hỗ trợ ghi âm.");
        }
    };

    const stopRecording = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setRecordingState("processing");

        // Simulate AI processing
        setTimeout(() => {
            setTranscript(mockTranscript);
            setAnalysis(mockAnalysis);
            setRecordingState("completed");
        }, 2000);
    };

    const resetRecording = () => {
        setRecordingState("idle");
        setRecordingTime(0);
        setTranscript([]);
        setAnalysis(null);
        setConfirmedSections({ soap: false, icd: false });
    };

    const saveAndFinish = () => {
        if (!confirmedSections.soap || !confirmedSections.icd) {
            if (!confirm("Bạn chưa xác nhận tất cả các mục. Bạn có chắc chắn muốn lưu không?")) return;
        }
        router.push("/dashboard/sessions");
    };

    const toggleConfirm = (section: 'soap' | 'icd') => {
        setConfirmedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-card-border">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2 group text-muted hover:text-foreground transition-colors">
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Quay lại Dashboard</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </div>
                        <span className="font-bold text-lg hidden sm:inline-block gradient-text">Doctor Voice Recording</span>
                    </div>
                    <div>
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 mt-16 pb-24">
                <div className="space-y-8">
                    {/* Header & Patient Info */}
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold">Phiên khám: {patientInfo.name || "Bệnh nhân mới"}</h1>
                                <p className="text-muted">Ghi âm cuộc hội thoại và AI sẽ tự động tạo hồ sơ</p>
                            </div>
                        </div>

                        {/* Patient Info Card */}
                        {patientInfo.name && (
                            <div className="bg-card rounded-2xl border border-card-border p-4 sm:p-6 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                                    <div>
                                        <p className="text-sm text-muted mb-1">Bệnh nhân</p>
                                        <p className="font-semibold text-foreground flex items-center gap-2">
                                            {patientInfo.name}
                                            <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-card-border/50 text-muted-foreground">
                                                {patientInfo.age} tuổi • {patientInfo.gender === "male" ? "Nam" : patientInfo.gender === "female" ? "Nữ" : "Khác"}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-sm text-muted mb-1">Lý do khám</p>
                                        <p className="text-foreground">{patientInfo.complaint}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted mb-1">Tiền sử</p>
                                        <p className="text-foreground truncate" title={patientInfo.history || "Không có"}>
                                            {patientInfo.history || "Không có"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Recording & Transcript Area (Top Section) */}
                    <div className="grid lg:grid-cols-2 gap-6 h-[500px]">
                        {/* Left: Controls */}
                        <div className="flex flex-col gap-6 h-full">
                            <div className="bg-card rounded-2xl border border-card-border p-8 flex flex-col items-center justify-center flex-shrink-0 shadow-sm flex-1">
                                <div className="mb-8 flex justify-center">
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${recordingState === "idle" ? "bg-card-border text-muted" :
                                        recordingState === "recording" ? "bg-red-500/10 text-red-500 animate-pulse" :
                                            recordingState === "processing" ? "bg-blue-500/10 text-blue-500" : "bg-emerald-500/10 text-emerald-500"
                                        }`}>
                                        {recordingState === "idle" ? "Sẵn sàng ghi âm" :
                                            recordingState === "recording" ? "Đang ghi âm..." :
                                                recordingState === "processing" ? "AI Đang xử lý..." : "Đã hoàn tất"}
                                    </span>
                                </div>

                                <div className="relative inline-flex items-center justify-center mb-8 group">
                                    {recordingState === "recording" && (
                                        <>
                                            <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping duration-1000" />
                                            <div className="absolute inset-0 rounded-full bg-red-500/10 animate-pulse duration-2000" />
                                        </>
                                    )}

                                    <button
                                        onClick={recordingState === "idle" ? startRecording : stopRecording}
                                        disabled={recordingState === "processing"}
                                        className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 cursor-pointer z-10 ${recordingState === "idle"
                                            ? "bg-gradient-to-br from-primary to-secondary shadow-xl shadow-primary/20 hover:shadow-primary/40 text-white"
                                            : recordingState === "recording"
                                                ? "bg-gradient-to-br from-red-500 to-red-600 shadow-xl shadow-red-500/30 text-white"
                                                : "bg-card-border text-muted-light cursor-not-allowed"
                                            }`}
                                    >
                                        {recordingState === "idle" && (
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                            </svg>
                                        )}
                                        {recordingState === "recording" && (
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="w-10 h-10 bg-white rounded-xl mb-1" />
                                                <span className="text-xs font-semibold uppercase tracking-wider">Dừng</span>
                                            </div>
                                        )}
                                        {recordingState === "processing" && (
                                            <svg className="w-12 h-12 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                        )}
                                        {recordingState === "completed" && (
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                <div className="text-5xl font-mono font-bold tracking-tight text-foreground tabular-nums">
                                    {formatTime(recordingTime)}
                                </div>

                                {recordingState === "completed" && (
                                    <button
                                        onClick={resetRecording}
                                        className="mt-6 text-sm text-primary hover:text-primary-dark font-medium hover:underline cursor-pointer"
                                    >
                                        Bắt đầu phiên mới
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Right: Transcript */}
                        <div className="bg-card rounded-2xl border border-card-border flex flex-col min-h-0 overflow-hidden shadow-sm h-full">
                            <div className="p-4 border-b border-card-border bg-card-border/10 flex items-center justify-between">
                                <h3 className="font-semibold text-foreground flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    Hội thoại trực tiếp
                                </h3>
                                {recordingState === "recording" && (
                                    <div className="flex items-center gap-1 h-4">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-1 bg-primary rounded-full animate-wave" style={{
                                                height: `${Math.random() * 100}%`,
                                                animationDelay: `${i * 0.1}s`
                                            }} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                                {transcript.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-muted">
                                        <svg className="w-16 h-16 mb-4 text-card-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        </svg>
                                        <p>Chưa có dữ liệu hội thoại</p>
                                    </div>
                                ) : (
                                    transcript.map((segment, index) => {
                                        if (!segment) return null;
                                        return (
                                            <div
                                                key={index}
                                                className={`flex gap-3 ${segment.speaker === "Bác sĩ" ? "flex-row-reverse" : "flex-row"}`}
                                            >
                                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${segment.speaker === "Bác sĩ" ? "bg-primary text-white" : "bg-card-border text-foreground"
                                                    }`}>
                                                    {segment.speaker === "Bác sĩ" ? "Dr" : "Bn"}
                                                </div>
                                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${segment.speaker === "Bác sĩ"
                                                    ? "bg-primary/10 text-foreground rounded-tr-none"
                                                    : "bg-card border border-card-border text-foreground rounded-tl-none"
                                                    }`}>
                                                    {segment.text}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>

                    {/* AI Analysis Result Section (Bottom - Full Width) */}
                    {analysis && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-card-border"></div>
                                <h2 className="text-xl font-bold bg-background px-4 text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                    Kết quả phân tích
                                </h2>
                                <div className="h-px flex-1 bg-card-border"></div>
                            </div>

                            <div className="space-y-8">
                                {/* SOAP Notes Section */}
                                <div className={`bg-card rounded-2xl border transition-all duration-300 ${confirmedSections.soap
                                    ? "border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                    : "border-card-border shadow-sm hover:shadow-md"
                                    }`}>
                                    <div className="p-6 border-b border-card-border flex items-center justify-between bg-card/50">
                                        <h3 className="text-lg font-bold text-foreground">SOAP Notes</h3>
                                        <button
                                            onClick={() => toggleConfirm('soap')}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${confirmedSections.soap
                                                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                                                : "bg-card-border hover:bg-card-border/80 text-foreground"
                                                }`}
                                        >
                                            {confirmedSections.soap ? (
                                                <>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Đã xác nhận
                                                </>
                                            ) : "Xác nhận kết quả"}
                                        </button>
                                    </div>

                                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { key: "subjective", label: "Subjective (Bệnh sử)", color: "blue", icon: "S", full: true },
                                            { key: "objective", label: "Objective (Khám lâm sàng)", color: "green", icon: "O", full: true },
                                            { key: "assessment", label: "Assessment (Chẩn đoán)", color: "amber", icon: "A", full: true },
                                            { key: "plan", label: "Plan (Điều trị)", color: "purple", icon: "P", full: true },
                                        ].map((item) => (
                                            <div key={item.key} className={`relative group ${item.full ? "md:col-span-2" : ""}`}>
                                                <div className={`absolute -left-3 -top-3 w-8 h-8 rounded-lg bg-${item.color}-500/10 text-${item.color}-600 dark:text-${item.color}-400 flex items-center justify-center font-bold text-sm border border-${item.color}-500/20 shadow-sm z-10`}>
                                                    {item.icon}
                                                </div>
                                                <div className={`pl-4 pt-4 h-full`}>
                                                    <div className={`h-full p-4 pt-6 rounded-2xl bg-background border border-card-border group-hover:border-${item.color}-500/30 transition-all shadow-sm`}>
                                                        <label className={`block text-xs font-bold text-${item.color}-600 dark:text-${item.color}-400 uppercase tracking-wider mb-2`}>
                                                            {item.label}
                                                        </label>
                                                        <textarea
                                                            className={`w-full bg-transparent border-none focus:ring-0 p-0 outline-none resize-none text-sm leading-relaxed text-foreground ${item.full ? "min-h-[120px]" : "min-h-[80px]"}`}
                                                            defaultValue={analysis.soap[item.key as keyof typeof analysis.soap]}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ICD-10 & Summary Section */}
                                <div className="space-y-6">
                                    {/* ICD-10 Section */}
                                    <div className={`bg-card rounded-2xl border transition-all duration-300 ${confirmedSections.icd
                                        ? "border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                        : "border-card-border shadow-sm hover:shadow-md"
                                        }`}>
                                        <div className="p-6 border-b border-card-border flex items-center justify-between bg-card/50">
                                            <h3 className="text-lg font-bold text-foreground">Mã ICD-10 Đề xuất</h3>
                                            <button
                                                onClick={() => toggleConfirm('icd')}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${confirmedSections.icd
                                                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                                                    : "bg-card-border hover:bg-card-border/80 text-foreground"
                                                    }`}
                                            >
                                                {confirmedSections.icd ? (
                                                    <>
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Đã xác nhận
                                                    </>
                                                ) : "Xác nhận mã"}
                                            </button>
                                        </div>

                                        <div className="p-6">
                                            <div className="space-y-3">
                                                {analysis.icdCodes.map((icd, idx) => (
                                                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-background border border-card-border hover:border-accent/40 transition-colors group cursor-pointer">
                                                        <div className="flex items-start gap-4">
                                                            <div className="px-3 py-1.5 bg-accent/10 text-accent font-mono font-bold text-lg rounded-lg border border-accent/20">
                                                                {icd.code}
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-foreground">{icd.description}</p>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <div className="h-1.5 w-16 bg-card-border rounded-full overflow-hidden">
                                                                        <div className="h-full bg-accent" style={{ width: `${icd.confidence * 100}%` }}></div>
                                                                    </div>
                                                                    <span className="text-xs text-muted">Độ tin cậy {(icd.confidence * 100).toFixed(0)}%</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-card-border text-accent focus:ring-accent cursor-pointer" />
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={() => setIsIcdModalOpen(true)}
                                                    className="w-full py-3 border border-dashed border-card-border rounded-xl text-muted hover:text-foreground hover:border-foreground/30 transition-all text-sm font-medium cursor-pointer flex items-center justify-center gap-2"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    Thêm mã ICD thủ công
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Final Action */}
                                    <div className="flex flex-col gap-3 sticky bottom-6 z-10">
                                        <button
                                            onClick={saveAndFinish}
                                            className={`w-full py-4 text-white font-bold text-lg rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer ${confirmedSections.soap && confirmedSections.icd
                                                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-emerald-500/30 hover:scale-[1.02]"
                                                : "bg-gradient-to-r from-primary to-primary-light hover:shadow-primary/30"
                                                }`}
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                            </svg>
                                            Lưu hồ sơ bệnh án
                                        </button>
                                        <p className="text-center text-xs text-muted">
                                            * Vui lòng kiểm tra kỹ thông tin trước khi lưu. Hành động này sẽ cập nhật vào HIS.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* ICD Search Modal */}
            {isIcdModalOpen && (
                <IcdSearchModal
                    onClose={() => setIsIcdModalOpen(false)}
                    onAdd={(code) => {
                        if (analysis) {
                            setAnalysis({
                                ...analysis,
                                icdCodes: [...analysis.icdCodes, { ...code, confidence: 1.0 }]
                            });
                        }
                        setIsIcdModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

// Mock ICD List for search
const mockIcdDatabase = [
    { code: "J00", description: "Viêm mũi họng cấp tính (Cảm lạnh thông thường)" },
    { code: "J01", description: "Viêm xoang cấp tính" },
    { code: "J02", description: "Viêm họng cấp tính" },
    { code: "J03", description: "Viêm amidan cấp tính" },
    { code: "J04", description: "Viêm thanh quản và khí quản cấp tính" },
    { code: "J06.9", description: "Nhiễm trùng đường hô hấp trên cấp, không đặc hiệu" },
    { code: "J15", description: "Viêm phổi do vi khuẩn, không phân loại ở nơi khác" },
    { code: "J20", description: "Viêm phế quản cấp tính" },
    { code: "R50.9", description: "Sốt, không đặc hiệu" },
    { code: "R51", description: "Đau đầu" },
    { code: "R05", description: "Ho" },
    { code: "E10", description: "Bệnh đái tháo đường phụ thuộc insulin" },
    { code: "E11", description: "Bệnh đái tháo đường không phụ thuộc insulin" },
    { code: "I10", description: "Tăng huyết áp vô căn (nguyên phát)" },
];

function IcdSearchModal({ onClose, onAdd }: { onClose: () => void, onAdd: (code: { code: string, description: string }) => void }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredIcd = mockIcdDatabase.filter(item =>
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-card w-full max-w-lg rounded-2xl border border-card-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-card-border flex items-center justify-between bg-muted/30">
                    <h3 className="font-bold text-lg text-foreground">Thêm mã ICD-10</h3>
                    <button onClick={onClose} className="text-muted hover:text-foreground transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Tìm kiếm mã hoặc tên bệnh..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-card-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all text-foreground"
                            autoFocus
                        />
                    </div>

                    <div className="max-h-[300px] overflow-y-auto space-y-2 border-t border-card-border pt-2">
                        {filteredIcd.length === 0 ? (
                            <div className="text-center py-8 text-muted">
                                Không tìm thấy mã phù hợp
                            </div>
                        ) : (
                            filteredIcd.map((item) => (
                                <button
                                    key={item.code}
                                    onClick={() => onAdd(item)}
                                    className="w-full text-left p-3 rounded-xl hover:bg-muted/50 transition-colors flex items-start gap-3 group border border-transparent hover:border-card-border cursor-pointer"
                                >
                                    <span className="px-2 py-1 bg-primary/10 text-primary font-mono font-bold text-sm rounded flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">{item.code}</span>
                                    <span className="text-sm text-foreground">{item.description}</span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RecordingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-muted font-medium">Đang tải dữ liệu phiên khám...</p>
                </div>
            </div>
        }>
            <RecordingContent />
        </Suspense>
    );
}