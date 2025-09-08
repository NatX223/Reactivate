import { NavigationItem, ModuleData, StepData, UseCaseData, TestimonialData } from '@/types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Modules', href: '#modules' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Docs', href: '/docs', external: true }
];

export const WORKFLOW_STEPS: StepData[] = [
  {
    id: 1,
    title: 'Create or Connect Wallet',
    description: 'Start with your EOA or deploy a smart wallet',
    icon: 'wallet'
  },
  {
    id: 2,
    title: 'Choose Actions',
    description: 'Schedule payments, set auto-invest rules, or enable auto-yield',
    icon: 'clock'
  },
  {
    id: 3,
    title: 'Add Modules',
    description: 'Developers provide plug-in modules for custom powers',
    icon: 'puzzle'
  },
  {
    id: 4,
    title: 'Run Autonomous Finance',
    description: 'Wallet acts for you, securely and transparently',
    icon: 'rocket'
  }
];

export const FEATURED_MODULES: ModuleData[] = [
  {
    id: 'autopay',
    name: 'AutoPay',
    description: 'Recurring payments made simple and reliable',
    icon: 'clock',
    tags: ['Payments', 'Automation']
  },
  {
    id: 'dca-bot',
    name: 'DCA Bot',
    description: 'Auto-invest DCA into ETH/USDC pairs on schedule',
    icon: 'trending-up',
    tags: ['Investing', 'DeFi']
  },
  {
    id: 'yield-aggregator',
    name: 'Yield Aggregator',
    description: 'Auto-stake into highest yield pools automatically',
    icon: 'layers',
    tags: ['Staking', 'Yield']
  },
  {
    id: 'custom-agent',
    name: 'Custom Agent',
    description: 'Developer-built strategies for advanced automation',
    icon: 'code',
    tags: ['Custom', 'Advanced']
  }
];

export const USE_CASES: UseCaseData[] = [
  {
    id: 'subscriptions',
    title: 'Recurring Subscriptions',
    description: 'Automate payments for services, DAOs, and donations',
    examples: ['Netflix subscriptions', 'DAO membership fees', 'Charity donations'],
    icon: 'repeat'
  },
  {
    id: 'investments',
    title: 'Automated Investments',
    description: 'Set up DCA strategies and AI-powered portfolio management',
    examples: ['Weekly ETH purchases', 'AI portfolio rebalancing', 'Yield farming automation'],
    icon: 'trending-up'
  },
  {
    id: 'dao-treasury',
    title: 'DAO Treasury Automation',
    description: 'Streamline treasury operations with scheduled payouts',
    examples: ['Contributor payments', 'Grant distributions', 'Yield optimization'],
    icon: 'users'
  },
  {
    id: 'agents',
    title: 'On-chain Agents',
    description: 'Custom bots built by developers for specialized tasks',
    examples: ['MEV protection', 'Arbitrage bots', 'Liquidation protection'],
    icon: 'bot'
  }
];

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: '1',
    quote: 'AutoWall saved me hours every week. I set up my DCA strategy once and it just works perfectly.',
    author: 'Sarah Chen',
    role: 'DeFi Investor',
    type: 'user'
  },
  {
    id: '2',
    quote: 'Building modules for AutoWall opened up a new revenue stream. The developer experience is fantastic.',
    author: 'Marcus Rodriguez',
    role: 'Smart Contract Developer',
    type: 'developer'
  },
  {
    id: '3',
    quote: 'Never missed a DAO payment again. The automation is seamless and trustworthy.',
    author: 'Alex Kim',
    role: 'DAO Contributor',
    type: 'user'
  },
  {
    id: '4',
    quote: 'The modular architecture makes it easy to extend wallet functionality. Great for our enterprise needs.',
    author: 'Jennifer Walsh',
    role: 'Blockchain Architect',
    type: 'developer'
  }
];

export const SOCIAL_LINKS = [
  { name: 'Farcaster', href: 'https://farcaster.xyz/autowall', icon: 'farcaster' },
  { name: 'Twitter', href: 'https://twitter.com/autowall', icon: 'twitter' },
  { name: 'GitHub', href: 'https://github.com/autowall', icon: 'github' },
  { name: 'Discord', href: 'https://discord.gg/autowall', icon: 'discord' }
];

export const FOOTER_SECTIONS = [
  {
    title: 'About',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Privacy', href: '/privacy' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'GitHub', href: 'https://github.com/autowall' },
      { label: 'API', href: '/api' }
    ]
  }
];