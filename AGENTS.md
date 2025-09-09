# AGENTS

This document catalogs the technologies, patterns, styling conventions, and notable utilities used in this repository so agents and contributors can quickly understand how to interact with and extend the codebase. Modeled after public AGENTS.md patterns seen in the wild.

## Tech Stack

- Next.js App Router with MDX support
- TypeScript (strict, moduleResolution: bundler)
- React 19, server + client components
- Motion (Framer Motion v12, `motion/react`) for transitions/animations
- TanStack Query v5 for client data fetching/cache
- Zod for schemas and runtime validation
- React Hook Form + zodResolver for forms
- Zustand (+ persist middleware) for local app state
- Supabase JS + SSR helpers for waitlist/signup
- Spotify Web API TS SDK for search/trending
- Base UI Components (Field, Input) for accessible form primitives
- html-to-image for DOM → image export
- use-sound for UI sound feedback
- Styling: CSS Modules + global CSS tokens (OKLCH) + `next/font/local`
- Tooling: Turbo, PNPM workspaces, Biome, Prettier

## Conventions

- Client components explicitly use 'use client' at top of file
- CSS Modules per component with co-located `styles.module.css`
- Global styles layered: `reset.css`, theme tokens (`colors.css`, `font.css`), then `main.css`
- Animations centralized in `lib/motion` with reusable MotionProps
- Forms: RHF + Zod schemas in `lib/schemas`, controlled via `Field` and `Button` components
- Data fetching:
  - React Query configured in `QueryProvider` (staleTime, retries off/on)
  - Edge Runtime for API routes when feasible; cache headers set explicitly
- State: `lib/stores/*` using Zustand with schema-validated updates
- Fonts: `next/font/local` with variable and display swap; exported from `lib/fonts`
- Icons: co-located React components under `components/icons`
- Accessibility: sr-only utilities, `aria-*` attributes, keyboard affordances
- Sounds: `lib/sounds` gate playback via `useSettings` mute flag

## Patterns and Examples

### Layout and Providers

```tsx
// apps/waitlist/app/layout.tsx
import clsx from "clsx";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { QueryProvider } from "@/components/providers/query-provider";
import { inter } from "@/lib/fonts";
import "@/styles/main.css";

export const metadata: Metadata = { /* SEO + OG setup */ };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <QueryProvider>
        <body className={clsx(inter.className)}>
          <main>{children}</main>
          <Footer />
        </body>
      </QueryProvider>
    </html>
  );
}
```

### View switching with Zustand + Motion

```tsx
// apps/waitlist/components/activity-card-editor/index.tsx
"use client";
import { AnimatePresence } from "motion/react";
import { useViewStore } from "@/lib/stores/view";
import { ActivityCard } from "./activity-card";
import { Forms } from "./forms";

export function ActivityCardEditor() {
  const { view } = useViewStore();
  return (
    <AnimatePresence mode="wait">
      {view === "card" ? (
        <ActivityCard key="card" />
      ) : view === "edit-activity" ? (
        <Forms.Activity key="edit-activity" />
      ) : view === "edit-spotify" ? (
        <Forms.Spotify key="edit-spotify" />
      ) : view === "edit-item-one" ? (
        <Forms.ItemOne key="edit-item-one" />
      ) : view === "edit-item-two" ? (
        <Forms.ItemTwo key="edit-item-two" />
      ) : view === "edit-quote" ? (
        <Forms.Quote key="edit-quote" />
      ) : null}
    </AnimatePresence>
  );
}
```

### Motion primitives

```ts
// apps/waitlist/lib/motion/index.ts
export const viewTransition = { /* scale + blur in/out, 0.4s custom ease */ };
export const reveal = { /* springy enter/exit for small items */ };
export const button = {
  text: { /* slide up */ },
  spinner: { /* slide down */ },
};
```

Use in components:

```tsx
<Button.Root type="submit">
  <AnimatePresence mode="popLayout" initial={false}>
    {state === "idle" && <Button.Label {...button.text}>Join</Button.Label>}
  </AnimatePresence>
  <AnimatePresence mode="popLayout" initial={false}>
    {state === "working" && (
      <Button.Label {...button.spinner}>
        <Spinner />
      </Button.Label>
    )}
  </AnimatePresence>
</Button.Root>
```

### Forms with RHF + Zod + Base UI Field

```tsx
// apps/waitlist/components/sign-up/index.tsx
const { control, handleSubmit, formState } = useForm({
  resolver: zodResolver(Schemas.SignUp),
  defaultValues: { email: "" },
});

<form onSubmit={handleSubmit(onValid, onInvalid)}>
  <Controller
    name="email"
    control={control}
    render={({ field, fieldState }) => (
      <Field.Root name="email" invalid={fieldState.invalid}>
        <Field.Label htmlFor="email" className="sr">Email</Field.Label>
        <Field.Control {...field} id="email" type="text" />
      </Field.Root>
    )}
  />
</form>
```

### Schema-first Card state with validated updates

```ts
// apps/waitlist/lib/stores/card.ts
export const useCardStore = create<CardState>()(persist((set, get) => ({
  card: initialCard,
  updateSection: (section, updates) => {
    const schema = {
      activity: Schemas.Activity,
      spotify: Schemas.Spotify,
      item_one: Schemas.Item,
      item_two: Schemas.Item,
      quote: Schemas.Quote,
      summary: Schemas.Summary,
    }[section];
    const parsed = schema.partial().parse(updates);
    set((state) => ({ card: { ...state.card, [section]: { ...state.card[section], ...parsed } } }));
  },
  validateCard: () => {
    try { Schemas.Card.parse(get().card); return true; } catch { return false; }
  },
})))
```

### Spotify SDK + Edge API routes

```ts
// apps/waitlist/app/api/spotify/search/route.ts
export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  // guard empty query
  if (!q.trim()) return Response.json({ items: [] }, { headers: { "Cache-Control": "no-store" } });
  const sdk = getSpotifySdk();
  const res = await sdk.search(q, ["track"], /* market */);
  const items = normalizeTracks(res.tracks?.items).slice(0, /* limit */ 8);
  return Response.json({ items }, { headers: { "Cache-Control": "no-store" } });
}
```

Client hook for debounced search powered by React Query:

```ts
// apps/waitlist/lib/hooks/use-spotify-search.ts
export function useTrackSearch({ input, options }: UseTrackSearchProps) {
  const { limit = 3, market, minChars = 2, delay = 250 } = options ?? {};
  const [query, setQuery] = useState("");
  const debouncedSetQuery = useDebouncedCallback(setQuery, delay);
  useEffect(() => { debouncedSetQuery(input?.trim() || ""); }, [input, debouncedSetQuery]);
  return useQuery({
    queryKey: ["spotify-search", { query, limit, market }],
    enabled: query.length >= minChars,
    queryFn: async ({ signal }) => { /* fetch /api/spotify/search */ },
    placeholderData: (prev) => prev ?? [],
    retry: 0,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
}
```

### DOM → Image export with Effect orchestration

```ts
// apps/waitlist/lib/hooks/use-effect-download.ts
export function useEffectDownload(nodeRef, opts = {}) {
  const [state, setState] = useState("idle");
  const { play } = useSoundController();
  const start = useCallback(() => {
    if (!nodeRef.current || state === "working") return;
    setState("working");
    const exportEff = Effect.tryPromise(() => downloadElementAsImage(nodeRef.current, opts));
    const program = Effect.sleep(Duration.millis(1500))
      .pipe(Effect.flatMap(() => exportEff))
      .pipe(Effect.tap(() => Effect.sync(() => { play("celebration"); setState("done"); })))
      .pipe(Effect.tap(() => Effect.sleep(Duration.millis(1500))))
      .pipe(Effect.timeoutFail({ duration: Duration.millis(15000), onTimeout: () => new Error("Export timed out") }))
      .pipe(Effect.ensuring(Effect.sync(() => setState("idle"))));
    Effect.runPromise(program);
  }, [nodeRef, opts, state, play]);
  return { state, start } as const;
}
```

Underlying export utility:

```ts
// apps/waitlist/lib/export/index.ts
export async function downloadElementAsImage(node: HTMLElement, options: DownloadOptions = {}) {
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  const pixelRatio = Math.min(options.maxPixelRatio ?? 3, dpr * (options.multiplier ?? 2));
  await Promise.all([ensureImagesLoaded(node), ensureFontsReady()]);
  const dataUrl = options.format === "jpeg"
    ? await htmlToImage.toJpeg(node, { pixelRatio, cacheBust: true, backgroundColor: /* auto or provided */, filter: options.filter, quality: options.jpegQuality ?? 0.92 })
    : await htmlToImage.toPng(node, { pixelRatio, cacheBust: true, backgroundColor: /* auto or provided */, filter: options.filter });
  // trigger download
}
```

## Styling System

- Global tokens (OKLCH) in `styles/theme/colors.css` with light/dark via prefers-color-scheme
- Typography scale in `styles/theme/font.css` (font sizes, letter-spacing, line-heights, weights)
- Component styles via CSS Modules; examples:
  - `components/button/styles.module.css` for atomic button primitives
  - `components/field/styles.module.css` for Field states, counters, errors
  - Editor card layout in `components/activity-card-editor/activity-card/styles.module.css`
- Utility classes:
  - `.sr` for visually-hidden content
  - `.skip` link for skip-to-content
- `next/font/local` provides `inter` and `openrunde` with `display: swap` and a CSS variable for Openrunde

## Accessibility Practices

- ARIA: `aria-live`, `aria-busy`, labels and descriptions, role="alert" on errors
- Keyboard support: Escape to clear, Cmd/Ctrl+K to focus search
- Reduced motion: `useReducedMotion` and global media query fallbacks

## Data & Caching

- React Query default options set in `QueryProvider`
- API edge routes explicitly set cache headers and `revalidate`
- Client search uses placeholderData, retry: 0, tuned stale/gc times

## Sounds UX

- `useSoundController` maps friendly keys to WAV assets in `public/media/sounds`
- Mute respected via `useSettings`; randomization for typing/swipes/taps for variety

## MDX

- MDX enabled via `@next/mdx` in `next.config.js` with `pageExtensions` including `mdx`
- Example page: `app/manifesto/page.mdx`

## Environment

- Spotify: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`
- Site URL: `NEXT_PUBLIC_SITE_URL` (fallback to `VERCEL_URL` or localhost)

## Gotchas / Tips

- Persisted Zustand store (`card-store`) has a migration guard; incompatible shapes reset to `initialCard`
- Image export filters out elements with `data-slot="button"` and `.download` class to avoid capturing UI controls
- Use `AnimatePresence` with `mode="wait"` or `mode="popLayout"` to avoid jank on transitions
- Keep schemas the single source of truth; update `Schemas.*` first, then stores/forms

