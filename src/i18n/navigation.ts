import { createNavigation } from 'next-intl/navigation';
import { locales, Locale } from './config';

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales
});

export type { Locale };
