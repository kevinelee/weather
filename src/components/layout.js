import PropTypes from "prop-types";
import React from "react";

import Header from "./header";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <Header />

      <main>{children}</main>

      <footer className="bg-black bottom-0">
        <nav className="flex justify-between max-w-7xl p-4 mx-auto text-sm md:p-8">
          <p className="text-white">
            Created by{` `}
            <a
              className="font-bold no-underline"
              href="https://www.github.com/jasonpark723"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jason Park&nbsp;
            </a>
            and
            <a
              className="font-bold no-underline"
              href="https://www.github.com/kevinelee"
              target="_blank"
              rel="noopener noreferrer"
            >
              &nbsp;Kevin Lee
            </a>
          </p>

          <p>
            <a
              className="font-bold text-white no-underline"
              href="https://github.com/kevinelee/weather"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </nav>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
