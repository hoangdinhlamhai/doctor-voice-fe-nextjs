export default function FeaturesSection() {
    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
            ),
            title: "Speech-to-Text",
            description: "Chuyển đổi cuộc hội thoại bác sĩ - bệnh nhân thành văn bản với độ chính xác cao, nhận diện đa người nói.",
            color: "primary",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: "SOAP Notes tự động",
            description: "AI tự động tạo Subjective, Objective, Assessment, Plan từ transcript cuộc hội thoại một cách chính xác.",
            color: "secondary",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
            ),
            title: "Mã ICD-10",
            description: "Tự động gợi ý mã ICD-10 phù hợp dựa trên triệu chứng và chẩn đoán, giúp việc báo cáo nhanh chóng.",
            color: "accent",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            title: "Tra cứu y khoa (RAG)",
            description: "Truy vấn kiến thức y khoa trong thời gian thực với công nghệ RAG từ cơ sở dữ liệu chuyên ngành.",
            color: "primary",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: "So sánh AI vs Bác sĩ",
            description: "Đánh giá độ chính xác của AI so với chẩn đoán của bác sĩ, giúp cải thiện chất lượng khám.",
            color: "secondary",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
            ),
            title: "Quản lý phiên khám",
            description: "Lưu trữ và quản lý toàn bộ phiên khám, hồ sơ bệnh án tập trung, dễ dàng tra cứu.",
            color: "accent",
        },
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; text: string; border: string }> = {
            primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
            secondary: { bg: "bg-secondary/10", text: "text-secondary", border: "border-secondary/20" },
            accent: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20" },
        };
        return colors[color] || colors.primary;
    };

    return (
        <section id="features" className="py-24 bg-gradient-to-b from-transparent to-primary/5">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
                        <span className="text-sm font-medium text-secondary">Tính năng nổi bật</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Tất cả những gì bác sĩ cần{" "}
                        <span className="gradient-text">trong một ứng dụng</span>
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Doctor Voice tích hợp đầy đủ các công cụ AI hiện đại để hỗ trợ bác sĩ trong mọi bước của quá trình khám chữa bệnh.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const colorClasses = getColorClasses(feature.color);
                        return (
                            <div
                                key={index}
                                className="group relative bg-card rounded-2xl p-6 border border-card-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                            >
                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-xl ${colorClasses.bg} ${colorClasses.text} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-foreground mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-muted leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Hover Arrow */}
                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg className={`w-5 h-5 ${colorClasses.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
