'use client';

import { Navbar } from '@/components/navbar';
import { usePathname } from 'next/navigation';
import { checkIsAdminRoute, checkIsUserRoute } from '@/lib/route-utils';

export function PublicLayout({ children }) {
  const pathname = usePathname();
  const isUserRoute = checkIsUserRoute(pathname);
  const isAdminRoute = checkIsAdminRoute(pathname);

  if (isAdminRoute) {
    return <>{children}</>; // No navbar for admin routes
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isLoggedIn={isUserRoute} />
      <main className="flex-1">{children}</main>
      {/* Footer can go here */}
    </div>
  );
}
