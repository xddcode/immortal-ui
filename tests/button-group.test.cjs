const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

let server;
let ImmortalButton;
let ImmortalInput;
let ImmortalButtonGroup;
let ImmortalButtonGroupSeparator;
let ImmortalButtonGroupText;
let ButtonGroupDocsContent;

before(async () => {
  const { createServer } = await import('vite');
  server = await createServer({
    root: process.cwd(),
    logLevel: 'silent',
    appType: 'custom',
    server: { middlewareMode: true },
  });
  ({ ImmortalButton, ImmortalInput } = await server.ssrLoadModule('/src/components/ImmortalComponents.tsx'));
  ({
    ImmortalButtonGroup,
    ImmortalButtonGroupSeparator,
    ImmortalButtonGroupText,
  } = await server.ssrLoadModule('/src/components/ImmortalButtonGroup.tsx'));
  ({ ButtonGroupDocsContent } = await server.ssrLoadModule('/src/components/ButtonGroupDocsContent.tsx'));
});

after(async () => {
  await server?.close();
});

const h = React.createElement;

function button(label, props = {}) {
  return h(ImmortalButton, { ...props, key: label }, label);
}

test('Classic groups own one shared surface and provide semantic composition', () => {
  const html = renderToStaticMarkup(h(ImmortalButtonGroup, {
    'aria-label': 'Project actions',
    children: [
      button('Preview'),
      h(ImmortalButtonGroupSeparator, { key: 'separator' }),
      button('Deploy'),
      h(ImmortalButtonGroupText, { key: 'text' }, 'Ready'),
    ],
  }));
  assert.match(html, /role="group"/);
  assert.match(html, /aria-label="Project actions"/);
  assert.match(html, /data-orientation="horizontal"/);
  assert.match(html, /data-orientation="vertical"/);
  assert.match(html, /box-shadow:var\(--shadow-convex-sm\)/);
  assert.match(html, /background-image:none/);
  assert.doesNotMatch(html, /data-metal-surface/);
});

test('Vertical groups and separators expose their orientation', () => {
  const html = renderToStaticMarkup(h(ImmortalButtonGroup, {
    orientation: 'vertical',
    'aria-label': 'Account actions',
    children: [
      button('Profile'),
      h(ImmortalButtonGroupSeparator, { key: 'separator', orientation: 'horizontal' }),
      button('Settings'),
    ],
  }));
  assert.equal((html.match(/data-orientation="vertical"/g) || []).length, 2);
  assert.match(html, /data-orientation="horizontal"/);
});

test('Metal groups use one rounded shared bezel', () => {
  const html = renderToStaticMarkup(h(ImmortalButtonGroup, {
    material: 'gold',
    'aria-label': 'Metal actions',
    children: [button('One'), button('Two')],
  }));
  assert.equal((html.match(/data-metal-surface=""/g) || []).length, 1);
  assert.match(html, /rounded-\[inherit\]/);
  assert.match(html, /--immortal-button-group-cap-radius:calc\(12px - 1px\)/);
  assert.match(html, /background:transparent/);
});

test('Nested groups retain independent surfaces and structure', () => {
  const nested = renderToStaticMarkup(h(ImmortalButtonGroup, {
    'aria-label': 'Editor actions',
    children: [
      h(ImmortalButtonGroup, { key: 'history', 'aria-label': 'History', children: [button('Undo'), button('Redo')] }),
      h(ImmortalButtonGroup, { key: 'publish', 'aria-label': 'Publishing', children: [button('Save'), button('Publish')] }),
    ],
  }));
  assert.equal((nested.match(/role="group"/g) || []).length, 3);
  assert.equal((nested.match(/<button/g) || []).length, 4);
});

test('ButtonGroupText can render a semantic label', () => {
  const html = renderToStaticMarkup(h(ImmortalButtonGroup, {
    'aria-labelledby': 'name-label',
    children: [
      h(ImmortalButtonGroupText, {
        key: 'label',
        render: h('label', { id: 'name-label', htmlFor: 'name' }),
      }, 'Name'),
      h(ImmortalInput, { key: 'input', id: 'name' }),
    ],
  }));
  assert.match(html, /<label id="name-label" for="name" class="immortal-button-group-text/);
  assert.match(html, /aria-labelledby="name-label"/);
  assert.match(html, /id="name"/);
});

test('Shared variants own their surface treatment and text color', () => {
  for (const variant of ['default', 'metallic', 'recessed', 'danger', 'ghost', 'link']) {
    const html = renderToStaticMarkup(h(ImmortalButtonGroup, {
      variant,
      'aria-label': `${variant} actions`,
      children: [button('One'), button('Two')],
    }));
    assert.match(html, new RegExp(`data-variant="${variant}"`));
  }
  const metallic = renderToStaticMarkup(h(ImmortalButtonGroup, {
    variant: 'metallic', children: [button('Deploy')],
  }));
  assert.match(metallic, /color:#09090b/);

  const danger = renderToStaticMarkup(h(ImmortalButtonGroup, {
    variant: 'danger', children: [button('Delete')],
  }));
  assert.match(danger, /color:#fda4af/);

  const link = renderToStaticMarkup(h(ImmortalButtonGroup, {
    variant: 'link', material: 'gold', children: [button('Learn more')],
  }));
  assert.doesNotMatch(link, /data-metal-surface/);
});

test('ButtonGroup docs render rich examples with visible code', () => {
  const html = renderToStaticMarkup(h(ButtonGroupDocsContent));
  for (const heading of ['Variants', 'Sizes', 'Icons', 'Materials', 'Layout &amp; composition', 'Input composition']) {
    assert.ok(html.includes(heading), `missing docs section: ${heading}`);
  }
  for (const example of ['GroupVariants', 'GroupSizes', 'GroupIcons', 'GroupMaterials', 'GroupLayouts', 'GroupWithInput']) {
    assert.ok(html.includes(example), `missing visible code: ${example}`);
  }
  assert.equal((html.match(/<pre/g) || []).length, 6);
  assert.ok(html.includes('variant=&quot;metallic&quot;'));
  assert.ok(html.includes('iconPosition=&quot;end&quot;'));
  assert.ok(html.includes('Icon-only group'));
  assert.ok(html.includes('aria-label=&quot;Increase&quot;'));
  assert.ok(html.includes('aria-label=&quot;Decrease&quot;'));
  assert.ok(html.includes('aria-label=&quot;Message composer&quot;'));
  assert.ok(html.includes('aria-label=&quot;Add attachment&quot;'));
  assert.ok(html.includes('aria-label=&quot;Voice input&quot;'));
  assert.ok(html.includes('Send a message…'));
  assert.ok(html.includes('background-image:var(--bg-concave)'));
  assert.ok(!html.includes('data-button-group-input'));
});

test('Vertical groups do not override fixed icon button width', () => {
  const css = fs.readFileSync('src/components/ImmortalButtonGroup.css', 'utf8');
  assert.doesNotMatch(css, /\[data-orientation="vertical"\][^{]*> \.immortal-button\s*\{\s*width:\s*100%/);
});
