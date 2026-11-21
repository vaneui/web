'use client';

// The blocks as rendered on the site: the gallery thumbnails and the preview pages. A client
// module, so the library files stay exactly as they are copied (event handlers and all).
import React from 'react';
import { AppShell } from './library/app-shell';
import { Dashboard } from './library/dashboard';
import { Orders } from './library/data-table';
import { Landing } from './library/landing';
import { Inbox } from './library/list-detail';
import { Pricing } from './library/pricing';
import { SettingsPage } from './library/settings';
import { SignIn } from './library/sign-in';

const RENDER: Record<string, () => React.ReactElement> = {
  'landing': () => <Landing/>,
  'pricing': () => <Pricing/>,
  'sign-in': () => <SignIn/>,
  'app-shell': () => <AppShell/>,
  'settings': () => <SettingsPage/>,
  // With a message open, so the wide layout shows both panes and the narrow one shows the back button
  'list-detail': () => <Inbox selectedId="m1"/>,
  'dashboard': () => <Dashboard/>,
  'data-table': () => <Orders/>,
};

/** One block from app/blocks/library, by its slug */
export function BlockRender({ slug }: { slug: string }) {
  const render = RENDER[slug];
  return render ? render() : null;
}
