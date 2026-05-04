import { useState, useEffect } from "react";
import { Search as SearchIcon, BookOpen, ArrowUpRight, Filter, Scale, Gavel, FileText, ShoppingBag, Globe2, Users, Info, Loader2, Calendar, Eye, Heart, Tag, User, TrendingUp, Clock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const API_BASE = "http://localhost:8000";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  sub_category?: string;
  tags: string[];
  author: string;
  author_avatar?: string;
  read_time: number;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
  featured_image?: string;
}

const iconMap: Record<string, any> = {
  "Criminal Law": Gavel,
  "Constitutional Law": Scale,
  "Consumer Law": ShoppingBag,
  "Family Law": Users,
  "Cyber Law": Globe2,
  "Motor Vehicle Laws": FileText,
};

const categoryColors: Record<string, string> = {
  "Criminal Law": "bg-red-500/10 text-red-400 border-red-500/30",
  "Constitutional Law": "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "Consumer Law": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Family Law": "bg-pink-500/10 text-pink-400 border-pink-500/30",
  "Cyber Law": "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  "Motor Vehicle Laws": "bg-orange-500/10 text-orange-400 border-orange-500/30",
};

const Search = () => {
  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [popularBlogs, setPopularBlogs] = useState<BlogPost[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);

  // Fetch filters on mount
  useEffect(() => {
    fetchFilters();
    fetchPopularBlogs();
    fetchRecentBlogs();
  }, []);

  // Search when filters change
  useEffect(() => {
    searchBlogs();
  }, [q, selectedCategory, selectedTag, selectedAuthor, page]);

  const fetchFilters = async () => {
    try {
      const [categoriesRes, tagsRes, authorsRes] = await Promise.all([
        fetch(`${API_BASE}/app2/categories`),
        fetch(`${API_BASE}/app2/tags`),
        fetch(`${API_BASE}/app2/authors`)
      ]);
      
      const categoriesData = await categoriesRes.json();
      const tagsData = await tagsRes.json();
      const authorsData = await authorsRes.json();
      
      setCategories(categoriesData.categories);
      setTags(tagsData.tags);
      setAuthors(authorsData.authors);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  const fetchPopularBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/app2/analytics/popular?limit=5`);
      const data = await res.json();
      setPopularBlogs(data.results);
    } catch (error) {
      console.error("Error fetching popular blogs:", error);
    }
  };

  const fetchRecentBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/app2/analytics/recent?limit=5`);
      const data = await res.json();
      setRecentBlogs(data.results);
    } catch (error) {
      console.error("Error fetching recent blogs:", error);
    }
  };

  const searchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q,
        page: page.toString(),
        limit: "10",
        sort_by: "created_at",
        sort_order: "desc"
      });
      
      if (selectedCategory && selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }
      if (selectedTag) params.append("tag", selectedTag);
      if (selectedAuthor) params.append("author", selectedAuthor);
      
      const res = await fetch(`${API_BASE}/app2/blogs/search?${params}`);
      const data = await res.json();
      
      setBlogs(data.results);
      setTotalPages(data.total_pages);
      setTotalResults(data.total);
    } catch (error) {
      console.error("Error searching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogDetails = async (blogId: string) => {
    try {
      const res = await fetch(`${API_BASE}/app2/blogs/${blogId}`);
      const data = await res.json();
      setSelectedBlog(data.blog);
      setRelatedBlogs(data.related);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getCategoryIcon = (category: string) => {
    const Icon = iconMap[category] || FileText;
    return Icon;
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setSelectedAuthor(null);
    setQ("");
    setPage(1);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-soft border-b border-border/60">
        <div className="container py-16 md:py-20 max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-accent font-medium mb-3">Legal Knowledge Library</p>
          <h1 className="font-display text-5xl md:text-6xl text-primary mb-5 text-balance">Browse Legal Blogs & Articles</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Expert-written legal guides, case analyses, and practical advice written for citizens — not just lawyers.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search legal topics, acts, sections..."
              className="w-full h-14 pl-14 pr-6 rounded-full bg-card border border-border shadow-soft focus:outline-none focus:border-accent focus:shadow-glow transition-smooth"
            />
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-card rounded-2xl border border-border/60 p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4 text-accent" />
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    !selectedCategory ? "bg-accent text-accent-foreground" : "hover:bg-secondary"
                  )}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between",
                      selectedCategory === cat.name ? "bg-accent text-accent-foreground" : "hover:bg-secondary"
                    )}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs opacity-70">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-card rounded-2xl border border-border/60 p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4 text-accent" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 15).map((tag) => (
                  <button
                    key={tag.name}
                    onClick={() => setSelectedTag(selectedTag === tag.name ? null : tag.name)}
                    className={cn(
                      "px-2 py-1 rounded-full text-xs transition-colors",
                      selectedTag === tag.name
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    )}
                  >
                    {tag.name} ({tag.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Top Authors */}
            <div className="bg-card rounded-2xl border border-border/60 p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-accent" />
                Top Authors
              </h3>
              <div className="space-y-2">
                {authors.slice(0, 5).map((author) => (
                  <button
                    key={author.name}
                    onClick={() => setSelectedAuthor(selectedAuthor === author.name ? null : author.name)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between",
                      selectedAuthor === author.name ? "bg-accent text-accent-foreground" : "hover:bg-secondary"
                    )}
                  >
                    <span>{author.name}</span>
                    <span className="text-xs opacity-70">{author.count} posts</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Blogs Sidebar */}
            <div className="bg-card rounded-2xl border border-border/60 p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                Most Popular
              </h3>
              <div className="space-y-3">
                {popularBlogs.map((blog) => (
                  <button
                    key={blog._id}
                    onClick={() => fetchBlogDetails(blog._id)}
                    className="w-full text-left hover:bg-secondary p-2 rounded-lg transition-colors"
                  >
                    <p className="text-sm font-medium line-clamp-2">{blog.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {blog.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {blog.read_time} min read
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Blogs Sidebar */}
            <div className="bg-card rounded-2xl border border-border/60 p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                Recent Posts
              </h3>
              <div className="space-y-3">
                {recentBlogs.map((blog) => (
                  <button
                    key={blog._id}
                    onClick={() => fetchBlogDetails(blog._id)}
                    className="w-full text-left hover:bg-secondary p-2 rounded-lg transition-colors"
                  >
                    <p className="text-sm font-medium line-clamp-2">{blog.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(blog.created_at)}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            {(selectedCategory || selectedTag || selectedAuthor || q) && (
              <div className="mb-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedCategory && (
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs flex items-center gap-1">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory(null)} className="ml-1 hover:text-red-400">×</button>
                  </span>
                )}
                {selectedTag && (
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs flex items-center gap-1">
                    Tag: {selectedTag}
                    <button onClick={() => setSelectedTag(null)} className="ml-1 hover:text-red-400">×</button>
                  </span>
                )}
                {selectedAuthor && (
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs flex items-center gap-1">
                    Author: {selectedAuthor}
                    <button onClick={() => setSelectedAuthor(null)} className="ml-1 hover:text-red-400">×</button>
                  </span>
                )}
                {q && (
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs flex items-center gap-1">
                    Search: {q}
                    <button onClick={() => setQ("")} className="ml-1 hover:text-red-400">×</button>
                  </span>
                )}
                <button onClick={clearFilters} className="text-xs text-accent hover:underline">
                  Clear all
                </button>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-4 text-sm text-muted-foreground">
              Found {totalResults} result{totalResults !== 1 ? "s" : ""}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            )}

            {/* Blog Cards */}
            {!loading && (
              <div className="space-y-4">
                {blogs.map((blog) => {
                  const Icon = getCategoryIcon(blog.category);
                  return (
                    <article
                      key={blog._id}
                      onClick={() => fetchBlogDetails(blog._id)}
                      className="bg-card rounded-2xl border border-border/60 p-6 hover:border-accent/40 hover:shadow-elegant transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-secondary group-hover:bg-accent/10 grid place-items-center shrink-0 transition-colors">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-xl font-semibold text-primary group-hover:text-accent transition-colors mb-2">
                            {blog.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{blog.excerpt}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                            <span className={cn("px-2 py-0.5 rounded-full", categoryColors[blog.category] || "bg-secondary")}>
                              {blog.category}
                            </span>
                            {blog.sub_category && (
                              <span className="px-2 py-0.5 rounded-full bg-secondary">{blog.sub_category}</span>
                            )}
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {blog.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(blog.created_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {blog.read_time} min read
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {blog.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {blog.likes}
                            </span>
                          </div>
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {blog.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/50">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* No Results */}
            {!loading && blogs.length === 0 && (
              <div className="text-center py-20">
                <BookOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No blog posts found matching your criteria.</p>
                <button onClick={clearFilters} className="mt-2 text-accent hover:underline">
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 rounded-lg border border-border hover:bg-secondary disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 rounded-lg border border-border hover:bg-secondary disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setSelectedBlog(null)}>
          <div className="bg-card rounded-2xl max-w-4xl w-full my-8" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border/60 p-6 rounded-t-2xl flex justify-between items-center">
              <div>
                <span className={cn("px-2 py-0.5 rounded-full text-xs", categoryColors[selectedBlog.category])}>
                  {selectedBlog.category}
                </span>
                {selectedBlog.sub_category && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-secondary text-xs">{selectedBlog.sub_category}</span>
                )}
              </div>
              <button onClick={() => setSelectedBlog(null)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <h1 className="text-3xl font-display font-bold text-primary mb-4">{selectedBlog.title}</h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-4 border-b border-border/40">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {selectedBlog.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(selectedBlog.created_at)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {selectedBlog.read_time} min read
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {selectedBlog.views} views
                </span>
              </div>

              <div className="prose prose-invert max-w-none">
                {selectedBlog.content.split('\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('# ')) {
                    return <h1 key={idx} className="text-3xl font-bold mt-6 mb-3">{paragraph.slice(2)}</h1>;
                  } else if (paragraph.startsWith('## ')) {
                    return <h2 key={idx} className="text-2xl font-bold mt-5 mb-2">{paragraph.slice(3)}</h2>;
                  } else if (paragraph.startsWith('### ')) {
                    return <h3 key={idx} className="text-xl font-bold mt-4 mb-2">{paragraph.slice(4)}</h3>;
                  } else if (paragraph.match(/^\|/)) {
                    return (
                      <div key={idx} className="overflow-x-auto my-4">
                        <table className="min-w-full border-collapse border border-border">
                          {paragraph.split('\n').map((row, rowIdx) => (
                            <tr key={rowIdx} className="border-b border-border">
                              {row.split('|').filter(cell => cell.trim()).map((cell, cellIdx) => (
                                rowIdx === 0 ? 
                                  <th key={cellIdx} className="border border-border px-3 py-2 text-left bg-secondary font-semibold">{cell.trim()}</th> :
                                  <td key={cellIdx} className="border border-border px-3 py-2">{cell.trim()}</td>
                              ))}
                            </tr>
                          ))}
                        </table>
                      </div>
                    );
                  } else if (paragraph.trim()) {
                    return <p key={idx} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
                  }
                  return <div key={idx} className="h-2" />;
                })}
              </div>

              {/* Tags */}
              {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                <div className="mt-8 pt-4 border-t border-border/40">
                  <h4 className="text-sm font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-secondary rounded-full text-xs">#{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Blogs */}
              {relatedBlogs.length > 0 && (
                <div className="mt-8 pt-4 border-t border-border/40">
                  <h4 className="text-lg font-semibold mb-4">Related Articles</h4>
                  <div className="grid gap-3">
                    {relatedBlogs.map((blog) => (
                      <button
                        key={blog._id}
                        onClick={() => {
                          fetchBlogDetails(blog._id);
                          window.scrollTo(0, 0);
                        }}
                        className="text-left p-3 hover:bg-secondary rounded-lg transition-colors"
                      >
                        <p className="font-medium text-accent">{blog.title}</p>
                        <p className="text-sm text-muted-foreground">{blog.excerpt.slice(0, 100)}...</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  ⚖️ <strong>Disclaimer:</strong> The information provided in this article is for educational and informational purposes only. 
                  It does not constitute legal advice. Laws may change over time and vary by jurisdiction. 
                  Please consult a qualified lawyer for advice on your specific legal situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Search;