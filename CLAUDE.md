# Lalitha's AI Portfolio Website

## About Me
Lalitha Pammi — Senior Technical Program Manager with 10+ years in enterprise SaaS 
and government compliance SaaS. Currently on a career break, actively building AI 
projects and up skilling.

## Purpose of This Site
A focused AI project portfolio — not a full resume site. The homepage shows who I am 
in 2-3 lines, a stats bar, and my project cards. Each project has its own dedicated 
page that tells the full story: the problem, the architecture, the decisions I made, 
and the epiphanies along the way. This is a builder's narrative, not a project list.

## Site Structure

### Homepage
- Brief intro: name, title, 2-3 sentence bio
- Stats bar: years of experience, projects shipped, tools/technologies used
- "Projects & Builds" section with project cards
- Each card has: gold "FEATURED PROJECT" badge, project name, one-line description, 
  "VIEW PROJECT" button linking to the project's dedicated page
- Card detail below: left side has short description paragraph, right side has 
  TECH STACK and METHODOLOGIES as pill tags

### Project Pages (one per project, consistent template)
Each project page must have these sections in this order:
1. Hero — project name, one-line description, links (GitHub / Live Demo)
2. The Problem — what was broken, what frustrated me enough to build this
3. What Shipped — bullet list of exactly what is working and live today
4. The Architecture — diagram + explanation of how the pieces connect
5. The Stack — tech used with brief reason for each choice
6. Decisions I Made — 2-3 key decisions: what I chose, why, what I rejected
7. Epiphanies — 1-2 moments that surprised me or changed my thinking
8. The Story — narrative arc from start to finish

### Navigation
- Logo/name top left
- Nav links: Home, Projects
- Resume button (outlined) and LinkedIn button (solid dark navy) top right

## Projects

### Project 1: Job Application Lifecycle Agent
- Content file: content/project1.md
- Images: content/images/project1/
- Stack: Python, MCP, Claude API
- GitHub: github.com/Lalitha23/job-application-agent-

### Project 2: Decrypt
- Content file: content/project2.md
- Images: content/images/project2/
- Stack: React/JSX, Vercel
- Live: decrypt-game-nine.vercel.app

### Project 3: Audit Prep Tool (coming soon)
- Stack: n8n, Pinecone, Claude API
- Status: In development — show as a coming soon card on homepage

## Visual Style
- White/light background — clean and professional
- Primary color: Navy blue — #1B2A4A
- Accent color: Light blue — #5B9BD5
- Text: Dark navy #1B2A4A for headings, #4A5568 for body text
- Section labels: Light blue #5B9BD5, spaced uppercase
- Thin light blue horizontal line before section labels
- Badges: Light blue background #EBF4FF, navy text
- Buttons: "VIEW PROJECT" — solid navy #1B2A4A with white text
- Resume button: outlined navy border, navy text
- LinkedIn button: solid navy #1B2A4A with white text
- Project card: light gray background #F7F8FA, left border in light blue #5B9BD5
- Stats bar: light gray background #F0F4F8, navy numbers, gray labels
- Headshot border: light blue #5B9BD5
- Tech stack pills: light blue outlined tags #5B9BD5
- Serif font for headings, clean sans-serif for body
- Plenty of white space

## Layout Details
- Stats bar: large numbers in navy, spaced uppercase labels below in small text, 
  light gray background, divided by vertical lines
- Project cards: light gray card background, left border accent, gold badge top left,
  project name in serif, one-line description, dark navy "VIEW PROJECT" button top right
- Tech stack and methodology pills: small outlined tags, gold label above them
- Professional headshot on homepage hero, right side, in a gold-bordered frame

## Tech Stack for This Site
- Next.js
- Each project page follows the exact same component template
- Structure must be extensible — adding Project 3 later should require only adding 
  a new content file and images folder, nothing else

  ## Build Stages
Build in this order, one stage at a time:

Stage 1: Homepage
- Navigation
- Hero section with headshot placeholder
- Stats bar
- Projects & Builds section with project cards (Project 3 as coming soon)

Stage 2: Project 1 Page — Job Application Agent
- Read content/project1.md and content/images/project1/
- Follow the project page template in Site Structure above

Stage 3: Project 2 Page — Decrypt
- Read content/project2.md and content/images/project2/
- Follow the project page template in Site Structure above

Stage 4: Polish
- Responsive design for mobile
- Consistent spacing and typography across all pages
- Final color check — navy #1B2A4A and light blue #5B9BD5 only

Do not move to the next stage until the current stage is complete and approved.