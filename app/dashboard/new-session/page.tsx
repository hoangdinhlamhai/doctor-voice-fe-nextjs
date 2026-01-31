"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewSessionPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "male",
        phone: "",
        history: "",
        chiefComplaint: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call to create session/patient
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Redirect to recording page with patient details (in real app, use session ID)
        const queryParams = new URLSearchParams({
            name: formData.name,
            age: formData.age,
            gender: formData.gender,
            history: formData.history,
            complaint: formData.chiefComplaint,
        }).toString();

        router.push(`/recording?${queryParams}`);
        setIsLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Tạo phiên khám mới</h1>
                <p className="text-muted">Nhập thông tin bệnh nhân để bắt đầu ghi âm</p>
            </div>

            <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Họ và tên *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-background border border-card-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="Ví dụ: Nguyễn Văn A"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Số điện thoại</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-background border border-card-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="0912..."
                            />
                        </div>

                        {/* Age */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Tuổi *</label>
                            <input
                                type="number"
                                required
                                min="0"
                                max="120"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-background border border-card-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="30"
                            />
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Giới tính</label>
                            <div className="flex gap-4">
                                {[
                                    { value: "male", label: "Nam" },
                                    { value: "female", label: "Nữ" },
                                    { value: "other", label: "Khác" },
                                ].map((option) => (
                                    <label
                                        key={option.value}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all ${formData.gender === option.value
                                                ? "bg-primary/10 border-primary text-primary font-medium"
                                                : "bg-background border-card-border hover:border-primary/30 text-muted hover:text-foreground"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={option.value}
                                            checked={formData.gender === option.value}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                            className="hidden"
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Chief Complaint */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-foreground">Lý do khám *</label>
                            <textarea
                                required
                                rows={2}
                                value={formData.chiefComplaint}
                                onChange={(e) => setFormData({ ...formData, chiefComplaint: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-background border border-card-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                placeholder="Ví dụ: Đau đầu, sốt nhẹ 2 ngày..."
                            />
                        </div>

                        {/* Medical History */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-foreground">Tiền sử bệnh (Bệnh nền)</label>
                            <textarea
                                rows={3}
                                value={formData.history}
                                onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-background border border-card-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                placeholder="Ví dụ: Tăng huyết áp, Đái tháo đường type 2..."
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                        <Link
                            href="/dashboard"
                            className="px-6 py-2.5 bg-card border border-card-border text-foreground font-medium rounded-xl hover:bg-card-border/50 transition-colors"
                        >
                            Hủy
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Đang tạo...
                                </>
                            ) : (
                                <>
                                    Bắt đầu ghi âm
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
