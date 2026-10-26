import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { log } from 'node:console';
import { mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const require = createRequire(import.meta.url);
const temporary = mkdtempSync(path.join(tmpdir(), 'ui-components-package-'));

try {
  assert.ok(process.env.npm_execpath, 'Run this check with npm run check-package.');
  const output = execFileSync(
    process.execPath,
    [process.env.npm_execpath, 'pack', '--json', '--ignore-scripts', '--pack-destination', temporary],
    { cwd: root, encoding: 'utf8' },
  );
  const result = JSON.parse(output);
  const [packed] = Array.isArray(result) ? result : Object.values(result);
  const files = new Set(packed.files.map(({ path: filename }) => filename));
  const manifest = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
  const exportPaths = Object.values(manifest.exports).flatMap((value) =>
    typeof value === 'string' ? [value] : Object.values(value),
  );

  for (const filename of ['LICENSE', 'README.md', 'package.json', ...exportPaths]) {
    assert.ok(files.has(filename.replace(/^\.\//, '')), `Missing package file: ${filename}`);
  }
  for (const filename of files) {
    assert.match(
      filename,
      /^(?:LICENSE|README\.md|package\.json|dist\/.+\.(?:js|cjs|ts|css)|tailwind\.preset\.cjs|tokens\/figma\/[^/]+\.json|utils\/[^/]+\.cjs)$/,
      `Unexpected package file: ${filename}`,
    );
    assert.doesNotMatch(filename, /(?:^|\/)(?:tests|stories|__tests__|__stories__)\//);
  }

  execFileSync('tar', ['-xzf', path.join(temporary, packed.filename), '-C', temporary]);
  const extracted = path.join(temporary, 'package');
  symlinkSync(path.join(root, 'node_modules'), path.join(extracted, 'node_modules'), 'junction');
  const name = JSON.stringify(manifest.name);
  execFileSync(
    process.execPath,
    [
      '--input-type=module',
      '--eval',
      `
        import assert from 'node:assert/strict';
        import { createRequire } from 'node:module';
        import { createElement } from 'react';
        import { renderToStaticMarkup } from 'react-dom/server';
        import * as esm from ${name};
        const require = createRequire(process.cwd() + '/package.json');
        const cjs = require(${name});
        assert.deepEqual(Object.keys(esm).sort(), Object.keys(cjs).sort());
        for (const library of [esm, cjs]) {
          for (const component of [
            'Accordion', 'Autocomplete', 'Button', 'Carousel', 'Chart', 'Heading',
            'Input', 'Paragraph', 'BodyText', 'Select', 'Table', 'Textarea',
          ]) {
            assert.ok(library[component], 'Missing export: ' + component);
          }
          assert.match(
            renderToStaticMarkup(createElement(library.Button, { tone: 'primary' }, 'Ready')),
            /<button[^>]*>Ready<\\/button>/,
          );
          assert.ok(library.getThemeTokens('dark'));
        }
        const preset = require(${JSON.stringify(`${manifest.name}/tailwind-preset`)});
        assert.ok(preset.theme.extend.colors);
        assert.ok(preset.plugins.length);
        assert.ok(require.resolve(${JSON.stringify(`${manifest.name}/styles.css`)}));
      `,
    ],
    { cwd: extracted, stdio: 'inherit' },
  );

  const consumer = path.join(extracted, 'consumer.tsx');
  writeFileSync(
    consumer,
    `
      import { createElement, type ComponentProps } from 'react';
      import { Button, Input, Chart, getThemeTokens, themeModes, type ComponentVariant, type ButtonVariant } from ${name};
      const variant: ComponentVariant = 'outline';
      const legacyVariant: ButtonVariant = variant;
      const props: ComponentProps<typeof Button> = { variant: legacyVariant, tone: 'primary', children: 'Ready' };
      createElement(Button, props);
      createElement(Input, { label: 'Email', type: 'email' });
      const chart: ComponentProps<typeof Chart> = { type: 'line', data: [], series: [] };
      createElement(Chart, chart);
      getThemeTokens(themeModes[0]);
    `,
  );
  execFileSync(
    process.execPath,
    [
      require.resolve('typescript/bin/tsc'),
      '--noEmit',
      '--strict',
      '--skipLibCheck',
      '--target',
      'ES2020',
      '--module',
      'ESNext',
      '--moduleResolution',
      'bundler',
      '--jsx',
      'react-jsx',
      '--types',
      'react',
      consumer,
    ],
    { cwd: extracted, stdio: 'inherit' },
  );
  log(`Package verified: ${files.size} files; ESM, CommonJS, SSR, types, CSS, and Tailwind preset.`);
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
