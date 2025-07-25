import {  useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth';


export function useAuthGuard() {
    const router = useRouter();
    const [checking, setchecking ] = useState(true);

    useEffect(() => {
        const auth = isAuthenticated();
        if (!auth) {
            router.replace('sign-in');

        }
        setchecking(false);
    }, []);

    return { checking };
}