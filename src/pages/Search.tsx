// import { useState, useEffect } from "react";
// import { Search as SearchIcon, BookOpen, ArrowUpRight, Filter, Scale, Gavel, FileText, ShoppingBag, Globe2, Users, Info, Loader2, Calendar, Eye, Heart, Tag, User, TrendingUp, Clock } from "lucide-react";
// import { Layout } from "@/components/Layout";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// const API_BASE = "https://nyaya-backend-muktha.onrender.com";

// interface BlogPost {
//   _id: string;
//   title: string;
//   slug: string;
//   excerpt: string;
//   content: string;
//   category: string;
//   sub_category?: string;
//   tags: string[];
//   author: string;
//   author_avatar?: string;
//   read_time: number;
//   views: number;
//   likes: number;
//   created_at: string;
//   updated_at: string;
//   featured_image?: string;
// }

// const iconMap: Record<string, any> = {
//   "Criminal Law": Gavel,
//   "Constitutional Law": Scale,
//   "Consumer Law": ShoppingBag,
//   "Family Law": Users,
//   "Cyber Law": Globe2,
//   "Motor Vehicle Laws": FileText,
// };

// const categoryColors: Record<string, string> = {
//   "Criminal Law": "bg-red-500/10 text-red-400 border-red-500/30",
//   "Constitutional Law": "bg-purple-500/10 text-purple-400 border-purple-500/30",
//   "Consumer Law": "bg-blue-500/10 text-blue-400 border-blue-500/30",
//   "Family Law": "bg-pink-500/10 text-pink-400 border-pink-500/30",
//   "Cyber Law": "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
//   "Motor Vehicle Laws": "bg-orange-500/10 text-orange-400 border-orange-500/30",
// };

// const Search = () => {
//   const [q, setQ] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
//   const [blogs, setBlogs] = useState<BlogPost[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [tags, setTags] = useState<any[]>([]);
//   const [authors, setAuthors] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
//   const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);
//   const [popularBlogs, setPopularBlogs] = useState<BlogPost[]>([]);
//   const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);

//   // Fetch filters on mount
//   useEffect(() => {
//     fetchFilters();
//     fetchPopularBlogs();
//     fetchRecentBlogs();
//   }, []);

//   // Search when filters change
//   useEffect(() => {
//     searchBlogs();
//   }, [q, selectedCategory, selectedTag, selectedAuthor, page]);

//   const fetchFilters = async () => {
//     try {
//       const [categoriesRes, tagsRes, authorsRes] = await Promise.all([
//         fetch(`${API_BASE}/app2/categories`),
//         fetch(`${API_BASE}/app2/tags`),
//         fetch(`${API_BASE}/app2/authors`)
//       ]);
      
//       const categoriesData = await categoriesRes.json();
//       const tagsData = await tagsRes.json();
//       const authorsData = await authorsRes.json();
      
//       setCategories(categoriesData.categories);
//       setTags(tagsData.tags);
//       setAuthors(authorsData.authors);
//     } catch (error) {
//       console.error("Error fetching filters:", error);
//     }
//   };

//   const fetchPopularBlogs = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/app2/analytics/popular?limit=5`);
//       const data = await res.json();
//       setPopularBlogs(data.results);
//     } catch (error) {
//       console.error("Error fetching popular blogs:", error);
//     }
//   };

//   const fetchRecentBlogs = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/app2/analytics/recent?limit=5`);
//       const data = await res.json();
//       setRecentBlogs(data.results);
//     } catch (error) {
//       console.error("Error fetching recent blogs:", error);
//     }
//   };

//   const searchBlogs = async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams({
//         q,
//         page: page.toString(),
//         limit: "10",
//         sort_by: "created_at",
//         sort_order: "desc"
//       });
      
//       if (selectedCategory && selectedCategory !== "All") {
//         params.append("category", selectedCategory);
//       }
//       if (selectedTag) params.append("tag", selectedTag);
//       if (selectedAuthor) params.append("author", selectedAuthor);
      
//       const res = await fetch(`${API_BASE}/app2/blogs/search?${params}`);
//       const data = await res.json();
      
//       setBlogs(data.results);
//       setTotalPages(data.total_pages);
//       setTotalResults(data.total);
//     } catch (error) {
//       console.error("Error searching blogs:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBlogDetails = async (blogId: string) => {
//     try {
//       const res = await fetch(`${API_BASE}/app2/blogs/${blogId}`);
//       const data = await res.json();
//       setSelectedBlog(data.blog);
//       setRelatedBlogs(data.related);
//     } catch (error) {
//       console.error("Error fetching blog details:", error);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "long",
//       day: "numeric"
//     });
//   };

//   const getCategoryIcon = (category: string) => {
//     const Icon = iconMap[category] || FileText;
//     return Icon;
//   };

//   const clearFilters = () => {
//     setSelectedCategory(null);
//     setSelectedTag(null);
//     setSelectedAuthor(null);
//     setQ("");
//     setPage(1);
//   };

//   return (
//     <Layout>
//       {/* Hero Section */}
//       <section className="bg-gradient-soft border-b border-border/60">
//         <div className="container py-16 md:py-20 max-w-5xl text-center">
//           <p className="text-xs uppercase tracking-[0.18em] text-accent font-medium mb-3">Legal Knowledge Library</p>
//           <h1 className="font-display text-5xl md:text-6xl text-primary mb-5 text-balance">Browse Legal Blogs & Articles</h1>
//           <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
//             Expert-written legal guides, case analyses, and practical advice written for citizens — not just lawyers.
//           </p>

//           <div className="relative max-w-2xl mx-auto">
//             <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//             <input
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//               placeholder="Search legal topics, acts, sections..."
//               className="w-full h-14 pl-14 pr-6 rounded-full bg-card border border-border shadow-soft focus:outline-none focus:border-accent focus:shadow-glow transition-smooth"
//             />
//           </div>
//         </div>
//       </section>

//       <div className="container py-12">
//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Sidebar Filters */}
//           <aside className="lg:col-span-1 space-y-6">
//             {/* Categories */}
//             <div className="bg-card rounded-2xl border border-border/60 p-5">
//               <h3 className="font-semibold mb-3 flex items-center gap-2">
//                 <Filter className="h-4 w-4 text-accent" />
//                 Categories
//               </h3>
//               <div className="space-y-2">
//                 <button
//                   onClick={() => setSelectedCategory(null)}
//                   className={cn(
//                     "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
//                     !selectedCategory ? "bg-accent text-accent-foreground" : "hover:bg-secondary"
//                   )}
//                 >
//                   All Categories
//                 </button>
//                 {categories.map((cat) => (
//                   <button
//                     key={cat.name}
//                     onClick={() => setSelectedCategory(cat.name)}
//                     className={cn(
//                       "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between",
//                       selectedCategory === cat.name ? "bg-accent text-accent-foreground" : "hover:bg-secondary"
//                     )}
//                   >
//                     <span>{cat.name}</span>
//                     <span className="text-xs opacity-70">{cat.count}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Popular Tags */}
//             <div className="bg-card rounded-2xl border border-border/60 p-5">
//               <h3 className="font-semibold mb-3 flex items-center gap-2">
//                 <Tag className="h-4 w-4 text-accent" />
//                 Popular Tags
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {tags.slice(0, 15).map((tag) => (
//                   <button
//                     key={tag.name}
//                     onClick={() => setSelectedTag(selectedTag === tag.name ? null : tag.name)}
//                     className={cn(
//                       "px-2 py-1 rounded-full text-xs transition-colors",
//                       selectedTag === tag.name
//                         ? "bg-accent text-accent-foreground"
//                         : "bg-secondary text-muted-foreground hover:bg-secondary/80"
//                     )}
//                   >
//                     {tag.name} ({tag.count})
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Top Authors */}
//             <div className="bg-card rounded-2xl border border-border/60 p-5">
//               <h3 className="font-semibold mb-3 flex items-center gap-2">
//                 <User className="h-4 w-4 text-accent" />
//                 Top Authors
//               </h3>
//               <div className="space-y-2">
//                 {authors.slice(0, 5).map((author) => (
//                   <button
//                     key={author.name}
//                     onClick={() => setSelectedAuthor(selectedAuthor === author.name ? null : author.name)}
//                     className={cn(
//                       "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between",
//                       selectedAuthor === author.name ? "bg-accent text-accent-foreground" : "hover:bg-secondary"
//                     )}
//                   >
//                     <span>{author.name}</span>
//                     <span className="text-xs opacity-70">{author.count} posts</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Popular Blogs Sidebar */}
//             <div className="bg-card rounded-2xl border border-border/60 p-5">
//               <h3 className="font-semibold mb-3 flex items-center gap-2">
//                 <TrendingUp className="h-4 w-4 text-accent" />
//                 Most Popular
//               </h3>
//               <div className="space-y-3">
//                 {popularBlogs.map((blog) => (
//                   <button
//                     key={blog._id}
//                     onClick={() => fetchBlogDetails(blog._id)}
//                     className="w-full text-left hover:bg-secondary p-2 rounded-lg transition-colors"
//                   >
//                     <p className="text-sm font-medium line-clamp-2">{blog.title}</p>
//                     <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
//                       <span className="flex items-center gap-1">
//                         <Eye className="h-3 w-3" />
//                         {blog.views}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Clock className="h-3 w-3" />
//                         {blog.read_time} min read
//                       </span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Blogs Sidebar */}
//             <div className="bg-card rounded-2xl border border-border/60 p-5">
//               <h3 className="font-semibold mb-3 flex items-center gap-2">
//                 <Clock className="h-4 w-4 text-accent" />
//                 Recent Posts
//               </h3>
//               <div className="space-y-3">
//                 {recentBlogs.map((blog) => (
//                   <button
//                     key={blog._id}
//                     onClick={() => fetchBlogDetails(blog._id)}
//                     className="w-full text-left hover:bg-secondary p-2 rounded-lg transition-colors"
//                   >
//                     <p className="text-sm font-medium line-clamp-2">{blog.title}</p>
//                     <p className="text-xs text-muted-foreground mt-1">{formatDate(blog.created_at)}</p>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </aside>

//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             {/* Active Filters */}
//             {(selectedCategory || selectedTag || selectedAuthor || q) && (
//               <div className="mb-4 flex items-center gap-2 flex-wrap">
//                 <span className="text-sm text-muted-foreground">Active filters:</span>
//                 {selectedCategory && (
//                   <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs flex items-center gap-1">
//                     Category: {selectedCategory}
//                     <button onClick={() => setSelectedCategory(null)} className="ml-1 hover:text-red-400">×</button>
//                   </span>
//                 )}
//                 {selectedTag && (
//                   <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs flex items-center gap-1">
//                     Tag: {selectedTag}
//                     <button onClick={() => setSelectedTag(null)} className="ml-1 hover:text-red-400">×</button>
//                   </span>
//                 )}
//                 {selectedAuthor && (
//                   <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs flex items-center gap-1">
//                     Author: {selectedAuthor}
//                     <button onClick={() => setSelectedAuthor(null)} className="ml-1 hover:text-red-400">×</button>
//                   </span>
//                 )}
//                 {q && (
//                   <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs flex items-center gap-1">
//                     Search: {q}
//                     <button onClick={() => setQ("")} className="ml-1 hover:text-red-400">×</button>
//                   </span>
//                 )}
//                 <button onClick={clearFilters} className="text-xs text-accent hover:underline">
//                   Clear all
//                 </button>
//               </div>
//             )}

//             {/* Results Count */}
//             <div className="mb-4 text-sm text-muted-foreground">
//               Found {totalResults} result{totalResults !== 1 ? "s" : ""}
//             </div>

//             {/* Loading State */}
//             {loading && (
//               <div className="flex justify-center py-20">
//                 <Loader2 className="h-8 w-8 animate-spin text-accent" />
//               </div>
//             )}

//             {/* Blog Cards */}
//             {!loading && (
//               <div className="space-y-4">
//                 {blogs.map((blog) => {
//                   const Icon = getCategoryIcon(blog.category);
//                   return (
//                     <article
//                       key={blog._id}
//                       onClick={() => fetchBlogDetails(blog._id)}
//                       className="bg-card rounded-2xl border border-border/60 p-6 hover:border-accent/40 hover:shadow-elegant transition-all cursor-pointer group"
//                     >
//                       <div className="flex items-start gap-4">
//                         <div className="h-12 w-12 rounded-xl bg-secondary group-hover:bg-accent/10 grid place-items-center shrink-0 transition-colors">
//                           <Icon className="h-5 w-5 text-accent" />
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-display text-xl font-semibold text-primary group-hover:text-accent transition-colors mb-2">
//                             {blog.title}
//                           </h3>
//                           <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{blog.excerpt}</p>
//                           <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
//                             <span className={cn("px-2 py-0.5 rounded-full", categoryColors[blog.category] || "bg-secondary")}>
//                               {blog.category}
//                             </span>
//                             {blog.sub_category && (
//                               <span className="px-2 py-0.5 rounded-full bg-secondary">{blog.sub_category}</span>
//                             )}
//                             <span className="flex items-center gap-1">
//                               <User className="h-3 w-3" />
//                               {blog.author}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Calendar className="h-3 w-3" />
//                               {formatDate(blog.created_at)}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Clock className="h-3 w-3" />
//                               {blog.read_time} min read
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Eye className="h-3 w-3" />
//                               {blog.views}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Heart className="h-3 w-3" />
//                               {blog.likes}
//                             </span>
//                           </div>
//                           {blog.tags && blog.tags.length > 0 && (
//                             <div className="flex flex-wrap gap-1 mt-3">
//                               {blog.tags.slice(0, 3).map((tag) => (
//                                 <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/50">
//                                   #{tag}
//                                 </span>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                         <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
//                       </div>
//                     </article>
//                   );
//                 })}
//               </div>
//             )}

//             {/* No Results */}
//             {!loading && blogs.length === 0 && (
//               <div className="text-center py-20">
//                 <BookOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
//                 <p className="text-muted-foreground">No blog posts found matching your criteria.</p>
//                 <button onClick={clearFilters} className="mt-2 text-accent hover:underline">
//                   Clear all filters
//                 </button>
//               </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex justify-center gap-2 mt-8">
//                 <button
//                   onClick={() => setPage(p => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="px-3 py-1 rounded-lg border border-border hover:bg-secondary disabled:opacity-50"
//                 >
//                   Previous
//                 </button>
//                 <span className="px-3 py-1">
//                   Page {page} of {totalPages}
//                 </span>
//                 <button
//                   onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//                   disabled={page === totalPages}
//                   className="px-3 py-1 rounded-lg border border-border hover:bg-secondary disabled:opacity-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Blog Detail Modal */}
//       {selectedBlog && (
//         <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setSelectedBlog(null)}>
//           <div className="bg-card rounded-2xl max-w-4xl w-full my-8" onClick={(e) => e.stopPropagation()}>
//             {/* Header */}
//             <div className="sticky top-0 bg-card border-b border-border/60 p-6 rounded-t-2xl flex justify-between items-center">
//               <div>
//                 <span className={cn("px-2 py-0.5 rounded-full text-xs", categoryColors[selectedBlog.category])}>
//                   {selectedBlog.category}
//                 </span>
//                 {selectedBlog.sub_category && (
//                   <span className="ml-2 px-2 py-0.5 rounded-full bg-secondary text-xs">{selectedBlog.sub_category}</span>
//                 )}
//               </div>
//               <button onClick={() => setSelectedBlog(null)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
//                 ✕
//               </button>
//             </div>

//             {/* Content */}
//             <div className="p-8">
//               <h1 className="text-3xl font-display font-bold text-primary mb-4">{selectedBlog.title}</h1>
              
//               <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-4 border-b border-border/40">
//                 <span className="flex items-center gap-1">
//                   <User className="h-4 w-4" />
//                   {selectedBlog.author}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Calendar className="h-4 w-4" />
//                   {formatDate(selectedBlog.created_at)}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Clock className="h-4 w-4" />
//                   {selectedBlog.read_time} min read
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Eye className="h-4 w-4" />
//                   {selectedBlog.views} views
//                 </span>
//               </div>

//               <div className="prose prose-invert max-w-none">
//                 {selectedBlog.content.split('\n').map((paragraph, idx) => {
//                   if (paragraph.startsWith('# ')) {
//                     return <h1 key={idx} className="text-3xl font-bold mt-6 mb-3">{paragraph.slice(2)}</h1>;
//                   } else if (paragraph.startsWith('## ')) {
//                     return <h2 key={idx} className="text-2xl font-bold mt-5 mb-2">{paragraph.slice(3)}</h2>;
//                   } else if (paragraph.startsWith('### ')) {
//                     return <h3 key={idx} className="text-xl font-bold mt-4 mb-2">{paragraph.slice(4)}</h3>;
//                   } else if (paragraph.match(/^\|/)) {
//                     return (
//                       <div key={idx} className="overflow-x-auto my-4">
//                         <table className="min-w-full border-collapse border border-border">
//                           {paragraph.split('\n').map((row, rowIdx) => (
//                             <tr key={rowIdx} className="border-b border-border">
//                               {row.split('|').filter(cell => cell.trim()).map((cell, cellIdx) => (
//                                 rowIdx === 0 ? 
//                                   <th key={cellIdx} className="border border-border px-3 py-2 text-left bg-secondary font-semibold">{cell.trim()}</th> :
//                                   <td key={cellIdx} className="border border-border px-3 py-2">{cell.trim()}</td>
//                               ))}
//                             </tr>
//                           ))}
//                         </table>
//                       </div>
//                     );
//                   } else if (paragraph.trim()) {
//                     return <p key={idx} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
//                   }
//                   return <div key={idx} className="h-2" />;
//                 })}
//               </div>

//               {/* Tags */}
//               {selectedBlog.tags && selectedBlog.tags.length > 0 && (
//                 <div className="mt-8 pt-4 border-t border-border/40">
//                   <h4 className="text-sm font-semibold mb-2">Tags</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedBlog.tags.map((tag) => (
//                       <span key={tag} className="px-2 py-1 bg-secondary rounded-full text-xs">#{tag}</span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Related Blogs */}
//               {relatedBlogs.length > 0 && (
//                 <div className="mt-8 pt-4 border-t border-border/40">
//                   <h4 className="text-lg font-semibold mb-4">Related Articles</h4>
//                   <div className="grid gap-3">
//                     {relatedBlogs.map((blog) => (
//                       <button
//                         key={blog._id}
//                         onClick={() => {
//                           fetchBlogDetails(blog._id);
//                           window.scrollTo(0, 0);
//                         }}
//                         className="text-left p-3 hover:bg-secondary rounded-lg transition-colors"
//                       >
//                         <p className="font-medium text-accent">{blog.title}</p>
//                         <p className="text-sm text-muted-foreground">{blog.excerpt.slice(0, 100)}...</p>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Disclaimer */}
//               <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
//                 <p className="text-xs text-muted-foreground">
//                   ⚖️ <strong>Disclaimer:</strong> The information provided in this article is for educational and informational purposes only. 
//                   It does not constitute legal advice. Laws may change over time and vary by jurisdiction. 
//                   Please consult a qualified lawyer for advice on your specific legal situation.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// };

// export default Search;

import { useState, useEffect, useRef } from "react";
import {
  Search as SearchIcon, BookOpen, ArrowUpRight, Filter, Scale, Gavel,
  FileText, ShoppingBag, Globe2, Users, Loader2, Calendar, Eye, Heart,
  Tag, User, TrendingUp, Clock, X, ChevronDown, ChevronUp,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { cn } from "@/lib/utils";

const API_BASE = "https://nyaya-backend-muktha.onrender.com";

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

// ── Collapsible section for the sidebar/drawer ──────────────────────────────
function CollapsibleSection({
  title,
  icon: Icon,
  defaultOpen = true,
  children,
}: {
  title: string;
  icon: any;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-card rounded-2xl border border-border/60 p-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between mb-0"
      >
        <span className="font-semibold flex items-center gap-2 text-sm">
          <Icon className="h-4 w-4 text-accent" />
          {title}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
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

  // Mobile filter drawer
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on outside tap
  useEffect(() => {
    if (!filterDrawerOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setFilterDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [filterDrawerOpen]);

  // Lock body scroll when modal or drawer is open
  useEffect(() => {
    document.body.style.overflow =
      selectedBlog || filterDrawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedBlog, filterDrawerOpen]);

  useEffect(() => {
    fetchFilters();
    fetchPopularBlogs();
    fetchRecentBlogs();
  }, []);

  useEffect(() => {
    searchBlogs();
  }, [q, selectedCategory, selectedTag, selectedAuthor, page]);

  const fetchFilters = async () => {
    try {
      const [cRes, tRes, aRes] = await Promise.all([
        fetch(`${API_BASE}/app2/categories`),
        fetch(`${API_BASE}/app2/tags`),
        fetch(`${API_BASE}/app2/authors`),
      ]);
      setCategories((await cRes.json()).categories);
      setTags((await tRes.json()).tags);
      setAuthors((await aRes.json()).authors);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPopularBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/app2/analytics/popular?limit=5`);
      setPopularBlogs((await res.json()).results);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchRecentBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/app2/analytics/recent?limit=5`);
      setRecentBlogs((await res.json()).results);
    } catch (e) {
      console.error(e);
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
        sort_order: "desc",
      });
      if (selectedCategory && selectedCategory !== "All")
        params.append("category", selectedCategory);
      if (selectedTag) params.append("tag", selectedTag);
      if (selectedAuthor) params.append("author", selectedAuthor);

      const res = await fetch(`${API_BASE}/app2/blogs/search?${params}`);
      const data = await res.json();
      setBlogs(data.results);
      setTotalPages(data.total_pages);
      setTotalResults(data.total);
    } catch (e) {
      console.error(e);
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
    } catch (e) {
      console.error(e);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getCategoryIcon = (cat: string) => iconMap[cat] || FileText;

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setSelectedAuthor(null);
    setQ("");
    setPage(1);
  };

  const hasActiveFilters = !!(selectedCategory || selectedTag || selectedAuthor || q);
  const activeFilterCount = [selectedCategory, selectedTag, selectedAuthor, q || null].filter(Boolean).length;

  // ── Sidebar inner content (reused in both desktop sidebar & mobile drawer) ─
  const SidebarContent = () => (
    <div className="space-y-4">
      {/* Categories */}
      <CollapsibleSection title="Categories" icon={Filter}>
        <div className="space-y-1">
          <button
            onClick={() => { setSelectedCategory(null); setFilterDrawerOpen(false); }}
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
              onClick={() => { setSelectedCategory(cat.name); setFilterDrawerOpen(false); }}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between",
                selectedCategory === cat.name
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-secondary"
              )}
            >
              <span>{cat.name}</span>
              <span className="text-xs opacity-70">{cat.count}</span>
            </button>
          ))}
        </div>
      </CollapsibleSection>

      {/* Tags */}
      <CollapsibleSection title="Popular Tags" icon={Tag} defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 15).map((tag) => (
            <button
              key={tag.name}
              onClick={() => { setSelectedTag(selectedTag === tag.name ? null : tag.name); setFilterDrawerOpen(false); }}
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
      </CollapsibleSection>

      {/* Authors */}
      <CollapsibleSection title="Top Authors" icon={User} defaultOpen={false}>
        <div className="space-y-1">
          {authors.slice(0, 5).map((author) => (
            <button
              key={author.name}
              onClick={() => { setSelectedAuthor(selectedAuthor === author.name ? null : author.name); setFilterDrawerOpen(false); }}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between",
                selectedAuthor === author.name
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-secondary"
              )}
            >
              <span>{author.name}</span>
              <span className="text-xs opacity-70">{author.count} posts</span>
            </button>
          ))}
        </div>
      </CollapsibleSection>

      {/* Popular */}
      <CollapsibleSection title="Most Popular" icon={TrendingUp} defaultOpen={false}>
        <div className="space-y-2">
          {popularBlogs.map((blog) => (
            <button
              key={blog._id}
              onClick={() => { fetchBlogDetails(blog._id); setFilterDrawerOpen(false); }}
              className="w-full text-left hover:bg-secondary p-2 rounded-lg transition-colors"
            >
              <p className="text-sm font-medium line-clamp-2">{blog.title}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{blog.views}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{blog.read_time} min</span>
              </div>
            </button>
          ))}
        </div>
      </CollapsibleSection>

      {/* Recent */}
      <CollapsibleSection title="Recent Posts" icon={Clock} defaultOpen={false}>
        <div className="space-y-2">
          {recentBlogs.map((blog) => (
            <button
              key={blog._id}
              onClick={() => { fetchBlogDetails(blog._id); setFilterDrawerOpen(false); }}
              className="w-full text-left hover:bg-secondary p-2 rounded-lg transition-colors"
            >
              <p className="text-sm font-medium line-clamp-2">{blog.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{formatDate(blog.created_at)}</p>
            </button>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-soft border-b border-border/60">
        <div className="container py-10 md:py-16 max-w-5xl text-center px-4">
          <p className="text-xs uppercase tracking-[0.18em] text-accent font-medium mb-2">
            Legal Knowledge Library
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl text-primary mb-3 text-balance leading-tight">
            Browse Legal Blogs & Articles
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl mx-auto">
            Expert-written legal guides, case analyses, and practical advice written for citizens — not just lawyers.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search legal topics, acts, sections..."
              className="w-full h-12 pl-11 pr-4 rounded-full bg-card border border-border shadow-soft focus:outline-none focus:border-accent focus:shadow-glow transition-smooth text-sm"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Mobile filter FAB ─────────────────────────────────────────────── */}
      <div className="lg:hidden sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border/40 px-4 py-2 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {loading ? "Searching…" : `${totalResults} result${totalResults !== 1 ? "s" : ""}`}
        </span>
        <button
          onClick={() => setFilterDrawerOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-sm font-medium hover:bg-secondary transition-colors relative"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-accent text-accent-foreground text-[10px] grid place-items-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Mobile filter drawer ──────────────────────────────────────────── */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setFilterDrawerOpen(false)}
          />
          {/* Drawer */}
          <div
            ref={drawerRef}
            className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl max-h-[82vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-background flex items-center justify-between px-5 py-4 border-b border-border/40 rounded-t-3xl">
              <h2 className="font-semibold text-base">Filters</h2>
              <div className="flex items-center gap-3">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-accent hover:underline"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={() => setFilterDrawerOpen(false)}
                  className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <SidebarContent />
            </div>
          </div>
        </div>
      )}

      <div className="container py-6 md:py-10 px-4">
        <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
          {/* ── Desktop Sidebar ──────────────────────────────────────────── */}
          <aside className="hidden lg:block lg:col-span-1 space-y-4">
            <SidebarContent />
          </aside>

          {/* ── Main Content ─────────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mb-4 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground">Filters:</span>
                {selectedCategory && (
                  <FilterChip label={`Category: ${selectedCategory}`} onRemove={() => setSelectedCategory(null)} />
                )}
                {selectedTag && (
                  <FilterChip label={`Tag: ${selectedTag}`} onRemove={() => setSelectedTag(null)} />
                )}
                {selectedAuthor && (
                  <FilterChip label={`Author: ${selectedAuthor}`} onRemove={() => setSelectedAuthor(null)} />
                )}
                {q && (
                  <FilterChip label={`"${q}"`} onRemove={() => setQ("")} />
                )}
                <button onClick={clearFilters} className="text-xs text-accent hover:underline ml-1">
                  Clear all
                </button>
              </div>
            )}

            {/* Results Count — desktop only (mobile shows in sticky bar) */}
            <div className="hidden lg:block mb-4 text-sm text-muted-foreground">
              Found {totalResults} result{totalResults !== 1 ? "s" : ""}
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex justify-center py-20">
                <Loader2 className="h-7 w-7 animate-spin text-accent" />
              </div>
            )}

            {/* Blog Cards */}
            {!loading && (
              <div className="space-y-3 md:space-y-4">
                {blogs.map((blog) => {
                  const Icon = getCategoryIcon(blog.category);
                  return (
                    <article
                      key={blog._id}
                      onClick={() => fetchBlogDetails(blog._id)}
                      className="bg-card rounded-2xl border border-border/60 p-4 md:p-6 hover:border-accent/40 hover:shadow-elegant transition-all cursor-pointer group active:scale-[0.99]"
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        {/* Icon — hidden on very small screens */}
                        <div className="hidden sm:grid h-10 w-10 md:h-12 md:w-12 rounded-xl bg-secondary group-hover:bg-accent/10 place-items-center shrink-0 transition-colors">
                          <Icon className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-base md:text-xl font-semibold text-primary group-hover:text-accent transition-colors mb-1.5 line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-muted-foreground text-xs md:text-sm mb-2.5 line-clamp-2">
                            {blog.excerpt}
                          </p>
                          {/* Meta row — scrollable on mobile */}
                          <div className="flex items-center gap-2 text-[11px] md:text-xs text-muted-foreground flex-wrap">
                            <span className={cn("px-2 py-0.5 rounded-full border text-[10px] md:text-xs", categoryColors[blog.category] || "bg-secondary")}>
                              {blog.category}
                            </span>
                            {blog.sub_category && (
                              <span className="px-2 py-0.5 rounded-full bg-secondary text-[10px] md:text-xs">{blog.sub_category}</span>
                            )}
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />{blog.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />{formatDate(blog.created_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />{blog.read_time} min
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />{blog.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />{blog.likes}
                            </span>
                          </div>
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {blog.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/50">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-0.5" />
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Empty state */}
            {!loading && blogs.length === 0 && (
              <div className="text-center py-20">
                <BookOpen className="h-10 w-10 mx-auto mb-3 text-muted-foreground opacity-40" />
                <p className="text-muted-foreground text-sm">No blog posts found matching your criteria.</p>
                <button onClick={clearFilters} className="mt-2 text-accent hover:underline text-sm">
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-40 text-sm min-w-[80px] transition-colors"
                >
                  Previous
                </button>
                <span className="px-3 py-2 text-sm text-muted-foreground">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-40 text-sm min-w-[80px] transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Blog Detail Modal ─────────────────────────────────────────────── */}
      {selectedBlog && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-start justify-center sm:p-4 overflow-y-auto"
          onClick={() => setSelectedBlog(null)}
        >
          <div
            className="bg-card w-full sm:rounded-2xl sm:max-w-4xl sm:my-8 rounded-t-3xl max-h-[94vh] sm:max-h-none overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky header */}
            <div className="sticky top-0 bg-card border-b border-border/60 px-4 sm:px-6 py-3 sm:py-4 rounded-t-3xl sm:rounded-t-2xl flex justify-between items-center z-10">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn("px-2 py-0.5 rounded-full text-xs border", categoryColors[selectedBlog.category])}>
                  {selectedBlog.category}
                </span>
                {selectedBlog.sub_category && (
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">{selectedBlog.sub_category}</span>
                )}
              </div>
              <button
                onClick={() => setSelectedBlog(null)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors ml-2 shrink-0"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-8">
              <h1 className="text-xl sm:text-3xl font-display font-bold text-primary mb-3">
                {selectedBlog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-5 pb-4 border-b border-border/40">
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{selectedBlog.author}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(selectedBlog.created_at)}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{selectedBlog.read_time} min read</span>
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{selectedBlog.views} views</span>
              </div>

              <div className="prose prose-invert max-w-none text-sm sm:text-base">
                {selectedBlog.content.split("\n").map((paragraph, idx) => {
                  if (paragraph.startsWith("# "))
                    return <h1 key={idx} className="text-2xl sm:text-3xl font-bold mt-6 mb-3">{paragraph.slice(2)}</h1>;
                  if (paragraph.startsWith("## "))
                    return <h2 key={idx} className="text-xl sm:text-2xl font-bold mt-5 mb-2">{paragraph.slice(3)}</h2>;
                  if (paragraph.startsWith("### "))
                    return <h3 key={idx} className="text-lg sm:text-xl font-bold mt-4 mb-2">{paragraph.slice(4)}</h3>;
                  if (paragraph.match(/^\|/))
                    return (
                      <div key={idx} className="overflow-x-auto my-4 -mx-4 sm:mx-0">
                        <table className="min-w-full border-collapse border border-border text-xs sm:text-sm">
                          {paragraph.split("\n").map((row, ri) => (
                            <tr key={ri} className="border-b border-border">
                              {row.split("|").filter((c) => c.trim()).map((cell, ci) =>
                                ri === 0 ? (
                                  <th key={ci} className="border border-border px-2 sm:px-3 py-1.5 text-left bg-secondary font-semibold whitespace-nowrap">{cell.trim()}</th>
                                ) : (
                                  <td key={ci} className="border border-border px-2 sm:px-3 py-1.5">{cell.trim()}</td>
                                )
                              )}
                            </tr>
                          ))}
                        </table>
                      </div>
                    );
                  if (paragraph.trim())
                    return <p key={idx} className="text-muted-foreground leading-relaxed mb-3">{paragraph}</p>;
                  return <div key={idx} className="h-2" />;
                })}
              </div>

              {/* Tags */}
              {selectedBlog.tags?.length > 0 && (
                <div className="mt-6 pt-4 border-t border-border/40">
                  <h4 className="text-sm font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBlog.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-secondary rounded-full text-xs">#{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related */}
              {relatedBlogs.length > 0 && (
                <div className="mt-6 pt-4 border-t border-border/40">
                  <h4 className="text-base sm:text-lg font-semibold mb-3">Related Articles</h4>
                  <div className="grid gap-2">
                    {relatedBlogs.map((blog) => (
                      <button
                        key={blog._id}
                        onClick={() => { fetchBlogDetails(blog._id); }}
                        className="text-left p-3 hover:bg-secondary rounded-lg transition-colors"
                      >
                        <p className="font-medium text-accent text-sm">{blog.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{blog.excerpt}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="mt-6 p-3 sm:p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-xs text-muted-foreground leading-relaxed">
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

// ── Small helper ──────────────────────────────────────────────────────────────
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs flex items-center gap-1">
      {label}
      <button onClick={onRemove} className="ml-0.5 hover:text-red-400" aria-label="Remove filter">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

export default Search;