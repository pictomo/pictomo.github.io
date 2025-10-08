/**
 * Cover UI that depends on theme or resolvedTheme.
 * Due to prevent Hydration Error.
 * This causes a brief white flash on load, but necessary.
 */

"use client";

import { useEffect, useState } from "react";

const ThemeContainer = ({
  children,
  defaultContent,
}: {
  children: React.ReactNode;
  defaultContent?: React.ReactNode;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children}</> : defaultContent || null;
};

export default ThemeContainer;
