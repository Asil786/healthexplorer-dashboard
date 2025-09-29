
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LiveHealth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="max-w-7xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>AI Health Assistant</CardTitle>
            <CardDescription>
              Ask questions about health data, predictions, and medical insights
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/predictions')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Predictions
          </Button>
        </CardHeader>
        <CardContent className="p-0 overflow-hidden">
          <div className="w-full h-[calc(100vh-180px)] min-h-[500px]">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-r-2 border-b-2 border-transparent mb-3"></div>
                  <p className="text-muted-foreground">Loading AI Assistant...</p>
                </div>
              </div>
            )}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full"
            >
              <iframe 
                src="https://labs.heygen.com/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJBbm5fRG9jdG9yX1NpdHRpbmdfcHVibGlj%0D%0AIiwicHJldmlld0ltZyI6Imh0dHBzOi8vZmlsZXMyLmhleWdlbi5haS9hdmF0YXIvdjMvMjZkZTM2%0D%0AOWIyZDQ0NDNlNTg2ZGVkZjI3YWYxZTBjMWRfNDU1NzAvcHJldmlld190YWxrXzEud2VicCIsIm5l%0D%0AZWRSZW1vdmVCYWNrZ3JvdW5kIjpmYWxzZSwia25vd2xlZGdlQmFzZUlkIjoiNmI2NDE1MzIzZDRh%0D%0ANGE2MTk4MDMyMTI5ZjI4OWI4NjgifQ%3D%3D&inIFrame=1"
                allow="microphone"
                onLoad={handleIframeLoad}
                allowFullScreen
                className="w-full h-full border-none rounded-b-lg"
              />
            </motion.div>
          </div>
        </CardContent>
      </Card>
      
      <div className="max-w-7xl mx-auto mt-4 text-sm text-muted-foreground text-center">
        <p>
          This AI assistant can analyze health data predictions and provide insights on time series model results.
          Try asking about trends, seasonality, or prediction confidence.
        </p>
      </div>
    </div>
  );
};

export default LiveHealth;
