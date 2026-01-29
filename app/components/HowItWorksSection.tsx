export default function HowItWorksSection() {
    const steps = [
        {
            step: "01",
            title: "Ghi âm cuộc hội thoại",
            description: "Bác sĩ bắt đầu phiên khám và Doctor Voice tự động ghi âm cuộc hội thoại với bệnh nhân.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
            ),
        },
        {
            step: "02",
            title: "AI chuyển đổi & phân tích",
            description: "Hệ thống AI tự động chuyển giọng nói thành văn bản và phân tích nội dung cuộc hội thoại.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            step: "03",
            title: "Tạo SOAP & ICD-10",
            description: "AI tự động tạo SOAP notes và gợi ý mã ICD-10 phù hợp dựa trên phân tích triệu chứng.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            step: "04",
            title: "Xác nhận & Lưu trữ",
            description: "Bác sĩ xem xét, chỉnh sửa nếu cần và lưu hồ sơ bệnh án vào hệ thống quản lý.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            ),
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-card">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <span className="text-sm font-medium text-primary">Quy trình đơn giản</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Cách{" "}
                        <span className="gradient-text">Doctor Voice</span>{" "}
                        hoạt động
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Chỉ với 4 bước đơn giản, bác sĩ có thể hoàn thành hồ sơ bệnh án một cách tự động và chính xác.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary -translate-y-1/2" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((item, index) => (
                            <div key={index} className="relative">
                                {/* Step Card */}
                                <div className="bg-background rounded-2xl p-6 border border-card-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 text-center cursor-pointer group">
                                    {/* Step Number */}
                                    <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
                                        {item.icon}
                                    </div>

                                    {/* Step Badge */}
                                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                                        Bước {item.step}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold text-foreground mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Arrow (hidden on last item) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 w-8 h-8 bg-card rounded-full border border-card-border items-center justify-center">
                                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
