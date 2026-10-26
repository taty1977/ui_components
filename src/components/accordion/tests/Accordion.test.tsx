import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from '../Accordion';

const testItems = [
  { id: '1', title: 'Panel One', content: 'Content for panel one' },
  { id: '2', title: 'Panel Two', content: 'Content for panel two' },
  { id: '3', title: 'Panel Three', content: 'Content for panel three' },
];

function renderWithUser(component: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(component),
  };
}

describe('Accordion', () => {
  test.each(['outline', 'outlined'] as const)(
    'rounds the colored %s border rather than clipping square corners',
    async (variant) => {
      const { user } = renderWithUser(<Accordion items={testItems} variant={variant} tone="info" />);
      const button = screen.getByRole('button', { name: /panel one/i });
      expect(button).toHaveClass('border', 'border-palette-info-main', 'rounded-md');
      await user.click(button);
      expect(button).toHaveClass('border-palette-info-main', 'rounded-t-md');
      expect(button).not.toHaveClass('rounded-md');
      await user.click(button);
      expect(button).toHaveClass('rounded-md');
    },
  );

  test('uses shared theme colors for its surface styles', () => {
    render(<Accordion items={testItems} />);
    const button = screen.getByRole('button', { name: /panel one/i });

    expect(button).toHaveClass('bg-palette-primary-main', 'text-misc-bg-white');
  });

  test('supports field appearances and tone variants', () => {
    const { container, rerender } = render(<Accordion items={testItems} variant="outlined" />);

    expect(container.firstChild).toHaveAttribute('data-variant', 'outlined');
    expect(screen.getAllByRole('button')[0]).toHaveClass('min-h-12', 'text-18');

    rerender(<Accordion items={testItems} variant="filled" size="small" tone="success" />);

    expect(container.firstChild).toHaveAttribute('data-tone', 'success');
    expect(screen.getAllByRole('button')[0]).toHaveClass('min-h-11', 'text-15', 'bg-palette-success-main');

    rerender(<Accordion items={testItems} variant="standard" />);
    expect(screen.getAllByRole('button')[0]).toHaveClass('bg-transparent', 'text-palette-primary-main');
  });

  test('defaults to solid and preserves legacy variant values', () => {
    const { container, rerender } = render(<Accordion items={testItems} />);

    expect(container.firstChild).toHaveAttribute('data-variant', 'default');
    expect(container.firstChild).toHaveAttribute('data-tone', 'primary');

    rerender(<Accordion items={testItems} variant="default" />);
    expect(container.firstChild).toHaveAttribute('data-variant', 'default');
    expect(container.firstChild).toHaveAttribute('data-tone', 'primary');

    rerender(<Accordion items={testItems} variant="primary" />);
    expect(container.firstChild).toHaveAttribute('data-tone', 'primary');

    rerender(<Accordion items={testItems} variant="secondary" />);
    expect(container.firstChild).toHaveAttribute('data-tone', 'secondary');
  });

  test.each([
    ['default', 'bg-palette-info-main', 'text-misc-bg-white'],
    ['label', 'bg-palette-info-opacity-light', 'text-palette-info-main'],
    ['outline', 'bg-transparent', 'text-palette-info-main'],
    ['text', 'bg-transparent', 'text-palette-info-main'],
  ] as const)('matches the Button %s treatment', (variant, background, text) => {
    render(<Accordion items={testItems} variant={variant} tone="info" />);
    const button = screen.getByRole('button', { name: /panel one/i });
    expect(button).toHaveClass(background, text);
    if (variant === 'outline') expect(button).toHaveClass('border', 'border-palette-info-main');
  });

  test.each([
    ['outlined', 'outline'],
    ['filled', 'default'],
    ['standard', 'text'],
    ['primary', 'default'],
    ['secondary', 'default'],
  ] as const)('keeps %s equivalent to %s with the resolved tone', (legacyVariant, variant) => {
    const tone = legacyVariant === 'primary' || legacyVariant === 'secondary' ? legacyVariant : 'info';
    const { container, rerender } = render(<Accordion items={testItems} variant={legacyVariant} tone="info" />);
    const legacyClasses = screen.getByRole('button', { name: /panel one/i }).className;
    const legacyFrameClasses = screen.getByRole('button', { name: /panel one/i }).parentElement?.className;
    expect(container.firstChild).toHaveAttribute('data-tone', tone);

    rerender(<Accordion items={testItems} variant={variant} tone={tone} />);
    const button = screen.getByRole('button', { name: /panel one/i });
    expect(button.className).toBe(legacyClasses);
    expect(button.parentElement?.className).toBe(legacyFrameClasses);
  });

  test('uses custom icons for collapsed and expanded states', async () => {
    const { user } = renderWithUser(
      <Accordion
        collapsedIcon={<span data-testid="collapsed-icon">Collapsed</span>}
        expandedIcon={<span data-testid="expanded-icon">Expanded</span>}
        items={[testItems[0]]}
      />,
    );

    expect(screen.getByTestId('collapsed-icon')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /panel one/i }));
    expect(screen.getByTestId('expanded-icon')).toBeInTheDocument();
  });

  test('renders accordion with multiple panels', () => {
    render(<Accordion items={testItems} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(screen.queryByText('Content for panel one')).toBeNull();
    expect(screen.queryByText('Content for panel two')).toBeNull();
    expect(screen.queryByText('Content for panel three')).toBeNull();
  });

  test('shows content for the clicked panel and hides the rest', async () => {
    const { user } = renderWithUser(<Accordion items={testItems} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[1]);
    expect(screen.getByText('Content for panel two')).toBeVisible();
    expect(screen.queryByText('Content for panel one')).toBeNull();
    expect(screen.queryByText('Content for panel three')).toBeNull();
  });

  test('hides content when an expanded panel is clicked again', async () => {
    const { user } = renderWithUser(<Accordion items={testItems} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[2]);
    expect(screen.getByText('Content for panel three')).toBeVisible();
    await user.click(buttons[2]);
    expect(screen.queryByText('Content for panel three')).toBeNull();
  });

  test('renders children passed as separate Accordion props', async () => {
    const itemsWithChildren = [{ id: 'child-1', title: 'Children Panel' }];
    const { user } = renderWithUser(
      <Accordion items={itemsWithChildren}>
        <span>Children body content</span>
      </Accordion>,
    );
    const button = screen.getByRole('button', { name: /children panel/i });

    await user.click(button);
    expect(screen.getByText('Children body content')).toBeVisible();
  });

  test('can expand multiple panels at the same time when allowMultiple is true', async () => {
    const { user } = renderWithUser(<Accordion items={testItems} allowMultiple={true} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    await user.click(buttons[2]);
    expect(screen.getByText('Content for panel one')).toBeVisible();
    expect(screen.queryByText('Content for panel two')).toBeNull();
    expect(screen.getByText('Content for panel three')).toBeVisible();
  });

  describe('when allowMultiple is false (default)', () => {
    test('only one panel is visible at a time', async () => {
      const { user } = renderWithUser(<Accordion items={testItems} />);
      const buttons = screen.getAllByRole('button');
      await user.click(buttons[0]);
      expect(screen.getByText('Content for panel one')).toBeVisible();
      await user.click(buttons[2]);
      expect(screen.getByText('Content for panel three')).toBeVisible();
      expect(screen.queryByText('Content for panel one')).toBeNull();
    });

    test('clicking another panel closes the previously open panel', async () => {
      const { user } = renderWithUser(<Accordion items={testItems} allowMultiple={false} />);
      const buttons = screen.getAllByRole('button');

      await user.click(buttons[0]);
      expect(screen.getByText('Content for panel one')).toBeVisible();

      await user.click(buttons[1]);
      expect(screen.getByText('Content for panel two')).toBeVisible();
      expect(screen.queryByText('Content for panel one')).toBeNull();
    });
  });

  describe('accessibility', () => {
    test('each button has aria-controls pointing to an existing content region', () => {
      render(<Accordion items={testItems} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button: HTMLElement, index: number) => {
        const controlsId = button.getAttribute('aria-controls');
        expect(controlsId).toBeTruthy();
        expect(controlsId).toMatch(new RegExp(`-panel-${testItems[index].id}$`));
        expect(document.getElementById(controlsId!)).toHaveAttribute('hidden');
        expect(document.getElementById(controlsId!)).toHaveAttribute('aria-labelledby', button.id);
      });
    });

    test('expanded state and panel visibility stay synchronized', async () => {
      const { user } = renderWithUser(<Accordion items={[testItems[0]]} />);
      const button = screen.getByRole('button', { name: /panel one/i });
      const panel = document.getElementById(button.getAttribute('aria-controls')!);

      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(panel).toHaveAttribute('hidden');

      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(panel).not.toHaveAttribute('hidden');
      expect(panel).toHaveTextContent('Content for panel one');
    });

    test('content regions have aria-labelledby pointing back to their header', async () => {
      const { user } = renderWithUser(<Accordion items={testItems} allowMultiple={true} />);
      const buttons = screen.getAllByRole('button');
      // Expand all items to make content regions visible
      for (const button of buttons) {
        await user.click(button);
      }
      const regions = screen.getAllByRole('region');
      expect(regions).toHaveLength(3);
      regions.forEach((region: HTMLElement) => {
        const labelledBy = region.getAttribute('aria-labelledby');
        expect(labelledBy).toBeTruthy();
        // Verify the button with this ID exists
        const button = document.getElementById(labelledBy!);
        expect(button).toBeInTheDocument();
      });
    });
  });
});
