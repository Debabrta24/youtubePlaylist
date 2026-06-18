import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-950 via-emerald-950 to-green-950 border-t border-green-500/20 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-extrabold text-green-400">
              Playlist Counter
            </h2>

            <p className="mt-2 text-gray-300 text-sm leading-relaxed">
              Analyze YouTube playlists instantly. Count videos, calculate total
              watch time, and view playlist statistics in seconds.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-3">Features</h3>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li>YouTube Video Counter</li>
              <li>Playlist Duration</li>
              <li>Watch Time Calculator</li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="text-white font-semibold mb-3">Developer</h3>

            <p className="text-green-400 font-bold text-lg">
              Debabrata Paul
            </p>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-green-300 hover:text-green-400 text-sm transition"
            >
              Contact →
            </a>
          </div>
        </div>

        {/* Mobile & Tablet */}
        <div className="lg:hidden">
          {/* Playlist Counter */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-extrabold text-green-400">
              Playlist Counter
            </h2>

            <p className="mt-2 text-gray-300 text-sm leading-relaxed max-w-md mx-auto">
              Analyze YouTube playlists instantly. Count videos, calculate total
              watch time, and view playlist statistics in seconds.
            </p>
          </div>

          {/* Features + Developer Same Row */}
          <div className=" hidden grid grid-cols-2 gap-6 text-center">
            <div>
              <h3 className="text-white font-semibold mb-3">Features</h3>

              <ul className="space-y-2 text-gray-400 text-sm">
                <li>YouTube Video Counter</li>
                <li>Playlist Duration</li>
                <li>Watch Time Calculator</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Developer</h3>

              <p className="text-green-400 font-bold">
                Debabrata Paul
              </p>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-green-300 hover:text-green-400 text-sm transition"
              >
                Contact →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-green-500/20 mt-6 pt-4 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            Not affiliated with YouTube. This tool is for educational purposes only.
          </p>

          <p className="mt-2 text-gray-500 text-xs">
            © {new Date().getFullYear()} Playlist Counter. Built with ❤️ by{" "}
            <span className="text-green-400 font-medium">
              Debabrata Paul
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;