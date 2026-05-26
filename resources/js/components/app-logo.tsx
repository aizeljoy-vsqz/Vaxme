
export default function AppLogo() {
    return (
        <>
            <div className="flex items-center gap-2 items-center justify-center">
                <div className="flex aspect-square size-6 items-center justify-center rounded-md text-sidebar-primary-foreground">
                    {/* <Syringe className='text-xs text-sidebar-primary'/> */}
                    <img src="/vaxme_logo.png" alt="Vaxme Logo" />

                </div>

                <span className="truncate leading-tight font-bold text-lg">
                    Vaxme
                </span>
            </div>
        </>
    );
}
