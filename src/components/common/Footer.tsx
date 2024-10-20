import React from "react";
import { Instagram, Facebook, Youtube } from "lucide-react";
import Typography from "./Typography";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-700 pb-8 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 space-y-4 sm:space-y-0">
            <Typography
              variant="h2"
              className="text-xl font-medium text-center sm:text-left"
            >
              3legant.
            </Typography>
            <Typography variant="p" className="text-gray-400 hidden sm:block">
              |
            </Typography>
            <Typography
              variant="p"
              className="text-sm text-center sm:text-left"
            >
              Watch Store
            </Typography>
          </div>

          <nav className="space-x-0 sm:space-x-6 flex flex-col sm:flex-row items-center">
            {["Home", "Shop", "Product", "Blog", "Contact Us"].map(
              (item, index, array) => (
                <React.Fragment key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(/\s/g, "")}`}
                    className="text-sm hover:text-gray-400"
                  >
                    {item}
                  </a>
                  {index < array.length - 1 && (
                    <Typography
                      variant="span"
                      className="text-gray-500 hidden sm:block"
                    >
                      |
                    </Typography>
                  )}
                </React.Fragment>
              ),
            )}
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 space-y-4 sm:space-y-0">
          <Typography variant="p" className="text-xs text-center sm:text-left">
            Copyright © 2024 3legant. All rights reserved
          </Typography>

          <div className="flex space-x-4 justify-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 hover:text-gray-400" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5 hover:text-gray-400" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="w-5 h-5 hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
