(function () {
  'use strict';
  var MANIFEST = 'posts/index.json';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function fetchManifest() {
    return fetch(MANIFEST, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('manifest ' + r.status);
      return r.json();
    });
  }

  function cardHTML(p) {
    var series = p.series ? '<span class="series">' + esc(p.series) + '</span>' : '';
    return '<a class="writecard" href="post.html?slug=' + encodeURIComponent(p.slug) + '">' +
      series +
      '<h3>' + esc(p.title) + '</h3>' +
      '<p>' + esc(p.description || '') + '</p>' +
      '<span class="date">' + esc(p.date || '') + '</span>' +
      '</a>';
  }

  // Homepage: newest `limit` posts into #mount
  function renderHome(mountId, limit) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    fetchManifest().then(function (posts) {
      mount.innerHTML = posts.slice(0, limit).map(cardHTML).join('');
    }).catch(function () {
      mount.innerHTML = '<p class="loading">Posts coming soon.</p>';
    });
  }

  // blog.html: all posts into #mount
  function renderList(mountId) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    fetchManifest().then(function (posts) {
      mount.innerHTML = '<div class="writecards">' + posts.map(cardHTML).join('') + '</div>';
    }).catch(function () {
      mount.innerHTML = '<p class="loading">No posts yet.</p>';
    });
  }

  // post.html: render ?slug= into #mount
  function renderPost(mountId) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    var slug = new URLSearchParams(location.search).get('slug') || '';
    if (!/^[a-z0-9-]+$/i.test(slug)) { mount.innerHTML = '<p class="loading">Post not found.</p>'; return; }
    fetchManifest().then(function (posts) {
      var meta = posts.filter(function (p) { return p.slug === slug; })[0];
      return fetch('posts/' + slug + '.md', { cache: 'no-cache' }).then(function (r) {
        if (!r.ok) throw new Error('md ' + r.status);
        return r.text();
      }).then(function (md) {
        var title = meta ? meta.title : slug;
        var date = meta ? (meta.date || '') : '';
        document.title = title + ' — Farid GNANKAMBARY';
        mount.innerHTML =
          '<a class="back" href="blog.html">← All posts</a>' +
          '<h1>' + esc(title) + '</h1>' +
          '<div class="meta">' + esc(date) + '</div>' +
          '<div class="article-body">' + window.marked.parse(md) + '</div>';
      });
    }).catch(function () {
      mount.innerHTML = '<a class="back" href="blog.html">← All posts</a>' +
        '<p class="loading">This post isn\'t published yet.</p>';
    });
  }

  window.Blog = { renderHome: renderHome, renderList: renderList, renderPost: renderPost };
})();
