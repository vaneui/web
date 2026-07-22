import * as React from 'react';
import * as VaneUI from '@vaneui/ui';
import * as Icons from 'react-feather';

// Identifiers injected into every playground snippet. react-feather is spread
// first so VaneUI wins the four colliding names (Code, Link, List, Menu) —
// matching the docs demo compiler's resolution order.
export const scope: Record<string, unknown> = {
  React,
  useState: React.useState,
  useEffect: React.useEffect,
  useRef: React.useRef,
  useMemo: React.useMemo,
  useCallback: React.useCallback,
  useReducer: React.useReducer,
  ...(Icons as Record<string, unknown>),
  ...(VaneUI as Record<string, unknown>),
};
