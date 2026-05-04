// import { useState, useRef, useEffect } from "react";
// import {
//   Send,
//   Sparkles,
//   Plus,
//   MessageSquare,
//   BookOpen,
//   Scale,
//   Gavel,
//   ShieldAlert,
//   Trash2,
//   AlertTriangle,
//   CheckCircle2,
//   FileText,
//   ChevronDown,
//   ChevronUp,
//   Globe,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Layout } from "@/components/Layout";
// import { cn } from "@/lib/utils";

// // ─── Types ────────────────────────────────────────────────────────────────────
// type Msg = { role: "user" | "ai"; content: string; analysis?: AnalysisResult };

// interface ApplicableLaw {
//   name: string;
//   section: string;
//   description: string;
//   jurisdiction: string;
// }

// interface Consequence {
//   type: string;
//   description: string;
//   severity: "Minor" | "Moderate" | "Severe" | "Critical";
//   penalty: string;
// }

// interface Recommendation {
//   action: string;
//   priority: "Immediate" | "Short-term" | "Long-term";
//   description: string;
// }

// interface AnalysisResult {
//   applicable_laws?: ApplicableLaw[];
//   consequences?: Consequence[];
//   recommendations?: Recommendation[];
//   severity?: "Low" | "Medium" | "High" | "Critical";
//   summary?: string;
//   disclaimer?: string;
//   is_legal_query?: boolean;
//   classification_reason?: string;
//   message?: string;
//   type?: string;
// }

// interface ChatSession {
//   id: string;
//   title: string;
//   createdAt: number;
//   updatedAt: number;
//   messages: Msg[];
//   jurisdiction: string;
// }

// // ─── Config ───────────────────────────────────────────────────────────────────
// const API_BASE = "https://nyaya-backend-muktha.onrender.com"

// const VALID_JURISDICTIONS = [
//   "India", "United States", "United Kingdom",
//   "Australia", "Canada", "European Union", "Singapore", "UAE",
// ];

// const suggested = [
//   "What are my rights during a police arrest in India?",
//   "My landlord is refusing to return my security deposit",
//   "I received a fake job offer and lost money — what can I do?",
//   "My employer hasn't paid my salary for 3 months",
// ];

// // Storage keys
// const STORAGE_KEYS = {
//   CHAT_SESSIONS: "nyayaai_chat_sessions",
//   CURRENT_SESSION: "nyayaai_current_session",
//   JURISDICTION: "nyayaai_jurisdiction",
//   API_KEY: "nyayaai_api_key",
// };

// // ─── Severity helpers ─────────────────────────────────────────────────────────
// const severityColors: Record<string, string> = {
//   Low:      "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
//   Medium:   "bg-amber-500/15  text-amber-400  border-amber-500/30",
//   High:     "bg-orange-500/15 text-orange-400 border-orange-500/30",
//   Critical: "bg-red-500/15    text-red-400    border-red-500/30",
//   Minor:    "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
//   Moderate: "bg-amber-500/15  text-amber-400  border-amber-500/30",
//   Severe:   "bg-orange-500/15 text-orange-400 border-orange-500/30",
// };

// const priorityColors: Record<string, string> = {
//   Immediate:   "text-red-400",
//   "Short-term": "text-amber-400",
//   "Long-term":  "text-emerald-400",
// };

// // ─── Sub-components ───────────────────────────────────────────────────────────
// const Badge = ({ label }: { label: string }) => (
//   <span className={cn(
//     "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border",
//     severityColors[label] ?? "bg-secondary text-muted-foreground border-border"
//   )}>
//     {label}
//   </span>
// );

// const Section = ({
//   title,
//   icon: Icon,
//   children,
// }: {
//   title: string;
//   icon: React.ElementType;
//   children: React.ReactNode;
// }) => {
//   const [open, setOpen] = useState(true);
//   return (
//     <div className="border border-border/60 rounded-xl overflow-hidden">
//       <button
//         onClick={() => setOpen((o) => !o)}
//         className="w-full flex items-center justify-between px-4 py-3 bg-secondary/50 hover:bg-secondary transition-colors"
//       >
//         <span className="flex items-center gap-2 text-sm font-semibold">
//           <Icon className="h-4 w-4 text-accent" />
//           {title}
//         </span>
//         {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
//       </button>
//       {open && <div className="divide-y divide-border/40">{children}</div>}
//     </div>
//   );
// };

// const AnalysisCard = ({ data }: { data: AnalysisResult }) => {
//   // Handle non-legal query responses
//   if (data.is_legal_query === false) {
//     return (
//       <div className="mt-3 space-y-3 text-sm">
//         <div className="flex items-start gap-3 px-4 py-3 bg-amber-500/10 rounded-xl border border-amber-500/30">
//           <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
//           <div className="flex-1">
//             <p className="text-amber-400 text-sm font-medium mb-1">Not a legal query</p>
//             <p className="text-muted-foreground text-xs whitespace-pre-wrap">{data.message || data.summary}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Handle legal query responses
//   return (
//     <div className="mt-3 space-y-3 text-sm">
//       {/* Overall severity */}
//       {data.severity && (
//         <div className="flex items-center gap-3 px-4 py-3 bg-secondary/40 rounded-xl border border-border/60">
//           <AlertTriangle className="h-4 w-4 shrink-0 text-muted-foreground" />
//           <span className="text-muted-foreground">Overall severity</span>
//           <Badge label={data.severity} />
//         </div>
//       )}

//       {/* Applicable Laws */}
//       {data.applicable_laws && data.applicable_laws.length > 0 && (
//         <Section title={`Applicable Laws (${data.applicable_laws.length})`} icon={FileText}>
//           {data.applicable_laws.map((law, i) => (
//             <div key={i} className="px-4 py-3 space-y-1">
//               <div className="flex items-start justify-between gap-2">
//                 <span className="font-medium">{law.name}</span>
//                 <span className="text-[11px] text-muted-foreground whitespace-nowrap">{law.section}</span>
//               </div>
//               <p className="text-muted-foreground text-xs leading-relaxed">{law.description}</p>
//               <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
//                 <Globe className="h-3 w-3" />
//                 {law.jurisdiction}
//               </div>
//             </div>
//           ))}
//         </Section>
//       )}

//       {/* Consequences */}
//       {data.consequences && data.consequences.length > 0 && (
//         <Section title={`Consequences (${data.consequences.length})`} icon={AlertTriangle}>
//           {data.consequences.map((c, i) => (
//             <div key={i} className="px-4 py-3 space-y-1">
//               <div className="flex items-center gap-2">
//                 <span className="font-medium">{c.type}</span>
//                 <Badge label={c.severity} />
//               </div>
//               <p className="text-muted-foreground text-xs leading-relaxed">{c.description}</p>
//               <p className="text-xs font-medium">Penalty: <span className="text-muted-foreground font-normal">{c.penalty}</span></p>
//             </div>
//           ))}
//         </Section>
//       )}

//       {/* Recommendations */}
//       {data.recommendations && data.recommendations.length > 0 && (
//         <Section title={`Recommendations (${data.recommendations.length})`} icon={CheckCircle2}>
//           {data.recommendations.map((r, i) => (
//             <div key={i} className="px-4 py-3 space-y-1">
//               <div className="flex items-center gap-2">
//                 <span className="font-medium">{r.action}</span>
//                 <span className={cn("text-[10px] font-semibold uppercase", priorityColors[r.priority])}>
//                   {r.priority}
//                 </span>
//               </div>
//               <p className="text-muted-foreground text-xs leading-relaxed">{r.description}</p>
//             </div>
//           ))}
//         </Section>
//       )}

//       {/* Disclaimer */}
//       {data.disclaimer && (
//         <p className="text-[10px] text-muted-foreground px-1 leading-relaxed">
//           ⚖️ {data.disclaimer}
//         </p>
//       )}
//     </div>
//   );
// };

// const Bubble = ({ msg }: { msg: Msg }) => (
//   <div className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
//     <div
//       className={cn(
//         "max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
//         msg.role === "user"
//           ? "bg-primary text-primary-foreground rounded-br-sm"
//           : "bg-secondary rounded-bl-sm"
//       )}
//     >
//       {msg.content}
//     </div>
//   </div>
// );

// // ─── Main Chat Component ──────────────────────────────────────────────────────
// const Chat = () => {
//   const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
//   const [sessions, setSessions] = useState<ChatSession[]>([]);
//   const [messages, setMessages] = useState<Msg[]>([
//     {
//       role: "ai",
//       content: "Namaste 🙏 I'm NyayaAI, your assistant for legal questions. Describe your situation and I'll identify the applicable laws, consequences, and what you should do next.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const [jurisdiction, setJurisdiction] = useState("India");
//   const [apiKey, setApiKey] = useState("");
//   const [showKeyInput, setShowKeyInput] = useState(false);
//   const [serverHasKey, setServerHasKey] = useState<boolean | null>(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const endRef = useRef<HTMLDivElement>(null);

//   // Load sessions from localStorage on mount
//   useEffect(() => {
//     const savedSessions = localStorage.getItem(STORAGE_KEYS.CHAT_SESSIONS);
//     const savedSessionId = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
//     const savedJurisdiction = localStorage.getItem(STORAGE_KEYS.JURISDICTION);
//     const savedApiKey = localStorage.getItem(STORAGE_KEYS.API_KEY);

//     if (savedSessions) {
//       const parsedSessions = JSON.parse(savedSessions);
//       setSessions(parsedSessions);
      
//       if (savedSessionId && parsedSessions.find((s: ChatSession) => s.id === savedSessionId)) {
//         setCurrentSessionId(savedSessionId);
//         const session = parsedSessions.find((s: ChatSession) => s.id === savedSessionId);
//         if (session) {
//           setMessages(session.messages);
//           setJurisdiction(session.jurisdiction);
//         }
//       }
//     }

//     if (savedJurisdiction) setJurisdiction(savedJurisdiction);
//     if (savedApiKey) setApiKey(savedApiKey);
//   }, []);

//   // Save sessions to localStorage whenever they change
//   useEffect(() => {
//     if (sessions.length > 0) {
//       localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(sessions));
//     }
//     if (currentSessionId) {
//       localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, currentSessionId);
//     }
//   }, [sessions, currentSessionId]);

//   // Save jurisdiction to localStorage
//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEYS.JURISDICTION, jurisdiction);
//   }, [jurisdiction]);

//   // Save API key to localStorage
//   useEffect(() => {
//     if (apiKey) {
//       localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
//     }
//   }, [apiKey]);

//   // Scroll to bottom on new messages
//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, typing]);

//   // Fetch server config once on mount
//   useEffect(() => {
//     fetch(`${API_BASE}/app1/config`)
//       .then((r) => r.json())
//       .then((cfg) => {
//         setServerHasKey(cfg.server_key_configured);
//         if (!cfg.server_key_configured && cfg.allow_user_api_key) {
//           setShowKeyInput(true);
//         }
//       })
//       .catch(() => {
//         setServerHasKey(false);
//         setShowKeyInput(true);
//       });
//   }, []);

//   const saveCurrentSession = () => {
//     if (!currentSessionId && messages.length === 0) return;
    
//     const sessionId = currentSessionId || generateSessionId();
//     const title = messages.length > 0 
//       ? messages[0].content.slice(0, 50) + (messages[0].content.length > 50 ? "..." : "")
//       : "New Chat";
    
//     const updatedSession: ChatSession = {
//       id: sessionId,
//       title,
//       createdAt: currentSessionId ? sessions.find(s => s.id === sessionId)?.createdAt || Date.now() : Date.now(),
//       updatedAt: Date.now(),
//       messages,
//       jurisdiction,
//     };
    
//     if (!currentSessionId) {
//       setCurrentSessionId(sessionId);
//       setSessions(prev => [updatedSession, ...prev]);
//     } else {
//       setSessions(prev => prev.map(s => s.id === sessionId ? updatedSession : s));
//     }
//   };

//   // Auto-save on message changes
//   useEffect(() => {
//     if (messages.length > 0 && messages.length > 1) { // Don't save initial greeting
//       saveCurrentSession();
//     }
//   }, [messages]);

//   const generateSessionId = () => {
//     return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
//   };

//   const loadSession = (sessionId: string) => {
//     const session = sessions.find(s => s.id === sessionId);
//     if (session) {
//       setCurrentSessionId(session.id);
//       setMessages(session.messages);
//       setJurisdiction(session.jurisdiction);
//     }
//   };

//   const newChat = () => {
//     setCurrentSessionId(null);
//     setMessages([{
//       role: "ai",
//       content: "Namaste 🙏 I'm NyayaAI, your assistant for legal questions. Describe your situation and I'll identify the applicable laws, consequences, and what you should do next.",
//     }]);
//   };

//   const deleteSession = (sessionId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     const updatedSessions = sessions.filter(s => s.id !== sessionId);
//     setSessions(updatedSessions);
    
//     if (currentSessionId === sessionId) {
//       if (updatedSessions.length > 0) {
//         loadSession(updatedSessions[0].id);
//       } else {
//         newChat();
//       }
//     }
//   };

//   const send = async (text: string, isFollowUp: boolean = false) => {
//     if (!text.trim()) return;

//     const userMessage: Msg = { role: "user", content: text };
    
//     // Prepare conversation history for follow-ups
//     let conversationHistory = null;
//     if (isFollowUp && messages.length > 0) {
//       // Convert messages to the format expected by the API
//       conversationHistory = messages.map(m => ({
//         role: m.role === "ai" ? "assistant" : "user",
//         content: m.content
//       }));
//     }
    
//     const requestBody: any = {
//       scenario: text,
//       jurisdiction,
//     };
    
//     if (apiKey.trim()) requestBody.api_key = apiKey.trim();
//     if (conversationHistory) requestBody.conversation_history = conversationHistory;
    
//     setMessages(prev => [...prev, userMessage]);
//     setInput("");
//     setTyping(true);

//     try {
//       const res = await fetch(`${API_BASE}/app1/analyze`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(requestBody),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.detail || "Analysis failed");
//       }

//       const data = await res.json();
      
//       // Handle both legal and non-legal responses
//       let aiResponse = "";
//       let analysisData: AnalysisResult = {};
      
//       if (data.is_legal_query === false) {
//         // Non-legal query response
//         aiResponse = data.message || data.summary || "I'm here to help with legal questions. Please describe a legal situation you need help with.";
//         analysisData = data;
//       } else {
//         // Legal query response
//         aiResponse = data.summary || "Analysis complete. See details below.";
//         analysisData = data;
//       }

//       const aiMessage: Msg = {
//         role: "ai",
//         content: aiResponse,
//         analysis: analysisData,
//       };

//       setMessages(prev => [...prev, aiMessage]);
//     } catch (error: any) {
//       console.error("Error:", error);
//       setMessages(prev => [
//         ...prev,
//         { role: "ai", content: `⚠️ ${error.message ?? "Something went wrong. Please try again."}` },
//       ]);
//     } finally {
//       setTyping(false);
//     }
//   };

//   // Follow-up question handler
//   const askFollowUp = (question: string) => {
//     send(question, true);
//   };

//   return (
//     <Layout hideFooter>
//       <div className="container py-6">
//         <div className="grid lg:grid-cols-[300px_1fr] gap-6 h-[calc(100vh-7rem)]">

//           {/* ── Sidebar ── */}
//           <aside className={cn(
//             "flex flex-col bg-card rounded-2xl border border-border/60 p-4 overflow-hidden transition-all",
//             !sidebarOpen && "hidden lg:flex lg:w-16"
//           )}>
//             <div className="flex items-center justify-between mb-5">
//               <Button variant="hero" className="flex-1" onClick={newChat}>
//                 <Plus className="h-4 w-4 mr-2" /> New chat
//               </Button>
//               <button 
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//                 className="lg:hidden ml-2 p-2 hover:bg-secondary rounded-lg"
//               >
//                 <ChevronDown className="h-4 w-4" />
//               </button>
//             </div>

//             {/* Jurisdiction selector */}
//             <div className="mb-4">
//               <label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground px-2 block mb-1">
//                 Jurisdiction
//               </label>
//               <select
//                 value={jurisdiction}
//                 onChange={(e) => setJurisdiction(e.target.value)}
//                 className="w-full text-sm bg-secondary border border-border rounded-lg px-3 py-2 text-foreground"
//               >
//                 {VALID_JURISDICTIONS.map((j) => (
//                   <option key={j} value={j}>{j}</option>
//                 ))}
//               </select>
//             </div>

//             {/* API key input */}
//             {showKeyInput && (
//               <div className="mb-4">
//                 <label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground px-2 block mb-1">
//                   Mistral API Key
//                 </label>
//                 <input
//                   type="password"
//                   value={apiKey}
//                   onChange={(e) => setApiKey(e.target.value)}
//                   placeholder="sk-..."
//                   className="w-full text-sm bg-secondary border border-border rounded-lg px-3 py-2 text-foreground"
//                 />
//               </div>
//             )}

//             {/* Chat History */}
//             <div className="flex-1 overflow-y-auto">
//               <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2 px-2">
//                 Chat History ({sessions.length})
//               </div>
//               <div className="space-y-1">
//                 {sessions.map((session) => (
//                   <button
//                     key={session.id}
//                     onClick={() => loadSession(session.id)}
//                     className={cn(
//                       "w-full text-left px-3 py-2.5 rounded-lg hover:bg-secondary group transition-colors",
//                       currentSessionId === session.id && "bg-secondary"
//                     )}
//                   >
//                     <div className="flex items-center gap-2">
//                       <MessageSquare className="h-3.5 w-3.5 shrink-0" />
//                       <div className="flex-1 min-w-0">
//                         <div className="text-sm truncate">{session.title}</div>
//                         <div className="text-[10px] text-muted-foreground">
//                           {new Date(session.updatedAt).toLocaleDateString()} • {session.messages.length} msgs
//                         </div>
//                       </div>
//                       <Trash2 
//                         onClick={(e) => deleteSession(session.id, e)}
//                         className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all shrink-0"
//                       />
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-auto pt-4 text-[11px] text-muted-foreground bg-accent-soft rounded-xl p-3">
//               <ShieldAlert className="h-3.5 w-3.5 inline mr-1" />
//               AI provides general legal guidance only.
//             </div>
//           </aside>

//           {/* ── Chat panel ── */}
//           <div className="flex flex-col bg-card rounded-2xl border overflow-hidden">

//             {/* Header */}
//             <div className="px-6 py-4 border-b flex items-center gap-3">
//               <button 
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//                 className="lg:hidden p-2 hover:bg-secondary rounded-lg"
//               >
//                 <MessageSquare className="h-4 w-4" />
//               </button>
//               <div className="h-9 w-9 rounded-full bg-gradient-saffron grid place-items-center">
//                 <Sparkles className="h-4 w-4" />
//               </div>
//               <div>
//                 <div className="font-semibold">NyayaAI</div>
//                 <div className="text-xs text-muted-foreground">
//                   Online · {jurisdiction} legal framework
//                 </div>
//               </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-5">
//               {messages.map((m, i) => (
//                 <div key={i}>
//                   <Bubble msg={m} />
//                   {/* Render analysis card directly after the corresponding AI reply */}
//                   {m.role === "ai" && m.analysis && (
//                     <div className="mt-2 max-w-[90%]">
//                       <AnalysisCard data={m.analysis} />
//                     </div>
//                   )}
//                 </div>
//               ))}

//               {typing && (
//                 <div className="flex">
//                   <div className="bg-secondary rounded-2xl px-4 py-3 text-sm text-muted-foreground animate-pulse">
//                     Analysing your scenario…
//                   </div>
//                 </div>
//               )}

//               {/* Suggested prompts — show only when no real conversation yet */}
//               {messages.length === 1 && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
//                   {suggested.map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => send(s)}
//                       className="text-left text-xs px-3 py-2.5 rounded-xl border border-border/60 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* Follow-up suggestions for the last AI response */}
//               {messages.length > 0 && messages[messages.length - 1].role === "ai" && 
//                messages[messages.length - 1].analysis?.is_legal_query !== false &&
//                messages[messages.length - 1].analysis?.applicable_laws && (
//                 <div className="pt-2">
//                   <div className="text-xs text-muted-foreground mb-2">Follow-up questions you can ask:</div>
//                   <div className="flex flex-wrap gap-2">
//                     <button
//                       onClick={() => askFollowUp("What evidence do I need to prove this?")}
//                       className="text-xs px-3 py-1.5 rounded-full border border-border/60 hover:bg-secondary transition-colors"
//                     >
//                       📋 What evidence do I need?
//                     </button>
//                     <button
//                       onClick={() => askFollowUp("How long will this process take?")}
//                       className="text-xs px-3 py-1.5 rounded-full border border-border/60 hover:bg-secondary transition-colors"
//                     >
//                       ⏱️ How long will this take?
//                     </button>
//                     <button
//                       onClick={() => askFollowUp("Should I hire a lawyer immediately?")}
//                       className="text-xs px-3 py-1.5 rounded-full border border-border/60 hover:bg-secondary transition-colors"
//                     >
//                       ⚖️ Should I hire a lawyer?
//                     </button>
//                     <button
//                       onClick={() => askFollowUp("What are my chances of winning?")}
//                       className="text-xs px-3 py-1.5 rounded-full border border-border/60 hover:bg-secondary transition-colors"
//                     >
//                       🎯 What are my chances?
//                     </button>
//                   </div>
//                 </div>
//               )}

//               <div ref={endRef} />
//             </div>

//             {/* Input */}
//             <div className="border-t p-4">
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   send(input);
//                 }}
//                 className="flex items-center gap-2"
//               >
//                 <input
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   placeholder="Describe your legal situation or ask a follow-up question…"
//                   className="flex-1 bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
//                   disabled={typing}
//                 />
//                 <Button type="submit" disabled={typing || !input.trim()}>
//                   <Send className="h-4 w-4" />
//                 </Button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Chat;

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  Plus,
  MessageSquare,
  Scale,
  Gavel,
  ShieldAlert,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ChevronDown,
  ChevronUp,
  Globe,
  X,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type Msg = { role: "user" | "ai"; content: string; analysis?: AnalysisResult };

interface ApplicableLaw {
  name: string;
  section: string;
  description: string;
  jurisdiction: string;
}

interface Consequence {
  type: string;
  description: string;
  severity: "Minor" | "Moderate" | "Severe" | "Critical";
  penalty: string;
}

interface Recommendation {
  action: string;
  priority: "Immediate" | "Short-term" | "Long-term";
  description: string;
}

interface AnalysisResult {
  applicable_laws?: ApplicableLaw[];
  consequences?: Consequence[];
  recommendations?: Recommendation[];
  severity?: "Low" | "Medium" | "High" | "Critical";
  summary?: string;
  disclaimer?: string;
  is_legal_query?: boolean;
  classification_reason?: string;
  message?: string;
  type?: string;
}

interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: Msg[];
  jurisdiction: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────
const API_BASE = "https://nyaya-backend-muktha.onrender.com";

const VALID_JURISDICTIONS = [
  "India", "United States", "United Kingdom",
  "Australia", "Canada", "European Union", "Singapore", "UAE",
];

const suggested = [
  "What are my rights during a police arrest in India?",
  "My landlord is refusing to return my security deposit",
  "I received a fake job offer and lost money — what can I do?",
  "My employer hasn't paid my salary for 3 months",
];

const STORAGE_KEYS = {
  CHAT_SESSIONS: "nyayaai_chat_sessions",
  CURRENT_SESSION: "nyayaai_current_session",
  JURISDICTION: "nyayaai_jurisdiction",
  API_KEY: "nyayaai_api_key",
};

// ─── Severity helpers ─────────────────────────────────────────────────────────
const severityColors: Record<string, string> = {
  Low:      "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Medium:   "bg-amber-500/15  text-amber-400  border-amber-500/30",
  High:     "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Critical: "bg-red-500/15    text-red-400    border-red-500/30",
  Minor:    "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Moderate: "bg-amber-500/15  text-amber-400  border-amber-500/30",
  Severe:   "bg-orange-500/15 text-orange-400 border-orange-500/30",
};

const priorityColors: Record<string, string> = {
  Immediate:    "text-red-400",
  "Short-term": "text-amber-400",
  "Long-term":  "text-emerald-400",
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const Badge = ({ label }: { label: string }) => (
  <span className={cn(
    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border",
    severityColors[label] ?? "bg-secondary text-muted-foreground border-border"
  )}>
    {label}
  </span>
);

const Section = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-border/60 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-secondary/50 hover:bg-secondary transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Icon className="h-4 w-4 text-accent" />
          {title}
        </span>
        {open
          ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
          : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
      </button>
      {open && <div className="divide-y divide-border/40">{children}</div>}
    </div>
  );
};

const AnalysisCard = ({ data }: { data: AnalysisResult }) => {
  if (data.is_legal_query === false) {
    return (
      <div className="mt-3 space-y-3 text-sm">
        <div className="flex items-start gap-3 px-4 py-3 bg-amber-500/10 rounded-xl border border-amber-500/30">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-amber-400 text-sm font-medium mb-1">Not a legal query</p>
            <p className="text-muted-foreground text-xs whitespace-pre-wrap">{data.message || data.summary}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-3 text-sm">
      {data.severity && (
        <div className="flex items-center gap-3 px-4 py-3 bg-secondary/40 rounded-xl border border-border/60">
          <AlertTriangle className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">Overall severity</span>
          <Badge label={data.severity} />
        </div>
      )}

      {data.applicable_laws && data.applicable_laws.length > 0 && (
        <Section title={`Applicable Laws (${data.applicable_laws.length})`} icon={FileText}>
          {data.applicable_laws.map((law, i) => (
            <div key={i} className="px-4 py-3 space-y-1">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <span className="font-medium">{law.name}</span>
                <span className="text-[11px] text-muted-foreground">{law.section}</span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">{law.description}</p>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Globe className="h-3 w-3" />
                {law.jurisdiction}
              </div>
            </div>
          ))}
        </Section>
      )}

      {data.consequences && data.consequences.length > 0 && (
        <Section title={`Consequences (${data.consequences.length})`} icon={AlertTriangle}>
          {data.consequences.map((c, i) => (
            <div key={i} className="px-4 py-3 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">{c.type}</span>
                <Badge label={c.severity} />
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">{c.description}</p>
              <p className="text-xs font-medium">Penalty: <span className="text-muted-foreground font-normal">{c.penalty}</span></p>
            </div>
          ))}
        </Section>
      )}

      {data.recommendations && data.recommendations.length > 0 && (
        <Section title={`Recommendations (${data.recommendations.length})`} icon={CheckCircle2}>
          {data.recommendations.map((r, i) => (
            <div key={i} className="px-4 py-3 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">{r.action}</span>
                <span className={cn("text-[10px] font-semibold uppercase", priorityColors[r.priority])}>
                  {r.priority}
                </span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">{r.description}</p>
            </div>
          ))}
        </Section>
      )}

      {data.disclaimer && (
        <p className="text-[10px] text-muted-foreground px-1 leading-relaxed">
          ⚖️ {data.disclaimer}
        </p>
      )}
    </div>
  );
};

const Bubble = ({ msg }: { msg: Msg }) => (
  <div className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
    <div
      className={cn(
        // On mobile allow up to 90% width; on larger screens cap at 78%
        "max-w-[90%] sm:max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
        msg.role === "user"
          ? "bg-primary text-primary-foreground rounded-br-sm"
          : "bg-secondary rounded-bl-sm"
      )}
    >
      {msg.content}
    </div>
  </div>
);

// ─── Sidebar (shared between drawer on mobile and panel on desktop) ─────────
const SidebarContent = ({
  sessions,
  currentSessionId,
  jurisdiction,
  setJurisdiction,
  showKeyInput,
  apiKey,
  setApiKey,
  newChat,
  loadSession,
  deleteSession,
  onClose,
}: {
  sessions: ChatSession[];
  currentSessionId: string | null;
  jurisdiction: string;
  setJurisdiction: (j: string) => void;
  showKeyInput: boolean;
  apiKey: string;
  setApiKey: (k: string) => void;
  newChat: () => void;
  loadSession: (id: string) => void;
  deleteSession: (id: string, e: React.MouseEvent) => void;
  onClose?: () => void;
}) => (
  <div className="flex flex-col h-full p-4">
    {/* Header row */}
    <div className="flex items-center justify-between mb-5">
      <Button
        variant="hero"
        className="flex-1"
        onClick={() => { newChat(); onClose?.(); }}
      >
        <Plus className="h-4 w-4 mr-2" /> New chat
      </Button>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 p-2 hover:bg-secondary rounded-lg transition-colors"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>

    {/* Jurisdiction */}
    <div className="mb-4">
      <label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground px-2 block mb-1">
        Jurisdiction
      </label>
      <select
        value={jurisdiction}
        onChange={(e) => setJurisdiction(e.target.value)}
        className="w-full text-sm bg-secondary border border-border rounded-lg px-3 py-2 text-foreground"
      >
        {VALID_JURISDICTIONS.map((j) => (
          <option key={j} value={j}>{j}</option>
        ))}
      </select>
    </div>

    {/* API key */}
    {showKeyInput && (
      <div className="mb-4">
        <label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground px-2 block mb-1">
          Mistral API Key
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          className="w-full text-sm bg-secondary border border-border rounded-lg px-3 py-2 text-foreground"
        />
      </div>
    )}

    {/* Chat History */}
    <div className="flex-1 overflow-y-auto min-h-0">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2 px-2">
        Chat History ({sessions.length})
      </div>
      <div className="space-y-1">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => { loadSession(session.id); onClose?.(); }}
            className={cn(
              "w-full text-left px-3 py-2.5 rounded-lg hover:bg-secondary group transition-colors",
              currentSessionId === session.id && "bg-secondary"
            )}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{session.title}</div>
                <div className="text-[10px] text-muted-foreground">
                  {new Date(session.updatedAt).toLocaleDateString()} · {session.messages.length} msgs
                </div>
              </div>
              <Trash2
                onClick={(e) => deleteSession(session.id, e)}
                className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all shrink-0"
              />
            </div>
          </button>
        ))}
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-border/40 text-[11px] text-muted-foreground bg-accent-soft rounded-xl p-3">
      <ShieldAlert className="h-3.5 w-3.5 inline mr-1" />
      AI provides general legal guidance only.
    </div>
  </div>
);

// ─── Main Chat Component ──────────────────────────────────────────────────────
const Chat = () => {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      content:
        "Namaste 🙏 I'm NyayaAI, your assistant for legal questions. Describe your situation and I'll identify the applicable laws, consequences, and what you should do next.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [jurisdiction, setJurisdiction] = useState("India");
  const [apiKey, setApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile drawer

  const endRef = useRef<HTMLDivElement>(null);

  // ── Persistence ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const savedSessions = localStorage.getItem(STORAGE_KEYS.CHAT_SESSIONS);
    const savedSessionId = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
    const savedJurisdiction = localStorage.getItem(STORAGE_KEYS.JURISDICTION);
    const savedApiKey = localStorage.getItem(STORAGE_KEYS.API_KEY);

    if (savedSessions) {
      const parsedSessions: ChatSession[] = JSON.parse(savedSessions);
      setSessions(parsedSessions);
      if (savedSessionId) {
        const session = parsedSessions.find((s) => s.id === savedSessionId);
        if (session) {
          setCurrentSessionId(session.id);
          setMessages(session.messages);
          setJurisdiction(session.jurisdiction);
        }
      }
    }
    if (savedJurisdiction) setJurisdiction(savedJurisdiction);
    if (savedApiKey) setApiKey(savedApiKey);
  }, []);

  useEffect(() => {
    if (sessions.length > 0)
      localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(sessions));
    if (currentSessionId)
      localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, currentSessionId);
  }, [sessions, currentSessionId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JURISDICTION, jurisdiction);
  }, [jurisdiction]);

  useEffect(() => {
    if (apiKey) localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
  }, [apiKey]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    fetch(`${API_BASE}/app1/config`)
      .then((r) => r.json())
      .then((cfg) => {
        if (!cfg.server_key_configured && cfg.allow_user_api_key) setShowKeyInput(true);
      })
      .catch(() => setShowKeyInput(true));
  }, []);

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  // ── Session helpers ───────────────────────────────────────────────────────────
  const generateSessionId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const saveCurrentSession = () => {
    if (!currentSessionId && messages.length === 0) return;
    const sessionId = currentSessionId || generateSessionId();
    const firstUserMsg = messages.find((m) => m.role === "user");
    const title = firstUserMsg
      ? firstUserMsg.content.slice(0, 50) + (firstUserMsg.content.length > 50 ? "…" : "")
      : "New Chat";
    const updatedSession: ChatSession = {
      id: sessionId,
      title,
      createdAt: sessions.find((s) => s.id === sessionId)?.createdAt ?? Date.now(),
      updatedAt: Date.now(),
      messages,
      jurisdiction,
    };
    if (!currentSessionId) {
      setCurrentSessionId(sessionId);
      setSessions((prev) => [updatedSession, ...prev]);
    } else {
      setSessions((prev) => prev.map((s) => (s.id === sessionId ? updatedSession : s)));
    }
  };

  useEffect(() => {
    if (messages.length > 1) saveCurrentSession();
  }, [messages]);

  const loadSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setCurrentSessionId(session.id);
      setMessages(session.messages);
      setJurisdiction(session.jurisdiction);
    }
  };

  const newChat = () => {
    setCurrentSessionId(null);
    setMessages([
      {
        role: "ai",
        content:
          "Namaste 🙏 I'm NyayaAI, your assistant for legal questions. Describe your situation and I'll identify the applicable laws, consequences, and what you should do next.",
      },
    ]);
  };

  const deleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = sessions.filter((s) => s.id !== sessionId);
    setSessions(updated);
    if (currentSessionId === sessionId) {
      if (updated.length > 0) loadSession(updated[0].id);
      else newChat();
    }
  };

  // ── Send ──────────────────────────────────────────────────────────────────────
  const send = async (text: string, isFollowUp = false) => {
    if (!text.trim()) return;

    const userMessage: Msg = { role: "user", content: text };
    let conversationHistory = null;
    if (isFollowUp && messages.length > 0) {
      conversationHistory = messages.map((m) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.content,
      }));
    }
    const requestBody: Record<string, unknown> = { scenario: text, jurisdiction };
    if (apiKey.trim()) requestBody.api_key = apiKey.trim();
    if (conversationHistory) requestBody.conversation_history = conversationHistory;

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch(`${API_BASE}/app1/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Analysis failed");
      }
      const data: AnalysisResult = await res.json();
      const aiResponse =
        data.is_legal_query === false
          ? data.message || data.summary || "I'm here to help with legal questions."
          : data.summary || "Analysis complete. See details below.";
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: aiResponse, analysis: data },
      ]);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Something went wrong.";
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: `⚠️ ${msg}` },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const askFollowUp = (question: string) => send(question, true);

  const lastMsg = messages[messages.length - 1];
  const showFollowUps =
    lastMsg?.role === "ai" &&
    lastMsg.analysis?.is_legal_query !== false &&
    lastMsg.analysis?.applicable_laws;

  const sidebarProps = {
    sessions,
    currentSessionId,
    jurisdiction,
    setJurisdiction,
    showKeyInput,
    apiKey,
    setApiKey,
    newChat,
    loadSession,
    deleteSession,
  };

  return (
    <Layout hideFooter>
      {/* ── Mobile backdrop ── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[300px] bg-card border-r border-border/60 shadow-2xl transition-transform duration-300 lg:hidden",
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent
          {...sidebarProps}
          onClose={() => setDrawerOpen(false)}
        />
      </aside>

      <div className="container py-4 md:py-6">
        {/* ── Grid: sidebar (desktop) + chat ── */}
        <div className="flex lg:grid lg:grid-cols-[300px_1fr] gap-4 md:gap-6 h-[calc(100dvh-5.5rem)] md:h-[calc(100vh-7rem)]">

          {/* ── Desktop sidebar ── */}
          <aside className="hidden lg:flex flex-col bg-card rounded-2xl border border-border/60 overflow-hidden">
            <SidebarContent {...sidebarProps} />
          </aside>

          {/* ── Chat panel ── */}
          <div className="flex flex-col flex-1 bg-card rounded-2xl border overflow-hidden min-w-0">

            {/* Header */}
            <div className="px-4 md:px-6 py-3 md:py-4 border-b flex items-center gap-3 shrink-0">
              {/* Hamburger — mobile only */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden p-2 -ml-1 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-gradient-saffron grid place-items-center shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold leading-tight">NyayaAI</div>
                <div className="text-xs text-muted-foreground truncate">
                  Online · {jurisdiction} legal framework
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 md:px-8 py-4 md:py-6 space-y-4 md:space-y-5">
              {messages.map((m, i) => (
                <div key={i}>
                  <Bubble msg={m} />
                  {m.role === "ai" && m.analysis && (
                    <div className="mt-2 max-w-[95%] sm:max-w-[90%]">
                      <AnalysisCard data={m.analysis} />
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex">
                  <div className="bg-secondary rounded-2xl px-4 py-3 text-sm text-muted-foreground animate-pulse">
                    Analysing your scenario…
                  </div>
                </div>
              )}

              {/* Suggested prompts */}
              {messages.length === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {suggested.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left text-xs px-3 py-3 rounded-xl border border-border/60 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground leading-relaxed"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Follow-up chips — horizontally scrollable on mobile */}
              {showFollowUps && (
                <div className="pt-2">
                  <div className="text-xs text-muted-foreground mb-2">Follow-up questions:</div>
                  <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
                    {[
                      { emoji: "📋", label: "What evidence do I need?", q: "What evidence do I need to prove this?" },
                      { emoji: "⏱️", label: "How long will this take?", q: "How long will this process take?" },
                      { emoji: "⚖️", label: "Should I hire a lawyer?", q: "Should I hire a lawyer immediately?" },
                      { emoji: "🎯", label: "What are my chances?", q: "What are my chances of winning?" },
                    ].map(({ emoji, label, q }) => (
                      <button
                        key={q}
                        onClick={() => askFollowUp(q)}
                        className="text-xs px-3 py-2 rounded-full border border-border/60 hover:bg-secondary transition-colors whitespace-nowrap shrink-0"
                      >
                        {emoji} {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Input — sticky at bottom */}
            <div className="border-t p-3 md:p-4 shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your legal situation…"
                  className="flex-1 bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 min-w-0"
                  disabled={typing}
                />
                <Button
                  type="submit"
                  disabled={typing || !input.trim()}
                  className="shrink-0 h-11 w-11 p-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;