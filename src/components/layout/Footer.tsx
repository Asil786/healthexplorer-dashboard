
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-6 md:py-0 bg-background/95 backdrop-blur-sm dark:border-slate-800">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>© {currentYear} FedLearn. All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-1 text-sm">
          <span className="text-muted-foreground">Design & Built By</span>
          <span className="font-medium flex items-center gap-1">
            Asil & Team CE'26
            <Heart className="h-3 w-3 fill-red-500 text-red-500" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
