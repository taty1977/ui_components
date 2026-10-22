import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';
import { cn } from '../../utils/cn';
import type { Breakpoint } from '../../utils/breakpoints';
import Heading from '../heading/Heading';
import { toneClasses, type ButtonTone, type ButtonVariant } from '../button/button.styles';
import { toneTextClasses } from '../input/input.styles';

export interface CarouselImageItem {
  id?: string;
  src: string;
  alt: string;
  thumbnailSrc?: string;
  badge?: string;
  likeButton?: boolean;
}
export type CarouselVariant = Exclude<ButtonVariant, 'default'>;
export interface CarouselProps {
  images: CarouselImageItem[];
  className?: string;
  likeButton?: boolean;
  breakpoint?: Breakpoint;
  variant?: CarouselVariant;
  tone?: ButtonTone;
  initialIndex?: number;
  onImageChange?: (index: number, image: CarouselImageItem) => void;
  showThumbnails?: boolean;
  thumbnailsPosition?: 'left' | 'right' | 'bottom';
  showIndicators?: boolean;
  ariaLabel?: string;
  ofText?: string;
  openOnClick?: boolean;
}
const imageKey = (image: CarouselImageItem) => image.id || image.src;
const imageAlt = (image: CarouselImageItem, index: number) => image.alt.trim() || `Product image ${index + 1}`;
const controlClasses =
  'inline-flex size-8 shrink-0 items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-45';

export function Carousel({
  images,
  className,
  likeButton = true,
  variant = 'outline',
  tone = 'primary',
  initialIndex = 0,
  onImageChange,
  showThumbnails = true,
  thumbnailsPosition = 'bottom',
  showIndicators = true,
  ariaLabel = 'Product image gallery',
  ofText = 'of',
  breakpoint = 'desktop',
  openOnClick = true,
}: CarouselProps) {
  const titleId = useId();
  const [activeIndex, setActiveIndex] = useState(Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0)));
  const [open, setOpen] = useState(false);
  const [thumbStart, setThumbStart] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLImageElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const index = Math.min(activeIndex, Math.max(0, images.length - 1));
  const image = images[index];
  const slots = thumbnailsPosition === 'bottom' ? 8 : 5;
  const mobile = breakpoint === 'mobile';
  const stageHeight = mobile ? '10rem' : breakpoint === 'tablet' ? '15rem' : '25rem';
  const legacy = variant === 'primary' || variant === 'secondary';
  const accent = legacy ? variant : tone;
  const appearance = legacy ? 'solid' : variant;
  const accentClasses = cn(toneTextClasses[accent], 'focus-visible:outline-current');
  const controlAppearance = legacy
    ? cn('bg-background-surface hover:bg-action-hover', accentClasses)
    : toneClasses[accent][appearance];
  const surfaceClasses = legacy
    ? 'border border-border-subtle bg-background-surface text-text-primary'
    : toneClasses[accent][appearance];

  useEffect(() => {
    setActiveIndex((previous) => Math.min(previous, Math.max(images.length - 1, 0)));
    setThumbStart((previous) => Math.min(previous, Math.max(images.length - slots, 0)));
    if (!images.length) setOpen(false);
  }, [images.length, slots]);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button:not(:disabled), [tabindex="0"]');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      trigger?.focus();
    };
  }, [open]);

  if (!image)
    return (
      <div
        className={cn('rounded-md px-4 py-6 text-center font-sans text-13', surfaceClasses, className)}
        data-variant={variant}
        data-tone={accent}
      >
        No product images available.
      </div>
    );

  const ensureVisible = (next: number) =>
    setThumbStart((start) => (next < start ? next : next >= start + slots ? next - slots + 1 : start));
  const selectIndex = (next: number) => {
    const selected = (next + images.length) % images.length;
    setActiveIndex(selected);
    ensureVisible(selected);
    onImageChange?.(selected, images[selected]);
  };
  const openGallery = () => {
    ensureVisible(index);
    setOpen(true);
  };
  const bodyClasses = cn(
    'min-w-0',
    showThumbnails &&
      thumbnailsPosition !== 'bottom' &&
      !mobile &&
      (thumbnailsPosition === 'left'
        ? 'grid grid-cols-[var(--carousel-thumb-size)_minmax(0,1fr)] gap-4'
        : 'grid grid-cols-[minmax(0,1fr)_var(--carousel-thumb-size)] gap-4'),
  );
  const thumbStyle: CSSProperties =
    thumbnailsPosition === 'bottom'
      ? { gridTemplateColumns: `repeat(${Math.min(slots, images.length)}, var(--carousel-thumb-size))` }
      : { gridTemplateRows: `repeat(${Math.min(slots, images.length)}, var(--carousel-thumb-size))` };
  const thumbnails = (position: 'left' | 'right' | 'bottom', dialog = false) => {
    if (!showThumbnails || mobile || thumbnailsPosition !== position) return null;
    const start = dialog ? thumbStart : 0;
    const more = images.length - slots;
    const list = (
      <div
        className={cn('grid gap-2.5 overflow-hidden p-1', position === 'bottom' ? 'justify-center' : 'content-start')}
        style={thumbStyle}
      >
        {images.slice(start, start + slots).map((item, offset) => {
          const actual = start + offset;
          const overflow = !dialog && more > 0 && offset === slots - 1;
          return (
            <button
              key={`${imageKey(item)}-${actual}`}
              type="button"
              className={cn(
                'relative aspect-square w-full overflow-hidden rounded-md border border-border-subtle bg-background-surface p-0 leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                accentClasses,
                !overflow &&
                  index === actual &&
                  'border-current ring-2 ring-current ring-offset-2 ring-offset-background-surface',
              )}
              aria-label={
                overflow
                  ? openOnClick
                    ? `Open image gallery (${more} more)`
                    : `${more} additional images`
                  : `Select ${imageAlt(item, actual)}`
              }
              onClick={() => {
                if (overflow) {
                  if (openOnClick) openGallery();
                } else selectIndex(actual);
              }}
            >
              <img
                src={item.thumbnailSrc || item.src}
                alt=""
                aria-hidden="true"
                className="block size-full object-cover"
              />
              {overflow && (
                <span className="absolute inset-0 flex items-center justify-center bg-backdrop-overlay text-13 font-semibold text-misc-bg-white">
                  +{more}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
    if (!dialog) return list;
    return (
      <div
        className={cn(
          'grid items-center gap-2.5',
          position === 'bottom' ? 'grid-cols-[auto_minmax(0,1fr)_auto]' : 'content-start',
        )}
      >
        <button
          type="button"
          className={cn(controlClasses, controlAppearance, 'justify-self-center')}
          aria-label="Previous thumbnails"
          disabled={thumbStart <= 0}
          onClick={() => setThumbStart((start) => Math.max(0, start - 1))}
        >
          {position === 'bottom' ? <ChevronLeftIcon className="size-4" /> : <ChevronUpIcon className="size-4" />}
        </button>
        {list}
        <button
          type="button"
          className={cn(controlClasses, controlAppearance, 'justify-self-center')}
          aria-label="Next thumbnails"
          disabled={thumbStart + slots >= images.length}
          onClick={() => setThumbStart((start) => Math.min(images.length - slots, start + 1))}
        >
          {position === 'bottom' ? <ChevronRightIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
        </button>
      </div>
    );
  };
  const stage = (dialog = false) => (
    <div
      className="relative flex w-full min-w-0 items-center justify-center overflow-hidden rounded-md border border-border-subtle bg-background-surface"
      style={{ height: stageHeight }}
    >
      {image.badge && (
        <span
          className={cn(
            'absolute left-4 top-4 z-10 rounded-md px-2 py-1 text-12 font-semibold text-misc-bg-white',
            toneClasses[accent].solid,
          )}
        >
          {image.badge}
        </span>
      )}
      {likeButton && image.likeButton !== false && (
        <button
          type="button"
          className={cn(
            controlClasses,
            liked[imageKey(image)] ? toneClasses.error.label : controlAppearance,
            'absolute right-4 top-4 z-10 rounded-full',
          )}
          aria-label={liked[imageKey(image)] ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={Boolean(liked[imageKey(image)])}
          onClick={() => setLiked((previous) => ({ ...previous, [imageKey(image)]: !previous[imageKey(image)] }))}
        >
          <HeartIcon className="size-6" aria-hidden="true" />
        </button>
      )}
      <img
        ref={!dialog && openOnClick ? triggerRef : undefined}
        src={image.src}
        alt={imageAlt(image, index)}
        className={cn('block size-full object-cover', !dialog && openOnClick && 'cursor-zoom-in')}
        {...(!dialog && openOnClick
          ? {
              role: 'button',
              'aria-label': `Open image gallery: ${imageAlt(image, index)}`,
              tabIndex: 0,
              onClick: openGallery,
              onKeyDown: (event: React.KeyboardEvent<HTMLImageElement>) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openGallery();
                }
              },
            }
          : {})}
      />
      <button
        type="button"
        aria-label="Previous image"
        className={cn(controlClasses, controlAppearance, 'absolute left-4 top-1/2 -translate-y-1/2')}
        onClick={() => selectIndex(index - 1)}
      >
        <ChevronLeftIcon className="size-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next image"
        className={cn(controlClasses, controlAppearance, 'absolute right-4 top-1/2 -translate-y-1/2')}
        onClick={() => selectIndex(index + 1)}
      >
        <ChevronRightIcon className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
  return (
    <section
      aria-label={ariaLabel}
      className={cn('grid w-full min-w-0 gap-4 rounded-md p-6 font-sans', surfaceClasses, className)}
      data-variant={variant}
      data-tone={accent}
      style={
        {
          '--carousel-thumb-size': mobile ? '3.25rem' : breakpoint === 'tablet' ? '3.75rem' : '4.5rem',
        } as CSSProperties
      }
    >
      <div className={bodyClasses}>
        {thumbnails('left')}
        {stage()}
        {thumbnails('right')}
      </div>
      {!mobile && (showIndicators || (showThumbnails && thumbnailsPosition === 'bottom')) && (
        <div className="grid gap-2 rounded-md border border-border-subtle p-4">
          {showIndicators && (
            <div className="flex items-center justify-center gap-2">
              {images.map((item, offset) => (
                <button
                  type="button"
                  key={`${imageKey(item)}-${offset}`}
                  aria-label={`Go to image ${offset + 1}`}
                  className={cn(
                    'size-2.5 rounded-full border border-border-subtle p-0',
                    index === offset ? toneClasses[accent].solid : 'bg-background-surface',
                  )}
                  onClick={() => selectIndex(offset)}
                />
              ))}
            </div>
          )}
          {thumbnails('bottom')}
        </div>
      )}
      {open && (
        <div
          role="presentation"
          className="fixed inset-0 z-[1000] grid place-items-center bg-backdrop-overlay p-4"
          onClick={() => setOpen(false)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
            className={cn(
              'grid max-h-[90dvh] w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-md border border-border-subtle bg-background-surface',
              breakpoint === 'tablet' ? 'max-w-3xl' : mobile ? 'max-h-dvh' : 'max-w-5xl',
            )}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border-subtle p-4">
              <Heading
                id={titleId}
                level="h4"
                weight="medium"
              >{`Image gallery: ${index + 1} ${ofText} ${images.length}`}</Heading>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close image gallery"
                className={cn(controlClasses, controlAppearance)}
                onClick={() => setOpen(false)}
              >
                <span aria-hidden="true">&#10005;</span>
              </button>
            </div>
            <div className={cn('grid gap-4 overflow-auto p-4', mobile && 'gap-2 p-2')}>
              <div className={bodyClasses}>
                {thumbnails('left', true)}
                {stage(true)}
                {thumbnails('right', true)}
              </div>
              {thumbnails('bottom', true)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
export default Carousel;
