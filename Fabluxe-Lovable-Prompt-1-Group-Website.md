# Lovable Prompt — Website 1: Fabluxe Group Corporate Site

> Paste everything between the lines into Lovable as the first message. Build order for follow-up prompts is at the bottom of this file.

---

## PROJECT

Build a **front-end visual prototype** of a corporate group website for **Fabluxe**, an Indian group with two operating companies:

- **Fabluxe Home Solutions** — consumer electronics
- **Fabluxora Interiors** — home interiors and interior design

This site is the group's parent/corporate presence. It does not sell anything. Its jobs are: explain who the group is, show credibility (history, people, projects, awards, reviews, CSR), capture B2B enquiries, and hand visitors off to the group's other web properties.

**This is a prototype, not a product.** It will be handed to a designer who will refine the visuals, and to a dev team who will connect the back end later. Optimise for clear structure, complete page coverage, and clean restyleable code.

## HARD CONSTRAINTS

1. **No back end.** Do not connect Supabase, do not add authentication providers, do not set up a database, do not ask me to connect anything. All data comes from mock JSON files in `src/data/`.
2. All forms validate on the client and show a success state. Do not send anything anywhere. Leave a clearly named comment where a real submission would go, e.g. `// TODO: POST to SixOrbit CRM`.
3. **Every colour, font size, radius and spacing value comes from a token** defined in `index.css` / the Tailwind config. No raw hex codes inside components. A designer must be able to change the whole look from one file.
4. Components must be small, semantically named, and reusable (`SectionHeading`, `ProjectCard`, `AwardTile`, `EyebrowLabel`, etc.). No 600-line page files.
5. Fully responsive, mobile-first. Visible keyboard focus states. Respect `prefers-reduced-motion`.
6. Write real placeholder copy in the brand's voice — plain, confident, specific. No "Lorem ipsum", no "Your headline here".

## DESIGN DIRECTION

The brand wants a **premium, luxurious, calm** feel. Think a considered interiors brand, not a consumer electronics discounter. Generous whitespace, restrained motion, editorial layouts.

**Colour tokens (use exactly these):**

| Token | Hex | Use |
|---|---|---|
| `navy` | `#2F4156` | Primary. Header, footer, dark sections, headings |
| `teal` | `#567C8D` | Secondary. Links, hovers, icons, supporting fills |
| `sky` | `#C8D9E6` | Soft section backgrounds, cards, dividers |
| `beige` | `#F5EFEB` | Default page background |
| `white` | `#FFFFFF` | Surfaces, cards on beige |
| `gold` | `#C8A45C` | Accent only — hairlines, hover underlines, small marks |

The client's existing logo is **gold lettering with a gold triangle on a blue marble background** and cannot be redesigned. Reserve gold for small details so the logo sits naturally in the layout rather than fighting it. Use a placeholder logo block in the header: a navy square with "FABLUXE" in gold serif.

**Typography:** pair a high-contrast display serif with a clean, quiet sans. Suggested: **Fraunces** or **Bodoni Moda** for display headings, **Inter** or **Karla** for body, and a wide letter-spaced uppercase sans for small labels. Any equivalent pairing is fine — commit to one and use it consistently.

**Signature device:** small uppercase, wide-tracked eyebrow labels above every section heading (e.g. `— THE GROUP`, `— SINCE 2009`), with a thin gold rule. Carry this across every page so the two Fabluxe sites read as one family.

**Motion:** subtle scroll-reveal fades on section entry, slow image scale on card hover. Nothing bouncy.

## GLOBAL LAYOUT

**Header** (sticky, transparent over hero, solid navy on scroll):
Logo | The Group · Our Companies · Projects · Awards · Sustainability · CSR · Blog · Contact | "Enquire" button (gold outline)

**Footer** (navy background):
- Group description, one short paragraph
- Column: navigation links
- Column: **Our Companies** — Fabluxe Home Solutions and Fabluxora Interiors, each with a short line and an external-link button labelled "Visit site" (link to `#` for now, styled as outbound)
- Column: contact block — address, phone, email, working hours
- Bottom bar: copyright, privacy and terms links, social icons

## PAGES

### 1. Home
- **Hero** — full-bleed interiors image, navy overlay, display headline about the group, one supporting line, two buttons: "Explore our companies" and "Talk to us".
- **The group at a glance** — 3–4 stat figures (years in operation, projects delivered, cities served, team size) with small labels.
- **Two companies** — two large side-by-side cards, one per company, each with an image, name, one-line description, and "Visit site" outbound button.
- **Featured projects** — horizontal scroll or 3-up grid of Fabluxora Interiors projects, "View all projects" link.
- **Awards strip** — quiet row of award marks with year and title.
- **Sustainability teaser** — short statement, image, link.
- **CSR teaser** — most recent CSR update as a wide card, link.
- **Reviews** — 3 client testimonials in a slider.
- **Blog teaser** — 3 latest posts.
- **Enquiry CTA band** — navy band, headline, button to Contact.

### 2. The Group (overview + history)
- Intro: what the group does, written as a short editorial statement.
- **History timeline** — vertical timeline, year on the left, event on the right, 6–8 entries. Use numbering only because this is a genuine chronology.
- Values: 3–4 short blocks.
- Group structure diagram: parent → two companies, simple and clean.

### 3. People
- Directors section first: **Preet** and **Raghu**, large portraits, role, short bio.
- Leadership grid: 4–6 people.
- Team grid: 8–12 smaller cards.
- Each card: photo, name, role. Click opens a modal with a longer bio.

### 4. Our Companies
- One long section per company: logo placeholder, description, what they sell, service areas, image gallery, and a prominent "Visit site" outbound button.
- Make it obvious these are separate legal entities operating under one group.

### 5. Projects (Fabluxora Interiors)
- Filter bar: All / Residential / Commercial / Ongoing / Completed.
- Masonry or 3-up grid of project cards: cover image, project name, location, type, status chip ("Ongoing" in teal, "Completed" in navy).
- **Project detail page**: hero image, project meta (location, type, area, year, status), description, image gallery with lightbox, and a "Start a project like this" enquiry CTA.
- 9–12 mock projects.

### 6. Awards
- Grid of award cards: award name, awarding body, year, category, short note, optional image.
- Group by year.

### 7. Sustainability
- Statement hero.
- 4–6 initiative cards: title, image, description, and a simple progress or impact figure.
- Short "our commitments" list.

### 8. CSR
- Feed of CSR updates, newest first: date, title, image, excerpt, "Read more".
- **CSR detail page** with full body and image gallery.
- 6 mock entries.

### 9. Blog
- Listing with category filter and search field (client-side filtering of mock data).
- Card: cover image, category chip, title, excerpt, author, date, read time.
- **Article page**: hero image, title, meta, long body with headings, pull quotes, images, author box, and a "Related posts" row.
- 8 mock posts across categories: Interiors, Electronics, Sustainability, Company News.

### 10. Client Reviews (Fabluxora Interiors)
- Grid of review cards: star rating, quote, client name, project type, location, date.
- Summary bar at the top: average rating and total review count.
- 12 mock reviews.

### 11. Contact / B2B Enquiry
- Split layout. Left: contact details, map placeholder, working hours, separate contact lines for each company. Right: **B2B enquiry form**.
- Form fields exactly: **Name, Email, Phone, Enquiry message** — all required, all validated. Add an optional "Company name" field and an enquiry-type dropdown (Interiors, Electronics, B2B supply, Other).
- On submit: show a success panel with a mock reference number. Add the comment `// TODO: integrate with SixOrbit — client's existing enquiry system`.

## ADMIN PORTAL (front-end mock, same project, routes under `/admin`)

The client's team manages content themselves. Build the screens, fake the data, fake the login.

- **`/admin/login`** — email + password, any credentials work, a note on screen saying this is a prototype login. Add a small role switcher so the demo can be viewed as **Director**, **Editor** or **Viewer**.
- **`/admin`** — dashboard: content counts, recent enquiries, recent activity list.
- **Content managers**, each with a table view (search, filter, status chip, edit/delete) and a create/edit form with a rich-text-style editor and image upload placeholder:
  - Blog posts
  - CSR updates
  - Sustainability initiatives
  - Ongoing projects
  - Awards
  - Client reviews (with approve / hide)
- **Enquiries** — table of B2B enquiries: name, email, phone, message, date, status (New / In progress / Closed).
- **Users and access** — table of users with name, email, role, last active. A "Create user" form that assigns a role.
  - **Roles: Director (full control, only role that can create users and assign roles), Editor (create and edit content, cannot manage users), Viewer (read only).**
  - Enforce this visually: when the role switcher is set to Editor or Viewer, hide or disable the Users section and the delete actions, and show a "You don't have access to this" state rather than a blank page.
- Admin layout: navy sidebar, light content area, breadcrumb, and the same type system as the public site but denser.

## DELIVERY CHECKLIST

Before you finish, confirm: every route above exists and is linked; mock data lives in `src/data/`; no colour is hard-coded in a component; the site works at 375px; the admin role switcher visibly changes what's available; no back-end service is connected.

---

## BUILD ORDER (if Lovable does too much at once)

Feed these as separate follow-up prompts instead of one giant message:

1. **Foundation** — the PROJECT, HARD CONSTRAINTS, DESIGN DIRECTION and GLOBAL LAYOUT sections, plus page 1 (Home). Ask it to set up tokens, fonts, header, footer and home page only.
2. "Now build The Group and People pages as specified." (paste sections 2–3)
3. "Now build Our Companies, Projects and the project detail page." (paste sections 4–5)
4. "Now build Awards, Sustainability and CSR including the CSR detail page." (paste sections 6–8)
5. "Now build Blog, the article page, and Client Reviews." (paste sections 9–10)
6. "Now build the Contact / B2B enquiry page." (paste section 11)
7. "Now build the admin portal." (paste the ADMIN PORTAL section)
8. "Run through this checklist and fix anything missing." (paste DELIVERY CHECKLIST)
