import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DMS Studio',
  description: 'Content management studio for DMS',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
