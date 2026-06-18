import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-green-950/80 border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-r from-green-400 to-emerald-500 flex items-center justify-center text-black font-bold">
              ▶
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-green-400">
                Playlist Counter
              </h1>
              <p className="text-xs text-gray-400">YouTube Playlist Analyzer</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="https://github.com/Debabrta24"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-green-400 transition"
            >
              GitHub
            </a>

            <a
              href="#footer"
              className="bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 rounded-lg transition"
            >
              Contact
            </a>
          </nav>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-green-400"
          >
            <Menu size={28} />
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-4">
              <a
                href="https://github.com/Debabrta24"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400"
              >
                GitHub
              </a>
              <a
                href="https://github.com/Debabrta24"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300  hover:text-green-400"
              >
                Contact
              </a>
              <a
                href="#footer"
                className="bg-green-500 text-center text-black font-semibold py-2 rounded-lg"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
