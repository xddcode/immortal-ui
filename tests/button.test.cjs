const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

let server;
let ImmortalButton;
let ButtonDocsContent;

before(async () => {
  const { createServer } = await import('vite');
  server = await createServer({
    root: process.cwd(),
    logLevel: 'silent',
    appType: 'custom',
    server: { middlewareMode: true },
  });
  ({ ImmortalButton } = await server.ssrLoadModule('/src/components/ImmortalComponents.tsx'));
  ({ ButtonDocsContent } = await server.ssrLoadModule('/src/components/ButtonDocsContent.tsx'));
});

after(async () => {
  await server?.close();
});

function render(props = {}) {
  return renderToStaticMarkup(React.createElement(ImmortalButton, props));
}

test('ImmortalButton forwards refs to its native button', () => {
  assert.equal(ImmortalButton.$$typeof, Symbol.for('react.forward_ref'));
});

test('Classic preserves native attributes and exposes controlled loading', () => {
  const html = render({
    type: 'submit',
    'aria-label': 'Save changes',
    loading: true,
    loadingText: 'Saving...',
    children: 'Save',
  });
  assert.match(html, /^<button/);
  assert.match(html, /type="submit"/);
  assert.match(html, /aria-label="Save changes"/);
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /disabled=""/);
  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /Saving\.\.\./);
  assert.doesNotMatch(html, />Save</);
});

test('Ghost shares sizes, loading, disabled and custom styles', () => {
  const html = render({
    variant: 'ghost',
    size: 'sm',
    loading: true,
    loadingText: 'Loading ghost',
    style: { color: 'red' },
    children: 'Ghost',
  });
  assert.match(html, /h-8/);
  assert.match(html, /disabled=""/);
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /color:red/);
  assert.match(html, /Loading ghost/);
  assert.match(html, /animate-spin/);
  assert.doesNotMatch(html, />Ghost</);
});

test('Ghost icon buttons retain compact sizing and accessible naming', () => {
  const html = render({
    variant: 'ghost',
    size: 'icon',
    'aria-label': 'Continue',
    icon: React.createElement('span', null, '→'),
  });
  assert.match(html, /w-10/);
  assert.match(html, /h-10/);
  assert.match(html, /aria-label="Continue"/);
  assert.match(html, /→/);
});

test('Link stays lightweight while preserving loading and disabled behavior', () => {
  const html = render({
    variant: 'link',
    material: 'gold',
    loading: true,
    loadingText: 'Opening...',
    children: 'Documentation',
  });
  assert.match(html, /hover:underline/);
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /disabled=""/);
  assert.match(html, /Opening\.\.\./);
  assert.doesNotMatch(html, /data-metal-surface/);
});

test('Start and end icons preserve DOM order in Classic and WebGL', () => {
  for (const material of [undefined, 'gold']) {
    const icon = React.createElement('span', { 'data-testid': 'branch-icon' }, 'F');
    const start = render({ material, icon, children: 'Fork' });
    const end = render({ material, icon, iconPosition: 'end', children: 'Fork' });
    assert.ok(start.indexOf('data-testid="branch-icon"') < start.indexOf('>Fork<'));
    assert.ok(end.indexOf('data-testid="branch-icon"') > end.indexOf('>Fork<'));
  }
});

test('WebGL buttons sanitize bezel geometry and expose a CSS fallback', () => {
  const html = render({ material: 'gold', bezelPx: 4, sweepDeg: 180, children: 'Gold' });
  assert.match(html, /padding:4px/);
  assert.match(html, /border-radius:8px/);
  assert.match(html, /data-sweep-deg="180"/);
  assert.match(html, /aria-hidden="true" data-metal-surface=""/);
  assert.match(html, /background:linear-gradient/);
});

test('Invalid local optical values fall back without breaking geometry', () => {
  const invalid = render({ material: 'gold', bezelPx: Number.NaN, sweepDeg: Infinity, children: 'Gold' });
  assert.match(invalid, /padding:1px/);
  assert.match(invalid, /border-radius:11px/);
  assert.match(invalid, /data-sweep-deg="90"/);

  const negative = render({ material: 'gold', bezelPx: -2, children: 'Gold' });
  assert.match(negative, /padding:0px/);
  assert.match(negative, /border-radius:12px/);
});

test('Button docs render grouped previews with visible copyable code', () => {
  const html = renderToStaticMarkup(React.createElement(ButtonDocsContent, { htmlSnippet: '' }));
  for (const heading of ['Variants', 'Sizes', 'Icons', 'States', 'Materials', 'Usage guidelines']) {
    assert.ok(html.includes(heading), `missing docs section: ${heading}`);
  }
  for (const example of ['ButtonVariants', 'ButtonSizes', 'ButtonIcons', 'ButtonStates', 'ButtonMaterials']) {
    assert.ok(html.includes(example), `missing visible code: ${example}`);
  }
  assert.equal((html.match(/<pre/g) || []).length, 5);
  assert.ok(html.includes('variant=&quot;link&quot;'));
  assert.ok(html.includes('iconPosition=&quot;end&quot;'));
  assert.ok(html.includes('Start icon'));
  assert.ok(html.includes('End icon'));
  assert.ok(html.includes('Icon-only buttons need an'));
  assert.ok(html.includes('type=&quot;submit&quot;'));
});
