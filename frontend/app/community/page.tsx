"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";

// Type definitions
interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  likes: number;
  replies: Comment[];
  parentId?: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  likes: number;
  comments: Comment[];
  category: "general" | "support" | "share" | "question";
}

// Sample data
const initialPosts: Post[] = [
  {
    id: "1",
    title: "Courage for a New Beginning",
    content:
      "I'm going through difficult times, but I'm trying to make small changes today. I hope everyone stays strong!",
    author: "Anonymous123",
    createdAt: new Date("2024-01-15"),
    likes: 15,
    category: "support",
    comments: [
      {
        id: "c1",
        content: "That's a really brave decision. I'm cheering for you!",
        author: "Anonymous456",
        createdAt: new Date("2024-01-15"),
        likes: 3,
        replies: [
          {
            id: "r1",
            content: "I feel the same way. Let's stay strong together!",
            author: "Anonymous789",
            createdAt: new Date("2024-01-15"),
            likes: 1,
            replies: [],
            parentId: "c1",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Helpful Methods for Stress Management",
    content:
      "Meditation and walking that I recently tried have been really helpful. Please share your own stress relief methods if you have any!",
    author: "Anonymous777",
    createdAt: new Date("2024-01-14"),
    likes: 8,
    category: "share",
    comments: [],
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "general" as Post["category"],
  });
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");

  // Format date consistently for SSR/CSR
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  // Create post
  const createPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post: Post = {
      id: crypto.randomUUID(),
      title: newPost.title,
      content: newPost.content,
      author: `Anonymous${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date(),
      likes: 0,
      comments: [],
      category: newPost.category,
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", category: "general" });
    setShowNewPostForm(false);
  };

  // Delete post
  const deletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  // Add comment
  const addComment = (postId: string, content: string, parentId?: string) => {
    if (!content.trim()) return;

    const comment: Comment = {
      id: crypto.randomUUID(),
      content,
      author: `Anonymous${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date(),
      likes: 0,
      replies: [],
    };

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          if (parentId) {
            // Add reply
            const addReplyToComment = (comments: Comment[]): Comment[] => {
              return comments.map((c) => {
                if (c.id === parentId) {
                  return {
                    ...c,
                    replies: [...c.replies, { ...comment, parentId }],
                  };
                }
                return { ...c, replies: addReplyToComment(c.replies) };
              });
            };
            return { ...post, comments: addReplyToComment(post.comments) };
          } else {
            // Add regular comment
            return { ...post, comments: [...post.comments, comment] };
          }
        }
        return post;
      })
    );

    setNewComment("");
    setReplyingTo(null);
  };

  // Like functionality
  const toggleLike = (postId: string, commentId?: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          if (commentId) {
            // Comment like
            const updateCommentLikes = (comments: Comment[]): Comment[] => {
              return comments.map((c) => {
                if (c.id === commentId) {
                  return { ...c, likes: c.likes + 1 };
                }
                return { ...c, replies: updateCommentLikes(c.replies) };
              });
            };
            return { ...post, comments: updateCommentLikes(post.comments) };
          } else {
            // Post like
            return { ...post, likes: post.likes + 1 };
          }
        }
        return post;
      })
    );
  };

  // Category filtering
  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  // Comment rendering function
  const renderComments = (comments: Comment[], postId: string, level = 0) => {
    return comments.map((comment) => (
      <motion.div
        key={comment.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gray-50 rounded-lg p-4 ${level > 0 ? "ml-8 mt-3" : "mt-4"}`}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">
              {comment.author}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(comment.createdAt)}
            </span>
          </div>
        </div>

        <p className="text-gray-800 mb-3">{comment.content}</p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleLike(postId, comment.id)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-rose-500 transition-colors"
          >
            <span>❤️</span>
            <span>{comment.likes}</span>
          </button>

          <button
            onClick={() => setReplyingTo(comment.id)}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Reply
          </button>
        </div>

        {replyingTo === comment.id && (
          <div className="mt-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button
                onClick={() => addComment(postId, newComment, comment.id)}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
              >
                Post
              </button>
              <button
                onClick={() => setReplyingTo(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {comment.replies.length > 0 && (
          <div className="mt-3">
            {renderComments(comment.replies, postId, level + 1)}
          </div>
        )}
      </motion.div>
    ));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent mb-4 font-nunito"
          >
            Community
          </motion.h1>
          <p className="text-lg text-gray-600 font-nunito">
            A warm space where we support and encourage each other
          </p>
        </motion.section>

        {/* Category filter and write button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-between items-center mb-8 gap-4"
        >
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-rose-500 text-white"
                  : "bg-white text-gray-600 hover:bg-rose-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory("general")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "general"
                  ? "bg-rose-500 text-white"
                  : "bg-white text-gray-600 hover:bg-rose-100"
              }`}
            >
              General
            </button>
            <button
              onClick={() => setSelectedCategory("support")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "support"
                  ? "bg-rose-500 text-white"
                  : "bg-white text-gray-600 hover:bg-rose-100"
              }`}
            >
              Support
            </button>
            <button
              onClick={() => setSelectedCategory("share")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "share"
                  ? "bg-rose-500 text-white"
                  : "bg-white text-gray-600 hover:bg-rose-100"
              }`}
            >
              Share
            </button>
            <button
              onClick={() => setSelectedCategory("question")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "question"
                  ? "bg-rose-500 text-white"
                  : "bg-white text-gray-600 hover:bg-rose-100"
              }`}
            >
              Question
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewPostForm(true)}
            className="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Write Post
          </motion.button>
        </motion.div>

        {/* New post form */}
        {showNewPostForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Write New Post
            </h3>

            <div className="mb-4">
              <select
                value={newPost.category}
                onChange={(e) =>
                  setNewPost({
                    ...newPost,
                    category: e.target.value as Post["category"],
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 mb-3"
              >
                <option value="general">General</option>
                <option value="support">Support</option>
                <option value="share">Share</option>
                <option value="question">Question</option>
              </select>
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                placeholder="Enter title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="mb-4">
              <textarea
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                placeholder="Enter content"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowNewPostForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createPost}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
              >
                Post
              </button>
            </div>
          </motion.div>
        )}

        {/* Posts list */}
        <div className="space-y-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Post header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.category === "support"
                        ? "bg-green-100 text-green-800"
                        : post.category === "share"
                          ? "bg-blue-100 text-blue-800"
                          : post.category === "question"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {post.category === "general"
                      ? "General"
                      : post.category === "support"
                        ? "Support"
                        : post.category === "share"
                          ? "Share"
                          : "Question"}
                  </span>
                  <span className="font-semibold text-gray-700">
                    {post.author}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Post content */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {post.title}
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {post.content}
              </p>

              {/* Post actions */}
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-rose-500 transition-colors"
                >
                  <span>❤️</span>
                  <span>{post.likes}</span>
                </button>
                <span className="text-sm text-gray-600">
                  Comments {post.comments.length}
                </span>
              </div>

              {/* Comment form */}
              <div className="border-t pt-4">
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={replyingTo === null ? newComment : ""}
                    onChange={(e) =>
                      replyingTo === null && setNewComment(e.target.value)
                    }
                    placeholder="Write a comment..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    disabled={replyingTo !== null}
                  />
                  <button
                    onClick={() =>
                      replyingTo === null && addComment(post.id, newComment)
                    }
                    disabled={replyingTo !== null}
                    className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>

                {/* Comments list */}
                {post.comments.length > 0 && (
                  <div>{renderComments(post.comments, post.id)}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-500 mb-6">Write the first post!</p>
            <button
              onClick={() => setShowNewPostForm(true)}
              className="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Write Post
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
