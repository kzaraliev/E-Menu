import Pricing from '@/components/Pricing'
import Hero from '@/components/Hero'
import Features from '@/components/Features'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Pricing Section */}
      <Pricing />
    </div>
  );
}
