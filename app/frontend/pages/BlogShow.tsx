import { useEffect } from "react";
import { Head } from "@inertiajs/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  slug: string;
  published_at: string;
  author_name: string;
  author_title: string;
  author_profile_picture: string;
}

interface BlogShowProps {
  blogPost: BlogPost;
}

export default function BlogShow({ blogPost }: BlogShowProps) {
  useEffect(() => {
    AOS.init({ once: true, duration: 700 });
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="font-sans text-gray-900 bg-gray-50 min-h-screen">
      <Head title={`${blogPost.title} - Magebase Blog`} />
      <Header />

      <main className="w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <div className="mb-8" data-aos="fade-up">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </a>
          </div>

          {/* Article Header */}
          <header className="mb-12" data-aos="fade-up">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {formatDate(blogPost.published_at)}
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-lg border border-gray-200">
              <img
                src={blogPost.author_profile_picture}
                alt={blogPost.author_name}
                className="w-16 h-16 rounded-full object-cover border-4 border-gray-300"
              />
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {blogPost.author_name}
                </p>
                <p className="text-gray-600">{blogPost.author_title}</p>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-6 text-gray-900">
              {blogPost.title}
            </h1>
          </header>

          {/* Article Content */}
          <article
            className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-200"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-gray-900 prose-strong:text-gray-900 prose-code:text-gray-700 prose-pre:bg-gray-100"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </article>

          {/* Back to Blog CTA */}
          <div className="text-center" data-aos="fade-up" data-aos-delay="300">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              View All Blog Posts
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
