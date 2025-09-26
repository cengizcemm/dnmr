
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#f43f5e'
}

export const metadata: Metadata = {
  metadataBase: new URL('https://weddingmoments.com'),
  title: 'Wedding Moments - Düğün Anıları',
  description: 'Düğün anılarınızı paylaşın, misafirlerinizle bağlantı kurun ve özel günlerinizi ölümsüzleştirin.',
  keywords: 'düğün, wedding, anı, photo, video, misafir, davet, invitation',
  authors: [{ name: 'Wedding Moments Team' }],
  creator: 'Wedding Moments',
  publisher: 'Wedding Moments',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://weddingmoments.com',
    siteName: 'Wedding Moments',
    title: 'Wedding Moments - Düğün Anıları',
    description: 'Düğün anılarınızı paylaşın, misafirlerinizle bağlantı kurun ve özel günlerinizi ölümsüzleştirin.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wedding Moments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Moments - Düğün Anıları',
    description: 'Düğün anılarınızı paylaşın, misafirlerinizle bağlantı kurun ve özel günlerinizi ölümsüzleştirin.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        {/* Security Headers */}
        <meta httpEquiv="Content-Security-Policy" content="
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.googletagmanager.com;
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;
          font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net;
          img-src 'self' data: https: blob:;
          media-src 'self' blob:;
          connect-src 'self' https: wss:;
          frame-src 'self' https://www.google.com;
          object-src 'none';
          base-uri 'self';
          form-action 'self';
          upgrade-insecure-requests;
        " />
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="
          camera=(),
          microphone=(),
          geolocation=(),
          payment=(),
          usb=(),
          magnetometer=(),
          gyroscope=(),
          accelerometer=()
        " />
        
        {/* Performance and Monitoring */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" as="style" />
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" as="style" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="//readdy.ai" />
        
        {/* Error tracking initialization - Sentry */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize error tracking
              window.addEventListener('error', function(e) {
                console.error('Global Error:', e.error);
                // In production, send to monitoring service
                if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
                  // Send error to monitoring service
                  fetch('/api/errors', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      message: e.error?.message || 'Unknown error',
                      stack: e.error?.stack,
                      url: window.location.href,
                      timestamp: new Date().toISOString(),
                      userAgent: navigator.userAgent
                    })
                  }).catch(() => {});
                }
              });
              
              // Performance monitoring
              window.addEventListener('load', function() {
                setTimeout(function() {
                  const perfData = performance.getEntriesByType('navigation')[0];
                  if (perfData && perfData.loadEventEnd > 0) {
                    const loadTime = perfData.loadEventEnd - perfData.fetchStart;
                    console.log('Page Load Time:', loadTime + 'ms');
                    // In production, send to analytics
                  }
                }, 0);
              });
            `
          }}
        />
      </head>
      <body className={inter.className}>
        <div id="app-root">
          {children}
        </div>
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}
