import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import Gallery from '../Gallery';

const createProjectImage = (background, accent, artwork) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <rect width="1200" height="900" fill="${background}" />
      <circle cx="1020" cy="130" r="250" fill="${accent}" opacity=".15" />
      ${artwork}
    </svg>
  `)}`;

const items = [
  {
    id: 'brand-identity',
    href: '#brand-identity',
    title: 'Brand Identity',
    category: 'Brand',
    image: createProjectImage(
      '#e8e5f5',
      '#6750a4',
      `
      <rect x="170" y="180" width="470" height="560" rx="20" fill="#6750a4" />
      <circle cx="405" cy="410" r="115" fill="#e8e5f5" />
      <rect x="245" y="595" width="320" height="20" rx="10" fill="#e8e5f5" />
      <rect x="695" y="460" width="320" height="200" rx="16" fill="#ffffff" />
      <circle cx="775" cy="535" r="35" fill="#6750a4" />
    `,
    ),
    alt: 'Purple brand booklet and white business card with circular logos',
    description: 'A visual identity built around bold color and typography.',
  },
  {
    id: 'product-design',
    href: '#product-design',
    title: 'Product Design',
    category: 'Design',
    image: createProjectImage(
      '#e0f0ec',
      '#28786a',
      `
      <ellipse cx="600" cy="755" rx="260" ry="35" fill="#28786a" opacity=".15" />
      <rect x="455" y="245" width="290" height="500" rx="65" fill="#28786a" />
      <rect x="510" y="155" width="180" height="115" rx="20" fill="#163e36" />
      <rect x="490" y="420" width="220" height="185" rx="12" fill="#ffffff" />
      <circle cx="600" cy="490" r="35" fill="#e0f0ec" />
    `,
    ),
    alt: 'Green product bottle with a white label on a pale green background',
    description: 'A product concept focused on simple, useful details.',
  },
  {
    id: 'web-experience',
    href: '#web-experience',
    title: 'Web Experience',
    category: 'Web',
    image: createProjectImage(
      '#e4edf8',
      '#3264a8',
      `
      <rect x="180" y="170" width="840" height="535" rx="24" fill="#1c3151" />
      <rect x="210" y="200" width="780" height="475" rx="12" fill="#ffffff" />
      <rect x="210" y="200" width="780" height="65" rx="12" fill="#3264a8" />
      <rect x="250" y="310" width="240" height="320" rx="12" fill="#e4edf8" />
      <rect x="535" y="335" width="390" height="30" rx="8" fill="#3264a8" />
      <rect x="535" y="400" width="310" height="18" rx="8" fill="#c0d0e8" />
      <rect x="535" y="510" width="180" height="70" rx="12" fill="#3264a8" />
      <path d="M120 705H1080L1010 755H190Z" fill="#8093af" />
    `,
    ),
    alt: 'Laptop displaying a blue and white website layout',
    description: 'A responsive digital experience for a growing business.',
  },
  {
    id: 'print-campaign',
    href: '#print-campaign',
    title: 'Print Campaign',
    category: 'Brand',
    image: createProjectImage(
      '#faeadf',
      '#ad503b',
      `
      <rect x="160" y="225" width="380" height="490" rx="10" fill="#ffffff" transform="rotate(-8 350 470)" />
      <rect x="585" y="150" width="420" height="600" rx="10" fill="#ad503b" transform="rotate(8 795 450)" />
      <circle cx="350" cy="410" r="110" fill="#ad503b" />
      <rect x="240" y="580" width="220" height="20" rx="8" fill="#ad503b" />
      <path d="M670 540L795 285L920 540Z" fill="#faeadf" />
    `,
    ),
    alt: 'Cream and terracotta campaign posters with geometric artwork',
    description: 'A coordinated campaign across print and digital formats.',
  },
];

export default {
  title: 'Data Display/Gallery',
  component: Gallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive, category-filtered image gallery with keyboard-operable previews. Filters use the shared Button theme colors. Examples use self-contained SVG artwork without remote image dependencies. The preview dialog supports Escape, arrow-key navigation, a focus trap, and restoring focus to the image that opened it.',
      },
    },
  },
  args: {
    heading: 'Selected Work',
    items,
    filterStyle: 'default',
    showHoverActions: true,
    onFilterChange: fn(),
    onProjectClick: fn(),
    onPreviewOpen: fn(),
    onPreviewClose: fn(),
    onPreviewChange: fn(),
  },
  argTypes: {
    onFilterChange: { control: false, table: { category: 'Events' } },
    onProjectClick: { control: false, table: { category: 'Events' } },
    onPreviewOpen: { control: false, table: { category: 'Events' } },
    onPreviewClose: { control: false, table: { category: 'Events' } },
    onPreviewChange: { control: false, table: { category: 'Events' } },
    heading: { control: 'text', table: { category: 'Content' } },
    allLabel: { control: 'text', table: { category: 'Content' } },
    ariaLabel: { control: 'text', table: { category: 'Accessibility' } },
    items: { control: false, table: { category: 'Content' } },
    className: { control: 'text', table: { category: 'Layout' } },
    gridClassName: { control: 'text', table: { category: 'Layout' } },
    filterStyle: {
      control: 'select',
      options: ['default', 'pill', 'underline', 'rectangle'],
      description: 'Default uses underline filters. Pill and rectangle retain their filled appearances.',
      table: { category: 'Appearance' },
    },
    showHoverActions: {
      control: 'boolean',
      description:
        'Reveal an inset surface with a centered title and circular link/zoom controls on hover or keyboard focus. Always visible on touch devices.',
      table: { category: 'Behavior' },
    },
  },
};

export const Playground = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const image of canvas.getAllByRole('img')) {
      await image.decode();
      await expect(image.naturalWidth).toBeGreaterThan(0);
    }
  },
};

export const FilteringAndPreview = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Brand', pressed: false }));
    await expect(canvas.getByRole('button', { name: 'View Brand Identity' })).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'View Product Design' })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'View Brand Identity' }));
    const body = within(document.body);
    const dialog = body.getByRole('dialog', { name: 'Brand Identity' });
    await expect(dialog).toBeVisible();
    const image = within(dialog).getByRole('img');
    await image.decode();
    await expect(image.naturalWidth).toBeGreaterThan(0);
    await userEvent.keyboard('{Escape}');
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
  },
};

export const HoverActions = {
  args: { showHoverActions: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('button', { name: 'View Brand Identity' });
    const link = canvas.getByRole('link', { name: 'Visit Brand Identity' });
    const title = link.parentElement.parentElement.querySelector('p');
    if (matchMedia('(hover: hover)').matches) {
      await expect(getComputedStyle(title).visibility).toBe('hidden');
    } else {
      await expect(getComputedStyle(title).visibility).toBe('visible');
    }
    await expect(link).toHaveAttribute('href', '#brand-identity');
    card.focus();
    await waitFor(() => expect(getComputedStyle(title).visibility).toBe('visible'));
    await userEvent.tab();
    await expect(link).toHaveFocus();
    await waitFor(() => expect(link).toBeVisible());
    const overlay = link.parentElement.parentElement;
    await expect(getComputedStyle(overlay).backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    await expect(link.querySelector('svg')).toBeInTheDocument();
    await userEvent.tab();
    const preview = canvas.getByRole('button', { name: 'Preview Brand Identity' });
    await expect(preview.querySelector('svg')).toBeInTheDocument();
    await expect(preview).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    const body = within(document.body);
    await expect(body.getByRole('dialog', { name: 'Brand Identity' })).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: 'Next project' }));
    await expect(body.getByRole('dialog', { name: 'Product Design' })).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: 'Previous project' }));
    await expect(body.getByRole('dialog', { name: 'Brand Identity' })).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: 'Close project preview' }));
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
    await expect(preview).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(body.getByRole('dialog', { name: 'Brand Identity' })).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await expect(preview).toHaveFocus();
  },
};

export const WithoutHoverActions = {
  args: { showHoverActions: false },
};

const checkFilterStyle = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  const isUnderline = args.filterStyle === 'default' || args.filterStyle === 'underline';
  const all = canvas.getByRole('button', { name: 'All', pressed: true });
  await expect(all).toHaveClass(
    args.filterStyle === 'pill' ? 'rounded-full' : isUnderline ? 'rounded-none' : 'rounded-md',
  );
  await userEvent.click(canvas.getByRole('button', { name: 'Brand', pressed: false }));
  await expect(canvas.getByRole('button', { name: 'Brand', pressed: true })).toBeVisible();
  await expect(canvas.queryByRole('button', { name: 'View Product Design' })).not.toBeInTheDocument();
  if (isUnderline) {
    await expect(canvas.getByRole('button', { name: 'Brand' })).toHaveClass('border-palette-primary-text');
    await expect(all).toHaveClass('border-transparent');
  }
};

export const DefaultFilters = { args: { filterStyle: 'default' }, play: checkFilterStyle };
export const PillFilters = { args: { filterStyle: 'pill' }, play: checkFilterStyle };
export const UnderlineFilters = { args: { filterStyle: 'underline' }, play: checkFilterStyle };
export const RectangleFilters = { args: { filterStyle: 'rectangle' }, play: checkFilterStyle };
