import React from 'react';
import '../global.css';
import { themeModes } from '../src/themes/themeTokens';

const frames = { fluid: '100%', mobile: '390px', tablet: '768px', laptop: '1024px', desktop: '1280px' };
export const parameters = {
  layout: 'padded',
  options: { storySort: { order: ['All Components'] } },
};
export const initialGlobals = { theme: 'light', responsiveFrame: 'fluid' };
export const globalTypes = {
  theme: {
    description: 'Figma theme mode',
    toolbar: { icon: 'paintbrush', items: themeModes, dynamicTitle: true },
  },
  responsiveFrame: {
    description: 'Responsive preview width',
    toolbar: { icon: 'browser', items: Object.keys(frames), dynamicTitle: true },
  },
};
export const decorators = [
  (Story, context) =>
    React.createElement(
      'div',
      {
        className: `${context.globals.theme ?? 'light'} min-h-screen bg-background-canvas p-4 font-sans text-text-primary`,
      },
      React.createElement(
        'div',
        {
          className: 'mx-auto w-full min-w-0',
          style: { maxWidth: frames[context.globals.responsiveFrame] ?? frames.fluid },
        },
        React.createElement(Story),
      ),
    ),
];
