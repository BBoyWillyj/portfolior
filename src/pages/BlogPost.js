import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ReactMarkdown from 'react-markdown';

const mockPostsContent = {
  "mock-1": {
    title: "Mastering Clean Code in React",
    date: "June 28, 2026",
    tags: ["React", "Architecture", "Clean Code"],
    readTime: "5 min read",
    author: "Joshua Williams",
    content: `# Mastering Clean Code in React

Writing clean code is not a luxury; it is a necessity for long-term project survival. When building applications in React, how you organize components and manage states dictates how fast you can scale.

## 1. Component Separation of Concerns
Every component should do one thing and do it well. If your component is handling data fetching, form validation, and complex layout logic all at once, it's time to split it.

* **Presentational Components**: Focus solely on how things look (e.g. Card, Button).
* **Container Components**: Focus on how things work (data fetching, state orchestration).

## 2. Custom Hooks for Logic Extraction
Avoid bloating your JSX components with large \`useEffect\` blocks. Extract them into custom hooks:

\`\`\`javascript
// Custom Hook for fetching data
function useFetchData(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); });
  }, [endpoint]);

  return { data, loading };
}
\`\`\`

## 3. Keep States Local
Only lift state up when absolutely necessary. If a state is only needed by a single input, keep it inside that component. Overuse of global states (like Redux or global Context) can lead to unnecessary re-renders and complex debugging processes.

## Conclusion
By focusing on small components, custom hooks, and local state management, your React codebase will remain clean, testable, and fun to work with.`
  },
  "mock-2": {
    title: "Designing Premium Web Interfaces",
    date: "June 15, 2026",
    tags: ["Design", "Aesthetics", "CSS"],
    readTime: "7 min read",
    author: "Joshua Williams",
    content: `# Designing Premium Web Interfaces

First impressions matter. In web development, user experience (UX) and visual design (UI) go hand in hand. If your application looks simple and basic, users might assume it lacks quality.

## The Pillars of Premium Design

### 1. Colors & Harmony
Avoid browser default colors (pure red, green, or blue). Instead, curate harmonious color palettes. HSL tailored color schemes and sleek dark modes create a sophisticated feel.

> [!NOTE]
> Pro Tip: Use HSL instead of HEX for your color systems. HSL makes it simple to generate lighter or darker shades dynamically for states (hover, focus, disabled).

### 2. Typography
Typography is the voice of your site. Ditch standard system fonts for modern, curated fonts like:
* **Syne**: Excellent for expressive, bold, display headers.
* **DM Sans**: Clean, highly readable body fonts.

### 3. Micro-Animations & Custom Cursors
Subtle micro-animations (like a slow, fluid cursor follower, hover scale effects, and cards that drift up when scrolling into view) reward user interaction. These small touches keep the site feeling "alive" and reactive.

* **Cursor Follower**: Adds physical presence to mouse tracking.
* **Smooth Keyframes**: Floating text marquees that run continuously in the background.

## Final Thoughts
Sleek layouts, strong font contrasts, and subtle motion design can take a website from good to premium. Always design with intent.`
  },
  "mock-3": {
    title: "Why Tailwind CSS is a Game-Changer",
    date: "May 30, 2026",
    tags: ["Tailwind", "CSS", "Frontend"],
    readTime: "4 min read",
    author: "Joshua Williams",
    content: `# Why Tailwind CSS is a Game-Changer

Tailwind CSS has shifted how developers write styling. By using a utility-first approach, styles are applied directly in the HTML or JSX, speeding up workflows.

## The Key Advantages

### 1. No CSS File Clutter
Instead of maintaining massive, bloated stylesheets with duplicate styles, Tailwind classes translate straight to core CSS. Your stylesheet size remains capped even as your project grows.

### 2. High Customizability
Tailwind's \`tailwind.config.js\` file lets you build a full design system. You can easily extend fonts, colors, breakpoints, and animation keyframes to fit custom UI requirements.

### 3. Responsive States by Default
Applying mobile-first designs is as simple as adding a prefix:
* \`text-sm\` for mobile
* \`md:text-base\` for tablet/desktop
* \`lg:text-lg\` for large screens

## Conclusion
Tailwind streamlines styling, enforces design system alignment, and reduces layout bugs. It's a massive productivity booster for any modern front-end workflow.`
  }
};

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Try fetching from Firebase first
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const dateStr = data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'Recent';

          setPost({
            id: docSnap.id,
            ...data,
            date: dateStr
          });
        } else if (mockPostsContent[id]) {
          // Fallback to mock posts content
          setPost(mockPostsContent[id]);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.warn("Firestore error, loading fallback mock content:", error);
        if (mockPostsContent[id]) {
          setPost(mockPostsContent[id]);
        } else {
          setPost(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen max-w-3xl mx-auto flex flex-col justify-center items-center">
        <div className="w-8 h-8 border-4 border-rust border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-body text-sm text-sage">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen max-w-3xl mx-auto text-center">
        <h2 className="font-display font-bold text-2xl text-charcoal mb-4">Post Not Found</h2>
        <p className="font-body text-gray-500 mb-8 font-light">The article you are looking for does not exist or has been deleted.</p>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  // Custom components for Markdown rendering
  const mdComponents = {
    h1: ({ children, ...props }) => <h1 className="font-display font-extrabold text-3xl md:text-4xl text-charcoal mt-8 mb-4 tracking-tight leading-tight" {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 className="font-display font-bold text-2xl text-charcoal mt-8 mb-3 tracking-tight border-b border-warm pb-2" {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 className="font-display font-semibold text-xl text-charcoal mt-6 mb-2 tracking-tight" {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p className="font-body text-base text-gray-600 leading-relaxed mb-5 font-light" {...props}>{children}</p>,
    ul: ({ children, ...props }) => <ul className="list-disc pl-6 mb-5 font-body font-light text-gray-600 space-y-2" {...props}>{children}</ul>,
    ol: ({ children, ...props }) => <ol className="list-decimal pl-6 mb-5 font-body font-light text-gray-600 space-y-2" {...props}>{children}</ol>,
    li: ({ children, ...props }) => <li className="text-gray-600 font-light" {...props}>{children}</li>,
    blockquote: ({ children, ...props }) => <blockquote className="border-l-4 border-rust pl-4 italic my-6 text-sage bg-warm/20 py-2 rounded-r-lg" {...props}>{children}</blockquote>,
    code: ({ inline, children, ...props }) => (
      inline 
        ? <code className="bg-warm/50 text-rust px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
        : <pre className="bg-charcoal text-cream p-4 rounded-lg overflow-x-auto text-sm font-mono my-5 shadow-inner"><code {...props}>{children}</code></pre>
    ),
    a: ({ children, ...props }) => <a className="text-rust hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  };

  return (
    <article className="pt-32 pb-24 px-6 md:px-12 min-h-screen max-w-3xl mx-auto">
      <button 
        onClick={() => navigate('/blog')}
        className="font-body text-xs text-charcoal font-semibold uppercase hover:text-rust transition-colors flex items-center gap-1.5 mb-8"
      >
        ← Back to Blog
      </button>

      {/* Header Info */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-body text-xs text-sage tracking-wider uppercase font-medium">{post.date}</span>
          <span className="text-gray-300">•</span>
          <span className="font-body text-xs text-gray-400">{post.readTime || '3 min read'}</span>
        </div>

        <h1 className="font-display font-extrabold text-charcoal leading-tight tracking-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
          {post.title}
        </h1>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-charcoal flex items-center justify-center">
            <span className="font-display font-bold text-cream text-[10px]">JW</span>
          </div>
          <div>
            <p className="font-body text-xs font-semibold text-charcoal">{post.author || 'Joshua Williams'}</p>
            <p className="font-body text-[10px] text-gray-400">Author & Developer</p>
          </div>
        </div>
      </div>

      <div className="divider mb-10"></div>

      {/* Body Content */}
      <div className="blog-content">
        <ReactMarkdown components={mdComponents}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="divider mt-12 mb-8"></div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-2">
        {post.tags && post.tags.map((tag, idx) => (
          <span key={idx} className="bg-warm/50 text-gray-600 px-3 py-1 rounded text-xs tracking-wide uppercase font-medium">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
