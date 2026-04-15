<instructions>
This file will be automatically added to your context. 
It serves multiple purposes:
  1. Storing frequently used tools so you can use them without searching each time
  2. Recording the user's code style preferences (naming conventions, preferred libraries, etc.)
  3. Maintaining useful information about the codebase structure and organization
  4. Remembering tricky quirks from this codebase

When you spend time searching for certain configuration files, tricky code coupled dependencies, or other codebase information, add that to this CODER.md file so you can remember it for next time.
Keep entries sorted in DESC order (newest first) so recent knowledge stays in prompt context if the file is truncated.
</instructions>

<coder>
# DeCruiz Labs — Codebase Notes

## Routing
- Uses `react-router-dom@6` with `createBrowserRouter` + `RouterProvider`
- Routes: `/` (HomePage), `/technology`, `/team`
- Layout wrapper component `<Layout>` in `App.tsx` renders `<HeaderNav>` + `<Outlet>` + `<Footer>`
- `HeaderNav` uses `useNavigate` + `useLocation` for page links; scroll links fall back to `getElementById`

## Animation
- GSAP + ScrollTrigger registered per-component via `gsap.context()` — always call `ctx.revert()` in cleanup
- Pattern: `gsap.fromTo(ref, {opacity:0, y:40}, { ... scrollTrigger:{trigger, start} })`
- Class-targeted animations (`.pillar-card`, `.team-card`, etc.) work inside `gsap.context()`

## Styling
- Tailwind config in `tailwind.config.js` — custom colors: `primary`, `secondary`, `accent`, `card`, `muted`, `background`
- `bg-gradient-1` = purple→cyan diagonal, `bg-gradient-2` = dark navy gradient
- Font stack: `font-sans` = Geist, `font-serif` = Source Serif Pro, `font-mono` = IBM Plex Mono

## Image Convention
- Unsplash CDN: `https://images.unsplash.com/photo-{id}?w={w}&q=80&auto=format&fit=crop`
- Person portraits: append `&face` for face-focused cropping

## Packages
- `@phosphor-icons/react` — icon library used throughout
- `gsap` — animations
- `@animaapp/playground-react-sdk` — DB hooks (`useQuery`, `useMutation`)
- `react-router-dom@6` — routing
</coder>
