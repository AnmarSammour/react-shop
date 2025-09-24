import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <>
      <style>{`
        .contact-page {
          min-height: 100vh;
          background: #feffff;
          padding: 60px 20px;
        }
        .contact-header {
          max-width: 800px;
          margin: 0 auto 40px;
          text-align: center;
        }
        .contact-header h2 {
          font-size: 32px;
          font-weight: bold;
          color: #222;
          margin-bottom: 10px;
        }
        .contact-header p {
          font-size: 16px;
          color: #555;
          line-height: 1.6;
        }
        .contact-cards {
          max-width: 900px;
          margin: 0 auto 50px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .contact-card {
          background: #f8f6f6;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          text-align: center;
          transition: transform 0.2s ease;
        }
        .contact-card:hover {
          transform: translateY(-4px);
        }
        .contact-card h4 {
          margin: 10px 0;
          font-size: 18px;
          font-weight: 600;
        }
        .contact-card p {
          font-size: 14px;
          color: #666;
        }
        .icon {
          color: #1e968a;
        }
       .contact-form {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 40px 60px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

        .contact-form h3 {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #222;
        }
        .contact-form p {
          text-align: center;
          color: #666;
          margin-bottom: 25px;
          font-size: 15px;
          line-height: 1.5;
        }
        .contact-form .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 15px;
        }
        .contact-form .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }
        .contact-form label {
          margin-bottom: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }
       .contact-form input,
.contact-form textarea {
  background-color: #f5f3f3;
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box; /* ✅ ensures padding/border don't make it overflow */
}
        .contact-form textarea {
          resize: none;
        }
        .form-btn {
          text-align: left;
        }
        .contact-form button {
          background: #0f9e96;
          color: white;
          border: none;
          padding: 12px 30px;
          font-size: 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .contact-form button:hover {
          background: #058982;
        }

        /* Responsive Fixes */
        @media (max-width: 768px) {
          .contact-form {
            padding: 30px 20px;
          }
          .contact-form .form-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
        @media (max-width: 576px) {
          .contact-header h2 {
            font-size: 24px;
          }
          .contact-header p {
            font-size: 14px;
          }
          .contact-form h3 {
            font-size: 20px;
          }
          .contact-form p {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="contact-page">
        {/* Top Section */}
        <div className="contact-header">
          <h2>Get In Touch</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
            quaerat unde quam dolor culpa veritatis inventore, aut commodi eum
            veniam vel.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="contact-cards">
          <div className="contact-card">
            <MapPin className="icon" size={32} />
            <h4>102 Street 2714 Donovan</h4>
            <p>Lorem ipsum dolor sit amet discont</p>
          </div>
          <div className="contact-card">
            <Phone className="icon" size={32} />
            <h4>+02 1234 567 88</h4>
            <p>Lorem ipsum dolor sit amet discont</p>
          </div>
          <div className="contact-card">
            <Mail className="icon" size={32} />
            <h4>info@example.com</h4>
            <p>Lorem ipsum dolor sit amet discont</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h3>Send Us</h3>
          <p>
            Contact us for all your questions and opinions, or you can solve your
            problems in a shorter time with our contact offices.
          </p>

          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea id="message" rows="5"></textarea>
            </div>

            <div className="form-btn">
              <button type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


