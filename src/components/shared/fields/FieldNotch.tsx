import { cn } from '../../../utils/cn';
import { notchToneClasses, type InputTone } from './field.styles';

interface FieldNotchProps {
  width: number;
  accent: InputTone;
  disabled?: boolean;
}

export function FieldNotch({ width, accent, disabled }: FieldNotchProps) {
  const borderTone = disabled ? 'border-text-disabled' : notchToneClasses[accent];

  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          'absolute bottom-0 left-0 top-0 w-3 rounded-l-md border-b border-l border-t group-focus-within:border-b-2 group-focus-within:border-l-2 group-focus-within:border-t-2',
          borderTone,
        )}
      />
      <span
        aria-hidden="true"
        className={cn('absolute bottom-0 left-3 right-3 border-b group-focus-within:border-b-2', borderTone)}
      />
      <span
        aria-hidden="true"
        className={cn(
          'absolute bottom-0 right-0 top-0 rounded-r-md border-b border-r border-t group-focus-within:border-b-2 group-focus-within:border-r-2 group-focus-within:border-t-2',
          borderTone,
        )}
        style={{ left: 12 + width }}
      />
    </>
  );
}
