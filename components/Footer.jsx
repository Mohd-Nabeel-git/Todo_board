import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white/90 backdrop-blur-md shadow-[0_-8px_32px_0_rgba(80,36,122,0.15)] py-6 px-6 flex flex-col sm:flex-row items-center justify-between text-gray-600 text-sm mt-20 border-t border-purple-200">
      <span className="text-center sm:text-left">
        &copy; {new Date().getFullYear()}{' '}
        <span className="font-semibold text-blue-700">CollaboBoard</span>. All rights reserved.
      </span>

      <div className="flex gap-5 mt-3 sm:mt-0">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 hover:underline transition duration-200"
        >
          GitHub
        </a>
        <a
          href="mailto:support@collaboboard.com"
          className="hover:text-blue-600 hover:underline transition duration-200"
        >
          Contact
        </a>
        <a
          href="/privacy"
          className="hover:text-blue-600 hover:underline transition duration-200"
        >
          Privacy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
