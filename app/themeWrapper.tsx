'use client'

import React from "react";
import { ThemeProps, ThemeProvider } from "@vaneui/ui";


const overrideFunc = (theme: ThemeProps) => {
  theme.button.themes.appearance.background.filled.primary.base = 'bg-gradient-to-br from-orange-400 to-red-600';
  theme.button.themes.appearance.background.filled.primary.hover = 'hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-600';
  theme.button.themes.appearance.background.filled.primary.active = 'active:bg-gradient-to-br active:from-orange-600 active:to-red-600';
  theme.button.themes.appearance.ring.filled.primary.base = 'ring-orange-400';

  //theme.button.defaults.noShadow = true;

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
