(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Mobile menu toggle -------------------------------------------------
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!open));
      mobileMenu.classList.toggle('is-open', !open);
    });
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
      });
    });
  }

  // --- Scroll-activated header -------------------------------------------
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- Count-up stat animation -------------------------------------------
  const stats = document.querySelectorAll('.stat__number[data-target]');
  if (stats.length && 'IntersectionObserver' in window) {
    const animate = (el) => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      if (reduceMotion || isNaN(target)) {
        el.textContent = (target || el.textContent) + suffix;
        return;
      }
      const duration = 1600;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.round(eased * target);
        el.textContent = value.toLocaleString() + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    stats.forEach((el) => observer.observe(el));
  }

  // --- Mark current nav item ---------------------------------------------
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('[data-nav]').forEach((a) => {
    const target = a.getAttribute('data-nav');
    const here = path === '/' ? '/' : path.replace(/\.html$/, '');
    if (target === here) a.setAttribute('aria-current', 'page');
  });

  // --- Chatbot (rule-based FAQ helper) -----------------------------------
  // Conversation tree. `next` = navigate to another node; `href` = open URL/tel/sms/mailto.
  const TREE = {
    start: {
      text: "Hi — I’m a quick-reply helper. What brings you here today?",
      options: [
        { label: "I'm a veteran who needs housing", next: "vetHelp" },
        { label: "I want to donate", next: "donate" },
        { label: "I want to volunteer", next: "volunteer" },
        { label: "General / press inquiry", next: "general" },
      ],
    },
    vetHelp: {
      text: "We’ve got you. What would you like to know?",
      options: [
        { label: "I need help right now", next: "urgent", urgent: true },
        { label: "What programs do you offer?", next: "programs" },
        { label: "What documents do I need?", next: "documents" },
        { label: "How do I apply?", next: "apply" },
        { label: "Where do you serve?", next: "location" },
        { label: "← Back", next: "start", back: true },
      ],
    },
    urgent: {
      text:
        "If you’re in immediate crisis, please call the Veterans Crisis Line: 988, then press 1.\n\n" +
        "For housing help, call or text us at 352-509-5714 — we answer.",
      options: [
        { label: "📞 Call 988 (Crisis Line)", href: "tel:988", urgent: true },
        { label: "📞 Call 352-509-5714", href: "tel:3525095714" },
        { label: "💬 Text 352-509-5714", href: "sms:3525095714" },
        { label: "← Back", next: "vetHelp", back: true },
      ],
    },
    programs: {
      text:
        "We run five programs:\n\n" +
        "• Emergency Housing — same-day shelter for crisis\n" +
        "• Temporary Housing — 30–90 day bridge\n" +
        "• Transitional Housing — 90–180 day program with case management\n" +
        "• Affordable Housing — 30–140% AMI units\n" +
        "• Permanent Affordability — long-term affordable units",
      options: [
        { label: "See full program details", href: "/programs" },
        { label: "Apply now", href: "/contact" },
        { label: "← Back", next: "vetHelp", back: true },
      ],
    },
    documents: {
      text:
        "Bring what you can — we’ll help with the rest.\n\n" +
        "• Branch of Service\n" +
        "• Discharge Status (DD-214 helpful, but NOT required)\n" +
        "• Current housing situation\n" +
        "• How to reach you\n\n" +
        "Don’t let missing paperwork stop you from reaching out.",
      options: [
        { label: "Start application", href: "/contact" },
        { label: "← Back", next: "vetHelp", back: true },
      ],
    },
    apply: {
      text:
        "Three ways to apply:\n\n" +
        "1. Email info@veteranhousingcorp.org\n" +
        "2. Call or text 352-509-5714\n" +
        "3. Submit the form on the Contact page",
      options: [
        { label: "Go to Contact page", href: "/contact" },
        { label: "📧 Email us", href: "mailto:info@veteranhousingcorp.org" },
        { label: "📞 Call 352-509-5714", href: "tel:3525095714" },
        { label: "← Back", next: "vetHelp", back: true },
      ],
    },
    location: {
      text: "We serve Marion County, Florida and surrounding communities.",
      options: [
        { label: "Contact us", href: "/contact" },
        { label: "← Back", next: "vetHelp", back: true },
      ],
    },
    donate: {
      text:
        "Thank you for considering a gift. 85¢ of every dollar goes directly to housing programs and veteran services.",
      options: [
        { label: "Donate now (PayPal)", href: "/donate" },
        { label: "See impact tiers", href: "/donate" },
        { label: "Other ways to help", href: "/donate" },
        { label: "← Back", next: "start", back: true },
      ],
    },
    volunteer: {
      text:
        "Volunteers are the backbone of our operations. Drop us a line and we’ll find a fit.",
      options: [
        { label: "Get in touch", href: "/contact" },
        { label: "📧 Email us", href: "mailto:info@veteranhousingcorp.org" },
        { label: "← Back", next: "start", back: true },
      ],
    },
    general: {
      text: "For press, partnerships, or general questions, the contact form is the fastest path.",
      options: [
        { label: "Contact form", href: "/contact" },
        { label: "📧 Email us", href: "mailto:info@veteranhousingcorp.org" },
        { label: "📞 Call 352-509-5714", href: "tel:3525095714" },
        { label: "← Back", next: "start", back: true },
      ],
    },
  };

  function mountChatbot() {
    const root = document.createElement('div');
    root.className = 'chatbot';
    root.setAttribute('aria-expanded', 'false');
    root.innerHTML = [
      '<button class="chatbot__toggle" type="button" aria-label="Open chat helper" aria-controls="chatbot-panel" aria-expanded="false">',
      '<svg class="icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
      '<svg class="icon-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>',
      '</button>',
      '<div class="chatbot__panel" id="chatbot-panel" role="dialog" aria-labelledby="chatbot-title" aria-modal="false">',
      '<div class="chatbot__header">',
      '<strong id="chatbot-title">VHC Helper</strong>',
      '<span>Quick answers · 24/7</span>',
      '</div>',
      '<div class="chatbot__crisis-banner" role="note">',
      '<strong>In crisis?</strong> Call <a href="tel:988">988</a>, press <strong>1</strong>.',
      '</div>',
      '<div class="chatbot__messages" role="log" aria-live="polite" aria-label="Conversation"></div>',
      '<div class="chatbot__quick-replies" role="group" aria-label="Quick replies"></div>',
      '</div>',
    ].join('');
    document.body.appendChild(root);

    const toggle = root.querySelector('.chatbot__toggle');
    const panel = root.querySelector('.chatbot__panel');
    const messages = root.querySelector('.chatbot__messages');
    const quickReplies = root.querySelector('.chatbot__quick-replies');

    function addMessage(text, role) {
      const el = document.createElement('div');
      el.className = 'chatbot__message ' + role;
      el.textContent = text;
      messages.appendChild(el);
      messages.scrollTop = messages.scrollHeight;
    }

    function renderNode(key) {
      const node = TREE[key];
      if (!node) return;
      addMessage(node.text, 'bot');
      quickReplies.innerHTML = '';
      node.options.forEach((opt) => {
        const cls = ['chatbot__quick-reply'];
        if (opt.urgent) cls.push('is-urgent');
        if (opt.back) cls.push('is-back');
        let el;
        if (opt.href) {
          el = document.createElement('a');
          el.href = opt.href;
          if (/^https?:/.test(opt.href)) el.target = '_blank';
          if (el.target === '_blank') el.rel = 'noopener';
        } else {
          el = document.createElement('button');
          el.type = 'button';
        }
        el.className = cls.join(' ');
        el.textContent = opt.label;
        el.addEventListener('click', (e) => {
          if (opt.next) {
            e.preventDefault();
            addMessage(opt.label.replace(/^← /, ''), 'user');
            renderNode(opt.next);
          }
          // For href options, let the browser navigate naturally.
        });
        quickReplies.appendChild(el);
      });
    }

    function open() {
      root.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close chat helper');
      if (!messages.children.length) renderNode('start');
      // Move focus to first interactive element inside panel for keyboard users.
      const firstReply = quickReplies.querySelector('.chatbot__quick-reply');
      if (firstReply) firstReply.focus();
    }
    function close() {
      root.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open chat helper');
      toggle.focus();
    }

    toggle.addEventListener('click', () => {
      const isOpen = root.getAttribute('aria-expanded') === 'true';
      isOpen ? close() : open();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root.getAttribute('aria-expanded') === 'true') close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountChatbot);
  } else {
    mountChatbot();
  }
})();
