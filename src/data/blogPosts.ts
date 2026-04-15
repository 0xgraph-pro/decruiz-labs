export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "decruiz-labs-cross-chain-gaming-assets",
    title: "How Cross-Chain Asset Portability Is Transforming Web3 Gaming",
    excerpt:
      "Gaming studios lose players when they can't bring their hard-earned items across titles. DeCruiz Labs is eliminating that barrier with universal asset portability.",
    content: `
## The Problem With Siloed Game Assets

In traditional gaming, your Level 99 sword exists only in one game. You paid for it, you earned it, but you can't take it anywhere. Web3 promised to fix this — but fragmented chains made the problem worse, not better.

## Our Solution: Universal Asset Portability

DeCruiz Labs introduces a cross-chain asset standard that lets any gaming studio register items as interoperable NFTs. These assets carry metadata, provenance, and utility rules that travel with them across any supported chain.

## Developer Impact

Early partners report a 34% increase in player retention when cross-game asset portability is enabled. Players who can bring assets between games spend more, engage longer, and recruit their friends.

## What's Next

We're launching the Gaming SDK Beta in Q2 2026. Studios can apply for early access through the Developer Portal.
    `,
    category: "Gaming",
    author: "Marcus Reid",
    authorRole: "Head of Gaming Integrations",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop&face",
    coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80&auto=format&fit=crop",
    publishedAt: "2026-04-08",
    readTime: 6,
    tags: ["Gaming", "NFTs", "Interoperability", "SDK"],
  },
  {
    id: "2",
    slug: "defi-liquidity-real-world-assets",
    title: "Unlocking DeFi Liquidity for Real-World Assets at Scale",
    excerpt:
      "Real estate is a $326 trillion asset class with almost no on-chain liquidity. Here&#39;s how DeCruiz Labs is changing that equation.",
    content: `
## The Liquidity Problem in Real Estate

Real estate is the world&#39;s largest asset class, yet it remains largely illiquid. Tokenization promises fractional ownership, but without DeFi-native liquidity, tokenized properties are still locked behind slow sale cycles.

## DeCruiz Labs RWA Framework

We built a Real-World Asset (RWA) framework that bridges property tokens to DeFi lending protocols. Licensed property tokens can now serve as collateral for on-chain loans — removing the illiquidity premium that has plagued the market.

## Early Results

In our pilot with two real estate partners, over $2.1M in otherwise illiquid property equity was made available as lending collateral within 72 hours of integration.

## The Path Forward

Our RWA module is currently in private beta. We're onboarding select institutional partners and plan a public mainnet launch in Q3 2026.
    `,
    category: "DeFi",
    author: "Priya Nair",
    authorRole: "Protocol Research Lead",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop&face",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&auto=format&fit=crop",
    publishedAt: "2026-04-04",
    readTime: 7,
    tags: ["DeFi", "RWA", "Real Estate", "Tokenization"],
  },
  {
    id: "3",
    slug: "governance-dao-q1-2026-recap",
    title: "DAO Governance Q1 2026 Recap: What the Community Voted On",
    excerpt:
      "From treasury diversification to new chain support, here&#39;s a full breakdown of every proposal that passed this quarter.",
    content: `
## A Landmark Quarter for Decentralized Governance

Q1 2026 was the most active quarter in DeCruiz Labs DAO history. Over 14,000 unique wallets cast votes across 12 governance proposals — a 3x increase from Q4 2025.

## Key Proposals Passed

**Proposal #34: zkSync Era Integration**
Passed with 87% approval. zkSync Era will be integrated as a supported chain by Q3 2026.

**Proposal #35: Treasury Diversification**
Passed with 72% approval. 15% of treasury holdings will be moved into stablecoin reserves to reduce volatility exposure.

**Proposal #36: Developer Grants Round 2**
Passed with 91% approval. $500K allocated to a new developer grants program targeting gaming studio integration.

## What&#39;s on the Q2 Agenda

Community discussion is active around chain fee subsidies, ambassador program expansion, and a new security bounty structure. Join the forum to have your say.
    `,
    category: "Governance",
    author: "Elena Vasquez",
    authorRole: "Community Lead",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop&face",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
    publishedAt: "2026-03-31",
    readTime: 5,
    tags: ["Governance", "DAO", "Community", "Protocol"],
  },
  {
    id: "4",
    slug: "zk-proof-bridge-security-audit",
    title: "Our zk-Proof Bridge Passes Independent Security Audit",
    excerpt:
      "Trail of Bits completed a comprehensive audit of our cross-chain bridge. Here&#39;s what they found — and what we improved.",
    content: `
## Why Security Audits Matter in Web3

Bridge exploits have cost the industry over $2 billion. At DeCruiz Labs, security is not an afterthought — it is the product. We commissioned Trail of Bits to perform a full audit of our zk-proof bridge before any mainnet launch.

## Audit Scope

Trail of Bits reviewed our Solidity smart contracts, our zk-circuit implementations, and our off-chain relayer infrastructure over a 6-week engagement.

## Findings Summary

- **Critical Issues:** 0
- **High Severity:** 1 (patched)
- **Medium Severity:** 3 (all patched)
- **Low / Informational:** 7 (5 patched, 2 acknowledged)

The single high-severity issue related to a reentrancy edge case in the fee collection module — patched in commit a7f392c and re-verified.

## Moving Forward

The full audit report is available on our GitHub. We plan bi-annual audits going forward, supplemented by an ongoing bug bounty program.
    `,
    category: "Technology",
    author: "James Okafor",
    authorRole: "Head of Protocol Security",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop&face",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80&auto=format&fit=crop",
    publishedAt: "2026-03-22",
    readTime: 8,
    tags: ["Security", "Audit", "Bridge", "Technology"],
  },
  {
    id: "5",
    slug: "real-estate-tokenization-primer",
    title: "A Developer&#39;s Primer: Tokenizing Real Estate on DeCruiz Labs",
    excerpt:
      "Step-by-step walkthrough for real estate developers and platforms looking to integrate property tokenization with our SDK.",
    content: `
## Who This Guide Is For

This guide is for developers at real estate platforms, proptech companies, or individual builders who want to tokenize property ownership using the DeCruiz Labs SDK.

## Prerequisites

- A Solidity development environment (Hardhat or Foundry)
- Basic understanding of ERC-1155 token standards
- A DeCruiz Labs developer account (free)

## Step 1: Install the SDK

\`\`\`bash
npm install @decruizlabs/sdk
\`\`\`

## Step 2: Register a Property

Use the PropertyRegistry contract to register a real-world property with its legal metadata hash, valuation, and ownership structure.

## Step 3: Issue Fractional Tokens

Fractional ERC-1155 tokens representing ownership shares can be minted with a single SDK call, complete with compliance metadata for accredited investor checks.

## Step 4: Connect to Liquidity

Registered property tokens are automatically eligible for the DeCruiz DeFi liquidity module — enabling lending, yield, and secondary market trading.
    `,
    category: "Real Estate",
    author: "Lena Hoffmann",
    authorRole: "Developer Relations",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80&auto=format&fit=crop&face",
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop",
    publishedAt: "2026-03-15",
    readTime: 10,
    tags: ["Real Estate", "SDK", "Developer", "Tokenization"],
  },
  {
    id: "6",
    slug: "decruiz-testnet-launch",
    title: "DeCruiz Labs Testnet Is Live — Here&#39;s How to Get Involved",
    excerpt:
      "Our cross-chain testnet is now open to the public. Developers, testers, and community members can start exploring the protocol today.",
    content: `
## What Is the DeCruiz Testnet?

The DeCruiz Labs testnet is a fully functional deployment of our protocol across Ethereum Sepolia, Arbitrum Goerli, and Polygon Mumbai. It lets developers integrate, test, and break things before mainnet.

## How to Connect

1. Add the DeCruiz testnet RPCs to your wallet
2. Claim test $DCZ tokens from our faucet at faucet.decruizlabs.com
3. Explore the testnet dashboard at testnet.decruizlabs.com

## Bug Bounty

We&#39;re running a testnet bug bounty with rewards up to $5,000 in $DCZ for critical finds. All submissions go through our security portal.

## What to Test

We&#39;re especially looking for feedback on cross-chain latency, bridge fee accuracy, and wallet UX flows. File issues on our GitHub or share observations in the developer forum.

## Timeline

Testnet will run for at least 12 weeks before our planned mainnet launch.
    `,
    category: "Protocol",
    author: "DeCruiz Labs Team",
    authorRole: "Core Team",
    authorAvatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=80&q=80&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop",
    publishedAt: "2026-03-10",
    readTime: 4,
    tags: ["Testnet", "Protocol", "Developers", "Bug Bounty"],
  },
];
