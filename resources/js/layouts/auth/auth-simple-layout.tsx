import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="min-h-svh flex items-center justify-center bg-background px-6">

            <div className="w-full max-w-sm">

                {/* BRAND HEADER (VAXME ONLY) */}
                <div className="text-center">

                    <img
                        src="/vaxme_logo.png"
                        className="h-16 w-16 mx-auto mb-1"
                        alt="VAXME"
                    /> 

                    <h1
                        style={{ fontFamily: '"M PLUS Rounded 1c", sans-serif' }}
                        className="text-lg font-semibold tracking-[0.25em] bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
                    >
                        VAXME
                    </h1>

                    <p className="text-xs text-muted-foreground mt-1">
                        Vaccine Coordination System
                    </p>
                </div>

                {/* PAGE TITLE */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-medium">{title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {description}
                    </p>
                </div>

                {/* FORM CONTENT */}
                {children}

            </div>
        </div>
    );
}