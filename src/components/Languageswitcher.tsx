'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  const targetLocale = locale === 'ar' ? 'en' : 'ar';
  const label = locale === 'ar' ? 'English' : 'العربية';

  return (
    <div >
      <Link href={pathname} locale={targetLocale} className="px-4 py-2 text-amber-950 bg-gray-200 rounded hover:bg-gray-300">
        {label}
      </Link>
    </div>
  );
}