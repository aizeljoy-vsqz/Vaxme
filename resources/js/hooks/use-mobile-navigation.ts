import { useCallback } from 'react';

export type CleanupFn = () => void;

export function useMobileNavigation(): CleanupFn {
    return useCallback(() => {
        // Remove pointer-events style from body (guarded for SSR)...
        if (typeof document !== 'undefined' && document.body) {
            document.body.style.removeProperty('pointer-events');
        }
    }, []);
}
