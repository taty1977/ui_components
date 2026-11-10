import { useCallback, useEffect, useState, type HTMLAttributes } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, LinkIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';
import Modal from '../modal/Modal';
import Button from '../button/Button';
import Link from '../link/Link';
import Paragraph from '../paragraph/Paragraph';
import IconButton from '../icon-button/IconButton';
import { paletteToneStyles } from '../../themes/paletteTones';
import Heading from '../heading/Heading';

export interface GalleryProject {
  id?: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  description?: string;
  href?: string;
}

export type GalleryFilterStyle = 'default' | 'pill' | 'underline' | 'rectangle';

export interface GalleryProps extends HTMLAttributes<HTMLElement> {
  items: GalleryProject[];
  heading?: string;
  allLabel?: string;
  ariaLabel?: string;
  gridClassName?: string;
  showHoverActions?: boolean;
  filterStyle?: GalleryFilterStyle;
  onFilterChange?: (category: string | null) => void;
  onProjectClick?: (project: GalleryProject) => void;
  onPreviewOpen?: (project: GalleryProject) => void;
  onPreviewClose?: (project: GalleryProject) => void;
  onPreviewChange?: (project: GalleryProject) => void;
}

const hoverActionClasses =
  'pointer-events-auto [@media(hover:hover)]:pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto';
const previewControls = [
  { label: 'Previous project', direction: -1, position: 'left-3', Icon: ChevronLeftIcon },
  { label: 'Next project', direction: 1, position: 'right-3', Icon: ChevronRightIcon },
] as const;

export default function Gallery({
  items,
  heading = 'Portfolio',
  allLabel = 'All',
  ariaLabel = 'Portfolio projects',
  className,
  gridClassName,
  showHoverActions = false,
  filterStyle = 'default',
  onFilterChange,
  onProjectClick,
  onPreviewOpen,
  onPreviewClose,
  onPreviewChange,
  ...props
}: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const filteredItems = activeCategory === null ? items : items.filter((item) => item.category === activeCategory);
  const selectedItem = selectedIndex === null ? undefined : filteredItems[selectedIndex];
  const isOpen = selectedItem !== undefined;
  const categories = Array.from(new Set(items.map((item) => item.category)));
  const isUnderlineFilter = filterStyle === 'default' || filterStyle === 'underline';
  const changePreview = useCallback(
    (direction: number) => {
      if (selectedIndex === null || !filteredItems.length) return;
      const next = (selectedIndex + direction + filteredItems.length) % filteredItems.length;
      setSelectedIndex(next);
      onPreviewChange?.(filteredItems[next]);
    },
    [selectedIndex, filteredItems, onPreviewChange],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        changePreview(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        changePreview(1);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, changePreview]);

  useEffect(() => {
    setSelectedIndex(null);
  }, [activeCategory]);

  const closeGallery = () => {
    setSelectedIndex(null);
    if (selectedItem) onPreviewClose?.(selectedItem);
  };
  const selectProject = (index: number, opener: HTMLButtonElement) => {
    // Modal restores focus to this opener, including browsers that do not focus clicked buttons.
    opener.focus();
    setSelectedIndex(index);
    onPreviewOpen?.(filteredItems[index]);
  };

  return (
    <section
      {...props}
      aria-label={ariaLabel}
      className={cn('mx-auto w-full max-w-7xl px-4 py-12 font-sans sm:px-6 lg:px-8', className)}
    >
      <Heading level="h2" className="mb-6 text-center text-28 leading-[inherit]">
        {heading}
      </Heading>
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
        {[null, ...categories].map((category) => (
          <Button
            key={category ?? allLabel}
            type="button"
            size="sm"
            shape={filterStyle === 'pill' ? 'pill' : 'rectangle'}
            variant={isUnderlineFilter ? 'text' : activeCategory === category ? 'default' : 'label'}
            className={cn(
              isUnderlineFilter && 'rounded-none border-b-2 border-transparent text-text-primary',
              isUnderlineFilter && activeCategory === category && 'border-palette-primary-text',
            )}
            aria-pressed={activeCategory === category}
            onClick={() => {
              setActiveCategory(category);
              onFilterChange?.(category);
            }}
          >
            {category ?? allLabel}
          </Button>
        ))}
      </div>

      {filteredItems.length > 0 ? (
        <ul className={cn('grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3', gridClassName)}>
          {filteredItems.map((item, index) => (
            <li key={item.id ?? `${item.image}-${item.title}`}>
              <div className="group relative">
                <button
                  type="button"
                  onClick={(event) => selectProject(index, event.currentTarget)}
                  aria-label={`View ${item.title}`}
                  className="block w-full overflow-hidden rounded-md border border-border-subtle bg-background-surface text-left shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden bg-action-hover">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </span>
                  <span className={cn('block p-4', showHoverActions && 'sr-only')}>
                    <span className="block text-18 font-semibold text-text-primary">{item.title}</span>
                    <span className="mt-1 block text-13 text-text-secondary">{item.category}</span>
                  </span>
                </button>
                {showHoverActions && (
                  <div className="pointer-events-none absolute inset-1.5 flex flex-col items-center justify-center gap-4 rounded-sm bg-background-surface text-text-primary transition-opacity duration-300 motion-reduce:transition-none [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
                    {/* Hide the title while its overlay is inactive. */}
                    <Paragraph
                      size="sm"
                      weight="semibold"
                      textTransform="uppercase"
                      aria-hidden="true"
                      className="bg-background-surface text-center tracking-widest transition-transform duration-300 motion-reduce:transition-none [@media(hover:hover)]:invisible [@media(hover:hover)]:group-hover:visible [@media(hover:hover)]:group-focus-within:visible [@media(hover:hover)]:-translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0"
                    >
                      {item.title}
                    </Paragraph>
                    <div className="flex items-center justify-center gap-2 transition-transform duration-300 motion-reduce:transition-none [@media(hover:hover)]:translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0">
                      {item.href && (
                        <Link
                          href={item.href}
                          onClick={() => onProjectClick?.(item)}
                          underline="none"
                          aria-label={`Visit ${item.title}`}
                          title="Visit project"
                          className={cn(
                            hoverActionClasses,
                            'inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-palette-primary-dark focus:bg-palette-primary-dark focus-visible:outline-palette-primary-graphic',
                            paletteToneStyles.primary.default,
                            paletteToneStyles.primary.defaultText,
                          )}
                        >
                          <LinkIcon aria-hidden="true" className="size-4" />
                        </Link>
                      )}
                      <IconButton
                        type="button"
                        variant="default"
                        tone="primary"
                        title="Preview project"
                        className={hoverActionClasses}
                        aria-label={`Preview ${item.title}`}
                        onClick={(event) => selectProject(index, event.currentTarget)}
                      >
                        <MagnifyingGlassPlusIcon aria-hidden="true" className="size-4" />
                      </IconButton>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Paragraph tone="muted" className="py-8 text-center">
          No projects in this category.
        </Paragraph>
      )}

      {selectedItem && (
        <Modal
          open
          onClose={closeGallery}
          title={selectedItem.title}
          description={selectedItem.category}
          closeButtonLabel="Close project preview"
          panelClassName="max-w-5xl p-4 sm:p-6"
          className="font-sans sm:p-8"
        >
          <div className="relative">
            <img
              src={selectedItem.image}
              alt={selectedItem.alt}
              className="max-h-[70vh] w-full rounded-md object-contain"
            />
            {filteredItems.length > 1 &&
              previewControls.map(({ label, direction, position, Icon }) => (
                <button
                  key={direction}
                  type="button"
                  aria-label={label}
                  onClick={() => changePreview(direction)}
                  className={cn(
                    'absolute top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background-surface/90 text-text-primary shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
                    position,
                  )}
                >
                  <Icon aria-hidden="true" className="size-6" />
                </button>
              ))}
          </div>
          {selectedItem.description && (
            <Paragraph tone="muted" className="mt-4">
              {selectedItem.description}
            </Paragraph>
          )}
          <Paragraph variant="body2" tone="muted" className="mt-3 text-right" aria-live="polite">
            {(selectedIndex ?? 0) + 1} of {filteredItems.length}
          </Paragraph>
        </Modal>
      )}
    </section>
  );
}
