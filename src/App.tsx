import React from 'react';
import { AnimaProvider } from '@animaapp/playground-react-sdk';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HeaderNav from './components/HeaderNav';
import HeroSection from './components/HeroSection';
import VisionSection from './components/VisionSection';
import EcosystemCards from './components/EcosystemCards';
import ArchitectureFlow from './components/ArchitectureFlow';
import UseCasesCarousel from './components/UseCasesCarousel';
import TestimonialsSection from './components/TestimonialsSection';
import GovernanceSection from './components/GovernanceSection';
import ContactSection from './components/ContactSection';
import FAQSection from './components/FAQSection';
import TrustedBySection from './components/TrustedBySection';
import FeaturedBlogsSection from './components/FeaturedBlogsSection';
import FinalCTASection from './components/FinalCTASection';
import Footer from './components/Footer';
import TechnologyPage from './pages/TechnologyPage';
import TeamPage from './pages/TeamPage';
import GamingPage from './pages/GamingPage';
import DefiPage from './pages/DefiPage';
import RealEstatePage from './pages/RealEstatePage';
import CareersPage from './pages/CareersPage';
import JobDetailPage from './pages/JobDetailPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import WhitepaperPage from './pages/WhitepaperPage';
import DocsPage from './pages/DocsPage';
import CommunityPage from './pages/CommunityPage';
import TokenomicsPage from './pages/TokenomicsPage';
import ContactPage from './pages/ContactPage';
import IdentityWalletPage from './pages/IdentityWalletPage';
import MetaverseGameFiPage from './pages/MetaverseGameFiPage';
import DexLiquidityPage from './pages/DexLiquidityPage';
import RealEstateRWAPage from './pages/RealEstateRWAPage';
import NftUtilityPage from './pages/NftUtilityPage';
import DaoGovernancePage from './pages/DaoGovernancePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <HeaderNav />
      <Outlet />
      <Footer />
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Helmet>
        <title>DeCruiz Labs - Web3 Interoperability for Gaming, DeFi & Real Estate</title>
        <meta name="description" content="Building the future of Web3 with seamless interoperability across gaming, DeFi, and real estate ecosystems. Discover our cross-chain bridge protocol and decentralized identity solutions." />
        <meta name="keywords" content="Web3, blockchain, interoperability, gaming, DeFi, real estate, cross-chain bridge, decentralized identity" />
        <link rel="canonical" href="https://decruizlabs.com" />
        <meta property="og:title" content="DeCruiz Labs - Web3 Interoperability" />
        <meta property="og:description" content="Building Web3 Interoperability Across Gaming, DeFi & Real Estate" />
        <meta property="og:url" content="https://decruizlabs.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DeCruiz Labs - Web3 Interoperability" />
        <meta name="twitter:description" content="Building Web3 Interoperability Across Gaming, DeFi & Real Estate" />
      </Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'DeCruiz Labs',
            description: 'Building Web3 Interoperability Across Gaming, DeFi & Real Estate',
            url: 'https://decruizlabs.com',
            sameAs: [
              'https://twitter.com/decruizlabs',
              'https://linkedin.com/company/decruizlabs',
              'https://github.com/decruizlabs',
            ],
          }),
        }}
      />
      <main>
        <HeroSection />
        <VisionSection />
        {/* <TrustedBySection /> */}
        <EcosystemCards />
        <ArchitectureFlow />
        <UseCasesCarousel />
        {/* <TestimonialsSection /> */}
        <GovernanceSection />
        <FAQSection />
        <FeaturedBlogsSection />
        <FinalCTASection />
        <ContactSection />
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'technology', element: <TechnologyPage /> },
      { path: 'team', element: <TeamPage /> },
      { path: 'gaming', element: <GamingPage /> },
      { path: 'defi', element: <DefiPage /> },
      { path: 'real-estate', element: <RealEstatePage /> },
      { path: 'careers', element: <CareersPage /> },
      { path: 'careers/:jobId', element: <JobDetailPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'whitepaper', element: <WhitepaperPage /> },
      { path: 'docs', element: <DocsPage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'tokenomics', element: <TokenomicsPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'identity-wallet', element: <IdentityWalletPage /> },
      { path: 'metaverse-gamefi', element: <MetaverseGameFiPage /> },
      { path: 'dex-liquidity', element: <DexLiquidityPage /> },
      { path: 'rwa-tokenization', element: <RealEstateRWAPage /> },
      { path: 'nft-utility', element: <NftUtilityPage /> },
      { path: 'dao-governance', element: <DaoGovernancePage /> },
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
      { path: 'terms-of-service', element: <TermsOfServicePage /> },
    ],
  },
]);

export default function App() {
  return (
    <AnimaProvider>
      <RouterProvider router={router} />
    </AnimaProvider>
  );
}
