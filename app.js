/* ============================================================
   Furto Marketing  —  React Application
   Loaded via Babel Standalone (type="text/babel")
   Run with:  npm start  (Node.js server required)
   ============================================================ */

const { useState, useEffect, useRef } = React;

// ============================================================
//  DATA
// ============================================================

const NAV_LINKS = [
  { href: '#home',         label: 'Home' },
  { href: '#services',     label: 'Services' },
  { href: '#about',        label: 'About' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#pricing',      label: 'Plans' },
  { href: '#blog',         label: 'Insights' },
  { href: '#faq',          label: 'FAQ' },
];

const HERO_STATS = [
  { value: '800+', label: 'Active Clients' },
  { value: '99%',  label: 'Retention Rate' },
  { value: '5x',   label: 'Average ROI' },
];

const HERO_CARDS = [
  { cls: 'card-1', icon: '�', title: 'Revenue Boost',  value: '+389%' },
  { cls: 'card-2', icon: '🎯', title: 'Conversions',   value: '28,500' },
  { cls: 'card-3', icon: '🚀', title: 'Markets Served', value: '60 Countries' },
];

const SERVICES = [
  { icon: '🔍', title: 'SEO & Search Strategy',   desc: 'Climb to the top of search results with technical SEO, keyword research, and authoritative link-building that compounds over time.',    featured: false },
  { icon: '📱', title: 'Social Media Growth',     desc: 'Turn followers into loyal customers with scroll-stopping creative, community management, and precision-targeted ad campaigns.',         featured: true  },
  { icon: '✉️', title: 'Email & Automation',      desc: 'Build revenue-generating email sequences and drip campaigns that convert cold leads into paying customers on autopilot.',             featured: false },
  { icon: '🎯', title: 'Paid Media & PPC',        desc: 'Zero in on your ideal buyers with laser-focused Google, Meta, and LinkedIn campaigns engineered for maximum ROAS.',                    featured: false },
  { icon: '✍️', title: 'Brand & Content Studio',  desc: 'Tell your brand story through compelling long-form content, video, podcasts, and visual assets that build trust and authority.',        featured: false },
  { icon: '📊', title: 'Growth Intelligence',     desc: 'Unlock full-funnel visibility with real-time dashboards, attribution modeling, and actionable monthly strategy reviews.',               featured: false },
];

const ABOUT_STATS = [
  { cls: 'box-1', value: '12+',  label: 'Years in Business' },
  { cls: 'box-2', value: '80+',  label: 'Team Specialists' },
  { cls: 'box-3', value: '450+', label: 'Campaigns Launched' },
  { cls: 'box-4', value: '28',   label: 'Global Awards' },
];

const ABOUT_ITEMS = [
  'Bespoke growth roadmaps built around your business objectives',
  'Real-time dashboards and radical transparency at every stage',
  'Senior strategists — not junior assistants — on every account',
  'Tested playbooks deployed across 30+ verticals worldwide',
];

const TESTIMONIALS = [
  { initials: 'RA', name: 'Rey Aldrin Sutare',   role: 'CMO, Apex Digital',          quote: '"Furto completely overhauled our SEO strategy — we went from page 4 to #1 on our top keywords in under five months. Absolutely incredible."' },
  { initials: 'RM', name: 'Rainier Marasigan',   role: 'CEO, UrbanPulse Retail',     quote: '"Their paid media team cut our cost per acquisition by 62% while doubling our monthly orders. The results speak for themselves."' },
  { initials: 'NC', name: 'Nelvin Catapang',     role: 'Head of Growth, CloudSpark', quote: '"From onboarding to reporting, Furto operates with the clarity and speed of a startup. They feel like a genuine extension of our team."' },
];

const PARTNERS = ['Google', 'Meta', 'HubSpot', 'Salesforce', 'Shopify', 'Klaviyo', 'Semrush', 'Ahrefs', 'Notion', 'Stripe', 'Webflow', 'Zapier'];

const COUNTER_STATS = [
  { icon: '🏆', end: 800,   suffix: '+', label: 'Active Clients',       duration: 2000 },
  { icon: '📈', end: 389,   suffix: '%', label: 'Peak Revenue Lift',    duration: 1800 },
  { icon: '🌍', end: 60,    suffix: '',  label: 'Countries Reached',    duration: 1500 },
  { icon: '⭐', end: 28,    suffix: '',  label: 'Global Awards',        duration: 1200 },
  { icon: '🎯', end: 28500, suffix: '+', label: 'Conversions Driven',   duration: 2200 },
  { icon: '✅', end: 99,    suffix: '%', label: 'Retention Rate',       duration: 1600 },
];

const PLANS = [
  {
    name: 'Launch', price: '$599', popular: false, btnClass: 'btn-outline', btnText: 'Get Started',
    desc: 'Ideal for startups and solopreneurs ready to build their online presence.',
    features: ['Full SEO Audit & Keyword Map', 'Social Media (3 platforms)', 'Bi-Weekly Analytics Report', '2 Blog Posts / Month', 'Email & Chat Support'],
  },
  {
    name: 'Scale', price: '$1,299', popular: true, btnClass: 'btn-primary', btnText: 'Start Scaling',
    desc: 'For growth-stage businesses serious about outpacing the competition.',
    features: ['Everything in Launch', 'Google & Meta Ad Management', 'Content Creation (12 pieces/month)', 'Email Automation Sequences', 'Dedicated Senior Strategist', 'Weekly Performance Calls'],
  },
  {
    name: 'Dominate', price: '$3,499', popular: false, btnClass: 'btn-outline', btnText: 'Talk to Sales',
    desc: 'Full-agency horsepower for established brands aiming to dominate their market.',
    features: ['Everything in Scale', 'Omni-Channel Campaign Management', 'Video & Podcast Production', 'Custom CRM & Funnel Builds', 'Real-Time Reporting Dashboard', '24/7 Priority Support'],
  },
];

const FAQ_ITEMS = [
  { q: 'When will I start seeing real results?',                 a: 'Paid media campaigns typically move the needle within 7–14 days. SEO and content compound over 3–6 months. We set clear milestones at kick-off so you know exactly what to expect and when.' },
  { q: 'What industries do you specialize in?',                  a: 'We have active campaigns across e-commerce, SaaS, fintech, healthcare, real estate, hospitality, and professional services — over 30 verticals in total.' },
  { q: 'How is Furto different from a traditional agency?',       a: 'Traditional agencies bill hours. We bill outcomes. Your account is run by senior strategists (not interns), every recommendation is data-backed, and you get full visibility into spend and performance 24/7.' },
  { q: 'Is there a long-term contract?',                         a: 'No lock-ins, ever. All plans are rolling month-to-month. We keep clients because our results speak for themselves — our average client stays 2.4 years.' },
  { q: 'What does onboarding look like?',                        a: 'We start with a deep-dive strategy session, a full audit of your existing marketing, and a 90-day roadmap. You\'re typically live and running campaigns within two weeks.' },
  { q: 'Do I retain ownership of everything you produce?',       a: 'Yes — 100%. Every asset, piece of content, ad creative, code, and dataset we produce belongs exclusively to you from day one.' },
  { q: 'Can you integrate with our existing tools?',             a: 'Absolutely. We work natively with HubSpot, Salesforce, Klaviyo, Shopify, Webflow, and most major CRMs, ESPs, and analytics platforms. Custom integrations are available on Scale and Dominate plans.' },
];

const BLOG_POSTS = [
  { tag: 'Growth Strategy', date: 'Mar 5, 2026',  readTime: '6 min read', avatar: 'RA', author: 'Rey Aldrin Sutare',  title: 'The 5-Step Framework We Use to Scale Brands from $1M to $10M',       excerpt: 'After working with 800+ clients, we noticed a repeatable pattern in every brand that crossed the 10x revenue threshold. Here\'s what they all did.' },
  { tag: 'Email Marketing', date: 'Feb 22, 2026', readTime: '8 min read', avatar: 'RM', author: 'Rainier Marasigan',   title: 'Why Your Welcome Email Is Costing You Thousands (And How to Fix It)', excerpt: 'The welcome email has the highest open rate of any message you\'ll ever send. Most brands waste it. We\'ll show you exactly what to write instead.' },
  { tag: 'Paid Media',      date: 'Feb 14, 2026', readTime: '5 min read', avatar: 'NC', author: 'Nelvin Catapang',     title: 'Meta Ads in 2026: The New Targeting Playbook After Audience Collapse', excerpt: 'Broad targeting killed detailed audiences. Here\'s the creative-led strategy that\'s driving our best ROAS numbers since 2021.' },
];

const FOOTER_COLS = [
  { heading: 'Services',  links: [{ href: '#services', label: 'SEO Optimization' }, { href: '#services', label: 'Social Media' }, { href: '#services', label: 'Email Marketing' }, { href: '#services', label: 'PPC Advertising' }] },
  { heading: 'Company',   links: [{ href: '#about', label: 'About Us' }, { href: '#testimonials', label: 'Testimonials' }, { href: '#pricing', label: 'Pricing' }, { href: '#contact', label: 'Contact' }] },
  { heading: 'Resources', links: [{ href: '#', label: 'Blog' }, { href: '#', label: 'Case Studies' }, { href: '#', label: 'Free Tools' }, { href: '#', label: 'Newsletter' }] },
];

const SERVICE_OPTIONS = [
  ['', 'Select a service...'],
  ['seo', 'SEO & Search Strategy'],
  ['social', 'Social Media Growth'],
  ['email', 'Email & Automation'],
  ['ppc', 'Paid Media & PPC'],
  ['content', 'Brand & Content Studio'],
  ['analytics', 'Growth Intelligence'],
];

// ============================================================
//  UTILITIES
// ============================================================

function smoothTo(href) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Scroll-reveal wrapper component
function FadeUp({ tag: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('fade-up');
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); }
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <Tag ref={ref} className={className} {...rest}>{children}</Tag>;
}

function SectionHeader({ tag, title, body, align = 'center' }) {
  return (
    <div className="section-header" style={{ textAlign: align, margin: align === 'left' ? 0 : undefined }}>
      <span className="section-tag">{tag}</span>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      <p>{body}</p>
    </div>
  );
}

// ============================================================
//  ANIMATED COUNTER CARD
// ============================================================
function CounterCard({ icon, end, suffix, label, duration }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now();
      const tick = (now) => {
        const p    = Math.min((now - t0) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setCount(Math.floor(ease * end));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <div className="counter-card" ref={ref}>
      <div className="counter-icon">{icon}</div>
      <div className="counter-number">{count.toLocaleString()}{suffix}</div>
      <div className="counter-label">{label}</div>
    </div>
  );
}

// ============================================================
//  NAVBAR
// ============================================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen    ] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const nav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    smoothTo(href);
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container nav-container">
        <a href="#home" className="logo" onClick={(e) => nav(e, '#home')}>Furto<span>.</span></a>
        <button className="nav-toggle" aria-label="Toggle navigation" onClick={() => setOpen(o => !o)}>
          <span /><span /><span />
        </button>
        <ul className={`nav-links${open ? ' open' : ''}`}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}><a href={href} onClick={(e) => nav(e, href)}>{label}</a></li>
          ))}
          <li><a href="#contact" className="btn btn-nav" onClick={(e) => nav(e, '#contact')}>Get Started</a></li>
        </ul>
      </div>
    </nav>
  );
}

// ============================================================
//  HERO
// ============================================================
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-container">
        <FadeUp className="hero-content">
          <span className="badge">🏆 Award-Winning Marketing Agency</span>
          <h1>Scale Faster with <span className="gradient-text">Performance-Led</span> Marketing</h1>
          <p>Furto partners with ambitious brands to unlock explosive, sustainable growth through full-funnel digital marketing, creative strategy, and real-time analytics.</p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); smoothTo('#contact'); }}>Book a Free Strategy Call</a>
            <a href="#services" className="btn btn-outline" onClick={(e) => { e.preventDefault(); smoothTo('#services'); }}>See How We Work</a>
          </div>
          <div className="hero-stats">
            {HERO_STATS.map(s => (
              <div key={s.label} className="stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </FadeUp>
        <div className="hero-visual">
          <div className="hero-graphic">
            <div className="graphic-circle" />
            {HERO_CARDS.map(c => (
              <div key={c.cls} className={`graphic-card ${c.cls}`}>
                <div className="card-icon">{c.icon}</div>
                <div className="card-info"><span>{c.title}</span><strong>{c.value}</strong></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  PARTNERS MARQUEE
// ============================================================
function Partners() {
  return (
    <section className="partners">
      <div className="container">
        <p className="partners-label">Trusted by teams at world-class companies</p>
      </div>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...PARTNERS, ...PARTNERS].map((name, i) => (
            <span key={i} className="partner-logo">{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  SERVICES
// ============================================================
function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <SectionHeader
          tag="Our Services"
          title='Everything You Need to <span class="gradient-text">Dominate</span> Your Market'
          body="From strategy to execution, we provide end-to-end marketing solutions tailored to your business goals."
        />
        <div className="services-grid">
          {SERVICES.map(s => (
            <FadeUp key={s.title} className={`service-card${s.featured ? ' featured' : ''}`}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <a href="#contact" className="service-link" onClick={(e) => { e.preventDefault(); smoothTo('#contact'); }}>Learn more &rarr;</a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  ANIMATED STATS COUNTERS
// ============================================================
function Counters() {
  return (
    <section className="counters" id="counters">
      <div className="container">
        <div className="counters-grid">
          {COUNTER_STATS.map(s => <CounterCard key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  ABOUT
// ============================================================
function About() {
  return (
    <section className="about" id="about">
      <div className="container about-container">
        <div className="about-visual">
          <div className="about-image-grid">
            {ABOUT_STATS.map(s => (
              <FadeUp key={s.cls} className={`about-box ${s.cls}`}>
                <span className="big-number">{s.value}</span>
                <span>{s.label}</span>
              </FadeUp>
            ))}
          </div>
        </div>
        <FadeUp className="about-content">
          <span className="section-tag">About Furto</span>
          <h2>More Than an Agency &mdash; Your <span className="gradient-text">Dedicated Growth Team</span></h2>
          <p>Since 2014, Furto has grown from a lean performance consultancy into a 80-person global marketing powerhouse. We embed with your brand, align on ambitious targets, and execute relentlessly until we hit them.</p>
          <ul className="about-list">
            {ABOUT_ITEMS.map(t => <li key={t}>&#x2705; {t}</li>)}
          </ul>
          <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); smoothTo('#contact'); }}>Work With Us</a>
        </FadeUp>
      </div>
    </section>
  );
}

// ============================================================
//  TESTIMONIALS
// ============================================================
function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <SectionHeader
          tag="Testimonials"
          title='What Our <span class="gradient-text">Clients</span> Say'
          body="Don't just take our word for it — hear from the businesses we've helped grow."
        />
        <div className="testimonials-grid">
          {TESTIMONIALS.map(t => (
            <FadeUp key={t.name} className="testimonial-card">
              <div className="stars">&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;</div>
              <p>{t.quote}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.initials}</div>
                <div><strong>{t.name}</strong><span>{t.role}</span></div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  BLOG
// ============================================================
function Blog() {
  return (
    <section className="blog" id="blog">
      <div className="container">
        <SectionHeader
          tag="Latest Articles"
          title='Insights to <span class="gradient-text">Grow</span> Your Business'
          body="Tips, strategies, and case studies from our marketing experts."
        />
        <div className="blog-grid">
          {BLOG_POSTS.map(post => (
            <FadeUp key={post.title} tag="article" className="blog-card">
              <div className="blog-card-top">
                <span className="blog-tag">{post.tag}</span>
                <span className="blog-read-time">{post.readTime}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="blog-card-footer">
                <div className="blog-author">
                  <div className="author-avatar small">{post.avatar}</div>
                  <div><strong>{post.author}</strong><span>{post.date}</span></div>
                </div>
                <a href="#" className="blog-link">Read &rarr;</a>
              </div>
            </FadeUp>
          ))}
        </div>
        <div className="blog-cta">
          <a href="#" className="btn btn-outline">View All Articles</a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  PRICING
// ============================================================
function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <SectionHeader
          tag="Pricing"
          title='Simple, Transparent <span class="gradient-text">Pricing</span>'
          body="Choose the plan that fits your business. No hidden fees, no surprises."
        />
        <div className="pricing-grid">
          {PLANS.map(p => (
            <FadeUp key={p.name} className={`pricing-card${p.popular ? ' popular' : ''}`}>
              {p.popular && <div className="popular-badge">Most Popular</div>}
              <h3>{p.name}</h3>
              <p className="pricing-desc">{p.desc}</p>
              <div className="price" dangerouslySetInnerHTML={{ __html: `${p.price}<span>/month</span>` }} />
              <ul className="pricing-features">
                {p.features.map(f => <li key={f}>&#x2713; {f}</li>)}
              </ul>
              <a href="#contact" className={`btn ${p.btnClass} btn-full`} onClick={(e) => { e.preventDefault(); smoothTo('#contact'); }}>{p.btnText}</a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  FAQ ACCORDION  — React useState for open/close
// ============================================================
function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="faq" id="faq">
      <div className="container faq-container">
        <div className="faq-header">
          <SectionHeader
            tag="FAQ"
            title='Got <span class="gradient-text">Questions?</span> We Have Answers.'
            body="Everything you need to know about working with Furto."
            align="left"
          />
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="faq-item">
              <button
                className={`faq-question${openIdx === i ? ' open' : ''}`}
                aria-expanded={openIdx === i}
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="faq-icon">{openIdx === i ? '\u2212' : '+'}</span>
              </button>
              <div className={`faq-answer${openIdx === i ? ' open' : ''}`}>
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  CTA BANNER
// ============================================================
function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <FadeUp className="cta-box">
          <h2>Your Competitors Aren't Slowing Down — Neither Should You</h2>
          <p>Over 800 brands trust Furto to power their growth. Get a no-obligation strategy session and leave with a custom 90-day roadmap.</p>
          <div className="cta-buttons">
            <a href="#contact" className="btn btn-white" onClick={(e) => { e.preventDefault(); smoothTo('#contact'); }}>Claim Your Free Strategy Session</a>
            <a href="#pricing"  className="btn btn-ghost" onClick={(e) => { e.preventDefault(); smoothTo('#pricing'); }}>Explore Plans</a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ============================================================
//  CONTACT FORM — Node.js REST API + PHP fallback
// ============================================================
const EMPTY_FORM = { firstName: '', lastName: '', email: '', company: '', service: '', message: '' };

function Contact() {
  const [form,   setForm  ] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle');
  const [msg,    setMsg   ] = useState('');

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      setStatus('error');
      setMsg('Please fill in all required fields.');
      return;
    }
    setStatus('loading');
    setMsg('');

    // Primary: Node.js /api/contact
    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMsg(data.message || "Message sent! We'll get back to you within 24 hours.");
        setForm(EMPTY_FORM);
        return;
      }
      throw new Error(data.error || 'API error');
    } catch (_) {
      // Fallback: PHP contact.php
      try {
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        const res  = await fetch('contact.php', { method: 'POST', body: fd });
        const data = await res.json();
        setStatus(data.success ? 'success' : 'error');
        setMsg(data.message || (data.success ? 'Message sent!' : 'Something went wrong.'));
        if (data.success) setForm(EMPTY_FORM);
      } catch {
        setStatus('error');
        setMsg('Could not send message. Please email us at hello@furto.com');
      }
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container contact-container">
        <FadeUp className="contact-info">
          <span className="section-tag">Contact Us</span>
          <h2>Ready to <span className="gradient-text">Accelerate Your Growth?</span></h2>
          <p>Tell us about your business and goals. Our senior strategists will respond within 4 business hours with a tailored plan.</p>
          <div className="contact-details">
            {[
              { icon: '📧', label: 'Email',    value: 'chesterfurto11@gmail.com' },
              { icon: '📞', label: 'Phone',    value: '09638186822' },
              { icon: '📍', label: 'Location', value: 'Tinga Labac, Batangas City' },
            ].map(item => (
              <div key={item.label} className="contact-item">
                <span className="contact-icon">{item.icon}</span>
                <div><strong>{item.label}</strong><span>{item.value}</span></div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp tag="form" className="contact-form" onSubmit={submit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input type="text" id="firstName" value={form.firstName} onChange={set('firstName')} required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input type="text" id="lastName" value={form.lastName} onChange={set('lastName')} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input type="email" id="email" value={form.email} onChange={set('email')} required />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input type="text" id="company" value={form.company} onChange={set('company')} />
          </div>
          <div className="form-group">
            <label htmlFor="service">Service Interested In</label>
            <select id="service" value={form.service} onChange={set('service')}>
              {SERVICE_OPTIONS.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message *</label>
            <textarea id="message" rows="4" value={form.message} onChange={set('message')} required />
          </div>

          {status === 'success' && <div className="form-alert form-alert-success">{msg}</div>}
          {status === 'error'   && <div className="form-alert form-alert-error">{msg}</div>}

          <button type="submit" className="btn btn-primary btn-full" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending\u2026' : 'Send Message'}
          </button>
        </FadeUp>
      </div>
    </section>
  );
}

// ============================================================
//  FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="logo">Furto<span>.</span></a>
            <p>Helping ambitious brands unlock explosive, sustainable growth since 2014.</p>
            <div className="social-links">
              {[['Facebook','FB'],['Twitter','TW'],['Instagram','IG'],['LinkedIn','IN']].map(([name, abbr]) => (
                <a key={name} href="#" aria-label={name}>{abbr}</a>
              ))}
            </div>
            <div className="tech-badges">
              <span className="tech-badge react">&#x269B; React</span>
              <span className="tech-badge node">&#x1F7E2; Node.js</span>
              <span className="tech-badge php">&#x1F418; PHP</span>
            </div>
          </div>
          {FOOTER_COLS.map(col => (
            <div key={col.heading} className="footer-links">
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Furto Marketing Agency. All rights reserved. &nbsp;|&nbsp; Built with &#x269B; React &bull; &#x1F7E2; Node.js &bull; &#x1F418; PHP</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
//  SCROLL TO TOP BUTTON
// ============================================================
function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <button
      className={`scroll-top${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >&uarr;</button>
  );
}

// ============================================================
//  APP ROOT
// ============================================================
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Partners />
      <Services />
      <Counters />
      <About />
      <Testimonials />
      <Blog />
      <Pricing />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
      <ScrollTopBtn />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
