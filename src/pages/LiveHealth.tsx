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
            src="https://labs.heygen.com/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJCcnlhbl9JVF9TaXR0aW5nX3B1YmxpYyIs%0D%0AInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzMzYzlhYzRh%0D%0AZWFkNDRkZmM4YmMwMDgyYTM1MDYyYTcwXzQ1NTgwL3ByZXZpZXdfdGFsa18zLndlYnAiLCJuZWVk%0D%0AUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6ImJmMDE5NTM4MmM4NzQ2%0D%0AOTg4ZmI1OWM0MjFkMWZmMzZmIiwidXNlcm5hbWUiOiI1MGRhNmI1NjdhYWQ0MDE5YmQyZGIxMTNl%0D%0AZGE2NDk2ZSJ9&inIFrame=1"
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