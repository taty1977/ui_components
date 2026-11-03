import { fireEvent, render, screen } from '@testing-library/react';
import Gallery from '../Gallery';

const items = [
  {
    id: 'identity',
    title: 'Brand Identity',
    category: 'Brand',
    image: '/brand.jpg',
    alt: 'Blue brand identity presentation',
    description: 'A new visual identity for a local studio.',
    href: '#brand-identity',
  },
  {
    id: 'poster',
    title: 'Event Poster',
    category: 'Graphic',
    image: '/poster.jpg',
    alt: 'Colorful event poster',
  },
  {
    id: 'website',
    title: 'Studio Website',
    category: 'Web',
    image: '/website.jpg',
    alt: 'Studio website on a laptop',
  },
];

describe('Gallery', () => {
  test('reports filter, link, preview, navigation, and close actions exactly once', () => {
    const onFilterChange = vi.fn();
    const onProjectClick = vi.fn();
    const onPreviewOpen = vi.fn();
    const onPreviewChange = vi.fn();
    const onPreviewClose = vi.fn();
    render(
      <Gallery
        items={items}
        showHoverActions
        {...{
          onFilterChange,
          onProjectClick,
          onPreviewOpen,
          onPreviewChange,
          onPreviewClose,
        }}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Brand' }));
    expect(onFilterChange).toHaveBeenCalledExactlyOnceWith('Brand');
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(onFilterChange).toHaveBeenLastCalledWith(null);
    fireEvent.click(screen.getByRole('link', { name: 'Visit Brand Identity' }));
    expect(onProjectClick).toHaveBeenCalledExactlyOnceWith(items[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Preview Brand Identity' }));
    expect(onPreviewOpen).toHaveBeenCalledExactlyOnceWith(items[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Next project' }));
    expect(onPreviewChange).toHaveBeenCalledExactlyOnceWith(items[1]);
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(onPreviewChange).toHaveBeenCalledTimes(2);
    expect(onPreviewChange).toHaveBeenLastCalledWith(items[0]);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onPreviewClose).toHaveBeenCalledExactlyOnceWith(items[0]);
  });
  test.each(['default', 'pill', 'underline', 'rectangle'] as const)('filters projects with the %s style', (filterStyle) => {
    render(<Gallery items={items} filterStyle={filterStyle} />);
    const isUnderline = filterStyle === 'default' || filterStyle === 'underline';
    const all = screen.getByRole('button', { name: 'All', pressed: true });
    const brand = screen.getByRole('button', { name: 'Brand', pressed: false });
    expect(all).toHaveClass(
      filterStyle === 'pill' ? 'rounded-full' : isUnderline ? 'rounded-none' : 'rounded-md',
    );
    if (isUnderline) {
      expect(all).toHaveClass('border-palette-primary-text', 'bg-transparent');
      expect(brand).toHaveClass('border-transparent');
    }
    fireEvent.click(brand);
    expect(brand).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByRole('button', { name: 'View Event Poster' })).not.toBeInTheDocument();
    if (isUnderline) {
      expect(brand).toHaveClass('border-palette-primary-text');
      expect(all).toHaveClass('border-transparent');
      expect(all).not.toHaveClass('border-palette-primary-text');
    }
  });

  test('uses underline filters when filterStyle is omitted', () => {
    render(<Gallery items={items} />);
    expect(screen.getByRole('button', { name: 'All', pressed: true })).toHaveClass(
      'rounded-none',
      'bg-transparent',
      'border-b-2',
      'border-palette-primary-text',
    );
    expect(screen.getByRole('button', { name: 'Brand', pressed: false })).toHaveClass('border-transparent');
  });

  test('keeps hover actions opt-in', () => {
    render(<Gallery items={items} />);
    expect(screen.queryByRole('link', { name: 'Visit Brand Identity' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Preview Brand Identity' })).not.toBeInTheDocument();
  });

  test('gives hover titles an explicit surface and hides them until hover or focus on hover-capable devices', () => {
    const { container } = render(<Gallery items={items} showHoverActions />);
    const titles = container.querySelectorAll('p[aria-hidden="true"]');
    expect(titles).toHaveLength(items.length);
    for (const title of titles) {
      expect(title).toHaveClass(
        'bg-background-surface',
        'text-text-primary',
        '[@media(hover:hover)]:invisible',
        '[@media(hover:hover)]:group-hover:visible',
        '[@media(hover:hover)]:group-focus-within:visible',
      );
    }
    expect(screen.getByRole('link', { name: 'Visit Brand Identity' })).not.toHaveClass('invisible');
    expect(screen.getByRole('button', { name: 'Preview Brand Identity' })).not.toHaveClass('invisible');
  });

  test('offers separate project links and modal preview actions', () => {
    render(<Gallery items={items} showHoverActions />);
    const link = screen.getByRole('link', { name: 'Visit Brand Identity' });
    expect(link).toHaveAttribute('href', '#brand-identity');
    expect(screen.queryByRole('link', { name: 'Visit Event Poster' })).not.toBeInTheDocument();
    fireEvent.click(link);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const preview = screen.getByRole('button', { name: 'Preview Brand Identity' });
    fireEvent.click(preview);
    expect(screen.getByRole('dialog', { name: 'Brand Identity' })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(preview).toHaveFocus();
  });
  test('uses the selected filter colors for both hover icons', () => {
    render(<Gallery items={items} showHoverActions filterStyle="pill" />);
    for (const action of [
      screen.getByRole('link', { name: 'Visit Brand Identity' }),
      screen.getByRole('button', { name: 'Preview Brand Identity' }),
    ]) {
      expect(action).toHaveClass('bg-palette-primary-main', 'text-palette-primary-contrast');
    }
    expect(screen.getByRole('link', { name: 'Visit Brand Identity' })).toHaveClass('hover:bg-palette-primary-dark');
    expect(screen.getByRole('button', { name: 'Preview Brand Identity' })).toHaveClass(
      'enabled:hover:bg-palette-primary-dark',
    );
  });
  test('uses shared Button contrast styles for selected and unselected filters', () => {
    render(<Gallery items={items} filterStyle="pill" />);
    expect(screen.getByRole('button', { name: 'All', pressed: true })).toHaveClass(
      'bg-palette-primary-main',
      'text-palette-primary-contrast',
    );
    expect(screen.getByRole('button', { name: 'Brand', pressed: false })).toHaveClass(
      'bg-palette-primary-opacity-light',
      'text-palette-primary-text',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Brand' }));
    expect(screen.getByRole('button', { name: 'Brand', pressed: true })).toHaveClass('text-palette-primary-contrast');
  });
  test('renders projects and filters by category', () => {
    render(<Gallery items={items} />);

    expect(screen.getByRole('heading', { name: 'Portfolio' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /^View / })).toHaveLength(3);
    fireEvent.click(screen.getByRole('button', { name: 'Brand', pressed: false }));

    expect(screen.getByRole('button', { name: 'View Brand Identity' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'View Event Poster' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Brand', pressed: true })).toBeInTheDocument();
  });

  test('opens a project preview, navigates between projects, and restores focus on close', () => {
    render(<Gallery items={items} />);

    const opener = screen.getByRole('button', { name: 'View Brand Identity' });
    fireEvent.click(opener);
    expect(screen.getByRole('dialog', { name: 'Brand Identity' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close project preview' })).toHaveFocus();
    expect(screen.getByText('A new visual identity for a local studio.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next project' }));
    expect(screen.getByRole('dialog', { name: 'Event Poster' })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(screen.getByRole('dialog', { name: 'Studio Website' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close project preview' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  test('closes the preview with Escape and reports an empty category', () => {
    render(<Gallery items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'View Brand Identity' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Graphic', pressed: false }));
    expect(screen.getByRole('button', { name: 'View Event Poster' })).toBeInTheDocument();
  });

  test('uses Modal focus trapping, scroll locking, and backdrop dismissal', () => {
    const previousOverflow = document.body.style.overflow;
    const { container } = render(<Gallery items={items} />);
    const opener = screen.getByRole('button', { name: 'View Brand Identity' });
    fireEvent.click(opener);

    const dialog = screen.getByRole('dialog', { name: 'Brand Identity' });
    expect(container).not.toContainElement(dialog);
    expect(document.body.style.overflow).toBe('hidden');
    const close = screen.getByRole('button', { name: 'Close project preview' });
    const next = screen.getByRole('button', { name: 'Next project' });
    next.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(close).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(next).toHaveFocus();

    fireEvent.mouseDown(dialog);
    expect(dialog).toBeInTheDocument();
    const backdrop = dialog.parentElement;
    expect(backdrop).not.toBeNull();
    if (backdrop) fireEvent.mouseDown(backdrop);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe(previousOverflow);
    expect(opener).toHaveFocus();
  });
});
