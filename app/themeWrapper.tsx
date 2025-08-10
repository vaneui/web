'use client'

import React from "react";
import { ThemeProps, ThemeProvider } from "@vaneui/ui";


const overrideFunc = (theme: ThemeProps) => {
  return theme;
};

export default function ThemeWrapper({
                                       children,
                                     }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider themeOverride={overrideFunc}>
      {children}
    </ThemeProvider>
  );
}
