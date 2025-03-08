import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware({
  ...routing,
  localeDetection: false, // Ensures the default locale is used instead of detecting it
});

export const config = {
  matcher: ['/', '/(uz|ru|en)/:path*'], // Ensure these match correctly
};
