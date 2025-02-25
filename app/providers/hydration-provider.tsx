'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Suspense } from 'react';

interface HydrationProviderProps {
  children: ReactNode;
}

export default function HydrationProvider({ children }: HydrationProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <Suspense fallback={null}>
      {isHydrated ? (
        children
      ) : (
        <div style={{ visibility: 'hidden' }}>{children}</div>
      )}
    </Suspense>
  );
}
