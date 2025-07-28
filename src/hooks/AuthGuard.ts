import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminAuthenticated } from '@/utils/auth';

export function useAuthGuard() {
  const router = useRouter();
  const [checking, setchecking] = useState(true);

  useEffect(() => {
    const auth = isAdminAuthenticated();
    if (!auth) {
      router.replace('sign-in');
    }
    setchecking(false);
  }, [router]); // ✅ added router as dependency

  return { checking };
}
