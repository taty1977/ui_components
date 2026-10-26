import React from 'react';
import { fn } from 'storybook/test';
import { paletteTones } from '../../../themes/paletteTones';
import { Carousel } from '../Carousel';

const appearances = ['label', 'outline', 'text'];
const tones = paletteTones;
const Frame = ({ children }) => <div className="grid w-full min-w-0 gap-6">{children}</div>;

const createGalleryImage = (background, accent) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <rect width="1200" height="800" fill="${background}" />
      <circle cx="600" cy="400" r="240" fill="${accent}" />
      <rect x="410" y="310" width="380" height="180" rx="90" fill="#ffffff" opacity="0.92" />
    </svg>
  `)}`;

const renderCarousel = (args) => (
  <Frame>
    <Carousel {...args} />
  </Frame>
);

const imageSet = [
  {
    id: 'sky',
    src: createGalleryImage('#e0f2fe', '#38bdf8'),
    alt: 'Sky blue product image',
    badge: 'New',
    likeButton: true,
  },
  {
    id: 'mist',
    src: createGalleryImage('#f0f9ff', '#7dd3fc'),
    alt: 'Pale blue product image',
  },
  {
    id: 'ocean',
    src: createGalleryImage('#dbeafe', '#60a5fa'),
    alt: 'Ocean blue product image',
  },
  {
    id: 'ice',
    src: createGalleryImage('#eff6ff', '#93c5fd'),
    alt: 'Ice blue product image',
  },
  {
    id: 'aqua',
    src: createGalleryImage('#e6f7ff', '#0ea5e9'),
    alt: 'Aqua blue product image',
  },
  {
    id: 'navy',
    src: createGalleryImage('#e0f2fe', '#1e3a8a'),
    alt: 'Navy blue product image',
  },
  {
    id: 'midnight',
    src: createGalleryImage('#eff6ff', '#93c5fd'),
    alt: 'Midnight blue product image',
  },
  {
    id: 'skyline',
    src: createGalleryImage('#f0f9ff', '#7dd3fc'),
    alt: 'Skyline blue product image',
  },
];

const meta = {
  title: 'Data Display/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A product image carousel with Button-style label (tinted), outline, and text frames and controls in six tones. Includes responsive thumbnails, indicators, favorites, keyboard navigation, and an accessible modal gallery. Legacy primary and secondary variants retain their original neutral frames and accented controls.',
      },
    },
  },
  render: renderCarousel,
  args: {
    onImageChange: fn(),
    className: 'border-0 bg-transparent',
    images: imageSet,
    likeButton: true,
    variant: 'outline',
    tone: 'primary',
    showThumbnails: true,
    thumbnailsPosition: 'bottom',
    showIndicators: true,
    ariaLabel: 'Product image gallery',
    openOnClick: true,
  },
  argTypes: {
    images: {
      control: 'object',
      description: 'Array of gallery image objects. Set likeButton to false on an item to hide its favorite control.',
      table: { category: 'Data' },
    },
    likeButton: {
      control: 'boolean',
      description: 'Show or hide the favorite button for the active image.',
      table: { category: 'Display' },
    },
    variant: {
      control: 'select',
      options: appearances,
      description: 'Matches Button appearances for the carousel frame and navigation controls.',
      table: { category: 'Appearance' },
    },
    tone: {
      control: 'select',
      options: tones,
      description: 'Sets the tone for the frame, controls, active thumbnails, indicators, and badges.',
      table: { category: 'Appearance' },
    },
    className: {
      control: 'text',
      description: 'Optional custom CSS class name applied to the carousel container.',
      table: { category: 'Layout' },
    },
    showThumbnails: {
      control: 'boolean',
      description: 'Show thumbnail strip under the main image.',
      table: { category: 'Display' },
    },
    thumbnailsPosition: {
      control: { type: 'radio' },
      options: ['left', 'right', 'bottom'],
      description: 'Choose where thumbnails are displayed around the main image.',
      table: { category: 'Display' },
    },
    breakpoint: {
      control: 'select',
      options: ['mobile', 'tablet', 'desktop'],
      description: 'Choose the responsive layout breakpoint.',
      table: { category: 'Layout' },
    },
    showIndicators: {
      control: 'boolean',
      description: 'Show dot indicators under the main image.',
      table: { category: 'Display' },
    },
    initialIndex: {
      control: { type: 'number', min: 0, max: 24, step: 1 },
      description: 'First selected image index.',
      table: { category: 'Behavior' },
    },
    openOnClick: {
      control: 'boolean',
      description: 'Allow the main image and overflow thumbnail to open the gallery modal.',
      table: { category: 'Behavior' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the gallery region.',
      table: { category: 'Accessibility' },
    },
    ofText: {
      control: 'text',
      description: 'Text used between the active image number and total count.',
      table: { category: 'Content' },
    },
    onImageChange: {
      control: false,
      description: 'Called with the selected index and image when navigating.',
      table: { category: 'Events' },
    },
  },
};

export default meta;

export const Playground = {};

export const Variants = {
  render: (args) => (
    <Frame>
      {appearances.map((variant) => (
        <section key={variant} className="min-w-0">
          <h2 className="mb-2 text-18 font-semibold text-text-primary">{variant}</h2>
          <Carousel {...args} variant={variant} ariaLabel={`${args.ariaLabel} - ${variant} variant`} />
        </section>
      ))}
    </Frame>
  ),
};

export const Tones = {
  args: { variant: 'label' },
  render: (args) => (
    <Frame>
      {tones.map((tone) => (
        <section key={tone} className="min-w-0">
          <h2 className="mb-2 text-18 font-semibold text-text-primary">{tone}</h2>
          <Carousel {...args} tone={tone} ariaLabel={`${args.ariaLabel} - ${tone} tone`} />
        </section>
      ))}
    </Frame>
  ),
};

export const States = {
  render: (args) => (
    <Frame>
      {[
        { name: 'Single image', images: [imageSet[0]] },
        { name: 'Without favorites', likeButton: false },
        { name: 'Without modal opening', openOnClick: false },
        { name: 'Empty', images: [] },
      ].map(({ name, ...state }) => (
        <section key={name} className="min-w-0">
          <h2 className="mb-2 text-18 font-semibold text-text-primary">{name}</h2>
          <Carousel {...args} {...state} ariaLabel={`${args.ariaLabel} - ${name}`} />
        </section>
      ))}
    </Frame>
  ),
};

export const ThumbnailPositions = {
  render: (args) => (
    <Frame>
      {['bottom', 'left', 'right'].map((position) => (
        <section key={position} className="min-w-0">
          <h2 className="mb-2 text-18 font-semibold text-text-primary">{position}</h2>
          <Carousel
            {...args}
            showThumbnails
            thumbnailsPosition={position}
            ariaLabel={`${args.ariaLabel} - ${position} thumbnails`}
          />
        </section>
      ))}
    </Frame>
  ),
};
