import { expectTypeOf } from 'vitest';
import { componentVariantAppearances, paletteTones, resolveVariantTone } from '../../index';
import type {
  AccordionVariant,
  ButtonProps,
  ButtonVariant,
  CarouselProps,
  ComponentVariant,
  InputVariant,
  TableVariant,
} from '../../index';
import type { ButtonVariant as StylesButtonVariant } from '../../components/button/button.styles';

describe('shared component variants', () => {
  test.each([
    ['default', 'solid'],
    ['label', 'label'],
    ['outline', 'outline'],
    ['text', 'text'],
    ['primary', 'solid'],
    ['secondary', 'solid'],
    ['outlined', 'outline'],
    ['filled', 'solid'],
    ['standard', 'text'],
  ] as const)('maps %s to the shared %s appearance', (variant, appearance) => {
    expect(componentVariantAppearances[variant]).toBe(appearance);
    for (const tone of paletteTones) {
      expect(resolveVariantTone(variant, tone)).toBe(variant === 'primary' || variant === 'secondary' ? variant : tone);
    }
  });

  test('preserves the supported variants and legacy ButtonVariant exports', () => {
    expectTypeOf<ComponentVariant>().toEqualTypeOf<
      'default' | 'label' | 'outline' | 'text' | 'primary' | 'secondary'
    >();
    expectTypeOf<ButtonVariant>().toEqualTypeOf<ComponentVariant>();
    expectTypeOf<StylesButtonVariant>().toEqualTypeOf<ComponentVariant>();
    expectTypeOf<ButtonProps['variant']>().toEqualTypeOf<ComponentVariant | undefined>();
  });

  test('preserves component-specific legacy variants and restrictions', () => {
    expectTypeOf<AccordionVariant>().toEqualTypeOf<ComponentVariant | InputVariant>();
    expectTypeOf<CarouselProps['variant']>().toEqualTypeOf<Exclude<ComponentVariant, 'default'> | undefined>();
    expectTypeOf<TableVariant>().toEqualTypeOf<Exclude<ComponentVariant, 'default'> | InputVariant>();
  });
});
