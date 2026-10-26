import { paletteTones } from '../../../../themes/paletteTones';
import { resolveFieldLabelTone } from '../field.styles';

describe.each(paletteTones)('%s field label tone', (accent) => {
  test.each([false, true])('preserves state priority when active=%s', (active) => {
    expect(resolveFieldLabelTone({ accent, active, disabled: true, error: 'Required' })).toBe('text-text-disabled');
    expect(resolveFieldLabelTone({ accent, active, disabled: true })).toBe('text-text-disabled');
    expect(resolveFieldLabelTone({ accent, active, error: 'Required' })).toBe('text-palette-error-main');
    expect(resolveFieldLabelTone({ accent, active })).toBe(
      active ? `text-palette-${accent}-main` : 'text-text-secondary',
    );
    expect(resolveFieldLabelTone({ accent, active, error: '' })).toBe(
      active ? `text-palette-${accent}-main` : 'text-text-secondary',
    );
  });
});
