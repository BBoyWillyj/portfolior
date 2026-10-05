import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';



export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetched = querySnapshot.docs.map(doc => {
          const data = doc.data();
          // Convert Firestore Timestamp to readable date
          const dateStr = data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'Recent';
          
          return {
            id: doc.id,
            ...data,
            date: dateStr
          };
        });
        setPosts(fetched);

      } catch (error) {
        console.warn("Firebase not configured or fails to read. Showing placeholder posts.", error);
        setIsFirebaseConfigured(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen max-w-6xl mx-auto">
      {/* Blog Header */}
      <div className="text-center mb-16">
        <span className="section-label block mb-3">Insights</span>
        <h1 className="font-display font-extrabold text-charcoal leading-none tracking-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          My <span className="highlight">Blog</span>
        </h1>
        <p className="font-body text-base text-gray-500 max-w-md mx-auto leading-relaxed" style={{ fontWeight: 300 }}>
          Thoughts, lessons, and articles from Me!!! <br/>Get to understand what runs through my brain.
        </p>
      </div>

      {/* Firebase setup alert helper */}
      {!isFirebaseConfigured && (
        <div className="mb-10 p-5 rounded-lg border border-amber-200 bg-amber-50/50 text-amber-800 text-sm max-w-2xl mx-auto">
          <p className="font-medium mb-1">💡 Developer Note:</p>
          <p className="font-light opacity-90">
            Firebase config contains placeholder values in <code>src/firebase.js</code>. The blog is currently displaying placeholder demo posts. Replace them with your Firebase credentials to enable writing and reading from your own database!
          </p>
        </div>
      )}

      {loading ? (
        // Premium Loading skeleton grid
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="border border-warm rounded-lg p-6 animate-pulse bg-warm/20">
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-16 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
        /* Blog cards grid */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="border border-warm rounded-lg p-6 bg-cream hover:border-rust hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Meta Row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-body text-xs text-sage tracking-wider uppercase font-medium">{post.date}</span>
                  <span className="font-body text-xs text-gray-400">{post.readTime || '3 min read'}</span>
                </div>

                {/* Title */}
                <Link to={`/blog/${post.id}`} className="block group">
                  <h3 className="font-display font-bold text-xl text-charcoal group-hover:text-rust transition-colors mb-3 leading-snug tracking-tight">
                    {post.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="font-body text-sm text-gray-500 leading-relaxed mb-6 font-light">
                  {post.excerpt}
                </p>
              </div>

              {/* Tags and Action */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags && post.tags.map((tag, idx) => (
                    <span key={idx} className="bg-warm/50 text-gray-600 px-2 py-0.5 rounded text-[10px] tracking-wide uppercase font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="divider mb-4"></div>
                <Link to={`/blog/${post.id}`} className="font-body text-xs text-charcoal font-semibold uppercase hover:text-rust transition-colors flex items-center gap-1.5">
                  Read Article <span className="text-rust">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
