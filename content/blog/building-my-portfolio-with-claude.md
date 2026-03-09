---
title: "How I Built My Portfolio in a Weekend Using Claude"
date: "2026-03-08"
summary: "A technical deep-dive into how I built dharmeshcharugundla.dev — from zero to a live Next.js portfolio with a custom domain, a Life in Weeks visualization, and automated deployments — all in one session with Claude as my co-pilot."
readTime: "12 min read"
---

I've been meaning to build a personal portfolio for years. Between work at Meta, running, and life in general, it kept getting pushed back. Then I decided to try building it in a single session using [Claude](https://claude.ai) as my engineering co-pilot. What followed was one of the more interesting engineering experiences I've had outside of work.

This post is a technical walkthrough of how it all came together — the stack, the decisions, the trade-offs, and a few things I'd do differently.

---

## The Stack

Before writing a single line of code, we settled on the stack:

```
Framework:  Next.js 14 (App Router)
Styling:    Tailwind CSS
Animations: Framer Motion
Hosting:    Vercel (free tier)
Domain:     Cloudflare Registrar (~$10/year)
```

**Why Next.js?** I'm a backend engineer by trade — Python, Java, distributed systems. I wanted something with good defaults, fast deployment, and TypeScript support. Next.js with the App Router fit the bill. The file-system routing is intuitive, and Vercel's zero-config deployment means you push to GitHub and it's live.

**Why Tailwind?** Utility-first CSS means you're not context-switching between files. For a portfolio, speed matters more than perfect architecture.

**Why Vercel?** Free tier, auto-deploys on every `git push`, global CDN, custom domain support. For a personal portfolio, you will never hit the free tier limits.

---

## The Design Philosophy

I didn't want a generic portfolio template. I'm a backend engineer who works on systems that touch billions of users — the design should reflect that. We landed on what I'd call **"Terminal Minimal"**:

- True black background (`#000000`)
- Cyan accent color (`text-cyan-400`)
- Monospace font (Geist Mono) for code and labels
- Clean sans-serif (Inter) for body text
- No heavy animations — just clean layout and sharp typography

The goal: a portfolio that a senior engineer at any company would look at and immediately understand what I do.

---

## Project Structure

```
src/
  app/
    page.tsx          ← main portfolio page
    blog/             ← blog (you're reading it now)
    weeks/            ← Life in Weeks visualization
  components/
    Navbar.tsx
    Hero.tsx
    About.tsx
    Experience.tsx
    Skills.tsx
    Contact.tsx
    LifeInWeeks.tsx
  data/
    experience.ts     ← work history
    skills.ts         ← tech stack
    lifeEvents.ts     ← life milestones for /weeks
  lib/
    blog.ts           ← markdown processing utilities
content/
  blog/               ← markdown blog posts
```

The data files are the key insight. Rather than hardcoding content in components, all the real data — experience, skills, life events — lives in TypeScript data files. This means updating your portfolio is just editing a `.ts` file, not hunting through JSX.

---

## The Experience Section

The experience section went through a few iterations. We initially tried bullet points (resume-style), then switched to single paragraph summaries per role. The reasoning: a portfolio is not a resume. A resume is scanned in 6 seconds. A portfolio is read by people who are already interested — they want the story, not the bullets.

```typescript
export const experience = [
  {
    title: "Software Engineer",
    company: "Meta",
    location: "New York, NY",
    dates: "March 2024 – Present",
    summary: "Part of the Experimentation Platform team that runs the largest
              A/B tests on the planet...",
    tech: ["Python", "Hive", "Spark", "Presto", "Airflow"],
    experimentation: ["CUPED", "Clustered Experimentation", "Delta Method", ...],
  },
  // ...
];
```

One thing worth calling out: the `experimentation` field under Meta. I work on statistical methods for A/B testing — CUPED for variance reduction, clustered experimentation for network effect isolation, the delta method for ratio metrics. These are niche but powerful signals for anyone who knows what they mean. We gave them their own tag row, visually distinct from the tech stack tags.

---

## The Technologies Word Cloud

The skills section became one of my favorite parts. Instead of a boring grid of badges, we built a word cloud with **three tiers of visual weight** based on actual proficiency:

```typescript
const primary = new Set([
  "Apache Flink", "Apache Kafka", "Airflow",
  "Java", "Python", "Hive", "PostgreSQL", "Presto"
]);

const mid = new Set(["AWS", "Terraform", "Docker", "Jenkins"]);

const getSize = (skill: string) =>
  primary.has(skill) ? "text-3xl opacity-100" :
  mid.has(skill)     ? "text-xl opacity-80"   :
                       "text-sm opacity-55";
```

The sizing is intentional — larger means more experience, not alphabetical order or some arbitrary ranking. Flink and Kafka are large because I've built production systems processing 100M+ events daily with them. AWS is mid-tier because I use it, but it's not my primary tool. This communicates seniority more honestly than a "5 stars out of 5" rating system.

---

## The Life in Weeks Page

This was the most technically interesting part of the build. Inspired by [Yizhou Yu's portfolio](https://yizhouyu.dev/weeks/), the idea is simple: visualize your entire life as a grid where each cell is one week.

The implementation challenge: events are variable width (text labels), but the grid needs consistent row widths.

**The approach that didn't work:** rendering event labels inline as flex items. When a label like "Joined Bloomberg · New York" takes up 8 cells worth of space, the remaining cells in that row shift, making rows different lengths.

**The approach that worked:** a greedy row-packing algorithm, similar to how text reflow works in a word processor.

```typescript
function packIntoRows(blocks: Block[], rowWidth: number): Block[][] {
  const rows: Block[][] = [];
  let currentRow: Block[] = [];
  let currentWidth = 0;

  for (const block of blocks) {
    const needed = currentWidth === 0
      ? block.width
      : block.width + CELL_GAP;

    if (currentWidth + needed > rowWidth && currentRow.length > 0) {
      rows.push(currentRow);
      currentRow = [block];
      currentWidth = block.width;
    } else {
      currentRow.push(block);
      currentWidth += needed;
    }
  }
  return rows;
}
```

Each "block" is either a 22px cell or an event label with a calculated pixel width based on text length:

```typescript
function getLabelWidth(label: string): number {
  const CHAR_WIDTH = 7.2;    // monospace text-xs
  const LABEL_PADDING = 20;  // horizontal padding
  const EMOJI_WIDTH = 18;
  return LABEL_PADDING + EMOJI_WIDTH + label.length * CHAR_WIDTH;
}
```

The grid is also responsive — a `ResizeObserver` watches the container and recalculates row packing when the window resizes.

The events are categorized (Personal, Education, Work, Travel) with filter buttons that toggle visibility. This was a simple state management problem:

```typescript
const [activeCategories, setActiveCategories] = useState<Set<Category>>(
  new Set(["personal", "education", "work", "travel"])
);
```

When you toggle a category, `buildBlocks()` is called with the updated set and the entire grid re-packs.

---

## Deployment

Deployment was genuinely the easiest part:

1. Push to GitHub
2. Connect repo to Vercel (one click)
3. Buy `dharmeshcharugundla.dev` on Cloudflare Registrar (~$10/year)
4. Add DNS records in Cloudflare pointing to Vercel
5. Done

Total hosting cost: **$10/year**. The free tier on Vercel handles the rest.

For SEO, we added a `sitemap.ts` and `robots.ts` using Next.js's built-in metadata API, then submitted to Google Search Console. With a unique name like mine, ranking #1 for "Dharmesh Charugundla" should happen within a week or two.

---

## The AI-Assisted Development Experience

I used the Claude Pro subscription ($20/month) and by the end of the entire build, I'd barely hit 50% of the usage quota. For the amount of code generated, iterated on, and debugged in a single session, that's remarkable value.

Claude handled the scaffolding, component generation, data modeling, and debugging in real time. The workflow felt like pair programming with someone who has infinite patience and reads documentation faster than I do.

What worked well:
- Iterating on design decisions quickly ("make Flink and Kafka bigger" → done in seconds)
- Catching TypeScript type errors before I noticed them
- Suggesting architectural patterns I wouldn't have reached for immediately

What still required my judgment:
- Content decisions — what to include, what to leave out
- Tone of the writing — the About section went through several drafts
- Data accuracy — Claude can structure the experience, but only I know what actually happened

The takeaway: AI-assisted development doesn't replace engineering judgment. It removes friction. The hard thinking — what to build, why it matters, how to present yourself — that's still entirely on you.

---

The full source code is on [GitHub](https://github.com/dharmeshch/dharmeshcharugundla.dev). Feel free to use it as a starting point for your own portfolio.
