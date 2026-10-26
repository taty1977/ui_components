import { render } from '@testing-library/react';
import { paletteTones } from '../../../../themes/paletteTones';
import { FieldNotch } from '../FieldNotch';

describe('FieldNotch', () => {
  test.each(paletteTones)('uses %s borders and preserves focus styling', (accent) => {
    const { container } = render(<FieldNotch width={64} accent={accent} />);
    const spans = container.querySelectorAll('span');
    expect(spans).toHaveLength(3);
    for (const span of spans) {
      expect(span).toHaveAttribute('aria-hidden', 'true');
      expect(span).toHaveClass(`border-palette-${accent}-main`, 'group-focus-within:border-b-2');
    }
    expect(spans[0]).toHaveClass('rounded-l-md', 'border-l', 'border-t', 'group-focus-within:border-l-2');
    expect(spans[1]).toHaveClass('left-3', 'right-3', 'border-b');
    expect(spans[2]).toHaveClass('rounded-r-md', 'border-r', 'border-t', 'group-focus-within:border-r-2');
    expect(spans[2]).toHaveStyle({ left: '76px' });
  });

  test('disabled borders override the accent and width updates move the gap', () => {
    const { container, rerender } = render(<FieldNotch width={64} accent="error" disabled />);
    for (const span of container.querySelectorAll('span')) {
      expect(span).toHaveClass('border-text-disabled');
      expect(span).not.toHaveClass('border-palette-error-main');
    }
    rerender(<FieldNotch width={100} accent="success" />);
    expect(container.lastElementChild).toHaveStyle({ left: '112px' });
    expect(container.lastElementChild).toHaveClass('border-palette-success-main');
  });
});
