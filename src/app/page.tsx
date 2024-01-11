import Head from 'next/head';
import Header from './components/landingPageComponent/header';
import HeroSection from './components/landingPageComponent/hero';
import FeaturesSection from './components/landingPageComponent/features';
import PricingSection from './components/landingPageComponent/pricing';
import AboutSection from './components/landingPageComponent/about';
import Footer from '../app/components/landingPageComponent/footer'
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>OPI Project Management</title>
        <meta name="description" content="Comprehensive Project Management Software" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <AboutSection />

        {/* Optional additional sections can be added here */}
      </main>

      <Footer />
    </div>
  );
}
