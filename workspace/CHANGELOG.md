<instructions>
## 🚨 MANDATORY: CHANGELOG TRACKING 🚨

You MUST maintain this file to track your work across messages. This is NON-NEGOTIABLE.

---

## INSTRUCTIONS

- **MAX 5 lines** per entry - be concise but informative
- **Include file paths** of key files modified or discovered
- **Note patterns/conventions** found in the codebase
- **Sort entries by date** in DESCENDING order (most recent first)
- If this file gets corrupted, messy, or unsorted -> re-create it. 
- CRITICAL: Updating this file at the END of EVERY response is MANDATORY.
- CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

</instructions>

<changelog>
## 2026-04-13 (governance section patterned bg)
- Added layered patterned background to `GovernanceSection.tsx` (dot grid + diagonal stripes + scan-lines + 3 bloom orbs)
- Section wrapper made `relative overflow-hidden`; inner content wrapped in `relative z-10` to stay above pattern layers
- Existing GSAP animations, cards, stats, and CTA unchanged

## 2026-04-13 (hero video bg)
- Replaced canvas particle system in `HeroSection.tsx` with a looping ambient video background
- Three Pixabay CC0 MP4 CDN URLs used as chain-fallbacks via `video.addEventListener("error")`
- Layered overlays: dark tint + radial vignette + purple/cyan colour grade + scan-lines — text/stats/CTA unchanged
- Removed all particle/canvas state, refs, and animation loop — kept typewriter, GSAP entrance, stats bar identical

## 2026-04-13 (metaverse use-case images)
- Added `image` field to each of the 4 `useCases` entries in `MetaverseGameFiPage.tsx`
- "Real-world deployment scenarios." cards now have a full-bleed image header (h-44) with colour-tinted gradient overlay and emoji badge
- Card layout changed to `flex flex-col` — image on top, content body below with `flex-1`

## 2026-04-13 (careers filter fix + perk images)
- Fixed filter tabs: removed `opacity-0` from job-card class and split animations into separate `useEffect` hooks
- Job cards now re-animate via `gsap.fromTo` on `activeCategory` change (no ScrollTrigger dependency on re-render)
- Added `image` field to each perk in the `perks` array with Unsplash photos
- "Why DeCruiz Labs" cards now show a full-bleed image top section with gradient overlay and emoji badge

## 2026-04-13 (careers filter tabs)
- Added `JobCategory` type ("All" | "Engineering" | "Product" | "Marketing") and `activeCategory` state to `CareersPage.tsx`
- Replaced 7 mixed-department jobs with 9 jobs split across Engineering (3), Product (3), Marketing (3)
- Added colour-coded filter tab strip above job list; active tab highlights with per-category colour accent
- Job category badge on each card now uses matching colour instead of plain muted pill
- Hero "open positions" badge now shows per-category count breakdown inline

## 2026-04-13 (dao governance page)
- Added `src/pages/DaoGovernancePage.tsx` — full DAO Governance & Treasury detail page at `/dao-governance`
- Hero with orbital rings diagram + animated node canvas, orange/amber gradient palette, dual CTAs
- Stat strip: 8 modules, 100+ chains, <2 min vote settlement, ∞ composable extensions
- 8 architecture module cards: Proposal Lifecycle, Treasury Execution, Grant Management, Vote Delegation, Staking Governance, Quorum Analytics, Contributor Rewards, Treasury Reporting
- 4 interactive use cases (tab selector + metrics panel): ecosystem governance, grant DAO, protocol treasury, community investment clubs
- Tech stack grid (OpenZeppelin Governor, Compound Governance, Snapshot, Gnosis Safe, Aragon OSx, Tally, Chainlink Automation, Polygon zkEVM) + outcome section (3× retention / 90% treasury overhead reduction)
- Wired `/dao-governance` route in `src/App.tsx`; added to `CARD_ROUTES` in `EcosystemCards.tsx`

## 2026-04-13 (nft utility page)
- Added `src/pages/NftUtilityPage.tsx` — full NFT Utility & Asset Interoperability page at `/nft-utility`
- Hero with animated hexagonal lattice + particle canvas, pink/purple gradient palette, dual CTAs
- Stat strip: 8 modules, 14+ protocol integrations, 0 royalty delays, ∞ asset lifetime
- 8 architecture module cards: Multi-Utility NFT Design, Marketplace Royalties, Access Control NFTs, NFT Collateralization, Item Portability, Event Ticketing, Loyalty Badges, Creator Royalty Dashboards
- 4 interactive use cases (tab selector + metrics panel): membership ecosystems, metaverse assets, token-gated communities, premium DeFi access
- Tech stack (ERC-721/1155, ERC-4907, EIP-2981, ERC-6551, IPFS/Arweave, Chainlink VRF, OpenSea SDK, Polygon zkEVM) + outcome section (4× HLV / +70% secondary volume / 5min gate)
- Wired `/nft-utility` route in `src/App.tsx`; added to `CARD_ROUTES` in `EcosystemCards.tsx`

## 2026-04-13 (rwa tokenization page)
## 2026-04-13 (nft utility page)
- Added `src/pages/NftUtilityPage.tsx` — full NFT Utility & Asset Interoperability page at `/nft-utility`
- Hero with animated hexagonal lattice + particle canvas, pink/purple gradient palette, dual CTAs
- Stat strip: 8 modules, 14+ protocol integrations, 0 royalty delays, ∞ asset lifetime
- 8 architecture module cards: Multi-Utility NFT Design, Marketplace Royalties, Access Control NFTs, NFT Collateralization, Item Portability, Event Ticketing, Loyalty Badges, Creator Royalty Dashboards
- 4 interactive use cases (tab selector + metrics panel): membership ecosystems, metaverse assets, token-gated communities, premium DeFi access
- Tech stack (ERC-721/1155, ERC-4907, EIP-2981, ERC-6551, IPFS/Arweave, Chainlink VRF, OpenSea SDK, Polygon zkEVM) + outcome section (4× HLV / +70% secondary volume / 5min gate)
- Wired `/nft-utility` route in `src/App.tsx`; added to `CARD_ROUTES` in `EcosystemCards.tsx`

## 2026-04-13 (rwa tokenization page)
- Added `src/pages/RealEstateRWAPage.tsx` — full Real Estate Tokenization & RWA detail page at `/rwa-tokenization`
- Hero with animated property particle canvas (building silhouettes + node network), stat strip (8 modules, 190+ jurisdictions, 24/7 tradable, <48h issuance)
- 8 architecture module cards: Property Tokenization Workflows, SPV/Legal Wrappers, Fractional Ownership, Dividend/Yield Distribution, Secondary Market, Investor Compliance Portal, Collateralized Lending, Valuation Dashboards
- 4 use cases with interactive selector: commercial real estate, hospitality assets, global syndicates, mortgage-backed DeFi
- Tech stack grid (ERC-3643, Chainlink, Polygon zkEVM, Fireblocks, OpenZeppelin, Gnosis Safe) + outcome section (10×/40%/60% metrics)
- Wired `/rwa-tokenization` route in `src/App.tsx`; added to `CARD_ROUTES` in `EcosystemCards.tsx`

## 2026-04-13 (dex liquidity page)
- Added `src/pages/DexLiquidityPage.tsx` — full DEX & Liquidity Engine detail page at `/dex-liquidity`
- Hero with animated ring+node canvas, cyan/green gradient, stat strip (8 modules, 10+ chains, <0.1s quote latency)
- 8 architecture module cards: AMM, Staking/Farming, LP Incentives, Launchpad, Treasury Routing, Swap Engine, Cross-Chain Bridge, Institutional Dashboards
- 4 use case cards: game token swaps, NFT floor liquidity, RWA secondary trading, DAO treasury optimisation
- Tech stack grid (Uniswap v3/v4, Balancer, LayerZero, Chainlink, ERC-4626, 1inch) + business outcome section
- Wired `/dex-liquidity` route in `src/App.tsx`; added to `CARD_ROUTES` in `EcosystemCards.tsx`

## 2026-04-13 (metaverse gamefi page)
- Added `src/pages/MetaverseGameFiPage.tsx` — full GameFi Layer detail page at `/metaverse-gamefi`
- Hero with animated hexagon+particle canvas, stat strip (8 layers, 100K+ TPS), dual CTAs
- 8 architecture module cards: Avatar NFTs, Land Protocol, Marketplace, Tokenomics, Guilds, Creator Monetization, Quest Engine, AI NPCs
- 4 use case cards with metric pills; tech stack grid (ERC-721, ERC-6551, Chainlink VRF, IPFS, Polygon zkEVM, OpenSea SDK)
- Business outcome section with 3× retention / 60% referral / 40% secondary revenue metrics
- Wired `/metaverse-gamefi` route in `src/App.tsx`; added route to `CARD_ROUTES` in `EcosystemCards.tsx`

## 2026-04-13 (contact/strategy call page)
- Added `src/pages/ContactPage.tsx` — 4-step lead qualification form with animated canvas hero
- Step 1: Identity (name, email, company, role) | Step 2: Product scope (8 types), chain preference (10 chains), budget range (6 tiers)
- Step 3: Engagement type (6 options), timeline (6 options), NDA toggle | Step 4: Summary + additional notes
- Saves to `ContactSubmission` DB entity with structured subject line; success state with 3-step next-steps grid
- Wired `/contact` route in `src/App.tsx`; added "Strategy Call" nav link in `HeaderNav.tsx`

## 2026-04-13 (about/leadership page)
- Rebuilt `src/pages/TeamPage.tsx` as full "About / Leadership" page with 8 sections
- Added: Vision (4 pillars), Company Journey (6-milestone timeline), Leadership, Advisory Board, Blockchain Partnerships (ETH/POL/CL/ARB/COS/SOL), Ecosystem Alliances, Certifications (ISO 27001, SOC 2, CertiK, ToB, GDPR, MiCA), How We Work
- GSAP scroll animations on all grid/list sections; hero stat strip; location badges on team cards
- Updated nav label "Team" → "About" in `src/components/HeaderNav.tsx`

## 2026-04-13 (tokenomics page)
- Added `src/pages/TokenomicsPage.tsx` — 8-section deep-dive: Supply Models, Emissions, Staking, Vesting, Reward Loops, Liquidity, Treasury, Governance
- Animated particle canvas hero; GSAP scroll-triggered stagger on every section
- Vesting table, emission bar charts, flywheel loop diagram, governance lifecycle steps
- Wired `/tokenomics` route in `src/App.tsx`; added "Tokenomics" nav link in `src/components/HeaderNav.tsx`

## 2026-04-13 (final CTA section)
- Added `src/components/FinalCTASection.tsx` — dark futuristic CTA with blockchain canvas, glowing orbs, grid overlay
- Two CTA buttons: "Book Strategy Call" (gradient primary) + "Request Architecture Review" (glassmorphism secondary)
- 3 trust-indicator stats strip below buttons; animated dot divider
- Wired into `src/App.tsx` `<HomePage>` between `<FeaturedBlogsSection>` and `<ContactSection>`

## 2026-04-13 (futuristic UI upgrade)
- Rebuilt `EcosystemCards.tsx` — dark glassmorphism cards, animated blockchain network canvas, 6 custom SVG icons (Wallet, Game, DEX, RWA, NFT, DAO), ecosystem flow map strip
- Rebuilt `ArchitectureFlow.tsx` — dark futuristic bg, blockchain network canvas, glassmorphism layer nodes with hover lift, animated SVG connector particles
- Added `index.css` utilities: `.glass-card`, `.glow-dot`, `.shimmer-line` keyframes for reuse
- Both sections now share consistent dark navy gradient backgrounds, per-layer accent colors, and inline hover JS for shadow/transform

## 2026-04-13 (architecture flow)
- Added `src/components/ArchitectureFlow.tsx` — new "Architecture Flow Diagram" section
- 5-layer stack diagram (App → Identity → Core → RWA → Multi-chain) with side callouts and arrow connectors
- GSAP scroll-triggered stagger on rows, connectors (scaleY), and side callouts
- Stats strip: 5 Layers · 100K+ TPS · <1s Latency · EVM+ multi-chain
- Wired into `src/App.tsx` `<HomePage>` between `<EcosystemCards>` and `<UseCasesCarousel>`

## 2026-04-13 (ecosystem pillars)
- Updated `src/components/EcosystemCards.tsx` — renamed section to "Six Pillars of Ecosystem"
- Expanded from 4 to 6 cards: Identity, GameFi, DEX, RWA, NFT Utility, DAO Governance
- Each card now shows "Core capabilities" pill badges; grid changed from 4-col to 3-col

## 2026-04-12 (pillar images)
- Updated `src/components/EcosystemCards.tsx` — replaced icon boxes with full-bleed Unsplash images on pillar cards
- Cards now have image header (h-44), gradient overlay, tag badge, and hover zoom effect
- Removed Phosphor icon imports (Wallet, Coins, ArrowsLeftRight, UsersThree) — no longer needed

## 2026-04-12 (new pages)
- Added `src/pages/WhitepaperPage.tsx` — whitepaper page with ToC, key highlights, PDF download CTA
- Added `src/pages/DocsPage.tsx` — documentation hub with search, 6 category cards, code snippet, article list
- Added `src/pages/CommunityPage.tsx` — forum page with channel grid, filterable threads, leaderboard
- Wired `/whitepaper`, `/docs`, `/community` routes in `src/App.tsx`
- Added Docs + Community links to `HeaderNav`; updated Footer Resources links to real routes

## 2026-04-12 (partners)
- Added `src/components/TrustedBySection.tsx` — "Trusted by Industry Leaders" grid with 12 partner cards
- Queries `PartnerLogo` entity from DB (ordered by `displayOrder`), falls back to 12 static partners
- GSAP scroll-triggered stagger animation on partner cards; decorative divider + stat strip below grid
- Wired into `HomePage` in `src/App.tsx` — placed between VisionSection and EcosystemCards

## 2026-04-12 (latest)
- Added `src/components/FAQSection.tsx` — 7 FAQ accordions with GSAP expand/collapse animations
- Added `src/data/blogPosts.ts` — 6 blog post data objects (Gaming, DeFi, Real Estate, Governance, Tech, Protocol)
- Added `src/components/FeaturedBlogsSection.tsx` — 3 featured cards + "View All Articles" → /blog
- Added `src/pages/BlogPage.tsx` — full blog listing with featured post, category filters, and search
- Added `src/pages/BlogPostPage.tsx` — individual article page with markdown-style render, tags, related posts
- Wired `/blog` and `/blog/:slug` routes in `src/App.tsx`; added "Blog" nav link in HeaderNav; updated Footer Blog link

## 2026-04-12 (prev)
- Added `src/pages/CareersPage.tsx` — /careers page with 7 open roles, perks section, and hiring CTA
- Added `src/pages/JobDetailPage.tsx` — /careers/:jobId detail page with full JD, apply mailto link, and interview process sidebar
- Wired `/careers` and `/careers/:jobId` routes in `src/App.tsx`
- Added "Careers" nav link in `src/components/HeaderNav.tsx`
- Updated "View Open Roles" CTA in `src/pages/TeamPage.tsx` to link to `/careers`

## 2026-04-12
- Added `src/pages/GamingPage.tsx`, `src/pages/DefiPage.tsx`, `src/pages/RealEstatePage.tsx` — full industry detail pages
- Wired `/gaming`, `/defi`, `/real-estate` routes in `src/App.tsx`
- Updated `src/components/UseCasesCarousel.tsx` — cards now navigate to their respective industry pages on click

## 2026-04-12
- Removed `bio` paragraph from team member cards in `src/pages/TeamPage.tsx`

## 2026-04-12
- Added `src/pages/TechnologyPage.tsx` — full technology page with pillars, architecture stack, stats, GSAP animations
- Added `src/pages/TeamPage.tsx` — full team page with core team, advisors, values, CTA; Unsplash portraits
- Installed `react-router-dom@6` and wired `createBrowserRouter` in `src/App.tsx`
- Updated `src/components/HeaderNav.tsx` — added Technology & Team nav links with `useNavigate`/`useLocation`
- Split `App.tsx` into `<Layout>`, `<HomePage>` and router config with `/technology` and `/team` routes

## 2026-04-12
- Fixed build error in `src/App.tsx`: removed stray `</script>` tag
</changelog>
