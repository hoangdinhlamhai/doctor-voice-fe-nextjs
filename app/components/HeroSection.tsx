"use client";

import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

            {/* Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            <span className="text-sm font-medium text-primary">Công nghệ AI tiên tiến</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Trợ lý AI giúp bác sĩ{" "}
                            <span className="gradient-text">ghi chép tự động</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-muted max-w-xl mx-auto lg:mx-0 mb-8">
                            Doctor Voice sử dụng AI để chuyển đổi cuộc hội thoại thành SOAP notes,
                            mã ICD-10 và hồ sơ bệnh án hoàn chỉnh trong thời gian thực.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link
                                href="#demo"
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-center cursor-pointer"
                            >
                                Bắt đầu miễn phí
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="w-full sm:w-auto px-8 py-4 bg-card border border-card-border text-foreground font-semibold rounded-xl hover:border-primary/50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Xem demo
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-10 pt-8 border-t border-card-border/50">
                            <p className="text-sm text-muted-light mb-4">Được tin dùng bởi các phòng khám</p>
                            <div className="flex items-center justify-center lg:justify-start gap-8 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <span className="text-sm font-medium">Bảo mật HIPAA</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="text-sm font-medium">Xử lý real-time</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                    <span className="text-sm font-medium">Độ chính xác 95%+</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Hero Illustration */}
                    <div className="relative">
                        {/* Main Card */}
                        <div className="relative bg-card rounded-3xl shadow-2xl border border-card-border p-6 lg:p-8">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Đang ghi âm...</h3>
                                        <p className="text-sm text-muted">Phiên khám #2024-001</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className="w-1 bg-primary rounded-full animate-wave"
                                            style={{
                                                height: `${12 + Math.random() * 20}px`,
                                                animationDelay: `${i * 0.1}s`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Transcript Preview */}
                            <div className="bg-background rounded-xl p-4 mb-4">
                                <p className="text-sm text-muted mb-2">
                                    <span className="font-semibold text-primary">Bác sĩ:</span> Chào anh, hôm nay anh có triệu chứng gì?
                                </p>
                                <p className="text-sm text-muted">
                                    <span className="font-semibold text-secondary">Bệnh nhân:</span> Dạ em bị đau đầu và sốt nhẹ được 2 ngày rồi ạ...
                                </p>
                            </div>

                            {/* AI Processing */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/20">
                                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">SOAP Notes</p>
                                        <p className="text-xs text-muted">Đang tạo tự động...</p>
                                    </div>
                                    <div className="w-16 h-1.5 bg-card-border rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: "70%" }} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-xl border border-secondary/20">
                                    <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">Mã ICD-10</p>
                                        <p className="text-xs text-muted">R51, R50.9 detected</p>
                                    </div>
                                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-4 -right-4 bg-card rounded-2xl shadow-xl border border-card-border p-4 animate-float" style={{ animationDelay: "1s" }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">Tiết kiệm 80%</p>
                                    <p className="text-xs text-muted">thời gian ghi chép</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
