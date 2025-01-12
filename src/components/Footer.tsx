import React from 'react';
import { Github, Linkedin, Code2, Copyright } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full py-8 mt-12 border-t border-gray-800 overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <Code2 className="w-96 h-96 text-purple-400 -rotate-12" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-purple-400" />
              <span className="text-gray-400">Built with ❤️ by Aryan Acharya</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/aryan1112003"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/aryan-acharya-9b939b316/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Copyright className="w-4 h-4" />
              <span>{currentYear} AI Quote Generator.</span>
            </div>
            <span className="hidden md:block">|</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}