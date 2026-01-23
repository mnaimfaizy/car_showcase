# Analytics Setup Guide

## Google Analytics 4 (Recommended)

### 1. Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Get your Measurement ID (format: G-XXXXXXXXXX)

### 2. Add to Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Create Analytics Component

**File**: `components/GoogleAnalytics.tsx`

```tsx
"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
```

### 4. Add to Layout

In `app/layout.tsx`:

```tsx
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
        <GoogleAnalytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Vercel Analytics (Alternative/Additional)

### 1. Install Package

```bash
npm install @vercel/analytics
```

### 2. Add to Layout

```tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 3. Enable in Vercel Dashboard

1. Go to your project on Vercel
2. Navigate to Analytics tab
3. Enable Vercel Analytics
4. Deploy to activate

## Tracking Events (Optional)

### Custom Event Tracking

```tsx
"use client";

import { useEffect } from "react";

export default function CarCard({ car }) {
  const handleCarView = () => {
    // Google Analytics
    if (window.gtag) {
      window.gtag("event", "view_car", {
        car_make: car.make,
        car_model: car.model,
        car_year: car.year,
      });
    }
  };

  return <div onClick={handleCarView}>{/* Car content */}</div>;
}
```

## Key Metrics to Track

### Traffic Metrics

- Page views
- Unique visitors
- Session duration
- Bounce rate

### Engagement Metrics

- Cars viewed
- Filters used
- Search queries
- "Show More" clicks

### Conversion Metrics (if applicable)

- Contact form submissions
- Phone clicks
- Email clicks
- Social shares

## Privacy & Compliance

### GDPR Compliance

Consider adding a cookie consent banner:

```bash
npm install react-cookie-consent
```

```tsx
import CookieConsent from "react-cookie-consent";

<CookieConsent
  location="bottom"
  buttonText="Accept"
  declineButtonText="Decline"
  enableDeclineButton
  cookieName="car-showcase-analytics-consent"
>
  This website uses cookies to enhance user experience and analyze traffic.
</CookieConsent>;
```

### Update Privacy Policy

Add a privacy policy page explaining:

- What data is collected
- How it's used
- Third-party services (GA, Vercel)
- User rights under GDPR/CCPA

## Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

---

**Note**: Analytics are currently not implemented. Follow this guide when ready to add tracking.
