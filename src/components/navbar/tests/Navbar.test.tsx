import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

describe('Navbar', () => {
  test('renders the brand, links, and active section', () => {
    render(<Navbar brand="Daniels" links={links} activeHref="#portfolio" />);

    expect(screen.getByRole('link', { name: 'Daniels' })).toHaveAttribute('href', '#top');
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Portfolio' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
  });

  test('opens the mobile navigation and closes it with Escape', () => {
    render(<Navbar brand="Daniels" links={links} />);

    const trigger = screen.getByRole('button', { name: 'Open navigation menu' });
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('navigation', { name: 'Main navigation' })).toHaveLength(2);
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getAllByRole('navigation', { name: 'Main navigation' })).toHaveLength(1);
  });

  test('closes the mobile navigation after selecting a section', () => {
    render(<Navbar brand="Daniels" links={links} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    fireEvent.click(screen.getAllByRole('link', { name: 'Contact' })[1]);

    expect(screen.getAllByRole('navigation', { name: 'Main navigation' })).toHaveLength(1);
  });
});
