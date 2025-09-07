import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BlogIndex from '../pages/BlogIndex';

// Mock Inertia.js components
vi.mock('@inertiajs/react', () => ({
  Head: () => null,
  Link: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('BlogIndex', () => {
  const mockBlogPosts = [
    {
      id: 1,
      title: 'Test Blog Post 1',
      excerpt: 'This is a test excerpt for the first blog post',
      slug: 'test-blog-post-1',
      published_at: '2024-01-15T10:00:00Z',
      author_name: 'Test Author',
      author_title: 'Software Developer',
      author_profile_picture: '/images/author.jpg',
    },
    {
      id: 2,
      title: 'Test Blog Post 2',
      excerpt: 'This is a test excerpt for the second blog post',
      slug: 'test-blog-post-2',
      published_at: '2024-01-16T10:00:00Z',
      author_name: 'Another Author',
      author_title: 'Tech Lead',
      author_profile_picture: '/images/author2.jpg',
    },
  ];

  it('renders the blog index page with blog posts', () => {
    render(<BlogIndex blogPosts={mockBlogPosts} />);

    // Check if the main heading is present
    expect(
      screen.getByText('Software Development Insights & Tips')
    ).toBeInTheDocument();

    // Check if blog post titles are rendered
    expect(screen.getByText('Test Blog Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Blog Post 2')).toBeInTheDocument();

    // Check if excerpts are rendered
    expect(
      screen.getByText('This is a test excerpt for the first blog post')
    ).toBeInTheDocument();
    expect(
      screen.getByText('This is a test excerpt for the second blog post')
    ).toBeInTheDocument();

    // Check if author names are rendered
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Another Author')).toBeInTheDocument();
  });

  it('renders empty state when no blog posts are available', () => {
    render(<BlogIndex blogPosts={[]} />);

    expect(screen.getByText('No blog posts yet')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Check back soon for the latest software development tips and insights!'
      )
    ).toBeInTheDocument();
  });

  it('renders formatted publication dates', () => {
    render(<BlogIndex blogPosts={mockBlogPosts} />);

    // Check if dates are formatted correctly (Australian format: day month year)
    expect(screen.getByText(/15 January 2024/)).toBeInTheDocument();
    expect(screen.getByText(/16 January 2024/)).toBeInTheDocument();
  });
});
