import React from 'react';
import { fn } from 'storybook/test';
import Button from '../../button/Button';
import Input from '../../input/Input';
import Heading from '../../heading/Heading';
import Paragraph from '../../paragraph/Paragraph';
import { paletteTones } from '../../../themes/paletteTones';
import { themeTokens } from '../../../themes/themeTokens';

export default { title: 'Design System', parameters: { layout: 'padded' } };
export const Introduction = {
  args: { onClick: fn(), onChange: fn(), onFocus: fn(), onBlur: fn() },
  argTypes: {
    onClick: { control: false, table: { category: 'Events' } },
    onChange: { control: false, table: { category: 'Events' } },
    onFocus: { control: false, table: { category: 'Events' } },
    onBlur: { control: false, table: { category: 'Events' } },
  },
  render: (args) => (
    <article className="mx-auto grid max-w-4xl gap-6 rounded-lg bg-background-surface p-8 font-sans text-text-primary">
      <Heading level="h1">Web design system</Heading>
      <Paragraph>
        React DOM components styled with Tailwind CSS and CVA. Figma JSON files drive the palette, spacing, corners,
        typography, and Light, Dark, and Teal themes.
      </Paragraph>
      <Heading level="h2">Shared foundations</Heading>
      <div className="flex flex-wrap gap-4">
        {paletteTones.map((tone) => (
          <Button key={tone} tone={tone} onClick={args.onClick}>
            {tone}
          </Button>
        ))}
      </div>
      <Input
        label="Email"
        type="email"
        helperText="Accessible labels and validation, with no provider required."
        onChange={args.onChange}
        onFocus={args.onFocus}
        onBlur={args.onBlur}
      />
      <Heading level="h2">Usage</Heading>
      <pre
        tabIndex={0}
        role="region"
        aria-label="Usage code example"
        className="overflow-auto rounded-md bg-action-hover p-4 text-13"
      >
        <code>{`import '@taty1977/my-component-library/styles.css';
import { Button, Input } from '@taty1977/my-component-library';

<main className="light">
  <Input label="Email" type="email" />
  <Button tone="primary" variant="default">Continue</Button>
</main>`}</code>
      </pre>
      <Paragraph>
        Use the theme toolbar to preview every mode. Consumers can use the compiled stylesheet or add the exported
        Tailwind preset to their own build.
      </Paragraph>
      <Heading level="h2">Spacing (pixels)</Heading>
      <pre className="text-13">{JSON.stringify(themeTokens.core.space, null, 2)}</pre>
    </article>
  ),
};
