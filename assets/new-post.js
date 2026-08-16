#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function slugify(title) {
  const s = title.toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return s;
}

function renderIndex(posts, prefix) {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return sorted.map(p => {
    const tags = (p.tags || []).map(t => `<span class="tech">${t}</span>`).join('');
    const langBadge = p.lang === 'fr' ? '<span class="badge">FR</span>' : '<span class="badge">EN</span>';
    const tagsBlock = tags ? `<p>${tags}</p>` : '';
    return `<article class="card post-card"><div>${langBadge}</div><h3><a href="${prefix}${p.slug}.html">${p.title}</a></h3><p class="post-date">${p.date}</p>${tagsBlock}</article>`;
  }).join('\n');
}

function collectPosts(dir) {
  const prefix = path.basename(dir) + '/';
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.html') && f !== 'index.html' && f !== '_template.html')
    .map(f => {
      const html = fs.readFileSync(path.join(dir, f), 'utf8');
      const get = (re) => (html.match(re) || [])[1] || '';
      return {
        slug: f.replace(/\.html$/, ''),
        title: get(/<title>(.*?)<\/title>/),
        date: get(/<meta name="published" content="([\d-]+)">/),
        lang: (get(/content="([a-z]{2})"/i) || '').toLowerCase(),
        tags: (get(/<meta name="tags" content="([^"]*)">/) || '').split(',').map(t => t.trim()).filter(Boolean),
      };
    });
}

function writeIndex(dir, posts) {
  const templateDir = path.join(__dirname, '..');
  const shell = fs.readFileSync(path.join(templateDir, 'blog', '_template.html'), 'utf8');
  const body = renderIndex(posts, '');
  const indexHtml = shell
    .replace('<!-- BLOG_LIST -->', body)
    .replace(/<!-- PAGE_TITLE -->/g, 'Posts')
    .replace(/<!-- PAGE -->/g, 'blog-index')
    .replace(/<!-- TAGS -->/, '')
    .replace(/<p class="post-date mono">[\s\S]*?<\/p>/, '')
    .replace(/<!-- TITLE -->/g, '')
    .replace(/<!-- PUBLISHED -->/g, '')
    .replace(/<!-- LANG -->/g, '')
    .replace(/<!-- BODY -->/g, '');
  fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);
}

function main(args) {
  const lang = args.includes('--fr') ? 'fr' : 'en';
  const langBadge = lang.toUpperCase();
  const title = args.filter(a => !a.startsWith('--')).join(' ').trim();
  const dir = path.join(__dirname, '..', 'blog');
  if (title) {
    const slug = slugify(title);
    const date = new Date().toISOString().slice(0, 10);
    const tpl = fs.readFileSync(path.join(__dirname, '..', 'blog', '_template.html'), 'utf8');
    const post = tpl
      .replace(/<!-- PAGE_TITLE -->/g, title)
      .replace(/<!-- TITLE -->/g, title)
      .replace(/<!-- PUBLISHED -->/g, date)
      .replace(/<!-- LANG -->/g, langBadge)
      .replace(/<!-- BODY -->/g, '<p>Write your post here.</p>')
      .replace(/<!-- PAGE -->/g, slug);
    fs.writeFileSync(path.join(dir, `${date}-${slug}.html`), post);
  }
  const posts = collectPosts(dir);
  writeIndex(dir, posts);
  console.log(`Index regenerated: ${posts.length} posts`);
}

module.exports = { slugify, renderIndex };
if (require.main === module) main(process.argv.slice(2));