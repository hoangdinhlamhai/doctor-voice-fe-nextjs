"use client";

import { useState } from "react";
import Link from "next/link";

export default function CTASection() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setEmail("");
    };

    return (
        <section id="demo" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-secondary" />

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Floating Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

            <div className="relative max-w-4xl mx-auto px-6 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-6">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-sm font-medium text-white">Đăng ký dùng thử miễn phí</span>
                </div>

                {/* Headline */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Sẵn sàng thay đổi cách bạn làm việc?
                </h2>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                    Đăng ký ngay để nhận quyền truy cập sớm và 30 ngày dùng thử miễn phí.
                    Không cần thẻ tín dụng.
                </p>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            required
                            className="flex-1 px-6 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            {isSubmitted ? "Đã gửi!" : "Đăng ký ngay"}
                        </button>
                    </div>
                </form>

                {/* Trust Text */}
                <p className="text-sm text-white/60 mb-12">
                    Đã có hơn 100+ bác sĩ đăng ký. Chúng tôi tôn trọng quyền riêng tư của bạn.
                </p>

                {/* Quick Links */}
                <div className="flex flex-wrap items-center justify-center gap-8">
                    <Link
                        href="#features"
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Xem tính năng
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v14l11-7z" />
                        </svg>
                        Xem demo
                    </Link>
                    <Link
                        href="#contact"
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Liên hệ
                    </Link>
                </div>
            </div>
        </section>
    );
}
