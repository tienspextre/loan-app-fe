import React, { useEffect } from 'react';
import Header from '../components/Header';
const LandingPage = () => {
  return (
    <div className="landing-page">
        <div>
            <Header/>
        </div>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Our Website</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="/signup" className="btn btn-primary">Sign Up</a>
          </div>
        </section>
        <section className="features">
          <h2>Features</h2>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </section>
        <section className="testimonials">
          <h2>Testimonials</h2>
          <div className="testimonial">
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
            <cite>- John Doe</cite>
          </div>
          <div className="testimonial">
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
            <cite>- Jane Smith</cite>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Company Name</p>
      </footer>
    </div>
  );
};

export default LandingPage;
