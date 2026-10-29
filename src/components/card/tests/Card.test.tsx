import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  test('renders its content and optional header regions', () => {
    render(
      <Card
        title="Account balance"
        description="Last 30 days"
        actions={<button type="button">View</button>}
      >
        $5,216.47
      </Card>,
    );

    expect(screen.getByText('Account balance')).toBeInTheDocument();
    expect(screen.getByText('Last 30 days')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument();
    expect(screen.getByText('$5,216.47')).toBeInTheDocument();
  });

  test.each(['default', 'label', 'outline', 'text'] as const)('supports the %s variant and tone', (variant) => {
    const { container } = render(
      <Card variant={variant} tone="success">
        Content
      </Card>,
    );

    expect(container.querySelector('section')).toHaveAttribute('data-variant', variant);
    expect(container.querySelector('section')).toHaveAttribute('data-tone', 'success');
  });

  test('uses a readable tinted surface when the default variant uses a tone', () => {
    const { container } = render(
      <Card variant="default" tone="secondary" title="Account" description="Details">
        Body copy
      </Card>,
    );

    const card = container.querySelector('section');
    const body = screen.getByText('Body copy').parentElement;

    expect(card).toHaveClass('bg-palette-secondary-opacity-light', 'text-text-primary');
    expect(screen.getByRole('banner')).not.toHaveClass('bg-palette-secondary-main');
    expect(screen.getByText('Details')).toHaveClass('text-text-secondary');
    expect(body).not.toHaveClass('bg-background-surface');
  });
});
