import { Children, useId, useState, type ReactNode } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { cn } from '../../utils/cn';
import { type InputSize, type InputTone, type InputVariant } from '../input/input.styles';
import { toneClasses, type ButtonVariant } from '../button/button.styles';
export type AccordionVariant = InputVariant | ButtonVariant;
export type AccordionIconPosition = 'left' | 'right';
export interface AccordionProps {
  items: { id: string; title: string; content?: ReactNode }[];
  className?: string;
  allowMultiple?: boolean;
  collapsedIcon?: ReactNode;
  expandedIcon?: ReactNode;
  iconPosition?: AccordionIconPosition;
  variant?: AccordionVariant;
  tone?: InputTone;
  size?: InputSize;
  children?: ReactNode;
}
export function Accordion({
  items,
  className,
  allowMultiple = false,
  collapsedIcon,
  expandedIcon,
  iconPosition = 'right',
  variant = 'default',
  tone = 'primary',
  size = 'normal',
  children,
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState(new Set<string>());
  const prefix = useId();
  const accent = variant === 'primary' || variant === 'secondary' ? variant : tone;
  const appearance =
    variant === 'outlined'
      ? 'outline'
      : variant === 'filled' || variant === 'primary' || variant === 'secondary'
        ? 'default'
        : variant === 'standard'
          ? 'text'
          : variant;
  const headerClasses = toneClasses[accent][appearance === 'default' ? 'solid' : appearance];
  const panels = Children.toArray(children);
  return (
    <div className={cn('grid gap-2 font-sans', className)} data-variant={variant} data-tone={accent}>
      {items.map((item, index) => {
        const expanded = expandedIds.has(item.id);
        const Icon = expanded ? ChevronUpIcon : ChevronDownIcon;
        const content = panels[index] ?? item.content;
        const buttonId = `${prefix}-button-${item.id}`;
        const panelId = `${prefix}-panel-${item.id}`;
        const icon = (
          <span aria-hidden="true" className="inline-flex size-4 shrink-0 items-center justify-center">
            {(expanded ? expandedIcon : collapsedIcon) ?? <Icon className="size-4" />}
          </span>
        );
        return (
          <div
            key={item.id}
            className={cn(
              'overflow-hidden bg-background-surface transition-colors',
              appearance === 'text' ? 'rounded-none' : 'rounded-md',
            )}
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={expanded}
              aria-controls={panelId}
              className={cn(
                'flex w-full items-center text-left font-medium text-text-primary outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-current',
                size === 'small' ? 'min-h-11 gap-2 px-4 text-15' : 'min-h-12 gap-2.5 px-4 text-18',
                headerClasses,
                appearance === 'outline' && (expanded && content != null ? 'rounded-t-md' : 'rounded-md'),
              )}
              onClick={() =>
                setExpandedIds((previous) => {
                  const next = allowMultiple ? new Set(previous) : new Set<string>();
                  if (previous.has(item.id)) next.delete(item.id);
                  else next.add(item.id);
                  return next;
                })
              }
            >
              {iconPosition === 'left' && icon}
              <span className="flex-1">{item.title}</span>
              {iconPosition === 'right' && icon}
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded || content == null}
              className={cn(
                'border-t border-border-subtle bg-background-surface px-4 text-text-secondary',
                size === 'small' ? 'py-3 text-13' : 'py-4 text-15',
              )}
            >
              {expanded ? content : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Accordion;
