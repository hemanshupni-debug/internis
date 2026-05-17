"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Feed() {

  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [commentText, setCommentText] = useState("");

  // ================= FETCH POSTS =================

  const fetchPosts = async () => {

    try {

      const res = await axios.get(
        "http://192.168.1.4:5000/api/posts"
      );

      setPosts(res.data || []);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchPosts();

  }, []);

  // ================= ADMIN LOGIN =================

  const adminLogin = async () => {

    try {

      const res = await axios.post(
        "http://192.168.1.4:5000/api/admin/adminlogin",
        {
          username: "admin",
          password: "admin",
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Admin Login Success");

    } catch (error: any) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  // ================= CREATE POST =================

  const createPost = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {

        alert("Please Login First");

        return;
      }

      await axios.post(
        "http://192.168.1.4:5000/api/posts",
        {
          userId: "6a080233dcfd7f7c486b09cc",
          content,
          mediaUrl: "",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setContent("");

      fetchPosts();

      alert("Post Created");

    } catch (error: any) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Something went wrong"
      );

    }
  };

  // ================= LIKE POST =================

  const likePost = async (id: string) => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        `http://192.168.1.4:5000/api/posts/like/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchPosts();

    } catch (error) {

      console.log(error);

    }
  };

  // ================= COMMENT POST =================

  const commentPost = async (id: string) => {

    try {

      if (!commentText) return;

      const token = localStorage.getItem("token");

      await axios.post(
        `http://192.168.1.4:5000/api/posts/comment/${id}`,
        {
          text: commentText,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setCommentText("");

      fetchPosts();

    } catch (error) {

      console.log(error);

    }
  };

  // ================= SHARE POST =================

  const sharePost = async (id: string) => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        `http://192.168.1.4:5000/api/posts/share/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Post Shared");

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto">

        {/* LOGIN BUTTON */}

        <button
          onClick={adminLogin}
          className="mb-4 bg-black text-white px-5 py-2 rounded-lg"
        >
          Admin Login
        </button>

        {/* CREATE POST */}

        <div className="bg-white p-4 rounded-xl shadow-md mb-6">

          <textarea
            placeholder="What's on your mind?"
            className="w-full border p-3 rounded-lg"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={createPost}
            className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Create Post
          </button>

        </div>

        {/* POSTS */}

        {posts?.map((post: any) => (

          <div
            key={post?._id}
            className="bg-white p-5 rounded-xl shadow-md mb-5"
          >

            <h2 className="font-bold text-lg mb-3">
              {post?.user?.name || "User"}
            </h2>

            <p className="text-gray-700 mb-4">
              {post?.content}
            </p>

            {post?.mediaUrl && (

              <img
                src={post.mediaUrl}
                className="rounded-lg mb-4"
              />

            )}

            {/* ACTIONS */}

            <div className="flex gap-6 mb-4">

              <button
                onClick={() => likePost(post?._id)}
                className="text-red-500"
              >
                ❤️ {post?.likes?.length || 0}
              </button>

              <button className="text-blue-500">
                💬 {post?.comments?.length || 0}
              </button>

              <button
                onClick={() => sharePost(post?._id)}
                className="text-green-500"
              >
                🔁 Share
              </button>

            </div>

            {/* COMMENT INPUT */}

            <div className="flex gap-2 mb-4">

              <input
                type="text"
                placeholder="Write comment..."
                value={commentText}
                onChange={(e) =>
                  setCommentText(e.target.value)
                }
                className="border p-2 rounded-lg w-full"
              />

              <button
                onClick={() => commentPost(post?._id)}
                className="bg-black text-white px-4 rounded-lg"
              >
                Send
              </button>

            </div>

            {/* COMMENTS */}

            <div className="space-y-2">

              {post?.comments?.map(
                (comment: any, index: number) => (

                  <div
                    key={index}
                    className="bg-gray-100 p-2 rounded-lg"
                  >

                    <p className="font-semibold">
                      {comment?.user?.name || "User"}
                    </p>

                    <p>{comment?.text}</p>

                  </div>
                )
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}