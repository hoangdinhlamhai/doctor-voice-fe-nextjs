"use client";

interface HeaderProps {
    onMenuClick: () => void;
    title: string;
}

export default function DashboardHeader({ onMenuClick, title }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-card-border">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Left: Menu button + Title */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 rounded-lg hover:bg-card-border/50 transition-colors cursor-pointer"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-semibold text-foreground">{title}</h1>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-card-border">
                        <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="bg-transparent border-none outline-none text-sm w-48 placeholder:text-muted"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 rounded-lg hover:bg-card-border/50 transition-colors cursor-pointer">
                        <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                    </button>

                    {/* New Recording Button */}
                    <a
                        href="/dashboard/new-session"
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                        <span>Ghi âm mới</span>
                    </a>
                </div>
            </div>
        </header>
    );
}
