const fs = require('fs');
const path = require('path');

const baseHtmlPath = path.join(__dirname, 'services', 'reputation-communications', 'corporate-communications.html');
let baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

const pages = [
  {
    folder: 'reputation-communications',
    filename: 'public-relations.html',
    title: 'Public Relations (PR) Agency in Thane | ChimpzLab',
    description: 'Media relations, press outreach and spokesperson training that build real credibility, not just coverage counts. Book a strategy call.',
    primaryKw: 'PR agency India, public relations services',
    secondaryKw: 'media relations agency, press outreach agency Thane',
    heroText: 'Coverage that builds credibility, not just clippings',
    approachText1: 'Public relations is the work of earning credible third-party coverage through real media relationships, not just pushing out releases and hoping. Being mentioned in the press is not the same as being seen as a voice worth listening to. We run media relations that put your leadership and your brand where the right audiences already pay attention.',
    approachText2: 'Journalists cover stories, not announcements. So we start with what actually makes your business worth writing about, then take it to the people who cover your space.',
    dropdownValue: 'public-relations',
    servicesTitle: 'What this includes',
    services: [
      'Media relations and press outreach',
      'Product and company launch PR',
      'Spokesperson media training',
      'Award and speaking placement support',
      'Press release strategy and drafting'
    ],
    processTitle: 'Our process',
    process: [
      'Media landscape audit',
      'Story and angle development',
      'Outreach and placement',
      'Coverage tracking and follow-up'
    ],
    faqs: [
      { q: 'How is this different from just sending press releases?', a: 'A press release is one tactic. We build relationships with the right journalists and pitch stories that fit what they actually cover, which is what earns real coverage. Mass-blasted releases rarely do.' },
      { q: 'Do you guarantee coverage?', a: 'No honest agency can. What we guarantee is a structured, consistent outreach process built on real media relationships and stories worth covering.' },
      { q: 'How long before we see coverage?', a: 'First placements usually land within 60 to 90 days, once the media list and story angles are in place. Momentum builds from there as relationships deepen.' },
      { q: 'Can you train our spokespeople for interviews?', a: 'Yes. Spokesperson media training is part of the offering, so your leaders go into interviews clear on the message and comfortable on the record.' }
    ]
  },
  {
    folder: 'reputation-communications',
    filename: 'thought-leadership.html',
    title: 'Thought LeadershipAgency in Thane | ChimpzLab',
    description: 'Bylines, panels and LinkedIn presence that put your leaders’ expertise in front of the right audience. Book a strategy call.',
    primaryKw: 'thought leadership agency, executive visibility',
    secondaryKw: 'LinkedIn ghostwriting agency, executive personal branding India',
    heroText: 'Make your leaders’ expertise visible',
    approachText1: 'Thought leadership is the practice of turning a leader’s genuine expertise into public content that builds trust, through bylines, panels, commentary and a consistent presence online. Your leaders know things worth hearing. Most of it never leaves the boardroom. We change that.',
    approachText2: 'The version that works sounds like your leader, not a ghostwriter. So we spend time up front getting their actual thinking on record, then build everything from there.',
    dropdownValue: 'thought-leadership',
    servicesTitle: 'What this includes',
    services: [
      'Ghostwritten bylines and op-eds',
      'LinkedIn executive presence and content',
      'Speaking opportunity sourcing',
      'Industry commentary and trend-response programmes',
      'Executive interview and podcast placement'
    ],
    processTitle: 'Our process',
    process: [
      'Voice and positioning discovery',
      'Content and opportunity calendar',
      'Ghostwriting and placement',
      'Visibility tracking'
    ],
    faqs: [
      { q: 'Will this actually sound like our leaders, not a generic ghostwriter?', a: 'Yes, and that is the whole point of the voice and positioning discovery we start with. The output is built to sound like your leader’s real thinking, not templated commentary.' },
      { q: 'How much time will our leadership team need to commit?', a: 'Usually a short, structured interview per piece. We handle the writing, research and placement around that conversation, so the time cost stays low.' },
      { q: 'Which platforms does this focus on?', a: 'Mostly published bylines and LinkedIn, plus speaking and podcast placements. The mix depends on where your buyers and investors actually spend attention.' },
      { q: 'Can this support a founder as well as a company?', a: 'Yes. A lot of the strongest thought leadership is built around a founder or a senior leader, because people trust a named expert more than a logo.' }
    ]
  },
  {
    folder: 'reputation-communications',
    filename: 'employer-branding.html',
    title: 'Employer Branding Agency in Thane | ChimpzLab',
    description: 'Careers content and an employer value proposition that make your hiring pitch match your real culture. Book a strategy call.',
    primaryKw: 'employer branding agency India, employer value proposition',
    secondaryKw: 'careers page content agency, recruitment marketing India',
    heroText: 'Make your careers page match the company people actually join',
    approachText1: 'Employer branding is the work of shaping how your company is seen as a place to work, through your careers content, your value proposition and the visibility of your leaders and team. Candidates research you the same way your customers do. If your careers page does not reflect what it is really like to work there, your best people find out during the interview, or worse, after they join.',
    approachText2: 'A believable employer brand comes from what your team actually says about the place, not from what HR wishes were true. So that is where we start.',
    dropdownValue: 'employer-branding',
    servicesTitle: 'What this includes',
    services: [
      'Employer value proposition (EVP) development',
      'Careers page content and structure',
      'Leadership visibility for hiring',
      'Employee advocacy and storytelling programmes',
      'Recruitment campaign content'
    ],
    processTitle: 'Our process',
    process: [
      'Culture and EVP discovery',
      'Careers content and messaging',
      'Employee storytelling and advocacy',
      'Ongoing content support'
    ],
    faqs: [
      { q: 'Do you interview our employees as part of this?', a: 'Yes. A real EVP comes from what your team actually says about working there, not from assumptions made in a meeting room.' },
      { q: 'Can this tie into our social media presence?', a: 'Yes. Employer branding content is usually coordinated with your social media, so leadership and employee visibility reinforce each other.' },
      { q: 'What is an employer value proposition?', a: 'It is the clear, honest answer to why someone should work for you rather than a competitor. It becomes the backbone of your careers page, job posts and hiring content.' },
      { q: 'How is this different from just writing job descriptions?', a: 'Job descriptions list a role. Employer branding shapes the whole impression a candidate forms while researching you, long before they read a single JD.' }
    ]
  },
  {
    folder: 'visibility-search',
    filename: 'seo-aeo.html',
    title: 'SEO and AEO Agency in Thane | ChimpzLab',
    description: 'Rank on Google and get cited inside AI answers on ChatGPT and Google AI Overviews. Book a strategy call with ChimpzLab.',
    primaryKw: 'SEO agency India, AEO services',
    secondaryKw: 'answer engine optimisation agency, technical SEO agency Thane',
    heroText: 'Rank on Google. Get cited by AI.',
    approachText1: 'SEO gets your pages ranked in search results. AEO, or answer engine optimisation, structures that same content so AI engines like ChatGPT and Google AI Overviews can pull it out and cite it as the answer. Search has split into these two lanes, and we build for both from the same technical and content base.',
    approachText2: 'Treating them as separate projects just doubles the work and leaves gaps. One strategy, one foundation, both outcomes.',
    dropdownValue: 'seo-aeo',
    servicesTitle: 'What this includes',
    services: [
      'Technical SEO audits and fixes',
      'Keyword and topical strategy',
      'On-page and content optimisation',
      'Answer-engine-structured content for AEO',
      'Schema markup and structured data'
    ],
    processTitle: 'Our process',
    process: [
      'Technical and visibility audit',
      'Keyword and topic strategy',
      'On-page and content optimisation',
      'Reporting on rankings and AI citations'
    ],
    faqs: [
      { q: 'How is AEO different from regular SEO?', a: 'SEO gets you ranked in Google’s list of links. AEO structures that same content so AI engines like ChatGPT and Google AI Overviews can extract and cite it directly as an answer.' },
      { q: 'How long until we see results?', a: 'Technical fixes usually show early signals in 4 to 8 weeks. Steady rankings and AI citations build over 3 to 6 months, depending on competition.' },
      { q: 'Do we really need AEO, or is SEO enough for now?', a: 'More and more searches end in an AI answer without a click. If you only optimise for the ranked list, you stay invisible in that answer. Building both is how you stay found on either path.' },
      { q: 'Will you fix our existing content or only write new pages?', a: 'Both. We often get more from optimising and restructuring content you already have than from adding new pages, and we do whichever moves the needle.' }
    ]
  },
  {
    folder: 'visibility-search',
    filename: 'social-media-marketing.html',
    title: 'Social Media Marketing Agency in Thane | ChimpzLab',
    description: 'Platform-specific content and community management tied to real business goals, not vanity metrics. Book a strategy call.',
    primaryKw: 'social media marketing agency India',
    secondaryKw: 'Instagram marketing agency Thane, LinkedIn marketing agency',
    heroText: 'Social media tied to business goals, not post counts',
    approachText1: 'Social media marketing is the practice of building and running platform-specific content and community that ties back to a real business goal, whether that is visibility, engagement or leads. Posting consistently is not a strategy on its own. We build programmes with a point, and we measure them against it.',
    approachText2: 'Where your audience actually is decides where we invest, not a one-size template that spreads you thin across every platform.',
    dropdownValue: 'social-media-marketing',
    servicesTitle: 'What this includes',
    services: [
      'Platform strategy across Instagram, LinkedIn and more',
      'Content calendars and scheduled posting',
      'Community management and response',
      'Paid social amplification',
      'Performance reporting tied to goals'
    ],
    processTitle: 'Our process',
    process: [
      'Platform and audience audit',
      'Content strategy and calendar',
      'Content production and posting',
      'Reporting and optimisation'
    ],
    faqs: [
      { q: 'Which platforms do you manage?', a: 'Mainly Instagram and LinkedIn, with the choice driven by where your actual audience is rather than a fixed package.' },
      { q: 'Do you also run paid social ads?', a: 'Yes. Paid social amplification is available within this service, or integrated with our performance marketing team for bigger campaigns.' },
      { q: 'Do you create the content, or do we?', a: 'We can produce it end to end, or work alongside your in-house team and lead the strategy and calendar. Both models work.' },
      { q: 'How do you measure social media success?', a: 'Against the goal we set at the start, whether that is reach, engagement, followers of the right kind, or leads. We do not report vanity numbers that do not connect to the business.' }
    ]
  },
  {
    folder: 'visibility-search',
    filename: 'content-writing.html',
    title: 'Content Writing Agency in Thane | ChimpzLab',
    description: 'SEO-led content built around what your audience is actually searching and asking. Book a strategy call with ChimpzLab.',
    primaryKw: 'content writing agency India, content marketing agency',
    secondaryKw: 'SEO content writing services, blog writing agency Thane',
    heroText: 'Content built around what your audience is actually searching',
    approachText1: 'Content writing here means SEO-led writing built from real keyword and audience research, not a calendar filled with whatever was easy to write. Most content misses because it answers questions nobody is asking. We start with what your buyers actually search and ask, then write to own those answers.',
    approachText2: 'Good content is a long-term asset. Written well and structured right, one article keeps pulling in the right readers for years.',
    dropdownValue: 'content-writing',
    servicesTitle: 'What this includes',
    services: [
      'Blog and article strategy',
      'Content calendars',
      'SEO-led content writing',
      'Content repurposing across channels',
      'Content performance tracking'
    ],
    processTitle: 'Our process',
    process: [
      'Audience and keyword research',
      'Content strategy and calendar',
      'Writing and production',
      'Repurposing and performance tracking'
    ],
    faqs: [
      { q: 'Do you write the content, or just plan it?', a: 'Both. Strategy and writing are handled together, so what gets planned is what actually gets published, on schedule.' },
      { q: 'Can you work with our existing content team?', a: 'Yes. We can lead the strategy while your team writes, or handle both the strategy and the writing ourselves.' },
      { q: 'Is the writing built for SEO and for AI answers?', a: 'Yes. We structure content so it ranks in search and so AI answer engines can extract and cite it, since both matter now.' },
      { q: 'How much content do we need to see results?', a: 'It depends on your space and how competitive the topics are. We prioritise a focused set of high-intent pieces over a high volume of thin ones.' }
    ]
  },
  {
    folder: 'visibility-search',
    filename: 'influencer-marketing.html',
    title: 'Influencer Marketing Agency in Thane | ChimpzLab',
    description: 'Influencer partnerships measured on real impact, not follower count. Book a strategy call with ChimpzLab.',
    primaryKw: 'influencer marketing agency India',
    secondaryKw: 'creator marketing agency Thane, UGC campaign agency',
    heroText: 'Influencer partnerships measured on impact, not followers',
    approachText1: 'Influencer marketing is about partnering with creators whose audience genuinely fits yours, then measuring the work on real outcomes rather than reach. A big follower count does not promise the right audience or any actual impact. We identify and manage partnerships built around fit and results you can point to.',
    approachText2: 'The wrong creator with a huge following often does less than the right creator with a smaller, sharper audience. We optimise for the second one.',
    dropdownValue: 'influencer-marketing',
    servicesTitle: 'What this includes',
    services: [
      'Influencer identification and vetting',
      'Campaign strategy and creative briefs',
      'Contracting and campaign management',
      'Performance tracking and reporting',
      'Creator and UGC content licensing'
    ],
    processTitle: 'Our process',
    process: [
      'Audience and category research',
      'Influencer identification and vetting',
      'Campaign execution',
      'Performance reporting'
    ],
    faqs: [
      { q: 'How do you measure ROI beyond follower count?', a: 'Through engagement quality, how well the creator’s audience overlaps your target market, and where it can be tracked, direct attribution to traffic or sales.' },
      { q: 'Do you work with micro-influencers or only large creators?', a: 'Both. The right size depends on your category and goals, not a default preference for the biggest reach.' },
      { q: 'How do you vet creators before a campaign?', a: 'We check audience authenticity, real engagement, brand fit and past content, so you are not paying for inflated numbers or a mismatch with your brand.' },
      { q: 'Can you handle contracts and the whole campaign, not just introductions?', a: 'Yes. We manage briefs, contracting, delivery and reporting end to end, so you are not left coordinating creators yourself.' }
    ]
  },
  {
    folder: 'creative',
    filename: 'branding.html',
    title: 'Branding and Brand Identity Agency in Thane | ChimpzLab',
    description: 'Visual identity and design systems that hold up across every touchpoint. Book a strategy call with ChimpzLab.',
    primaryKw: 'branding agency India, brand identity design',
    secondaryKw: 'brand identity agency Thane, brand guidelines design',
    heroText: 'Design systems that hold together everywhere',
    approachText1: 'Branding is the work of building a full visual identity and design system, not just a logo, so your brand looks consistent from a pitch deck to a billboard. A logo on its own is not a brand. We build the system around it, the colours, type, layouts and rules that keep everything recognisably you.',
    approachText2: 'When the system is right, every new asset takes less time and still looks part of the same family. That consistency is what makes a brand feel established.',
    dropdownValue: 'branding',
    servicesTitle: 'What this includes',
    services: [
      'Brand identity and guidelines',
      'Collateral and campaign design',
      'Packaging and print design',
      'Design systems for digital products'
    ],
    processTitle: 'Our process',
    process: [
      'Brand and audience discovery',
      'Identity concept development',
      'Design system build',
      'Guidelines and rollout'
    ],
    faqs: [
      { q: 'Do you design logos, or only broader brand systems?', a: 'Both. Logo design is part of the identity process and is built alongside the wider system, so it never ends up sitting on its own.' },
      { q: 'Can you refresh an existing brand instead of a full rebrand?', a: 'Yes. Brand refreshes are common, and usually faster and lower cost than a full identity rebuild.' },
      { q: 'What do brand guidelines actually cover?', a: 'They set the rules for your logo, colours, typography, imagery and layouts, so anyone creating for the brand, in-house or outside, stays consistent.' },
      { q: 'How long does a branding project take?', a: 'A full identity typically runs a few weeks depending on scope. A focused refresh is quicker. We scope the timeline once we know what you need.' }
    ]
  },
  {
    folder: 'creative',
    filename: 'video-production.html',
    title: 'Corporate Video Production Agency in Thane | ChimpzLab',
    description: 'Video planned to perform, from concept through final cut. Book a strategy call with ChimpzLab.',
    primaryKw: 'video production agency India, corporate video production',
    secondaryKw: 'brand film production Thane, short-form video agency',
    heroText: 'Video planned to perform, not just look good',
    approachText1: 'Video production here means planning video around where and how your audience will actually watch it, from the first concept through the final cut. A beautiful film that does not fit its channel is a wasted budget. We plan for distribution before we plan the shoot.',
    approachText2: 'One well-planned shoot can feed a whole campaign. We build for that, capturing the longer film and the short cuts together instead of going back for more.',
    dropdownValue: 'video-production',
    servicesTitle: 'What this includes',
    services: [
      'Concept development and scripting',
      'Shoot production and direction',
      'Editing and post-production',
      'Short-form and campaign video cutdowns'
    ],
    processTitle: 'Our process',
    process: [
      'Concept and scripting',
      'Pre-production planning',
      'Shoot',
      'Edit, post-production and delivery'
    ],
    faqs: [
      { q: 'Can you produce both long-form and short-form video from one shoot?', a: 'Yes. We plan shoots to generate a campaign-length film alongside short-form cuts for social, from the same production, rather than shooting twice.' },
      { q: 'Do you handle locations, casting and production logistics?', a: 'Yes. Full production management is part of the service, not just the edit.' },
      { q: 'Do you write the script and concept, or only shoot?', a: 'We can take it from a blank page, developing the concept and script, or step in to produce and edit around a concept you already have.' },
      { q: 'What kinds of video do you produce?', a: 'Brand films, corporate and product videos, campaign films and consistent short-form content for social. The format follows the goal and the channel.' }
    ]
  },
  {
    folder: 'creative',
    filename: 'design.html',
    title: 'Design Agency in Thane | ChimpzLab',
    description: 'Purpose-built visuals made to solve a problem and communicate clearly, from decks to reports. Book a strategy call.',
    primaryKw: 'design agency India, graphic design agency',
    secondaryKw: 'presentation design agency Thane, report design agency',
    heroText: 'Visuals built to communicate, not just decorate',
    approachText1: 'Design here means purpose-built visual work made to solve a specific problem and communicate clearly, across decks, collateral, reports, ads and infographics. Too much design just fills a layout with something that looks nice. We start from what the piece has to achieve, then design toward it.',
    approachText2: 'Clear beats clever most of the time. A well-designed report or deck earns attention because people can follow it, not just because it looks polished.',
    dropdownValue: 'design',
    servicesTitle: 'What this includes',
    services: [
      'Editorial design',
      'Presentation and pitch decks',
      'Marketing collateral',
      'Print and digital advertising assets',
      'Report and infographic design'
    ],
    processTitle: 'Our process',
    process: [
      'Brief and objective',
      'Concept and layout',
      'Design and production',
      'Review and delivery'
    ],
    faqs: [
      { q: 'Do you work within our existing brand, or design from scratch?', a: 'Both. We can design inside your current brand system, or help build one first if your identity is not holding together.' },
      { q: 'Can you design pitch decks and investor presentations?', a: 'Yes. Presentation and pitch deck design is a core part of this service, built to make complex information easy to follow.' },
      { q: 'Do you handle both print and digital design?', a: 'Yes. From print collateral and reports to digital ads and social assets, all handled by the same team so the look stays consistent.' },
      { q: 'Can you take on a large one-time project like an annual report?', a: 'Yes. Report and editorial design, including large one-time projects, is something we produce regularly.' }
    ]
  },
  {
    folder: 'demand-generation',
    filename: 'performance-marketing.html',
    title: 'Performance Marketing and Paid Media Agency in Thane | ChimpzLab',
    description: 'Paid campaigns optimised around pipeline and revenue, not just cost-per-click. Book a strategy call with ChimpzLab.',
    primaryKw: 'performance marketing agency India, paid media agency',
    secondaryKw: 'Google Ads agency Thane, Meta ads agency',
    heroText: 'Paid campaigns optimised for pipeline, not cost-per-click',
    approachText1: 'Performance marketing is paid advertising built and optimised around what happens after the click, leads and revenue, rather than around a low cost-per-click on its own. A cheap click that never becomes a lead is not a saving. We run campaigns across Google, Meta and other channels and optimise them against the pipeline they produce.',
    approachText2: 'The ad is only half the job. What the click lands on, and what happens next, decides whether the spend pays off.',
    dropdownValue: 'performance-marketing',
    servicesTitle: 'What this includes',
    services: [
      'Paid search and social campaigns',
      'Audience targeting and segmentation',
      'Budget and bid optimisation',
      'Attribution and reporting'
    ],
    processTitle: 'Our process',
    process: [
      'Funnel and channel audit',
      'Campaign strategy and targeting',
      'Launch and optimisation',
      'Reporting tied to pipeline'
    ],
    faqs: [
      { q: 'Which platforms do you run campaigns on?', a: 'Mainly Google Ads and Meta, with other channels added based on where your audience actually converts.' },
      { q: 'Do you also optimise the landing pages the ads point to?', a: 'Yes. Ad and landing page performance are managed together, since one caps the other. This ties into our vetted lead generation work.' },
      { q: 'How is performance measured?', a: 'On cost-per-qualified-lead and pipeline contribution wherever your sales process allows it, not just clicks or platform-reported conversions.' },
      { q: 'Do you need a big budget to start?', a: 'No. We scope spend to your goals and scale it as the campaigns prove out, rather than pushing a fixed minimum.' }
    ]
  },
  {
    folder: 'demand-generation',
    filename: 'email-marketing.html',
    title: 'Email Marketing Agency in Thane | ChimpzLab',
    description: 'Lifecycle email that nurtures and converts, not a newsletter nobody opens. Book a strategy call with ChimpzLab.',
    primaryKw: 'email marketing agency India',
    secondaryKw: 'email automation agency Thane, lifecycle email marketing',
    heroText: 'Email that nurtures and converts',
    approachText1: 'Email marketing here means building lifecycle sequences that move a lead toward a decision based on where they actually are, not blasting one newsletter to everyone. A monthly send to your whole list is not a strategy. We build email that reflects each stage and does real work in your funnel.',
    approachText2: 'Done right, email is one of the few channels you fully own. It keeps nurturing leads long after the ad budget stops.',
    dropdownValue: 'email-marketing',
    servicesTitle: 'What this includes',
    services: [
      'Lifecycle and nurture sequences',
      'Campaign design and copywriting',
      'List segmentation and targeting',
      'Deliverability and performance optimisation'
    ],
    processTitle: 'Our process',
    process: [
      'List and lifecycle audit',
      'Sequence and segmentation strategy',
      'Design and copy production',
      'Performance optimisation'
    ],
    faqs: [
      { q: 'Do you work with our existing email platform?', a: 'Yes. We work inside your current tool, including Mailchimp, HubSpot, Klaviyo and similar, rather than forcing a migration.' },
      { q: 'How do you improve deliverability, not just open rates?', a: 'Through list hygiene, sender reputation management and proper segmentation, so your emails reach the inbox in the first place, not just through subject line tweaks.' },
      { q: 'Can you write the emails, or only set up the sequences?', a: 'Both. Copy, design and the sequence logic are handled together, so the messages and the timing work as one.' },
      { q: 'What counts as a good result from email?', a: 'Movement in the funnel, replies, and conversions from nurtured leads, tied to your sales process. Opens and clicks are signals along the way, not the end goal.' }
    ]
  },
  {
    folder: 'demand-generation',
    filename: 'marketing-automation.html',
    title: 'Marketing Automation Agency in Thane | ChimpzLab',
    description: 'Automation workflows that move leads from click to sales-ready without manual follow-up. Book a strategy call.',
    primaryKw: 'marketing automation agency India',
    secondaryKw: 'HubSpot automation agency, lead nurturing automation Thane',
    heroText: 'Workflows that keep running in the background',
    approachText1: 'Marketing automation is the practice of building workflows that move leads forward on their own, from first click to sales-ready, without someone manually chasing each one. Automation set up once and never revisited stops working within months. We design workflows and keep them tuned so they keep earning their place.',
    approachText2: 'The point is to free up your team’s time. The system handles the routine follow-up, and your people step in when a lead is actually worth a conversation.',
    dropdownValue: 'marketing-automation',
    servicesTitle: 'What this includes',
    services: [
      'Automation workflow design',
      'CRM and marketing tool integration',
      'Lead scoring',
      'Ongoing workflow optimisation'
    ],
    processTitle: 'Our process',
    process: [
      'Current stack and workflow audit',
      'Workflow and lead-scoring design',
      'Build and integration',
      'Ongoing optimisation'
    ],
    faqs: [
      { q: 'What CRM and automation tools do you work with?', a: 'HubSpot, Zoho, ActiveCampaign, Salesforce and similar. We work inside your existing stack wherever possible.' },
      { q: 'Can you set up lead scoring from scratch?', a: 'Yes. Lead scoring is built around your actual sales process and past conversion data, so the scores mean something to your team.' },
      { q: 'What can actually be automated?', a: 'Lead nurturing, follow-ups, routing to the right salesperson, internal alerts and scoring, among others. We automate the repeatable parts so your team focuses on the human ones.' },
      { q: 'Will automation feel robotic to our leads?', a: 'Not if it is built well. Good automation is timely and relevant, so it reads as helpful follow-up rather than obvious mass mailing.' }
    ]
  },
  {
    folder: 'demand-generation',
    filename: 'vetted-lead-generation.html',
    title: 'Vetted Lead Generation Agency in Thane | ChimpzLab',
    description: 'Every lead checked by AI and a human for budget, intent and timeframe, with call and WhatsApp verification, before it reaches your team. Book a strategy call.',
    primaryKw: 'vetted lead generation agency India, verified lead generation',
    secondaryKw: 'qualified lead generation Thane, lead verification service',
    heroText: 'Leads verified before they reach your sales team',
    approachText1: 'Vetted lead generation is lead generation where every lead is checked by a combination of AI and a human, for budget, intent and timeframe, before it is ever handed to your sales team. Most lead gen fills a pipeline with names your team then wastes hours qualifying. We do that filtering first, with call and WhatsApp verification, so what reaches you is worth the follow-up.',
    approachText2: 'The difference is where the qualifying happens. We put it before the handover, not after, so your team spends its time closing rather than chasing dead ends.',
    dropdownValue: 'vetted-lead-generation',
    servicesTitle: 'What this includes',
    services: [
      'Landing page audits and redesign',
      'A/B testing',
      'Funnel and drop-off analysis',
      'Conversion work for ad-traffic pages',
      'Call verification',
      'WhatsApp verification'
    ],
    processTitle: 'Our process',
    process: [
      'Funnel and landing page audit',
      'Conversion redesign and testing',
      'AI and human lead verification',
      'Verified handover and reporting'
    ],
    faqs: [
      { q: 'What does vetted lead generation actually mean?', a: 'Every lead is checked by a mix of AI and a human before it reaches you. We confirm budget, intent and timeframe, and verify contact details over call and WhatsApp, so your team only follows up on real prospects.' },
      { q: 'How is this different from normal lead generation?', a: 'Normal lead gen hands over raw enquiries and leaves the qualifying to your team. We qualify first, so you receive leads that are already checked, not a list you have to sift through.' },
      { q: 'Do you also fix the pages that capture the leads?', a: 'Yes. Landing page audits, conversion redesign and A/B testing are part of this, because better pages mean better leads to begin with.' },
      { q: 'How do call and WhatsApp verification work?', a: 'Before handover, we confirm the lead is a real, reachable person with genuine interest through a call or a WhatsApp check, which filters out fake and mismatched enquiries.' }
    ]
  },
  {
    folder: 'digital-experiences',
    filename: 'website-design-development.html',
    title: 'Website Design and Development Agency in Thane | ChimpzLab',
    description: 'Websites built around your actual conversion goals, not a redesign for its own sake. Book a strategy call.',
    primaryKw: 'website design and development agency India',
    secondaryKw: 'web development agency Thane, WordPress development agency',
    heroText: 'Websites built around conversion, not just appearance',
    approachText1: 'Website design and development here means building a site around specific conversion goals, from UX through to launch, rather than redesigning for the sake of a fresh look. A site that looks better but converts the same is not a win. We design and build around what you actually need visitors to do.',
    approachText2: 'Speed, clarity and structure carry as much weight as the visuals. A fast, clear site earns trust and gets found. A slow, pretty one loses both.',
    dropdownValue: 'website-design-development',
    servicesTitle: 'What this includes',
    services: [
      'UX and UI design',
      'Custom development',
      'CMS builds on WordPress, Shopify or headless',
      'Performance and speed optimisation'
    ],
    processTitle: 'Our process',
    process: [
      'UX and technical audit',
      'Design and prototyping',
      'Development and build',
      'Launch and performance testing'
    ],
    faqs: [
      { q: 'Do you build on WordPress, Shopify or custom code?', a: 'Whichever fits your team. We build on WordPress, Shopify and custom stacks, and advise on the right choice if you are starting fresh.' },
      { q: 'Will the site be built with SEO in mind from the start?', a: 'Yes. Technical SEO foundations are part of every build and are coordinated with our search team, not bolted on later.' },
      { q: 'Do you handle content and copy, or only the build?', a: 'We can handle both. Our content and design teams work alongside development, so the site launches with copy that fits, not placeholder text.' },
      { q: 'Do you maintain the site after launch?', a: 'Yes. We can hand over a finished build, or stay on for updates, monitoring and ongoing improvement.' }
    ]
  },
  {
    folder: 'digital-experiences',
    filename: 'landing-pages.html',
    title: 'Landing Page Design Agency in Thane | ChimpzLab',
    description: 'Purpose-built campaign landing pages, launched fast and built to convert. Book a strategy call with ChimpzLab.',
    primaryKw: 'landing page design agency India',
    secondaryKw: 'campaign landing page agency Thane, conversion landing page design',
    heroText: 'Campaign pages built fast, built to convert',
    approachText1: 'A landing page is a focused, single-goal page built for a specific campaign and made to convert the traffic you are already paying for. A page that takes weeks to build arrives after the campaign has lost momentum. We build focused, fast-turnaround pages designed around one clear action.',
    approachText2: 'Every element earns its place or it goes. On a landing page, anything that does not push toward the goal is just something to distract the visitor.',
    dropdownValue: 'landing-pages',
    servicesTitle: 'What this includes',
    services: [
      'Campaign-specific landing pages',
      'A/B-testable page builds',
      'Mobile-first design',
      'Fast-turnaround development, usually 1 to 2 weeks'
    ],
    processTitle: 'Our process',
    process: [
      'Campaign goal and brief',
      'Design',
      'Build',
      'Launch and testing'
    ],
    faqs: [
      { q: 'How fast can a landing page actually be launched?', a: 'A single-campaign landing page usually goes live within 1 to 2 weeks, from brief to launch, so it keeps pace with your ad timeline.' },
      { q: 'Can you build multiple variants for A/B testing?', a: 'Yes. A/B-testable variants are built as part of the process when your campaign volume justifies testing.' },
      { q: 'Will the page be mobile-first?', a: 'Yes. Since most campaign traffic arrives on mobile, pages are designed for mobile first and then scaled up.' },
      { q: 'Can this connect to our vetted lead generation setup?', a: 'Yes. Landing pages feed directly into lead capture and our verification process, so the leads they generate are checked before handover.' }
    ]
  },
  {
    folder: 'digital-experiences',
    filename: 'chatbots.html',
    title: 'Chatbot and Virtual Assistant Development Agency in Thane | ChimpzLab',
    description: 'Automated first response that actually helps, not a generic bot that frustrates visitors. Book a strategy call.',
    primaryKw: 'chatbot development agency India, AI virtual assistant',
    secondaryKw: 'WhatsApp chatbot agency Thane, conversational AI agency',
    heroText: 'Automated response that actually helps',
    approachText1: 'A chatbot or virtual assistant, built well, gives visitors a useful first response instead of a scripted dead end. A bot that cannot answer a real question just adds a frustrating step before someone gives up. We design conversational flows around the questions your customers actually ask, not a generic FAQ tree.',
    approachText2: 'The goal is a first response that resolves or routes, so people get help fast and the leads worth capturing get captured.',
    dropdownValue: 'chatbots',
    servicesTitle: 'What this includes',
    services: [
      'Conversational flow design',
      'Website and WhatsApp chatbot builds',
      'CRM and lead-capture integration',
      'AI-powered query handling'
    ],
    processTitle: 'Our process',
    process: [
      'Query and use-case audit',
      'Conversation flow design',
      'Build and integration',
      'Testing and optimisation'
    ],
    faqs: [
      { q: 'Can the chatbot integrate with our CRM for lead capture?', a: 'Yes. CRM and lead-capture integration is part of the build, so conversations turn into tracked leads rather than lost chats.' },
      { q: 'Does this work on WhatsApp, or only on our website?', a: 'Both. Chatbots can be built for your website, WhatsApp, or both, depending on where your customers actually reach out.' },
      { q: 'Is this a rule-based bot or an AI one?', a: 'Either, depending on what fits. We use structured flows where questions are predictable and AI-powered handling where queries are more open-ended, often a mix of the two.' },
      { q: 'What happens when the bot cannot answer?', a: 'We design clear handoffs, so the visitor is passed to a person or has their query captured for follow-up, instead of hitting a wall.' }
    ]
  }
];

function generateServicesHtml(services) {
  const classes = [
    'md:col-span-3 group relative',
    'md:col-span-2 group relative',
    'md:col-span-2 group relative',
    'md:col-span-3 group relative',
    'md:col-span-2 group relative',
    'md:col-span-3 group relative'
  ];
  return services.map((s, i) => {
      let cssClass = classes[i % classes.length];
      if (i === services.length - 1 && services.length % 2 !== 0) {
          cssClass = 'md:col-span-5 group relative';
      }
      return `
                <div class="${cssClass}">
                    <div class="h-full bg-white/[0.03] border border-white/10 rounded-2xl p-10 md:p-12 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500">
                        <div class="flex items-start gap-5">
                            <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-all duration-500">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <p class="text-gray-300 font-medium text-base md:text-lg leading-relaxed group-hover:text-white transition-colors duration-500">
                                ${s}</p>
                        </div>
                    </div>
                </div>`;
  }).join('');
}

function generateProcessHtml(process) {
  return process.map((p, i) => `
                <div class="gsap-reveal relative process-step">
                    <div class="bg-white rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 text-center md:text-left">
                        <div class="w-14 h-14 rounded-2xl bg-brand-dark text-white flex items-center justify-center mx-auto md:mx-0 mb-5 text-xl font-extrabold shadow-lg relative z-10">
                            0${i+1}</div>
                        <div class="relative">
                            <div class="w-12 h-[2px] bg-gray-200 mx-auto md:mx-0 mb-5"></div>
                            <p class="text-gray-700 font-medium text-base md:text-lg leading-relaxed">${p}</p>
                        </div>
                    </div>
                </div>`).join('');
}

function generateFaqHtml(faqs) {
  return faqs.map((f, i) => `
                <div class="gsap-reveal border-b border-gray-200 faq-item group">
                    <button class="w-full text-left py-6 font-bold text-base md:text-xl flex justify-between items-center interactive focus:outline-none tracking-tight pr-4">
                        ${f.q}
                        <svg class="w-6 h-6 transform transition-transform duration-300 icon text-gray-400 group-hover:text-black shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="pb-6 text-gray-600 font-medium text-base leading-relaxed hidden answer max-w-3xl">
                        ${f.a}
                    </div>
                </div>`).join('');
}

const nameMap = {
  'public-relations.html': 'Public Relations',
  'thought-leadership.html': 'Thought Leadership',
  'employer-branding.html': 'Employer Branding',
  'seo-aeo.html': 'SEO and AEO',
  'social-media-marketing.html': 'Social Media Marketing',
  'content-writing.html': 'Content Writing',
  'influencer-marketing.html': 'Influencer Marketing',
  'branding.html': 'Branding',
  'video-production.html': 'Video Production',
  'design.html': 'Design',
  'performance-marketing.html': 'Performance Marketing',
  'email-marketing.html': 'Email Marketing',
  'marketing-automation.html': 'Marketing Automation',
  'vetted-lead-generation.html': 'Vetted Lead Generation',
  'website-design-development.html': 'Website Design and Development',
  'landing-pages.html': 'Landing Pages',
  'chatbots.html': 'Chatbots and Virtual Assistants'
};

pages.forEach(p => {
  let html = baseHtml;
  p.name = nameMap[p.filename];
  
  // Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${p.title}</title>`);
  
  // Replace Meta Description
  html = html.replace(/<meta name="description"[\s\S]*?>/, `<meta name="description"\n        content="${p.description}">`);
  
  // Replace Keywords
  html = html.replace(/<meta name="keywords"[\s\S]*?>/, `<meta name="keywords"\n        content="${p.primaryKw}, ${p.secondaryKw}">`);
  
  // Replace Eyebrow
  html = html.replace(/<span class="block text-xs font-bold uppercase tracking-\[0\.2em\] text-white\/70">[\s\S]*?<\/span>/, `<span class="block text-xs font-bold uppercase tracking-[0.2em] text-white/70">${p.name}</span>`);
  
  // Replace Hero Text
  html = html.replace(/<span class="block gsap-reveal-text">One company story,<\/span>.*?<span class="block gsap-reveal-text text-white\/40">across every.*?audience.<\/span>/s, `<span class="block gsap-reveal-text">${p.heroText}</span>`);
  
  // Replace Approach Text
  html = html.replace(/<p class="text-lg md:text-2xl font-light leading-relaxed text-gray-600 mb-8 max-w-3xl">[\s\S]*?<\/p>/, `<p class="text-lg md:text-2xl font-light leading-relaxed text-gray-600 mb-8 max-w-3xl">${p.approachText1}</p>`);
  html = html.replace(/<p class="text-lg md:text-2xl font-light leading-relaxed text-gray-600 mb-10 max-w-3xl">[\s\S]*?<\/p>/, `<p class="text-lg md:text-2xl font-light leading-relaxed text-gray-600 mb-10 max-w-3xl">${p.approachText2}</p>`);
  
  // Replace Services list (What we do)
  const servicesStart = html.indexOf('<div class="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">');
  const servicesEnd = html.indexOf('</section>', servicesStart);
  if (servicesStart !== -1) {
      const beforeServices = html.substring(0, servicesStart);
      const afterServices = html.substring(servicesEnd);
      
      const newServices = `<div class="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">\n${generateServicesHtml(p.services)}\n            </div>\n        </div>`;
      
      html = html.replace(/<div class="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">[\s\S]*?<\/section>/, newServices + '\n    </section>');
      
      // Update title based on page
      if (p.filename === 'public-relations.html') {
          html = html.replace(/Everything<br>you get/g, 'Everything<br>you get'); // Keep it
      }
  }

  // Replace Process
  const processMatch = html.match(/<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 relative process-grid">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/);
  if (processMatch) {
      html = html.replace(processMatch[1], '\n' + generateProcessHtml(p.process) + '\n            ');
  }

  // Replace FAQ
  const faqMatch = html.match(/<div class="border-t border-gray-200">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/);
  if (faqMatch) {
      html = html.replace(faqMatch[1], generateFaqHtml(p.faqs));
  }

  // Update Dropdown in Lead Form
  // We'll just remove the 'selected' from all options and add it to a generic option or let it be empty since we don't have the exact option value mapping for all 18 pages. But wait, I can just add `<option value="current-page" selected>${p.dropdownValue}</option>` or select the proper one.
  html = html.replace(/<option value="corporate-communications" class="text-black" selected>Corporate.*?Communications<\/option>/s, `<option value="corporate-communications" class="text-black">Corporate Communications</option>\n<option value="${p.dropdownValue}" class="text-black" selected>${p.title.split(' Agency')[0]}</option>`);


  const targetFolder = path.join(__dirname, 'services', p.folder);
  if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
  }
  const targetPath = path.join(targetFolder, p.filename);
  fs.writeFileSync(targetPath, html);
  console.log('Created: ' + targetPath);
});
