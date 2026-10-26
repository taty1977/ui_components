import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { paletteTones } from '../../../themes/paletteTones';
import { Carousel } from '../Carousel';

const images = [
  { id: '1', src: 'https://example.com/1.jpg', alt: 'Image one' },
  { id: '2', src: 'https://example.com/2.jpg', alt: 'Image two' },
  { id: '3', src: 'https://example.com/3.jpg', alt: 'Image three' },
  { id: '4', src: 'https://example.com/4.jpg', alt: 'Image four' },
  { id: '5', src: 'https://example.com/5.jpg', alt: 'Image five' },
  { id: '6', src: 'https://example.com/6.jpg', alt: 'Image six' },
  { id: '7', src: 'https://example.com/7.jpg', alt: 'Image seven' },
  { id: '8', src: 'https://example.com/8.jpg', alt: 'Image eight' },
  { id: '9', src: 'https://example.com/9.jpg', alt: 'Image nine' },
  { id: '10', src: 'https://example.com/10.jpg', alt: 'Image ten' },
];

const overflowImages = Array.from({ length: 30 }, (_, index) => {
  const id = `${index + 1}`;

  return {
    id,
    src: `https://example.com/${id}.jpg`,
    alt: `Image ${id}`,
  };
});

describe('Carousel', () => {
  test.each([NaN, Infinity, -Infinity, 1.5])('rejects invalid initialIndex=%s explicitly', (initialIndex) => {
    expect(() => render(<Carousel images={images} initialIndex={initialIndex} />)).toThrow(
      'Carousel initialIndex must be a finite integer.',
    );
  });

  test.each([
    [-3, 'Image one'],
    [2, 'Image three'],
    [99, 'Image ten'],
  ] as const)('clamps the initial index %s to an available image', (initialIndex, alt) => {
    render(<Carousel images={images} initialIndex={initialIndex} />);
    expect(screen.getByRole('button', { name: `Open image gallery: ${alt}` })).toBeInTheDocument();
  });

  test.each(['left', 'right', 'bottom'] as const)(
    'counts the images represented by the %s overflow tile and restores its focus',
    async (thumbnailsPosition) => {
      const user = userEvent.setup();
      const count = thumbnailsPosition === 'bottom' ? 23 : 26;
      render(<Carousel images={overflowImages} thumbnailsPosition={thumbnailsPosition} />);
      const opener = screen.getByRole('button', { name: `Open image gallery (${count} more)` });
      expect(opener).toHaveTextContent(`+${count}`);
      await user.click(opener);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Next image' }));
      await user.keyboard('{Escape}');
      expect(opener).toHaveFocus();
    },
  );

  test('keeps the last inline thumbnail selectable when opening the gallery is disabled', async () => {
    const user = userEvent.setup();
    const onImageChange = vi.fn();
    render(<Carousel images={images} openOnClick={false} onImageChange={onImageChange} />);
    await user.click(screen.getByRole('button', { name: 'Select Image eight' }));
    expect(screen.getByRole('img', { name: 'Image eight' })).toBeInTheDocument();
    expect(onImageChange).toHaveBeenCalledWith(7, images[7]);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
  });

  test('exposes the active thumbnail and indicator to assistive technology', async () => {
    const user = userEvent.setup();
    render(<Carousel images={images} />);
    const first = screen.getByRole('button', { name: 'Select Image one' });
    const second = screen.getByRole('button', { name: 'Select Image two' });
    expect(first).toHaveAttribute('aria-current', 'true');
    expect(second).not.toHaveAttribute('aria-current');
    await user.click(second);
    expect(first).not.toHaveAttribute('aria-current');
    expect(second).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('button', { name: 'Go to image 2' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('button', { name: 'Go to image 1' })).not.toHaveAttribute('aria-current');
    await user.click(screen.getByRole('button', { name: 'Open image gallery: Image two' }));
    expect(within(screen.getByRole('dialog')).getByRole('button', { name: 'Select Image two' })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });

  test.each([
    ['label', 'bg-palette-info-opacity-light', 'text-palette-info-main'],
    ['outline', 'border-palette-info-main', 'text-palette-info-main'],
    ['text', 'bg-transparent', 'text-palette-info-main'],
  ] as const)('applies the %s appearance to the frame and inline and modal controls', async (variant, bg, text) => {
    const user = userEvent.setup();
    render(<Carousel images={images} variant={variant} tone="info" />);
    const region = screen.getByRole('region', { name: 'Product image gallery' });
    expect(region).toHaveAttribute('data-variant', variant);
    expect(region).toHaveAttribute('data-tone', 'info');
    expect(region).toHaveClass(bg, text);
    expect(screen.getByRole('button', { name: 'Next image' })).toHaveClass(bg, text);
    if (variant === 'text') expect(region).not.toHaveClass('border');
    await user.click(screen.getByRole('button', { name: /open image gallery: image one/i }));
    const dialog = within(screen.getByRole('dialog'));
    expect(dialog.getByRole('button', { name: 'Next image' })).toHaveClass(bg, text);
    expect(dialog.getByRole('button', { name: 'Close image gallery' })).toHaveClass(bg, text);
    expect(dialog.getByRole('button', { name: 'Next thumbnails' })).toHaveClass(bg, text);
  });

  test.each(paletteTones)('applies the %s tone to controls, active thumbnails, indicators, and badges', (tone) => {
    render(<Carousel images={[{ ...images[0], badge: 'New' }, images[1]]} variant="label" tone={tone} />);
    expect(screen.getByRole('button', { name: 'Next image' })).toHaveClass(`bg-palette-${tone}-opacity-light`);
    expect(screen.getByRole('button', { name: 'Select Image one' })).toHaveClass(
      `text-palette-${tone}-main`,
      'ring-current',
    );
    expect(screen.getByRole('button', { name: 'Go to image 1' })).toHaveClass(`bg-palette-${tone}-main`);
    expect(screen.getByText('New')).toHaveClass(`bg-palette-${tone}-main`);
  });

  test.each(['primary', 'secondary'] as const)('preserves legacy %s neutral surfaces and controls', (variant) => {
    render(<Carousel images={images} variant={variant} tone="error" />);
    expect(screen.getByRole('region')).toHaveAttribute('data-tone', variant);
    expect(screen.getByRole('region')).toHaveClass('border-border-subtle', 'bg-background-surface');
    expect(screen.getByRole('button', { name: 'Next image' })).toHaveClass(
      'bg-background-surface',
      `text-palette-${variant}-main`,
    );
  });

  test('applies the selected appearance to the empty state', () => {
    render(<Carousel images={[]} variant="label" tone="success" />);
    expect(screen.getByText(/no product images available/i)).toHaveClass('bg-palette-success-opacity-light');
  });

  test('renders fallback when no images are provided', () => {
    render(<Carousel images={[]} />);
    expect(screen.getByText(/no product images available/i)).toBeInTheDocument();
  });

  test('renders first image by default', () => {
    render(<Carousel images={images} />);
    expect(screen.getByRole('button', { name: /open image gallery: image one/i })).toBeInTheDocument();
  });

  test('provides fallback accessible text when an image alt is empty', () => {
    render(<Carousel images={[{ src: 'https://example.com/untitled.jpg', alt: '   ' }]} />);
    expect(screen.getByRole('button', { name: /open image gallery: product image 1/i })).toBeInTheDocument();
  });

  test('opens gallery when main image is clicked', async () => {
    const user = userEvent.setup();
    render(<Carousel images={images} />);

    await user.click(screen.getByRole('button', { name: /open image gallery: image one/i }));
    expect(screen.getByRole('dialog', { name: /image gallery/i })).toBeInTheDocument();
  });

  test('opens gallery when the active image is activated with the keyboard', async () => {
    const user = userEvent.setup();
    render(<Carousel images={images} />);

    const image = screen.getByRole('button', { name: /open image gallery: image one/i });
    image.focus();
    await user.keyboard('[Enter]');

    expect(screen.getByRole('dialog', { name: /image gallery/i })).toBeInTheDocument();
  });

  test('does not make the main image open the modal when disabled', () => {
    render(<Carousel images={images} openOnClick={false} />);

    expect(screen.getByRole('img', { name: /image one/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^open image gallery:/i })).not.toBeInTheDocument();
  });

  test('dialog is labeled and closes on Escape', async () => {
    const user = userEvent.setup();
    render(<Carousel images={images} />);

    await user.click(screen.getByRole('button', { name: /open image gallery: image one/i }));
    const dialog = screen.getByRole('dialog', { name: /image gallery/i });

    expect(dialog).toHaveAttribute('aria-labelledby');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: /image gallery/i })).not.toBeInTheDocument();
  });

  test('toggles like button state when clicked', async () => {
    const user = userEvent.setup();
    render(<Carousel images={images} />);

    const likeButton = screen.getByRole('button', { name: /add to favorites/i });
    expect(likeButton).toHaveAttribute('aria-pressed', 'false');

    await user.click(likeButton);
    expect(screen.getByRole('button', { name: /remove from favorites/i })).toHaveAttribute('aria-pressed', 'true');
  });

  test('traps keyboard focus in the gallery and restores the opener on close', async () => {
    const user = userEvent.setup();
    render(<Carousel images={images} />);
    const opener = screen.getByRole('button', { name: /open image gallery: image one/i });
    await user.click(opener);
    const dialog = screen.getByRole('dialog');
    const buttons = within(dialog)
      .getAllByRole('button')
      .filter((button) => !button.hasAttribute('disabled'));
    expect(buttons[0]).toHaveFocus();
    await user.tab({ shift: true });
    expect(buttons[buttons.length - 1]).toHaveFocus();
    await user.tab();
    expect(buttons[0]).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(opener).toHaveFocus();
  });

  test('hides the like button when disabled', () => {
    render(<Carousel images={images} likeButton={false} />);
    expect(screen.queryByRole('button', { name: /add to favorites/i })).not.toBeInTheDocument();
  });

  test('moves to next image when next button is clicked', async () => {
    const user = userEvent.setup();
    render(<Carousel images={images} />);

    await user.click(screen.getByRole('button', { name: /next image/i }));
    expect(screen.getByRole('button', { name: /open image gallery: image two/i })).toBeInTheDocument();
  });

  test('selects image when thumbnail is clicked', async () => {
    const user = userEvent.setup();
    render(<Carousel images={images} />);

    await user.click(screen.getByRole('button', { name: /select image three/i }));
    expect(screen.getByRole('button', { name: /open image gallery: image three/i })).toBeInTheDocument();
  });

  test('calls onImageChange on navigation', async () => {
    const user = userEvent.setup();
    const onImageChange = vi.fn();
    render(<Carousel images={images} onImageChange={onImageChange} />);

    await user.click(screen.getByRole('button', { name: /next image/i }));

    expect(onImageChange).toHaveBeenCalledTimes(1);
    expect(onImageChange).toHaveBeenCalledWith(1, images[1]);
  });

  test.each(['left', 'right'] as const)('supports %s thumbnail position', async (thumbnailsPosition) => {
    const user = userEvent.setup();
    render(<Carousel images={images} thumbnailsPosition={thumbnailsPosition} />);

    await user.click(screen.getByRole('button', { name: /select image three/i }));
    expect(screen.getByRole('button', { name: /open image gallery: image three/i })).toBeInTheDocument();
  });

  test('shows +N thumbnail and no thumbnail arrows in inline view', () => {
    render(<Carousel images={overflowImages} thumbnailsPosition="bottom" />);

    expect(screen.getByRole('button', { name: /open image gallery \(\d+ more\)/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /previous thumbnails/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next thumbnails/i })).not.toBeInTheDocument();
  });

  test.each(['left', 'right'] as const)('shows +N thumbnail in inline view for %s position', (thumbnailsPosition) => {
    render(<Carousel images={overflowImages} thumbnailsPosition={thumbnailsPosition} />);

    expect(screen.getByRole('button', { name: /open image gallery \(\d+ more\)/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /previous thumbnails/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next thumbnails/i })).not.toBeInTheDocument();
  });

  test('shows thumbnail arrows in open gallery and selects hidden image', async () => {
    const user = userEvent.setup();
    render(<Carousel images={overflowImages} thumbnailsPosition="bottom" />);

    await user.click(screen.getByRole('button', { name: /open image gallery \(\d+ more\)/i }));
    const galleryDialog = screen.getByRole('dialog', { name: /image gallery/i });
    expect(galleryDialog).toBeInTheDocument();

    const nextThumbsButton = screen.getByRole('button', { name: /next thumbnails/i });
    for (let i = 0; i < 30 && !screen.queryByRole('button', { name: /select image 30/i }); i += 1) {
      await user.click(nextThumbsButton);
    }

    await user.click(screen.getByRole('button', { name: /select image 30/i }));
    expect(within(galleryDialog).getByRole('img', { name: /image 30/i })).toBeInTheDocument();
  }, 15000);

  test.each(['left', 'right'] as const)(
    'shows thumbnail arrows in open gallery and selects hidden image for %s position',
    async (thumbnailsPosition) => {
      const user = userEvent.setup();
      render(<Carousel images={overflowImages} thumbnailsPosition={thumbnailsPosition} />);

      await user.click(screen.getByRole('button', { name: /open image gallery \(\d+ more\)/i }));
      const galleryDialog = screen.getByRole('dialog', { name: /image gallery/i });

      const nextThumbsButton = screen.getByRole('button', { name: /next thumbnails/i });
      for (let i = 0; i < 30 && !screen.queryByRole('button', { name: /select image 30/i }); i += 1) {
        await user.click(nextThumbsButton);
      }

      await user.click(screen.getByRole('button', { name: /select image 30/i }));
      expect(within(galleryDialog).getByRole('img', { name: /image 30/i })).toBeInTheDocument();
    },
    15000,
  );
});
