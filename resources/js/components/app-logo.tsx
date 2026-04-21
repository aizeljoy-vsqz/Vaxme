import AppLogoIcon from '@/components/app-logo-icon';
import { Syringe } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md  text-sidebar-primary-foreground">
                <Syringe className='text-xs text-sidebar-primary'/>
            </div>
            
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Vaxme
                </span>
            </div>
        </>
    );
}
