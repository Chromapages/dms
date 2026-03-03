'use client';

import { usePathname } from 'next/navigation';
import CinematicNav from '@/components/CinematicNav';
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
      {children}
      {!hideChrome && <CinematicFooter />}
    </>
  );
}
