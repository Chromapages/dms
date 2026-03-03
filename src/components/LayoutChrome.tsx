'use client';

import { usePathname } from 'next/navigation';
import CinematicNav from '@/components/CinematicNav';
import MobileBottomNav from '@/components/MobileBottomNav';
import CinematicFooter from '@/components/CinematicFooter';

export default function LayoutChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideChrome = pathname?.startsWith('/studio');

  return (
    <>
      {!hideChrome && <CinematicNav />}
      {/* pb-20 creates space so content is never hidden behind the mobile bottom nav */}
      <div className="pb-20 lg:pb-0">
        {children}
      </div>
      {!hideChrome && <CinematicFooter />}
      {!hideChrome && <MobileBottomNav />}
    </>
  );
}
