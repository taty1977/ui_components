import { render, screen } from '@testing-library/react';
import Card from '../Card';
import { paletteTones } from '../../../themes/paletteTones';

describe('Card', () => {
  test('keeps the default card neutral when no tone is provided', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('border', 'border-border-subtle', 'bg-background-surface', 'shadow-sm');
    expect(container.firstChild).not.toHaveAttribute('data-tone');
  });

  test.each(paletteTones)('preserves %s appearance classes and consumer overrides', (tone) => {
    const { container, rerender } = render(<Card tone={tone}>Content</Card>);
    expect(container.firstChild).toHaveClass(`bg-palette-${tone}-opacity-light`, 'text-text-primary');

    rerender(<Card variant="label" tone={tone}>Content</Card>);
    expect(container.firstChild).toHaveClass(`bg-palette-${tone}-opacity-light`, `text-palette-${tone}-text`);

    rerender(<Card variant="outline" tone={tone}>Content</Card>);
    expect(container.firstChild).toHaveClass('border', 'bg-background-surface', `border-palette-${tone}-main`);
    expect(container.firstChild).not.toHaveClass('bg-transparent');

    rerender(<Card variant="text" tone={tone}>Content</Card>);
    expect(container.firstChild).toHaveClass('border-0', 'bg-transparent', 'shadow-none');

    rerender(<Card tone={tone} className="bg-transparent text-inherit">Content</Card>);
    expect(container.firstChild).toHaveClass('bg-transparent', 'text-inherit');
    expect(container.firstChild).not.toHaveClass(`bg-palette-${tone}-opacity-light`, 'text-text-primary');
  });

  test.each(['primary', 'secondary'] as const)('preserves the solid %s variant and tone override', (variant) => {
    const { container } = render(<Card variant={variant} tone="error">Content</Card>);
    expect(container.firstChild).toHaveClass(`bg-palette-${variant}-main`, `text-palette-${variant}-contrast`);
    expect(container.firstChild).toHaveAttribute('data-tone', variant);
  });

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
