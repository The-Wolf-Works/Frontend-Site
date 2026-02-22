# The Wolf Works — Frontend Site

The public-facing website for The Wolf Works, built as a **headless WordPress** setup. WordPress acts as the content management system (CMS) while this Next.js application handles all presentation and routing.

## Architecture

```
WordPress (CMS) ──GraphQL──► Next.js Frontend ──► User
```

- **WordPress + WPGraphQL** — content is authored and managed in WordPress. WPGraphQL exposes it via a GraphQL API.
- **Next.js 16 (App Router)** — fetches content from WordPress at build time and serves it as a fast, modern React application.
- **Tailwind CSS** — utility-first styling.
- **TypeScript** — fully typed throughout.

## What It Does

- Renders the homepage by fetching the `/home/` page from WordPress
- Dynamically generates all other pages from WordPress using the `[slug]` route
- Pulls the primary navigation menu directly from WordPress
- Statically generates all pages at build time for performance (`generateStaticParams`)
- Displays featured images, page titles, and rich content from WordPress

## Project Structure

```
app/
  page.tsx              # Homepage — fetches /home/ from WordPress
  [slug]/page.tsx       # Dynamic pages — statically generated from WordPress slugs
  components/
    Navigation.tsx      # Nav bar — fetches primary menu from WordPress
  layout.tsx            # Root layout
  globals.css           # Global styles
lib/
  client.ts             # GraphQL client configured with WordPress API URL
  queries.ts            # GraphQL queries (pages, slugs, menus)
  types.ts              # TypeScript types
public/
  logo.png              # The Wolf Works logo
```

## Getting Started

### Prerequisites

- Node.js 18+
- A WordPress instance with [WPGraphQL](https://www.wpgraphql.com/) installed and active

### Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_WORDPRESS_API_URL` | Full URL to the WPGraphQL endpoint (e.g. `https://example.com/graphql`) |
