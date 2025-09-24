
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
const images2 = [blog3, blog5, blog1];

  const thumbnailTitles = [
    "But I must explain to you how all this mistaken idea",
    "The Problem With Typefaces on the Web", 
    "English Breakfast Tea With Tasty Donut Desserts" 
  ];

  if (loading) return <div className="text-center my-5">Loading ...</div>;
  if (error) return <div className="text-center my-5 text-danger">{error}</div>;

  return (
    <>
      <style>
        {`
          @media (min-width: 769px) {
            .recent-posts .thumbnail-title {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 1.2em;
              max-height: 2.4em;
              width: 75%;
            }
            .social-media .btn {
              width: 75%;
            }
            .tags-container {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              width: 75%;
            }
            .tags-container a {
              flex: 0 0 calc(33.33% - 10px); /* 3 tags per row */
              max-width: calc(33.33% - 10px);
              text-align: center;
              padding: 3px;
              font-size: 0.85rem;
            }
          }
          @media (max-width: 768px) {
            .main-content img {
              height: 400px;
            }
            .recent-posts img {
              width: 50px !important;
              height: 50px !important;
              border-radius: 50% !important;
              object-fit: cover !important;
            }
            .recent-posts span {
              width: 16px;
              height: 16px;
              font-size: 0.5rem;
            }
            .recent-posts .thumbnail-title {
              display: none;
            }
            .sidebar {
              font-size: 0.9rem;
            }
            .sidebar h5 {
              font-size: 1.1rem;
            }
            .sidebar .btn {
              font-size: 0.85rem;
              padding: 0.6rem;
            }
            .sidebar img {
              height: auto;
            }
            .recent-posts li {
              display: flex;
              justify-content: center;
            }
            .tags-container {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
            }
            .tags-container a {
              flex: 0 0 calc(50% - 10px); /* 2 tags per row on tablet */
              max-width: calc(50% - 10px);
              text-align: center;
            }
          }
          @media (max-width: 576px) {
            .main-content img {
              height: 300px;
            }
            .recent-posts img {
              width: 50px !important;
              height: 50px !important;
              border-radius: 50% !important;
              object-fit: cover !important;
            }
            .recent-posts span {
              width: 14px;
              height: 14px;
              font-size: 0.5rem;
            }
            .recent-posts .thumbnail-title {
              display: none;
            }
            .sidebar {
              font-size: 0.85rem;
            }
            .sidebar h5 {
              font-size: 1rem;
            }
            .sidebar .btn {
              font-size: 0.8rem;
              padding: 0.5rem;
            }
            .sidebar img {
              height: auto;
            }
            .recent-posts li {
              display: flex;
              justify-content: center;
            }
            .tags-container {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
            }
            .tags-container a {
              flex: 0 0 100%; /* 1 tag per row on mobile */
              max-width: 100%;
              text-align: center;
            }
          }
          .recent-posts {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .recent-posts li {
            margin-bottom: 10px;
          }
        `}
      </style>
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
                  <i className="bi bi-facebook me-2"></i> FACEBOOK
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="btn d-flex align-items-center justify-content-center" 
                  style={{
                   background: 'linear-gradient(45deg, #fd1d1d, #fcb045, #833ab4)',
                   color: 'black'}}>
                  <i className="bi bi-instagram me-2"></i> INSTAGRAM
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="btn d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: '#1da1f2',
                  color: 'white',
                  border: 'none'
                }}>
                <i className="bi bi-twitter me-2"></i> TWITTER
              </a>
                     <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    background: '#2c2a26ff',
                    color: 'white',
                    border: 'none'
                  }}>
                  <i className="bi bi-tiktok me-2"></i> TIKTOK
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"
                  className="btn d-flex align-items-center justify-content-center"
                   style={{backgroundColor: 'red', color: 'white'}}>
                  <i className="bi bi-pinterest me-2"></i> PINTEREST
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