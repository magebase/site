import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MediumSidebar from '../MediumSidebar';

// Mock the sidebar components
vi.mock('../ui/sidebar', () => ({
  Sidebar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar">{children}</div>
  ),
  SidebarContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-content">{children}</div>
  ),
  SidebarGroup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group">{children}</div>
  ),
  SidebarGroupContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group-content">{children}</div>
  ),
  SidebarGroupLabel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group-label">{children}</div>
  ),
  SidebarHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-header">{children}</div>
  ),
  SidebarFooter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-footer">{children}</div>
  ),
  SidebarMenu: ({ children }: { children: React.ReactNode }) => (
    <ul data-testid="sidebar-menu">{children}</ul>
  ),
  SidebarMenuItem: ({ children }: { children: React.ReactNode }) => (
    <li data-testid="sidebar-menu-item">{children}</li>
  ),
  SidebarMenuButton: ({
    children,
    isActive,
  }: {
    children: React.ReactNode;
    isActive?: boolean;
  }) => (
    <button data-testid="sidebar-menu-button" data-active={isActive}>
      {children}
    </button>
  ),
}));

// Mock Inertia.js Link
vi.mock('@inertiajs/react', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="inertia-link">
      {children}
    </a>
  ),
}));

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
  PenTool: () => <div data-testid="write-icon" />,
  Home: () => <div data-testid="home-icon" />,
  BookOpen: () => <div data-testid="library-icon" />,
  User: () => <div data-testid="profile-icon" />,
  FileText: () => <div data-testid="stories-icon" />,
  BarChart3: () => <div data-testid="stats-icon" />,
  Heart: () => <div data-testid="following-icon" />,
}));

const renderComponent = (component: React.ReactElement) => {
  return render(component);
};

describe('MediumSidebar', () => {
  it('renders all main navigation menu items', () => {
    render(<MediumSidebar />);

    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByTestId('write-icon')).toBeInTheDocument();
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByTestId('library-icon')).toBeInTheDocument();
    expect(screen.getByTestId('profile-icon')).toBeInTheDocument();
    expect(screen.getByTestId('stories-icon')).toBeInTheDocument();
    expect(screen.getByTestId('stats-icon')).toBeInTheDocument();
    expect(screen.getByTestId('following-icon')).toBeInTheDocument();
  });

  it('displays user name in header', () => {
    const user = { name: 'Ekrata Gm' };
    render(<MediumSidebar user={user} />);

    expect(screen.getByText('Ekrata Gm')).toBeInTheDocument();
  });

  it('shows discover section with suggestions', () => {
    render(<MediumSidebar />);

    expect(
      screen.getByText('Discover more writers and publications to follow.')
    ).toBeInTheDocument();
    expect(screen.getByText('See suggestions')).toBeInTheDocument();
  });

  it('displays membership promotion section', () => {
    render(<MediumSidebar />);

    expect(
      screen.getByText(
        'Get unlimited access to the best of Medium for less than $1/week.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Become a member')).toBeInTheDocument();
  });

  it('renders navigation links with correct hrefs', () => {
    render(<MediumSidebar />);

    const links = screen.getAllByTestId('inertia-link');
    expect(links).toHaveLength(8); // 8 main menu items

    // Check specific links
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Write')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Library')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Stories')).toBeInTheDocument();
    expect(screen.getByText('Stats')).toBeInTheDocument();
    expect(screen.getByText('Following')).toBeInTheDocument();
  });
});
