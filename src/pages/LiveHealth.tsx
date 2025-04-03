// import { useState } from 'react';
import { motion } from 'framer-motion';

const LiveHealth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-full"
        >
          <iframe 
            src="https://labs.heygen.com/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJEZXh0ZXJfRG9jdG9yX1N0YW5kaW5nMl9w%0D%0AdWJsaWMiLCJwcmV2aWV3SW1nIjoiaHR0cHM6Ly9maWxlczIuaGV5Z2VuLmFpL2F2YXRhci92My84%0D%0AOGQ0MjFmOTM5MDQ0YmIwOGQ4OTJlODMzOTMxOTQ4Yl80NTU5MC9wcmV2aWV3X3RhbGtfMS53ZWJw%0D%0AIiwibmVlZFJlbW92ZUJhY2tncm91bmQiOmZhbHNlLCJrbm93bGVkZ2VCYXNlSWQiOiJiZjAxOTUz%0D%0AODJjODc0Njk4OGZiNTljNDIxZDFmZjM2ZiIsInVzZXJuYW1lIjoiNTBkYTZiNTY3YWFkNDAxOWJk%0D%0AMmRiMTEzZWRhNjQ5NmUifQ%3D%3D&inIFrame=1"
            allow="microphone"
            allowFullScreen
            className="w-full h-full border-none"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LiveHealth; 