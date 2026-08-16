# Blog

This is the blog section of the portfolio, built as a static GitHub Pages site with a small local scaffolding script.

## Create a new post

From the project root, run:

```bash
node assets/new-post.js "My Post Title" --en
```

- `--en` / `--fr` sets the language (defaults to `en`).
- The script creates a file like `blog/YYYY-MM-DD-my-post-title.html` from `_template.html`
  and regenerates `blog/index.html` with a post card for every post.

## After scaffolding

1. Open the generated file and replace the placeholder content:
   - fill in real tags in the `<meta name="tags" content="...">` tag,
   - replace `<p>Write your post here.</p>` with the actual article, and
   - delete the `<!-- TAGS -->` comment.
2. Add your content, then commit and push to publish:
   ```bash
   git add blog/ && git commit -m "post: ..." && git push
   ```

## When to re-run the script

You do **not** need to re-run the script for ordinary content edits — editing a
post's body text does not affect the index. Only re-run `node assets/new-post.js`
when you **add a new file** or **change a published post's metadata** (title, date,
language, or tags), because that is what rebuilds the index cards.