import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <div className="container text-center">
        <p>
          &copy; {new Date().getFullYear()} Task Manager. All rights reserved, By Anjan Kr chaurasiya.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
