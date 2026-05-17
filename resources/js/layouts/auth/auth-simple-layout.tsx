// import { Link } from '@inertiajs/react';
// import AppLogoIcon from '@/components/app-logo-icon';
// import { home } from '@/routes';
// import type { AuthLayoutProps } from '@/types';

// export default function AuthSimpleLayout({
//     children,
//     title,
//     description,
// }: AuthLayoutProps) {
//     return (
//         <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
//             <div className="w-full max-w-sm">
//                 <div className="flex flex-col gap-8">
//                     <div className="flex flex-col items-center gap-4">
//                         <Link
//                             href={home()}
//                             className="flex flex-col items-center gap-2 font-medium"
//                         >
//                             <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
//                                 <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
//                             </div>
//                             <span className="sr-only">{title}</span>
//                         </Link>

//                         <div className="space-y-2 text-center">
//                             <h1 className="text-xl font-medium">{title}</h1>
//                             <p className="text-center text-sm text-muted-foreground">
//                                 {description}
//                             </p>
//                         </div>
//                     </div>
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// }


import type { AuthLayoutProps } from '@/types';
import { Link } from '@inertiajs/react';

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