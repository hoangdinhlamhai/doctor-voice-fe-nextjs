export default function BenefitsSection() {
    const benefits = [
        {
            metric: "80%",
            label: "Thời gian tiết kiệm",
            description: "Giảm thời gian ghi chép hồ sơ bệnh án",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            metric: "95%+",
            label: "Độ chính xác",
            description: "Nhận diện giọng nói và phân tích y khoa",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            ),
        },
        {
            metric: "2x",
            label: "Bệnh nhân/ngày",
            description: "Tăng số lượng bệnh nhân khám được",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
        },
        {
            metric: "0",
            label: "Sai sót ghi chép",
            description: "Loại bỏ lỗi do ghi chép thủ công",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
    ];

    const testimonials = [
        {
            quote: "Doctor Voice đã thay đổi cách tôi làm việc hoàn toàn. Giờ tôi có thể tập trung vào bệnh nhân thay vì ghi chép.",
            author: "Bs. Nguyễn Văn A",
            role: "Bác sĩ Nội khoa, Bệnh viện ABC",
        },
        {
            quote: "Độ chính xác của AI thực sự ấn tượng. Mã ICD-10 được gợi ý rất phù hợp với chẩn đoán của tôi.",
            author: "Bs. Trần Thị B",
            role: "Bác sĩ Đa khoa, Phòng khám XYZ",
        },
    ];

    return (
        <section id="benefits" className="py-24 bg-gradient-to-b from-primary/5 to-transparent">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
                        <span className="text-sm font-medium text-accent">Lợi ích thực tế</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Con số{" "}
                        <span className="gradient-text">nói lên tất cả</span>
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Doctor Voice giúp bác sĩ làm việc hiệu quả hơn và mang lại trải nghiệm tốt hơn cho bệnh nhân.
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="relative bg-card rounded-2xl p-6 border border-card-border text-center group hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                {benefit.icon}
                            </div>

                            {/* Metric */}
                            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                                {benefit.metric}
                            </div>

                            {/* Label */}
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                                {benefit.label}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-muted">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="relative bg-card rounded-2xl p-8 border border-card-border cursor-pointer"
                        >
                            {/* Quote Icon */}
                            <svg
                                className="absolute top-6 left-6 w-10 h-10 text-primary/20"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>

                            {/* Quote */}
                            <p className="text-lg text-foreground leading-relaxed mb-6 pl-8">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                                    {testimonial.author.charAt(4)}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                                    <p className="text-sm text-muted">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
