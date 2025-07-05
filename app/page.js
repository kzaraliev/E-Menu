import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import PricingDisplay from '../components/PricingDisplay'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'

export const metadata = {
  title: 'e-menu.bg - Дигитални менюта за ресторанти | QR код менюта',
  description: 'Създайте професионално дигитално меню за вашия ресторант с QR код достъп. Мултиезичен, лесно управление, модерен дизайн. Безплатна регистрация!',
  keywords: 'дигитално меню, QR код меню, ресторант меню, електронно меню, меню онлайн, мобилно меню, България',
  openGraph: {
    title: 'e-menu.bg - Дигитални менюта за ресторанти',
    description: 'Създайте професионално дигитално меню за вашия ресторант с QR код достъп. Мултиезичен, лесно управление, модерен дизайн.',
    type: 'website',
    locale: 'bg_BG',
    url: 'https://e-menu.bg',
    siteName: 'e-menu.bg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'e-menu.bg - Дигитални менюта за ресторанти',
    description: 'Създайте професионално дигитално меню за вашия ресторант с QR код достъп.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "e-menu.bg",
            "description": "Дигитални менюта за ресторанти с QR код достъп",
            "url": "https://e-menu.bg",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "9.99",
              "priceCurrency": "BGN",
              "availability": "https://schema.org/InStock"
            },
            "provider": {
              "@type": "Organization",
              "name": "e-menu.bg",
              "url": "https://e-menu.bg"
            }
          })
        }}
      />
      
      <Hero />
      <Features />
      <HowItWorks />
      <PricingDisplay />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  )
}
