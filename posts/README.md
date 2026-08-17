# Blog posts

Each post is a Markdown file in this folder plus one row in `index.json`.

## Add a post
1. Write `posts/<slug>.md` (plain Markdown; the first `# H1` is optional — the
   title comes from the manifest).
2. Add an object to the **top** of `index.json` (newest first):
   ```json
   { "slug": "<slug>", "title": "…", "date": "YYYY-MM-DD", "series": "", "description": "…" }
   ```
   - `slug` must match the file name (`posts/<slug>.md`).
   - `series` is optional (use `""` for standalone posts).
3. Commit. The homepage "Writing" section shows the newest 3; `blog.html` shows all.

The 7 `cerebras-*` slugs are already in the manifest — drop the matching `.md`
files here (from `cerebras_knowledge_base/docs/blog/`) to publish them.
