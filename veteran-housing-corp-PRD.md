# PRD: Veteran Housing Corp Website
**Project Type:** Static marketing/nonprofit website (Next.js 14 or plain HTML/CSS/JS)  
**Target Delivery:** Claude Code single-session build  
**Audience:** Veterans in housing crisis, donors, social workers, volunteers

---

## 1. Project Overview

Build a high-impact, mobile-first nonprofit website for **Veteran Housing Corp**, a 501(c)(3) based in Marion County, FL providing emergency, transitional, and long-term housing for veterans.

The site must serve two primary user flows simultaneously:
- **Veterans in crisis** → find help fast, apply, call
- **Supporters/donors** → understand mission, give money, get involved

---

## 2. Tech Stack

- **Framework:** Next.js 14 (App Router) with Tailwind CSS
- **Fonts:** Google Fonts — use a strong serif display font paired with a clean humanist sans (e.g., `Playfair Display` + `Source Sans 3`, or `Libre Baskerville` + `DM Sans`)
- **Icons:** Lucide React
- **Deployment-ready:** Static export (`output: 'export'`) for easy Netlify/Vercel deploy
- **No backend required** — contact form uses `mailto:` or Formspree

> **Aesthetic Direction:** Bold civic patriotism — the logo sets the tone. Deep navy + vivid red + clean white, with gold used as a whisper (star dividers, badge accents, thin rules). Think: American institutional credibility meets modern nonprofit impact. No pastels. No gradients that soften the message. Sharp, confident, dignified.

---

## 3. Color System (CSS Variables)

Brand colors pulled directly from official VHC logo.

```css
--color-navy:       #1B2A6B;   /* primary — logo navy, headers, footer */
--color-navy-dark:  #0F1A45;   /* deep navy for section backgrounds */
--color-red:        #C8102E;   /* primary accent — logo red, CTAs, icons */
--color-red-dark:   #A00D24;   /* hover state for red buttons */
--color-white:      #FFFFFF;   /* backgrounds, card surfaces */
--color-off-white:  #F4F6FA;   /* light section backgrounds */
--color-gold:       #C9933A;   /* hint accent — dividers, stars, badge borders */
--color-gold-light: #E8B86D;   /* subtle glow on hover, highlight lines */
--color-text-body:  #1A1A2E;   /* near-navy for body text */
--color-text-muted: #5A6478;   /* secondary text */
```

**Usage guide:**
- Backgrounds: alternate `navy-dark` sections with `white`/`off-white` sections
- CTAs (primary): red bg, white text — `GET HELP NOW`, `Apply`, `Start Application`
- CTAs (secondary): navy outline, white text — `Learn More`, `Donate`
- Gold: sparingly — star dividers (★ ★ ★ ★ ★), badge borders, thin rules, stat highlights
- Never use gold as a full background — hints only

---

## 4. Page Structure & Content

### 4.1 Global Header (Fixed, sticky)
- Logo left: display the uploaded VHC logo image (`/public/vhc-logo.jpg`) — sized ~130px tall
- Tagline below logo (desktop only, small caps): `"Housing Veterans. Strengthening Communities. Changing Lives."`
- Nav center: Home · About · Programs · Donate · Contact
- CTA right: `GET HELP NOW` button — red background, white text, bold, large tap target
- Decorative element: thin gold horizontal rule below header on scroll
- Mobile: hamburger menu, `GET HELP NOW` always visible as red sticky bar at bottom of screen

### 4.2 Home Page (`/`)

**Hero Section**
- Full-viewport navy-dark background (`#0F1A45`)
- VHC logo centered or left-aligned, large
- Star divider row: `★ ★ ★ ★ ★` in gold (`#C9933A`), matching logo
- Headline: `"No Veteran Should Sleep Without a Roof."`
- Sub-headline: `"We provide emergency, transitional, and permanent housing to those who served — starting from day one."`
- Tagline strip (red bar with white text + gold stars, matching logo): `"Housing Veterans. Strengthening Communities. Changing Lives."`
- Two CTA buttons: `Get Housing Assistance` (red bg, white text, primary) | `Donate Today` (white outline, secondary)
- Small subtext under buttons: `Serving Marion County, FL and surrounding communities`
- Background: navy-dark with subtle CSS star field or faint diagonal stripe texture

**Impact Stats Bar**
- 3 stats in a horizontal band (cream background):
  - `50+` Veterans Housed
  - `2,400+` Nights of Shelter Provided
  - `3` Counties Served
- Animated counter on scroll-into-view using Intersection Observer

**Services Section**
- 5 program cards (pulled directly from logo icons) on navy-dark background, white text, red icons:
  1. 🛏️ **Emergency Housing** — Immediate safe shelter for veterans in acute crisis.
  2. 📅 **Temporary Housing** — Short-term stable housing while longer-term plans are secured.
  3. 👷 **Transitional Housing** — 90–180 day programs with wraparound case management.
  4. 🏢 **Affordable Housing** — Income-qualified units serving 30%–140% AMI.
  5. ∞ **Permanent Affordability** — Creating perpetual affordable housing for individuals and families.
- Each card: red icon, white title, 2-sentence description, `Learn More →` link
- Below cards: red band with white text — `"Creating Perpetual Affordable Housing for Individuals and Families Income Qualified"` + gold highlight: `30% AMI through 140% AMI`

**Testimonial Pull Quote**
- Single large blockquote section
- Text: *"I didn't know where I'd sleep that night. Veteran Housing Corp gave me a bed, a plan, and my dignity back."*
- Attribution: — U.S. Army Veteran, Marion County, FL

**Partner/Collaborator Logos Strip**
- Placeholder row: "In collaboration with the VA, Marion County, and local nonprofits"
- 4–5 placeholder logo boxes (gray rectangles with text, client can swap in real logos)

**Homepage CTA Banner**
- Full-width red background (`#C8102E`), white text
- Gold star divider row above headline: `★ ★ ★ ★ ★`
- Headline: `"A Veteran's Home is Worth Fighting For."`
- Button: `Donate Now` — white bg, navy text, gold border

---

### 4.3 About Page (`/about`)

**Mission Statement**
> "Our prime directive is to provide safe, decent, and affordable housing to veterans — because housing is not a privilege. It's the foundation of recovery."

**The Problem Section**
- Brief stat-driven copy on veteran homelessness in Florida/Marion County
- Hook: `"On any given night in Florida, over 2,000 veterans are without a home."`
- Serve area callout: Marion County, FL and surrounding communities

**Our Approach**
- Collaborative model: VA referrals, Marion County partnerships, wraparound case management
- 3 pillars: Housing First · Wraparound Support · Community Integration

**Leadership / Board of Directors**
- Placeholder cards: Name, Title, headshot placeholder circle
- Note in PRD: *Client should supply real names/photos*

**CTA at bottom**
- `Join Our Board` | `Volunteer With Us`

---

### 4.4 Programs Page (`/programs`)

Five program deep-dives, each with a full section. Colors: alternate navy-dark / white-bg sections.

1. **Emergency Housing** — who it's for, immediate intake process, what's provided night one
2. **Temporary Housing** — duration, services included, transition plan
3. **Transitional Housing** — 90–180 day program, case management, VA partnership services
4. **Affordable Housing** — AMI qualification tiers (30%–140%), application process, waitlist
5. **Permanent Affordability** — long-term mission, perpetual affordability model, community impact

Each section ends with: `Apply for This Program →` (red button)

---

### 4.5 Contact / Intake Page (`/contact`)

**Two-column layout:**

Left — **For Veterans Seeking Help**
- Bold callout box (gold border):
  > ⚠️ If you are in immediate crisis, call the **Veterans Crisis Line: 988, then press 1**
- Direct contact callout:
  > 📞 **Text or voicemail: 352-509-5714** | ✉️ info@veteranhousingcorp.org
  > *Serving Marion County, FL and surrounding communities*
- Information needed to apply:
  - Branch of Service
  - Discharge Status (DD-214 helpful but not required)
  - Current Housing Situation
  - Contact Information
- `Start Your Application` button → links to intake form (Formspree or mailto)

Right — **General Inquiries**
- Simple form: Name, Email, Subject, Message
- Submit button → `mailto:info@veteranhousingcorp.org` or Formspree endpoint
- Also add: `<a href="sms:3525095714">Text Us: 352-509-5714</a>` as a mobile-friendly CTA

**Contact Details Block**
```
Veteran Housing Corp
Marion County, Florida (and surrounding communities)
Phone/Text: 352-509-5714
Email: info@veteranhousingcorp.org
Website: veteranhousingcorp.org
```

---

### 4.6 Donate Page (`/donate`)

**Headline:** `"Invest in a Veteran's Future"`

**Impact Tiers**
| Amount | Impact |
|--------|--------|
| $50 | Provides a "Welcome Home" kit (hygiene, bedding basics) |
| $150 | Covers one week of emergency meals |
| $250 | Funds one week of emergency shelter |
| $500 | Provides 30 days of case management support |
| $1,000 | Funds one full month of transitional housing |

**Transparency Section**
> "85% of every dollar donated goes directly to housing programs and veteran services. We publish annual financial reports so you always know where your money goes."

**Donate CTA**
- Primary: Large gold `Donate Now` button — PayPal Giving Fund button (use official PayPal donate button embed)
- Secondary: `Set Up Monthly Giving` (PayPal recurring, placeholder link)
- Embed the PayPal donate button using their hosted button HTML snippet:
  ```html
  <!-- PayPal Donate Button — client to swap in their PayPal.me or Giving Fund link -->
  <a href="https://www.paypal.com/donate/?hosted_button_id=PLACEHOLDER" target="_blank">
    <img src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" alt="Donate with PayPal" />
  </a>
  ```

**Other Ways to Help**
- Volunteer
- In-kind donations
- Corporate sponsorship

---

### 4.7 Footer (Global)

- Logo + tagline: *"Housing Veterans. Strengthening Communities. Changing Lives."*
- 501(c)(3) Nonprofit — displayed in small caps with gold flanking rules
- Gold star row: `★ ★ ★ ★ ★` above contact block
- Quick links: Home · About · Programs · Donate · Contact
- Emergency box: "Veterans Crisis Line: 988, press 1"
- Contact: Marion County, FL | 352-509-5714 | info@veteranhousingcorp.org
- Social icons: Facebook, Instagram, LinkedIn (placeholder hrefs)
- `© 2025 Veteran Housing Corp. 501(c)(3) Nonprofit.`

---

## 5. Design & UX Requirements

### Mobile First
- All CTAs (`GET HELP NOW`, `Get Housing Assistance`) must be minimum 48px tap target
- Navigation collapses to hamburger on mobile
- Impact stats stack vertically on mobile
- Contact form is single-column on mobile

### Accessibility
- Color contrast ratio ≥ 4.5:1 for all text
- All images have alt text
- Form inputs have associated labels
- Skip-to-content link in header

### Animations
- Hero text: staggered fade-up on load (CSS keyframes, `animation-delay`)
- Impact stats: count-up animation on scroll (Intersection Observer + JS counter)
- Cards: subtle lift on hover (`transform: translateY(-4px)`, `box-shadow` transition)
- No layout-shift animations — keep it smooth and purposeful

### Badges (All Active)
Display all three trust badges prominently — in the header, About page, and footer:

1. **🇺🇸 Veteran-Led Organization** — white text, red background pill with gold border
2. **501(c)(3) Nonprofit** — navy text, white background, gold border — pulled from logo subtext
3. **PayPal Giving Fund Verified** — official PayPal badge/logo

Badge placement:
- Header: Veteran-Led badge next to logo (desktop), below logo (mobile)
- About page hero: all three badges in a horizontal row with gold dividers between
- Footer: all three inline above copyright line

Decorative accent used throughout: `★ ★ ★ ★ ★` gold star row (matches logo red banner) as section dividers and badge separators

---

## 6. File Structure

```
veteran-housing-corp/
├── app/
│   ├── layout.tsx          # Global layout, header, footer
│   ├── page.tsx            # Home
│   ├── about/page.tsx
│   ├── programs/page.tsx
│   ├── contact/page.tsx
│   └── donate/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── ImpactStats.tsx
│   ├── ServiceCards.tsx
│   ├── TestimonialQuote.tsx
│   ├── DonationTiers.tsx
│   └── ContactForm.tsx
├── public/
│   ├── vhc-logo.jpg        # Uploaded — VHC brand logo (red/navy/white)
│   └── (additional assets)
├── styles/
│   └── globals.css         # CSS variables, base styles
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 7. Claude Code Build Instructions

**Start with:**
```
Build the Veteran Housing Corp website per this PRD. The brand colors are deep navy (#1B2A6B), vivid red (#C8102E), and white — with gold (#C9933A) used sparingly as a hint accent (star dividers, badge borders, thin rules). The official logo is at /public/vhc-logo.jpg — use it in the header. The real tagline is "Housing Veterans. Strengthening Communities. Changing Lives." Start with the global layout (Header + Footer), then build each page: Home → About → Programs → Contact → Donate. Bold civic patriotism — not generic nonprofit.
```

**Follow-up prompts (if needed):**
- `"Add the animated counter to the ImpactStats component"`
- `"Make the header sticky with a scroll-activated shadow"`
- `"Add a mobile hamburger menu to the Header component"`
- `"Generate Formspree integration for the contact form"`

---

## 8. Content Placeholders (Client to Supply)

- [ ] Real board member names + photos
- [ ] Actual impact numbers (veterans housed, nights provided)
- [ ] Donation link (PayPal Giving Fund / Stripe)
- [ ] Social media URLs
- [ ] Any real partner organization logos
- [ ] Optional: real veteran testimonials (anonymized OK)
- [ ] 501(c)(3) EIN for footer/donate page

---

## 9. Out of Scope (Phase 2)

- CMS integration (Sanity, Contentful)
- Veteran intake portal / application backend
- Blog / news section
- Email newsletter signup
- Multi-language support (Spanish — relevant for Marion County region, Phase 2)
