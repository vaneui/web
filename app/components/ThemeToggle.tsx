'use client'

import { IconButton } from '@vaneui/ui';
import { Moon, Sun } from 'react-feather';
import { useIsDark } from '../utils/useIsDark';

export function ThemeToggle() {
  const dark = useIsDark();

  const toggle = () => {
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // storage can be blocked; the choice then lasts for this page view only
    }
  };

  return (
    <IconButton ghost aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} onClick={toggle}>
      {dark ? <Sun/> : <Moon/>}
    </IconButton>
  );
}
