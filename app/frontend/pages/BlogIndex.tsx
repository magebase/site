import React, { useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  published_at: string;
  author_name: string;
  author_title: string;
  author_profile_picture: string;
}

interface BlogIndexProps {
  blogPosts: BlogPost[];
}

const BlogIndex: React.FC<BlogIndexProps> = ({ blogPosts }) => {
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
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      <Head title="Blog - Magebase Software Development" />

      <Header />

      <main className="w-full">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              data-aos="fade-up"
            >
              Software Development Insights & Tips
            </h1>
            <p
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Stay informed with the latest software development tips,
              technology trends, and industry insights from the Magebase team.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-7xl mx-auto">
            {blogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.published_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author_name}</span>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Read more
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No blog posts yet
                </h3>
                <p className="text-gray-600">
                  Check back soon for the latest software development tips and
                  insights!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogIndex;
