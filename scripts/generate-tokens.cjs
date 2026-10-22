const fs = require('node:fs');
const path = require('node:path');
const { loadFigmaTokens } = require('../utils/loadFigmaTokens.cjs');
const { themeKey } = require('../utils/tailwindTokenUtils.cjs');

const tokens = loadFigmaTokens(path.resolve(__dirname, '../tokens/figma'));
const destination = path.resolve(__dirname, '../src/themes/generatedTokens.ts');

function validate(node, trail = [], references = new Set()) {
  if (typeof node === 'string' && /^\{.+\}$/.test(node)) {
    const reference = node.slice(1, -1);
    if (references.has(reference)) throw new Error(`Circular token reference: ${reference}`);
    let target = tokens;
    for (const key of reference.split('.')) {
      if (!target || typeof target !== 'object' || !(key in target)) {
        throw new Error(`Unknown token reference at ${trail.join('.')}: ${reference}`);
      }
      target = target[key];
    }
    if (!target || typeof target.$value !== 'string') {
      throw new Error(`Invalid token reference: ${reference}`);
    }
    validate(target.$value, trail, new Set([...references, reference]));
  } else if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) validate(value, [...trail, key], references);
  }
}

if (!tokens.Variables.Light || !tokens.Variables.Dark) throw new Error('Light and Dark tokens are required');
for (const mode of Object.keys(tokens.Variables)) {
  for (const group of ['Theme', 'Misc', 'Color-Palette']) {
    if (!tokens.Variables[mode][group]) throw new Error(`${mode}: missing ${group}`);
  }
  for (const group of ['Color', 'Gap', 'Border-Radius', 'Typography']) {
    if (!tokens.Primitives[mode]?.[group]) throw new Error(`${mode}: missing ${group}`);
  }
}
validate(tokens);
const keys = Object.fromEntries(Object.keys(tokens.Variables).map((mode) => [mode, themeKey(mode)]));
const output = `// Generated from tokens/figma/*.json. Run npm run generate-tokens.\nconst figmaTokens = ${JSON.stringify(tokens, null, 2)} as const;\n\nexport const themeKeys = ${JSON.stringify(keys)} as const;\nexport default figmaTokens;\n`;
if (process.argv.includes('--check')) {
  if (!fs.existsSync(destination) || fs.readFileSync(destination, 'utf8') !== output) {
    throw new Error('Generated tokens are stale. Run npm run generate-tokens.');
  }
  console.log('Generated tokens are up to date.');
} else {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, output);
  console.log('Generated src/themes/generatedTokens.ts');
}
