import { floatingLabelClasses } from '../field.styles';

describe('floating label positioning', () => {
  test.each(['outlined', 'filled', 'standard'] as const)('hides the %s label for a placeholder', (appearance) => {
    expect(floatingLabelClasses({ appearance, floating: false, visible: false })).toContain('sr-only');
  });

  test.each([
    ['outlined', 'left-3 -top-2 px-1 text-13 bg-background-surface'],
    ['filled', 'left-4 top-1 text-13 leading-14'],
  ] as const)('positions a populated %s label', (appearance, classes) => {
    expect(floatingLabelClasses({ appearance, floating: true, visible: true })).toContain(classes);
  });

  test.each([
    ['small', 'left-9'],
    ['normal', 'left-[42px]'],
    [20, 'left-[42px]'],
  ] as const)('preserves the %s leading-icon inset', (size, inset) => {
    const classes = floatingLabelClasses({
      appearance: 'filled',
      floating: false,
      visible: true,
      iconLeft: true,
      size,
    });
    expect(classes).toContain(inset);
    expect(classes).toContain('top-1/2 -translate-y-1/2');
    expect(classes).toContain('group-focus-within:mt-px');
  });

  test('keeps the idle textarea label top-aligned without the single-line offset', () => {
    const classes = floatingLabelClasses({
      appearance: 'filled',
      floating: false,
      visible: true,
      multiline: true,
    });
    expect(classes).toContain('left-4 top-2');
    expect(classes).not.toContain('group-focus-within:mt-px');
  });
});
