import { fireEvent, render, screen } from '@testing-library/react';
import IconButton from '../IconButton';

describe('IconButton', () => {
  test('renders an accessible icon button with the requested size and shape', () => {
    const onClick = vi.fn();
    render(
      <IconButton aria-label="More actions" onClick={onClick} size="large" shape="square">
        <span>More</span>
      </IconButton>,
    );

    const button = screen.getByRole('button', { name: 'More actions' });
    expect(button).toHaveAttribute('data-size', 'large');
    expect(button).toHaveAttribute('data-shape', 'square');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test.each(['default', 'label', 'outline', 'text'] as const)('supports the %s variant and tone', (variant) => {
    render(
      <IconButton aria-label="Settings" variant={variant} tone="info">
        <span>Icon</span>
      </IconButton>,
    );

    const button = screen.getByRole('button', { name: 'Settings' });
    expect(button).toHaveAttribute('data-variant', variant);
    expect(button).toHaveAttribute('data-tone', 'info');
  });
});
