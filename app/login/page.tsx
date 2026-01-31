"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle"; // Adjust import path as needed

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // Redirect to dashboard (in real app)
        window.location.href = "/dashboard";
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

            {/* Theme Toggle - Fixed top right */}
            <div className="absolute top-6 right-6 z-50">
                <ThemeToggle />
            </div>

            <div className="flex w-full max-w-7xl mx-auto p-4 lg:p-8">
                {/* Left Side - Login Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-12 z-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-12 w-fit">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold gradient-text">Doctor Voice</span>
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                            Chào mừng quay lại
                        </h1>
                        <p className="text-muted text-lg">
                            Đăng nhập để tiếp tục quản lý hồ sơ bệnh án thông minh.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-muted-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-card-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                                    placeholder="bacsi@benhvien.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Mật khẩu</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-muted-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-card-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-card-border text-primary focus:ring-primary" />
                                <span className="text-sm text-muted">Ghi nhớ đăng nhập</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                                Quên mật khẩu?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Đang xử lý...
                                </>
                            ) : (
                                "Đăng nhập"
                            )}
                        </button>

                        <div className="relative my-8 text-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-card-border"></div>
                            </div>
                            <span className="relative px-4 bg-background text-sm text-muted">Hoặc đăng nhập với</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-card border border-card-border hover:bg-card-border/50 transition-all cursor-pointer">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span className="text-sm font-medium">Google</span>
                            </button>
                            <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-card border border-card-border hover:bg-card-border/50 transition-all cursor-pointer">
                                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="text-sm font-medium">Facebook</span>
                            </button>
                        </div>

                        <p className="text-center text-sm text-muted">
                            Chưa có tài khoản?{" "}
                            <Link href="/register" className="text-primary font-medium hover:underline">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Right Side - Branding/Testimonial (Hidden on mobile) */}
                <div className="hidden lg:flex w-1/2 items-center justify-center relative p-12">
                    {/* Decorative Card */}
                    <div className="relative w-full max-w-lg aspect-square">
                        {/* Background blobs */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

                        {/* Glass Card */}
                        <div className="relative h-full bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl flex flex-col justify-between">
                            <div>
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-8 shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-foreground mb-4">
                                    Trợ lý AI đắc lực cho bác sĩ
                                </h2>
                                <p className="text-lg text-muted/90 leading-relaxed">
                                    "Doctor Voice giúp tôi tiết kiệm 2 giờ mỗi ngày cho việc ghi chép hồ sơ, để tôi có thể tập trung hoàn toàn vào bệnh nhân."
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent p-[2px]">
                                    <div className="w-full h-full rounded-full bg-card overflow-hidden">
                                        {/* Avatar placeholder */}
                                        <div className="w-full h-full bg-gray-200" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Bs. Trần Văn Minh</p>
                                    <p className="text-sm text-muted">Trưởng khoa Nội - Bệnh viện X</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
