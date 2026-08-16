const test = require('node:test');
const assert = require('node:assert');
const { slugify, renderIndex } = require('./new-post.js');

test('slugify lowercases and kebab-cases', () => {
  assert.strictEqual(slugify('My Awesome Post!'), 'my-awesome-post');
  assert.strictEqual(slugify('LangGraph & RAG: A Deep Dive'), 'langgraph-rag-a-deep-dive');
  assert.strictEqual(slugify('  spaced   Title  '), 'spaced-title');
});

test('renderIndex emits items sorted newest-first with expected structure', () => {
  const posts = [
    { slug: 'a', title: 'Alpha', date: '2026-01-10', lang: 'en', tags: ['RAG'] },
    { slug: 'b', title: 'Beta', date: '2026-05-01', lang: 'fr', tags: ['Agents', 'MCP'] },
  ];
  const html = renderIndex(posts, 'blog/');
  assert.ok(html.includes('Beta'));
  assert.ok(html.indexOf('Beta') < html.indexOf('Alpha'), 'should be sorted newest first');
  assert.ok(html.includes('Agents'));
  assert.ok(html.includes('class="card post-card"'));
});