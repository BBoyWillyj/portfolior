import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase';
import ReactMarkdown from 'react-markdown';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';


// Default passcode for simple admin security (easily customizable)

export default function BlogAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');


  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(true);

  // Form states
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [readTime, setReadTime] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  // Listen to user sign-in state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // Fetch posts from Firestore
  const fetchPosts = async () => {

    setLoading(true);
    try {
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetched = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : 'Recent'
        };
      });
      setPosts(fetched);
    } catch (error) {
      console.error("Firestore read error: ", error);
      setIsFirebaseConfigured(false);
    } finally {
      setLoading(false);
    }
  };


  // NEW: load posts when the user logs in
  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: "info", message: "Saving..." });

    const postData = {
      title,
      excerpt,
      content,
      tags: tags.split(',').map(t => t.trim()).filter(t => t !== ""),
      readTime: readTime || "3 min read",
      author: "Joshua Williams",
      updatedAt: serverTimestamp()
    };

    try {
      if (editingId) {
        // Edit Mode
        const docRef = doc(db, 'posts', editingId);
        await updateDoc(docRef, postData);
        setFormStatus({ type: "success", message: "Post updated successfully!" });
      } else {
        // Create Mode
        postData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'posts'), postData);
        setFormStatus({ type: "success", message: "Post published successfully!" });
      }

      // Reset form
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      setFormStatus({
        type: "error",
        message: isFirebaseConfigured
          ? "Failed to save. Check your Firestore rules."
          : "Firebase not configured. Please replace credentials in src/firebase.js"
      });
    }
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setTags(post.tags ? post.tags.join(', ') : "");
    setReadTime(post.readTime || "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await deleteDoc(doc(db, 'posts', id));
      setFormStatus({ type: "success", message: "Post deleted successfully!" });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      setFormStatus({ type: "error", message: "Failed to delete post." });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setTags("");
    setReadTime("");
  };

  // Preview styling for markdown
  const mdComponents = {
    h1: ({ children, ...props }) => <h1 className="font-display font-bold text-2xl text-charcoal mt-4 mb-2" {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 className="font-display font-bold text-xl text-charcoal mt-4 mb-2" {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 className="font-display font-semibold text-lg text-charcoal mt-3 mb-1" {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p className="font-body text-sm text-gray-600 mb-3" {...props}>{children}</p>,
    ul: ({ children, ...props }) => <ul className="list-disc pl-5 mb-3 text-sm text-gray-600" {...props}>{children}</ul>,
    ol: ({ children, ...props }) => <ol className="list-decimal pl-5 mb-3 text-sm text-gray-600" {...props}>{children}</ol>,
    code: ({ inline, children, ...props }) => (
      inline
        ? <code className="bg-warm/50 text-rust px-1.5 py-0.5 rounded text-xs font-mono" {...props}>{children}</code>
        : <pre className="bg-charcoal text-cream p-3 rounded text-xs font-mono overflow-x-auto my-3"><code {...props}>{children}</code></pre>
    )
  };

  // 1. LOGIN SCREEN
  return (
    user ? (

      <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between border-b border-warm pb-6 mb-8 gap-4">
          <div>
            <h1 className="font-display font-bold text-3xl text-charcoal">Blog Admin Panel</h1>
            <p className="font-body text-xs text-gray-400 mt-1">Write, edit, or delete articles from your portfolio</p>
          </div>
          <button
            onClick={handleLogout}
            className="tag-pill border-gray-400 text-gray-500 hover:border-rust hover:text-rust transition-colors text-xs"
          >
            Sign Out
          </button>
        </div>

        {/* Firebase setup alert helper */}
        {!isFirebaseConfigured && (
          <div className="mb-8 p-5 rounded-lg border border-red-200 bg-red-50 text-red-800 text-sm">
            <p className="font-medium mb-1">⚠️ Firebase Connection Failed</p>
            <p className="font-light opacity-90">
              Firestore cannot be loaded. Ensure you replaced the config details in <code>src/firebase.js</code> and that Firestore database is enabled in the Firebase console.
            </p>
          </div>
        )}

        {/* Form Status Notification */}
        {formStatus.message && (
          <div className={`mb-6 p-4 rounded-lg border text-sm ${formStatus.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' :
            formStatus.type === 'error' ? 'bg-red-50 text-red-800 border-red-200' :
              'bg-blue-50 text-blue-800 border-blue-200'
            }`}>
            {formStatus.message}
          </div>
        )}

        {/* Editor & Preview Split Screen */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">

          {/* Editor Form */}
          <div className="p-6 rounded-xl border border-warm bg-cream">
            <h2 className="font-display font-bold text-xl text-charcoal mb-4">
              {editingId ? "Edit Article" : "Write New Article"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-body text-xs text-gray-500 block mb-1.5">Article Title</label>
                <input
                  type="text"
                  placeholder="e.g. Getting Started with React"
                  className="form-input text-charcoal"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs text-gray-500 block mb-1.5">Tags (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="React, CSS, Dev"
                    className="form-input text-charcoal"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-gray-500 block mb-1.5">Reading Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 min read"
                    className="form-input text-charcoal"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="font-body text-xs text-gray-500 block mb-1.5">Brief Excerpt/Summary</label>
                <textarea
                  rows="2"
                  placeholder="Write a short summary that will show on the blog listing page..."
                  className="form-input resize-none text-charcoal"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  required
                ></textarea>
              </div>

              <div>
                <label className="font-body text-xs text-gray-500 mb-1.5 flex justify-between">
                  <span>Article Body (Supports Markdown)</span>
                  <span className="text-[10px] text-gray-400 font-mono">Use standard markdown syntax</span>
                </label>
                <textarea
                  rows="10"
                  placeholder="# Header 1&#10;Write paragraphs here. Use **bold** or *italic* text.&#10;&#10;## Subheader&#10;* List item 1&#10;* List item 2"
                  className="form-input resize-y font-mono text-xs text-charcoal"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="flex gap-4 pt-2">
                <button type="submit" disabled={!isFirebaseConfigured} className="btn-primary flex-1 justify-center">
                  {editingId ? "Save Changes" : "Publish Article"}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="btn-outline justify-center px-6">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Live Preview Panel */}
          <div className="p-6 rounded-xl border border-dashed border-gray-300 bg-white/50 flex flex-col h-[560px] overflow-hidden">
            <h2 className="font-display font-semibold text-lg text-gray-400 mb-4 border-b pb-2">
              Live Preview (As you type)
            </h2>
            <div className="flex-1 overflow-y-auto pr-2">
              {title ? (
                <h1 className="font-display font-extrabold text-2xl text-charcoal mb-2 leading-tight">{title}</h1>
              ) : (
                <p className="text-gray-300 italic text-sm">Post Title will show here...</p>
              )}

              <div className="flex gap-2 mb-4">
                {tags ? tags.split(',').map((tag, idx) => (
                  <span key={idx} className="bg-warm/50 text-[10px] text-gray-500 px-1.5 py-0.5 rounded font-medium">
                    {tag.trim()}
                  </span>
                )) : null}
              </div>

              <div className="divider mb-4"></div>

              {content ? (
                <ReactMarkdown components={mdComponents}>{content}</ReactMarkdown>
              ) : (
                <p className="text-gray-300 italic text-sm">Write markdown in the editor to preview formatting...</p>
              )}
            </div>
          </div>
        </div>

        {/* Published Posts List Table */}
        <div className="mt-12 bg-cream p-6 rounded-xl border border-warm">
          <h2 className="font-display font-bold text-xl text-charcoal mb-4">Published Articles </h2>

          {loading ? (
            <p className="font-body text-sm text-sage animate-pulse">Loading posts list...</p>
          ) : posts.length === 0 ? (
            <p className="font-body text-sm text-gray-400 italic">No articles published yet. Write your first article above!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-body">
                <thead>
                  <tr className="border-b border-warm text-gray-400 font-medium">
                    <th className="py-3 px-2">Title</th>
                    <th className="py-3 px-2">Date</th>
                    <th className="py-3 px-2">Tags</th>
                    <th className="py-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-warm/50 hover:bg-warm/20 transition-colors">
                      <td className="py-3 px-2 font-medium text-charcoal">{post.title}</td>
                      <td className="py-3 px-2 text-gray-500">{post.date}</td>
                      <td className="py-3 px-2 text-sage text-xs">
                        {post.tags ? post.tags.join(', ') : '-'}
                      </td>
                      <td className="py-3 px-2 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="text-xs font-semibold text-charcoal hover:text-rust"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-xs font-semibold text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

    ) : (
      <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-8 rounded-xl border border-warm bg-cream shadow-xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-rust rounded-full mx-auto flex items-center justify-center mb-3">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <h2 className="font-display font-bold text-2xl text-charcoal">Admin Access</h2>
            <p className="font-body text-xs text-gray-400 mt-1">Enter your passcode to manage blog posts</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-body text-xs text-gray-500 block mb-1.5 font-light">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="form-input text-charcoal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="font-body text-xs text-gray-500 block mb-1.5 font-light">Passcode</label>
              <input
                type="password"
                placeholder="••••••••"
                className="form-input text-charcoal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-xs text-red-600 font-medium">{error}</p>}


            <button type="submit" className="btn-primary w-full justify-center">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    )
  );
}
