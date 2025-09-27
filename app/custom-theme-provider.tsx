"use client";

import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useEffect, useState } from "react";

// This causes a brief white flash on load.
// But necessary to prevent Hydration Error.

const CustomThemeProvider = (props: ThemeProviderProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <ThemeProvider {...props} /> : null;
};

export default CustomThemeProvider;
