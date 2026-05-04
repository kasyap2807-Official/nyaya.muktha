// import { useState, useEffect } from "react";
// import {
//   Plus, Edit, Trash2, Eye, EyeOff, Search, Filter, X,
//   Save, Calendar, Tag, User, FileText, Image as ImageIcon,
//   Link as LinkIcon, CheckCircle, AlertCircle, Clock, Loader2,
//   ChevronLeft, ChevronRight, LogOut
// } from "lucide-react";
// import { Layout } from "@/components/Layout";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

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
//   is_published: boolean;
//   created_at: string;
//   updated_at: string;
//   featured_image?: string;
//   references: string[];
//   related_laws: string[];
//   meta_description?: string;
// }

// const categories = [
//   "Criminal Law",
//   "Constitutional Law",
//   "Consumer Law",
//   "Family Law",
//   "Cyber Law",
//   "Motor Vehicle Laws",
//   "Property Law",
//   "Employment Law",
//   "Tax Law",
//   "Corporate Law"
// ];

// const AdminBlogs = () => {
//   const [blogs, setBlogs] = useState<BlogPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [token, setToken] = useState<string | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loginUsername, setLoginUsername] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [loginError, setLoginError] = useState("");
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     excerpt: "",
//     category: "Criminal Law",
//     sub_category: "",
//     tags: [] as string[],
//     author: "",
//     author_avatar: "",
//     read_time: 5,
//     meta_description: "",
//     featured_image: "",
//     references: [] as string[],
//     related_laws: [] as string[]
//   });
//   const [tagInput, setTagInput] = useState("");
//   const [refInput, setRefInput] = useState("");
//   const [lawInput, setLawInput] = useState("");
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("admin_token");
//     if (savedToken) {
//       setToken(savedToken);
//       setIsLoggedIn(true);
//       fetchBlogs(savedToken);
//     }
//   }, []);

//   const handleLogin = async () => {
//     try {
//       const res = await fetch("https://nyaya-backend-muktha.onrender.com/app3/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username: loginUsername, password: loginPassword })
//       });
      
//       if (res.ok) {
//         const data = await res.json();
//         localStorage.setItem("admin_token", data.access_token);
//         setToken(data.access_token);
//         setIsLoggedIn(true);
//         fetchBlogs(data.access_token);
//         setLoginError("");
//       } else {
//         setLoginError("Invalid username or password");
//       }
//     } catch (error) {
//       setLoginError("Login failed. Please try again.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("admin_token");
//     setToken(null);
//     setIsLoggedIn(false);
//     setBlogs([]);
//   };

//   const fetchBlogs = async (authToken: string) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`https://nyaya-backend-muktha.onrender.com/app3/blogs?page=${page}&limit=20`, {
//         headers: { "Authorization": `Bearer ${authToken}` }
//       });
//       const data = await res.json();
//       setBlogs(data.results);
//       setTotalPages(data.total_pages);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createBlog = async () => {
//     setSaving(true);
//     try {
//       const res = await fetch("https://nyaya-backend-muktha.onrender.com/app3/blogs", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify(formData)
//       });
      
//       if (res.ok) {
//         setShowCreateModal(false);
//         resetForm();
//         fetchBlogs(token!);
//       } else {
//         const error = await res.json();
//         alert(error.detail || "Failed to create blog");
//       }
//     } catch (error) {
//       alert("Error creating blog");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const updateBlog = async () => {
//     if (!selectedBlog) return;
//     setSaving(true);
    
//     try {
//       const res = await fetch(`https://nyaya-backend-muktha.onrender.com/app3/blogs/${selectedBlog._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify(formData)
//       });
      
//       if (res.ok) {
//         setShowEditModal(false);
//         setSelectedBlog(null);
//         resetForm();
//         fetchBlogs(token!);
//       } else {
//         const error = await res.json();
//         alert(error.detail || "Failed to update blog");
//       }
//     } catch (error) {
//       alert("Error updating blog");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const deleteBlog = async (blogId: string) => {
//     if (!confirm("Are you sure you want to delete this blog?")) return;
    
//     try {
//       const res = await fetch(`https://nyaya-backend-muktha.onrender.com/app3/blogs/${blogId}`, {
//         method: "DELETE",
//         headers: { "Authorization": `Bearer ${token}` }
//       });
      
//       if (res.ok) {
//         fetchBlogs(token!);
//       } else {
//         alert("Failed to delete blog");
//       }
//     } catch (error) {
//       alert("Error deleting blog");
//     }
//   };

//   const togglePublish = async (blogId: string, currentStatus: boolean) => {
//     try {
//       const res = await fetch(`https://nyaya-backend-muktha.onrender.com/app3/blogs/${blogId}/publish`, {
//         method: "POST",
//         headers: { "Authorization": `Bearer ${token}` }
//       });
      
//       if (res.ok) {
//         fetchBlogs(token!);
//       }
//     } catch (error) {
//       alert("Failed to update publish status");
//     }
//   };

//   const editBlog = (blog: BlogPost) => {
//     setSelectedBlog(blog);
//     setFormData({
//       title: blog.title,
//       content: blog.content,
//       excerpt: blog.excerpt,
//       category: blog.category,
//       sub_category: blog.sub_category || "",
//       tags: blog.tags,
//       author: blog.author,
//       author_avatar: blog.author_avatar || "",
//       read_time: blog.read_time,
//       meta_description: blog.meta_description || "",
//       featured_image: blog.featured_image || "",
//       references: blog.references || [],
//       related_laws: blog.related_laws || []
//     });
//     setShowEditModal(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       content: "",
//       excerpt: "",
//       category: "Criminal Law",
//       sub_category: "",
//       tags: [],
//       author: "",
//       author_avatar: "",
//       read_time: 5,
//       meta_description: "",
//       featured_image: "",
//       references: [],
//       related_laws: []
//     });
//     setTagInput("");
//     setRefInput("");
//     setLawInput("");
//   };

//   const addTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
//       setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
//       setTagInput("");
//     }
//   };

//   const removeTag = (tag: string) => {
//     setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
//   };

//   const addReference = () => {
//     if (refInput.trim() && !formData.references.includes(refInput.trim())) {
//       setFormData({ ...formData, references: [...formData.references, refInput.trim()] });
//       setRefInput("");
//     }
//   };

//   const removeReference = (ref: string) => {
//     setFormData({ ...formData, references: formData.references.filter(r => r !== ref) });
//   };

//   const addRelatedLaw = () => {
//     if (lawInput.trim() && !formData.related_laws.includes(lawInput.trim())) {
//       setFormData({ ...formData, related_laws: [...formData.related_laws, lawInput.trim()] });
//       setLawInput("");
//     }
//   };

//   const removeRelatedLaw = (law: string) => {
//     setFormData({ ...formData, related_laws: formData.related_laws.filter(l => l !== law) });
//   };

//   const filteredBlogs = blogs.filter(blog => 
//     blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     blog.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (!isLoggedIn) {
//     return (
//       <Layout>
//         <div className="min-h-screen flex items-center justify-center">
//           <div className="bg-card rounded-2xl border border-border/60 p-8 max-w-md w-full">
//             <div className="text-center mb-6">
//               <div className="h-16 w-16 rounded-full bg-gradient-saffron mx-auto flex items-center justify-center mb-4">
//                 <FileText className="h-8 w-8" />
//               </div>
//               <h2 className="text-2xl font-display font-semibold mb-2">Admin Login</h2>
//               <p className="text-muted-foreground text-sm">Enter your credentials to manage blogs</p>
//             </div>
            
//             {loginError && (
//               <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
//                 <AlertCircle className="h-4 w-4" />
//                 {loginError}
//               </div>
//             )}
            
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium mb-1 block">Username</label>
//                 <input
//                   type="text"
//                   value={loginUsername}
//                   onChange={(e) => setLoginUsername(e.target.value)}
//                   className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
//                   placeholder="Enter username"
//                   onKeyPress={(e) => e.key === "Enter" && handleLogin()}
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium mb-1 block">Password</label>
//                 <input
//                   type="password"
//                   value={loginPassword}
//                   onChange={(e) => setLoginPassword(e.target.value)}
//                   className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
//                   placeholder="Enter password"
//                   onKeyPress={(e) => e.key === "Enter" && handleLogin()}
//                 />
//               </div>
//               <Button onClick={handleLogin} variant="hero" className="w-full">
//                 Login
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="container py-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-display font-bold text-primary mb-2">Blog Management</h1>
//             <p className="text-muted-foreground">Create, edit, and manage your legal blog posts</p>
//           </div>
//           <div className="flex gap-3">
//             <Button onClick={handleLogout} variant="outline">
//               <LogOut className="h-4 w-4 mr-2" />
//               Logout
//             </Button>
//             <Button onClick={() => {
//               resetForm();
//               setShowCreateModal(true);
//             }} variant="hero">
//               <Plus className="h-4 w-4 mr-2" />
//               New Blog Post
//             </Button>
//           </div>
//         </div>

//         {/* Search and Filter */}
//         <div className="flex gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <input
//               type="text"
//               placeholder="Search by title, author, or category..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-accent"
//             />
//           </div>
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-accent"
//           >
//             <option value="">All Categories</option>
//             {categories.map(cat => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>

//         {/* Blog List */}
//         {loading ? (
//           <div className="flex justify-center py-20">
//             <Loader2 className="h-8 w-8 animate-spin text-accent" />
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {filteredBlogs.map((blog) => (
//               <div key={blog._id} className="bg-card rounded-2xl border border-border/60 p-6 hover:border-accent/40 transition-all">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-2 flex-wrap">
//                       <span className="px-2 py-0.5 rounded-full text-xs bg-accent/10 text-accent">
//                         {blog.category}
//                       </span>
//                       {blog.sub_category && (
//                         <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">
//                           {blog.sub_category}
//                         </span>
//                       )}
//                       <span className={cn(
//                         "px-2 py-0.5 rounded-full text-xs",
//                         blog.is_published ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
//                       )}>
//                         {blog.is_published ? "Published" : "Draft"}
//                       </span>
//                       <span className="text-xs text-muted-foreground flex items-center gap-1">
//                         <Eye className="h-3 w-3" />
//                         {blog.views}
//                       </span>
//                       <span className="text-xs text-muted-foreground flex items-center gap-1">
//                         <Clock className="h-3 w-3" />
//                         {blog.read_time} min read
//                       </span>
//                     </div>
                    
//                     <h3 className="text-xl font-semibold text-primary mb-2">{blog.title}</h3>
//                     <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{blog.excerpt}</p>
                    
//                     <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                       <span className="flex items-center gap-1">
//                         <User className="h-4 w-4" />
//                         {blog.author}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Calendar className="h-4 w-4" />
//                         {new Date(blog.created_at).toLocaleDateString()}
//                       </span>
//                       {blog.tags && blog.tags.length > 0 && (
//                         <div className="flex items-center gap-1">
//                           <Tag className="h-4 w-4" />
//                           <span>{blog.tags.slice(0, 3).join(", ")}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div className="flex gap-2 ml-4">
//                     <button
//                       onClick={() => togglePublish(blog._id, blog.is_published)}
//                       className="p-2 hover:bg-secondary rounded-lg transition-colors"
//                       title={blog.is_published ? "Unpublish" : "Publish"}
//                     >
//                       {blog.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                     </button>
//                     <button
//                       onClick={() => editBlog(blog)}
//                       className="p-2 hover:bg-secondary rounded-lg transition-colors"
//                     >
//                       <Edit className="h-4 w-4" />
//                     </button>
//                     <button
//                       onClick={() => deleteBlog(blog._id)}
//                       className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && filteredBlogs.length === 0 && (
//           <div className="text-center py-20">
//             <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
//             <p className="text-muted-foreground">No blog posts found</p>
//             <Button onClick={() => {
//               resetForm();
//               setShowCreateModal(true);
//             }} variant="outline" className="mt-4">
//               Create your first blog post
//             </Button>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-8">
//             <button
//               onClick={() => setPage(p => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="p-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-50"
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </button>
//             <span className="px-4 py-2 text-sm">
//               Page {page} of {totalPages}
//             </span>
//             <button
//               onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="p-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-50"
//             >
//               <ChevronRight className="h-4 w-4" />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Create/Edit Blog Modal */}
//       {(showCreateModal || showEditModal) && (
//         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
//           <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-card border-b border-border/60 p-6 flex justify-between items-center">
//               <h2 className="text-2xl font-display font-semibold">
//                 {showCreateModal ? "Create New Blog Post" : "Edit Blog Post"}
//               </h2>
//               <button
//                 onClick={() => {
//                   setShowCreateModal(false);
//                   setShowEditModal(false);
//                   resetForm();
//                 }}
//                 className="p-2 hover:bg-secondary rounded-lg"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Basic Info */}
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium mb-1 block">Title *</label>
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
//                     placeholder="Enter blog title"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-medium mb-1 block">Category *</label>
//                     <select
//                       value={formData.category}
//                       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                       className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
//                     >
//                       {categories.map(cat => (
//                         <option key={cat} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium mb-1 block">Sub Category</label>
//                     <input
//                       type="text"
//                       value={formData.sub_category}
//                       onChange={(e) => setFormData({ ...formData, sub_category: e.target.value })}
//                       className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
//                       placeholder="e.g., Criminal Procedure"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-medium mb-1 block">Author *</label>
//                     <input
//                       type="text"
//                       value={formData.author}
//                       onChange={(e) => setFormData({ ...formData, author: e.target.value })}
//                       className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
//                       placeholder="Author name"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium mb-1 block">Read Time (minutes)</label>
//                     <input
//                       type="number"
//                       value={formData.read_time}
//                       onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
//                       className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium mb-1 block">Meta Description (SEO)</label>
//                   <textarea
//                     value={formData.meta_description}
//                     onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
//                     rows={2}
//                     className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
//                     placeholder="Brief description for SEO (150-160 characters)"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium mb-1 block">Excerpt *</label>
//                   <textarea
//                     value={formData.excerpt}
//                     onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
//                     rows={3}
//                     className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
//                     placeholder="Short summary that appears in blog listings"
//                   />
//                 </div>
//               </div>

//               {/* Tags */}
//               <div>
//                 <label className="text-sm font-medium mb-1 block">Tags</label>
//                 <div className="flex gap-2 mb-2">
//                   <input
//                     type="text"
//                     value={tagInput}
//                     onChange={(e) => setTagInput(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && addTag()}
//                     className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
//                     placeholder="Add tags (e.g., driving license, RTO)"
//                   />
//                   <button onClick={addTag} className="px-4 py-2 bg-accent rounded-lg hover:bg-accent/80">
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.tags.map((tag) => (
//                     <span key={tag} className="px-2 py-1 bg-secondary rounded-full text-xs flex items-center gap-1">
//                       {tag}
//                       <button onClick={() => removeTag(tag)} className="hover:text-red-400">×</button>
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* References */}
//               <div>
//                 <label className="text-sm font-medium mb-1 block">References</label>
//                 <div className="flex gap-2 mb-2">
//                   <input
//                     type="text"
//                     value={refInput}
//                     onChange={(e) => setRefInput(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && addReference()}
//                     className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
//                     placeholder="Add reference (e.g., Supreme Court case, Act)"
//                   />
//                   <button onClick={addReference} className="px-4 py-2 bg-accent rounded-lg hover:bg-accent/80">
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.references.map((ref) => (
//                     <span key={ref} className="px-2 py-1 bg-secondary rounded-full text-xs flex items-center gap-1">
//                       {ref}
//                       <button onClick={() => removeReference(ref)} className="hover:text-red-400">×</button>
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Related Laws */}
//               <div>
//                 <label className="text-sm font-medium mb-1 block">Related Laws</label>
//                 <div className="flex gap-2 mb-2">
//                   <input
//                     type="text"
//                     value={lawInput}
//                     onChange={(e) => setLawInput(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && addRelatedLaw()}
//                     className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
//                     placeholder="Add related law (e.g., Motor Vehicles Act, 1988)"
//                   />
//                   <button onClick={addRelatedLaw} className="px-4 py-2 bg-accent rounded-lg hover:bg-accent/80">
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.related_laws.map((law) => (
//                     <span key={law} className="px-2 py-1 bg-secondary rounded-full text-xs flex items-center gap-1">
//                       {law}
//                       <button onClick={() => removeRelatedLaw(law)} className="hover:text-red-400">×</button>
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Content */}
//               <div>
//                 <label className="text-sm font-medium mb-1 block">Content * (Markdown supported)</label>
//                 <textarea
//                   value={formData.content}
//                   onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                   rows={15}
//                   className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent font-mono text-sm"
//                   placeholder="# Heading 1

// ## Heading 2

// Regular paragraph with **bold** and *italic* text.

// ### Lists:
// - Item 1
// - Item 2

// | Table | Header |
// |-------|--------|
// | Cell 1 | Cell 2 |"
//                 />
//               </div>

//               {/* Featured Image */}
//               <div>
//                 <label className="text-sm font-medium mb-1 block">Featured Image URL</label>
//                 <input
//                   type="text"
//                   value={formData.featured_image}
//                   onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
//                   className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
//                   placeholder="https://example.com/image.jpg"
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3 pt-4 border-t border-border/60">
//                 <Button
//                   onClick={() => {
//                     setShowCreateModal(false);
//                     setShowEditModal(false);
//                     resetForm();
//                   }}
//                   variant="outline"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={showCreateModal ? createBlog : updateBlog}
//                   disabled={saving || !formData.title || !formData.content || !formData.author}
//                   variant="hero"
//                 >
//                   {saving ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <>
//                       <Save className="h-4 w-4 mr-2" />
//                       {showCreateModal ? "Publish Blog" : "Save Changes"}
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// };

// export default AdminBlogs;

import { useState, useEffect } from "react";
import {
  Plus, Edit, Trash2, Eye, EyeOff, Search,
  X, Save, Calendar, Tag, User, FileText,
  CheckCircle, AlertCircle, Clock, Loader2,
  ChevronLeft, ChevronRight, LogOut, ChevronDown
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  is_published: boolean;
  created_at: string;
  updated_at: string;
  featured_image?: string;
  references: string[];
  related_laws: string[];
  meta_description?: string;
}

const categories = [
  "Criminal Law", "Constitutional Law", "Consumer Law", "Family Law",
  "Cyber Law", "Motor Vehicle Laws", "Property Law", "Employment Law",
  "Tax Law", "Corporate Law"
];

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "Criminal Law",
    sub_category: "",
    tags: [] as string[],
    author: "",
    author_avatar: "",
    read_time: 5,
    meta_description: "",
    featured_image: "",
    references: [] as string[],
    related_laws: [] as string[]
  });
  const [tagInput, setTagInput] = useState("");
  const [refInput, setRefInput] = useState("");
  const [lawInput, setLawInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchBlogs(savedToken);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch("https://nyaya-backend-muktha.onrender.com/app3/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("admin_token", data.access_token);
        setToken(data.access_token);
        setIsLoggedIn(true);
        fetchBlogs(data.access_token);
        setLoginError("");
      } else {
        setLoginError("Invalid username or password");
      }
    } catch {
      setLoginError("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setIsLoggedIn(false);
    setBlogs([]);
  };

  const fetchBlogs = async (authToken: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://nyaya-backend-muktha.onrender.com/app3/blogs?page=${page}&limit=20`, {
        headers: { "Authorization": `Bearer ${authToken}` }
      });
      const data = await res.json();
      setBlogs(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async () => {
    setSaving(true);
    try {
      const res = await fetch("https://nyaya-backend-muktha.onrender.com/app3/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowCreateModal(false);
        resetForm();
        fetchBlogs(token!);
      } else {
        const error = await res.json();
        alert(error.detail || "Failed to create blog");
      }
    } catch {
      alert("Error creating blog");
    } finally {
      setSaving(false);
    }
  };

  const updateBlog = async () => {
    if (!selectedBlog) return;
    setSaving(true);
    try {
      const res = await fetch(`https://nyaya-backend-muktha.onrender.com/app3/blogs/${selectedBlog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowEditModal(false);
        setSelectedBlog(null);
        resetForm();
        fetchBlogs(token!);
      } else {
        const error = await res.json();
        alert(error.detail || "Failed to update blog");
      }
    } catch {
      alert("Error updating blog");
    } finally {
      setSaving(false);
    }
  };

  const deleteBlog = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`https://nyaya-backend-muktha.onrender.com/app3/blogs/${blogId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) fetchBlogs(token!);
      else alert("Failed to delete blog");
    } catch {
      alert("Error deleting blog");
    }
  };

  const togglePublish = async (blogId: string) => {
    try {
      const res = await fetch(`https://nyaya-backend-muktha.onrender.com/app3/blogs/${blogId}/publish`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) fetchBlogs(token!);
    } catch {
      alert("Failed to update publish status");
    }
  };

  const editBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title, content: blog.content, excerpt: blog.excerpt,
      category: blog.category, sub_category: blog.sub_category || "",
      tags: blog.tags, author: blog.author, author_avatar: blog.author_avatar || "",
      read_time: blog.read_time, meta_description: blog.meta_description || "",
      featured_image: blog.featured_image || "",
      references: blog.references || [], related_laws: blog.related_laws || []
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: "", content: "", excerpt: "", category: "Criminal Law", sub_category: "",
      tags: [], author: "", author_avatar: "", read_time: 5, meta_description: "",
      featured_image: "", references: [], related_laws: []
    });
    setTagInput(""); setRefInput(""); setLawInput("");
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const addReference = () => {
    if (refInput.trim() && !formData.references.includes(refInput.trim())) {
      setFormData({ ...formData, references: [...formData.references, refInput.trim()] });
      setRefInput("");
    }
  };

  const addRelatedLaw = () => {
    if (lawInput.trim() && !formData.related_laws.includes(lawInput.trim())) {
      setFormData({ ...formData, related_laws: [...formData.related_laws, lawInput.trim()] });
      setLawInput("");
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(blog => selectedCategory ? blog.category === selectedCategory : true);

  /* ── Login Screen ── */
  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-saffron mx-auto flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold mb-1">Admin Login</h2>
              <p className="text-muted-foreground text-sm">Enter your credentials to manage blogs</p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {loginError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Username</label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-base focus:outline-none focus:border-accent"
                  placeholder="Enter username"
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-base focus:outline-none focus:border-accent"
                  placeholder="Enter password"
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  autoComplete="current-password"
                />
              </div>
              <Button onClick={handleLogin} variant="hero" className="w-full py-3 text-base">
                Login
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  /* ── Main Admin UI ── */
  return (
    <Layout>
      <div className="container px-4 sm:px-6 py-6 sm:py-8 max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-primary truncate">Blog Management</h1>
            <p className="text-muted-foreground text-xs sm:text-sm hidden sm:block">Create, edit, and manage your legal blog posts</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button onClick={handleLogout} variant="outline" size="sm" className="px-2 sm:px-4">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Logout</span>
            </Button>
            <Button onClick={() => { resetForm(); setShowCreateModal(true); }} variant="hero" size="sm" className="px-3 sm:px-4">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">New Post</span>
            </Button>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="mb-5 space-y-2">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <button
              onClick={() => setShowFilters(v => !v)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2.5 border rounded-lg text-sm transition-colors shrink-0",
                showFilters ? "bg-accent text-accent-foreground border-accent" : "bg-secondary border-border"
              )}
            >
              <ChevronDown className={cn("h-4 w-4 transition-transform", showFilters && "rotate-180")} />
              Filter
            </button>
          </div>
          {showFilters && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
            >
              <option value="">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          )}
        </div>

        {/* Blog List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBlogs.map((blog) => (
              <div key={blog._id} className="bg-card rounded-2xl border border-border/60 p-4 sm:p-5 hover:border-accent/40 transition-all">
                {/* Top row: badges + actions */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex flex-wrap gap-1.5 min-w-0">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-accent/10 text-accent shrink-0">
                      {blog.category}
                    </span>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs shrink-0",
                      blog.is_published ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                    )}>
                      {blog.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                  {/* Action buttons - always visible, touch-friendly */}
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => togglePublish(blog._id, blog.is_published)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors touch-manipulation"
                      title={blog.is_published ? "Unpublish" : "Publish"}
                    >
                      {blog.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => editBlog(blog)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors touch-manipulation"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors touch-manipulation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-primary mb-1 line-clamp-2">{blog.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 line-clamp-2">{blog.excerpt}</p>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />{blog.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />{new Date(blog.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />{blog.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />{blog.read_time}m
                  </span>
                  {blog.tags?.length > 0 && (
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />{blog.tags.slice(0, 2).join(", ")}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground opacity-40" />
            <p className="text-muted-foreground text-sm mb-4">No blog posts found</p>
            <Button onClick={() => { resetForm(); setShowCreateModal(true); }} variant="outline" size="sm">
              Create your first blog post
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2.5 rounded-lg border border-border hover:bg-secondary disabled:opacity-40 touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm px-2">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2.5 rounded-lg border border-border hover:bg-secondary disabled:opacity-40 touch-manipulation"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* ── Create / Edit Modal ── */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center sm:p-4">
          {/* Sheet on mobile, centered modal on sm+ */}
          <div className="bg-card w-full sm:rounded-2xl sm:max-w-2xl rounded-t-2xl max-h-[92dvh] flex flex-col">

            {/* Sticky header */}
            <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-border/60 shrink-0">
              <h2 className="text-lg sm:text-xl font-display font-semibold">
                {showCreateModal ? "New Blog Post" : "Edit Blog Post"}
              </h2>
              <button
                onClick={() => { setShowCreateModal(false); setShowEditModal(false); resetForm(); }}
                className="p-2 hover:bg-secondary rounded-lg touch-manipulation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-4 space-y-5">

              {/* Title */}
              <div>
                <label className="text-sm font-medium mb-1 block">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  placeholder="Enter blog title"
                />
              </div>

              {/* Category + Sub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Sub Category</label>
                  <input
                    type="text"
                    value={formData.sub_category}
                    onChange={(e) => setFormData({ ...formData, sub_category: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    placeholder="e.g., Criminal Procedure"
                  />
                </div>
              </div>

              {/* Author + Read time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Author *</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Read Time (min)</label>
                  <input
                    type="number"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    min={1}
                  />
                </div>
              </div>

              {/* Meta */}
              <div>
                <label className="text-sm font-medium mb-1 block">Meta Description (SEO)</label>
                <textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  rows={2}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none"
                  placeholder="150–160 characters for SEO"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="text-sm font-medium mb-1 block">Excerpt *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none"
                  placeholder="Short summary shown in listings"
                />
              </div>

              {/* Tags */}
              <TagField
                label="Tags"
                items={formData.tags}
                input={tagInput}
                setInput={setTagInput}
                onAdd={addTag}
                onRemove={(t) => setFormData({ ...formData, tags: formData.tags.filter(x => x !== t) })}
                placeholder="e.g., driving license, RTO"
              />

              {/* References */}
              <TagField
                label="References"
                items={formData.references}
                input={refInput}
                setInput={setRefInput}
                onAdd={addReference}
                onRemove={(r) => setFormData({ ...formData, references: formData.references.filter(x => x !== r) })}
                placeholder="e.g., Supreme Court case, Act"
              />

              {/* Related Laws */}
              <TagField
                label="Related Laws"
                items={formData.related_laws}
                input={lawInput}
                setInput={setLawInput}
                onAdd={addRelatedLaw}
                onRemove={(l) => setFormData({ ...formData, related_laws: formData.related_laws.filter(x => x !== l) })}
                placeholder="e.g., Motor Vehicles Act, 1988"
              />

              {/* Content */}
              <div>
                <label className="text-sm font-medium mb-1 block">Content * (Markdown supported)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:border-accent resize-y"
                  placeholder={"# Heading\n\n## Subheading\n\nParagraph with **bold** and *italic*.\n\n- List item 1\n- List item 2"}
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="text-sm font-medium mb-1 block">Featured Image URL</label>
                <input
                  type="url"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Sticky footer actions */}
            <div className="px-4 sm:px-6 py-4 border-t border-border/60 flex gap-3 shrink-0">
              <Button
                onClick={() => { setShowCreateModal(false); setShowEditModal(false); resetForm(); }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={showCreateModal ? createBlog : updateBlog}
                disabled={saving || !formData.title || !formData.content || !formData.author}
                variant="hero"
                className="flex-1"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {showCreateModal ? "Publish" : "Save Changes"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

/* ── Reusable tag-input field ── */
interface TagFieldProps {
  label: string;
  items: string[];
  input: string;
  setInput: (v: string) => void;
  onAdd: () => void;
  onRemove: (v: string) => void;
  placeholder?: string;
}

const TagField = ({ label, items, input, setInput, onAdd, onRemove, placeholder }: TagFieldProps) => (
  <div>
    <label className="text-sm font-medium mb-1 block">{label}</label>
    <div className="flex gap-2 mb-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onAdd()}
        className="flex-1 bg-secondary border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent"
        placeholder={placeholder}
      />
      <button
        onClick={onAdd}
        className="px-4 py-2 bg-accent rounded-lg hover:bg-accent/80 text-sm font-medium touch-manipulation shrink-0"
      >
        Add
      </button>
    </div>
    {items.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="px-2.5 py-1 bg-secondary rounded-full text-xs flex items-center gap-1 max-w-full">
            <span className="truncate">{item}</span>
            <button
              onClick={() => onRemove(item)}
              className="hover:text-red-400 ml-0.5 shrink-0 touch-manipulation"
            >×</button>
          </span>
        ))}
      </div>
    )}
  </div>
);

export default AdminBlogs;