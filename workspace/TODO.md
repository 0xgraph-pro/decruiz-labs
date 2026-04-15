<instructions>
This file powers chat suggestion chips. Keep it focused and actionable.

# Be proactive
- Suggest ideas and things the user might want to add *soon*. 
- Important things the user might be overlooking (SEO, more features, bug fixes). 
- Look specifically for bugs and edge cases the user might be missing (e.g., what if no user has logged in).

# Rules
- Each task must be wrapped in a "<todo id="todo-id">" and "</todo>" tag pair.
- Inside each <todo> block:
  - First line: title (required)
  - Second line: description (optional)
- The id must be a short stable identifier for the task and must not change when you rewrite the title or description.
- You should proactively review this file after each response, even if the user did not explicitly ask, maintain it if there were meaningful changes (new requirement, task completion, reprioritization, or stale task cleanup).
- Think BIG: suggest ambitious features, UX improvements, technical enhancements, and creative possibilities.
- Balance quick wins with transformative ideas — include both incremental improvements and bold new features.
- Aim for 3-5 high-impact tasks that would genuinely excite the user.
- Tasks should be specific enough to act on, but visionary enough to inspire.
- Remove or rewrite stale tasks when completed, obsolete, or clearly lower-priority than current work.
- Re-rank by impact and user value, not just urgency.
- Draw inspiration from the project's existing features — what would make them 10x better?
- Don't be afraid to suggest features the user hasn't explicitly mentioned.
</instructions>

<todo id="calendly-integration">
Link real Calendly on Strategy Call page
Replace the static "60-minute session" copy with an embedded Calendly widget so leads can self-book after submitting
</todo>

<todo id="partner-logos">
Upload real partner logos
Use the DB PartnerLogo entity — add logo image URLs and partner website links so the grid shows actual brand logos
</todo>

<todo id="tech-docs">
Link Whitepaper PDF download
Replace the placeholder "#" href on the Download PDF button in WhitepaperPage with a real hosted PDF URL
</todo>


<todo id="seo-meta">
Add per-page SEO meta tags
Each page (/technology, /team) needs its own <title> and <meta description> via react-helmet or similar
</todo>

<todo id="animations-polish">
Polish GSAP scroll animations
Some sections could benefit from staggered counter animations for stats (e.g. 100K TPS counting up)
</todo>
