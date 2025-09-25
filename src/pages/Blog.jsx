import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import banner from "../images/banner.png";
import blog3 from "../images/blog-3.jpg";
import blog5 from "../images/blog-5.jpg";
import blog1 from "../images/blog-1.jpg";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const originalTitles = [
    "But I must explain to you how all this mistaken idea",
    "The Problem With Typefaces on the Web"
  ];

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        const modifiedPosts = data.slice(0, 2).map((post, idx) => ({
          ...post,
          title: originalTitles[idx] || post.title 
        }));
        setPosts(modifiedPosts);
        setLoading(false);
      })
      .catch((err) => {
        setError("ERRORS");
        setLoading(false);
      });
  }, []);

  const images = [blog3, blog5];
  const images2 = [blog3, blog5, blog1];

  const thumbnailTitles = [
    "But I must explain to you how all this mistaken idea",
    "The Problem With Typefaces on the Web", 
    "English Breakfast Tea With Tasty Donut Desserts" 
  ];

  if (loading) return <div className="text-center my-5">Loading ...</div>;
  if (error) return <div className="text-center my-5 text-danger">{error}</div>;

  return (
    <>
      <div className="container my-5">
        <div className="row g-4 flex-row">
          {/* Main Content */}
          <div className="col-8 main-content">
            {posts.map((post, idx) => (
              <div key={post.id} className="mb-4">
                <img
                  src={images[idx]}
                  alt={post.title}
                  className="w-100 rounded-3 mb-4"
                  style={{ height: '600px', objectFit: 'cover' }}
                />
                <h2 className="h3 fw-bold mb-2">{post.title}</h2>
                <small className="text-muted d-block mb-2">
                  {new Date(2025, 0, post.id).toLocaleDateString()} • User {post.userId} | {post.id}K
                </small>
                <p className="text-muted mb-0">
                  {post.body}
                </p>
              </div>
            ))}
          </div>

          {/* Sidebar - Right Column */}
          <div className="col-4 sidebar">
            {/* Recent Posts */}
            <div className="mb-4">
              <h5 className="mb-3">RECENT POSTS</h5>
              <ul className="list-unstyled p-3 recent-posts">
                {images2.map((thumb, idx) => (
                  <li key={idx}>
                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                      <div className="position-relative">
                        <img
                          src={thumb}
                          alt={`Thumbnail ${idx + 1}`}
                          className="rounded-circle me-2"
                          width={50}
                          height={50}
                          style={{ objectFit: 'cover', borderRadius: '50%' }}
                        />
                        <span 
                          className="position-absolute d-flex align-items-center justify-content-center"
                          style={{
                            top: '0',
                            right: '0',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: '#0ecfdcff',
                            color: '#fff',
                            fontSize: '0.7rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {idx + 1}
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="thumbnail-title">{thumbnailTitles[idx]}</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div className="mb-4 p-3 social-media">
              <h5 className="mb-3">SOCIAL MEDIA</h5>
              <div className="d-flex flex-column gap-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary d-flex align-items-center justify-content-center">
                  <i className="bi bi-facebook"></i>
                  <span className="d-none d-sm-inline ms-2">FACEBOOK</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    background: 'linear-gradient(45deg, #fd1d1d, #fcb045, #833ab4)',
                    color: 'black'}}>
                  <i className="bi bi-instagram"></i>
                  <span className="d-none d-sm-inline ms-2">INSTAGRAM</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: '#1da1f2',
                    color: 'white',
                    border: 'none'
                  }}>
                  <i className="bi bi-twitter"></i>
                  <span className="d-none d-sm-inline ms-2">TWITTER</span>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    background: '#2c2a26ff',
                    color: 'white',
                    border: 'none'
                  }}>
                  <i className="bi bi-tiktok"></i>
                  <span className="d-none d-sm-inline ms-2">TIKTOK</span>
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"
                  className="btn d-flex align-items-center justify-content-center"
                  style={{backgroundColor: 'red', color: 'white'}}>
                  <i className="bi bi-pinterest"></i>
                  <span className="d-none d-sm-inline ms-2">PINTEREST</span>
                </a>
              </div>
            </div>

            {/* Widget Banner */}
            <div className="mb-4 p-3">
              <h5 className="mb-3">WIDGET BANNER</h5>
              <img
                src={banner}
                alt="Ad"
                className="w-75 rounded-2"
              />
            </div>
            {/* Tags */}
            <div className="p-3">
              <h5 className="fw-bold mb-3">TAGS</h5>
              <div className="tags-container">
                {['ecommerce', 'food', 'grocery', 'kithome', 'organic', 'shop', 
                  'shopify', 'store'].map((tag) => (
                  <a
                    key={tag}
                    href={`/tags/${tag}`}
                    className="badge bg-light text-dark text-decoration-none"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Buttons */}
        <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
          <button
            className="btn p-0 d-flex justify-content-center align-items-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#35AFA0",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.1rem",
              border: "none"
            }}
          >
            1
          </button>
          <button
            className="btn p-0 d-flex justify-content-center align-items-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#e9ecef",
              color: "#0ecfdcff",
              fontWeight: "bold",
              fontSize: "1.1rem",
              border: "none"
            }}
          >
            2
          </button>
          <span
            className="d-flex justify-content-center align-items-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#e9ecef",
              color: "#0ecfdcff",
              fontSize: "1.2rem"
            }}
          >
            <i className="bi bi-arrow-right"></i>
          </span>
        </div>
      </div>
    </>
  );
};

export default Blog;
