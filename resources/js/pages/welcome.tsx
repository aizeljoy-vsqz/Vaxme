import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { login, dashboard } from '@/routes';
<style>
    @import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap');
</style>

export default function Welcome() {

    const { auth } = usePage().props as any;

    return (
        <>
            <Head title="VAXME" />

            <div className="min-h-screen flex flex-col bg-background text-foreground">
                {/* NAV */}
                <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">


                        <div className="flex items-center gap-2">
                            {/* <img src="/vaxme_logo.png" alt="Vaxme Logo" className="h-10 w-10" /> */}
                            <div className="flex items-center gap-2">
                                <span style={{ fontFamily: 'Fredoka, sans-serif' }}
                                    className="text-xl font-semibold tracking-[0.2em] bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                                    VAXME
                                </span>
                            </div>
                        </div>

                        <nav className="flex items-center gap-2">
                            {auth?.user && (
                                <Link
                                    href={
                                        auth.user.user_type === 'bhc'
                                            ? '/bhc/dashboard'
                                            : dashboard()
                                    }
                                >
                                    <Button size="sm">
                                        Dashboard
                                    </Button>
                                </Link>
                            )}
                        </nav>
                    </div>
                </header>

                {/* HERO */}
                <main className="mx-auto flex flex-1 max-w-6xl flex-col items-center px-6 py-8 text-center">
                    <img src="/vaxme_logo.png" alt="Vaxme Logo" className="h-24 w-24" />

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1 text-xs text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        RHU • BHC Vaccine Coordination System
                    </div>

                    <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                        Smarter Vaccine
                        <span className="text-primary"> Management</span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                        A centralized system for vaccine requests, inventory tracking,
                        and return management between Rural Health Units and Barangay Health Centers.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Link href={
                            auth?.user
                                ? auth.user.user_type === 'bhc'
                                    ? '/bhc/dashboard'
                                    : dashboard()
                                : login()
                        }>
                            <Button size="lg">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* subtle trust line */}
                    <div className="mt-10 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">

                        <span className="rounded-full bg-muted px-3 py-1">
                            Vaccine Requests
                        </span>

                        <span className="rounded-full bg-muted px-3 py-1">
                            Inventory Tracking
                        </span>

                        <span className="rounded-full bg-muted px-3 py-1">
                            Return System
                        </span>

                        <span className="rounded-full bg-muted px-3 py-1">
                            RHU Coordination
                        </span>

                        <span className="rounded-full bg-muted px-3 py-1">
                            Secure Access
                        </span>

                    </div>

                </main>

                {/* FOOTER */}
                <footer className="border-t">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
                        <span>© {new Date().getFullYear()} VAXME</span>
                        <span>Centralized Vaccine Management System</span>
                    </div>
                </footer>

            </div>
        </>
    );
}

