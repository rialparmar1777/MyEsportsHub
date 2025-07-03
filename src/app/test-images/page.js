'use client';

import { useState, useEffect } from 'react';
import { getGameImage, fallbackImages } from "@/lib/getGameImage";

export default function TestImagesPage() {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function testImages() {
      const games = ['valorant', 'cs2', 'lol', 'dota', 'fortnite', 'overwatch'];
      const results = [];

      for (const game of games) {
        try {
          console.log(`Testing ${game}...`);
          const imageUrl = await getGameImage(game);
          results.push({
            game,
            imageUrl,
            fallbackUrl: fallbackImages[game],
            success: !!imageUrl
          });
        } catch (error) {
          console.error(`Error testing ${game}:`, error);
          results.push({
            game,
            imageUrl: null,
            fallbackUrl: fallbackImages[game],
            success: false,
            error: error.message
          });
        }
      }

      setTestResults(results);
      setLoading(false);
    }

    testImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-2xl mb-4">Testing Images...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl mb-6">Image Test Results</h1>
      
      <div className="space-y-6">
        {testResults.map((result) => (
          <div key={result.game} className="border border-gray-700 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{result.game.toUpperCase()}</h2>
            <div className="space-y-2">
              <p><strong>Success:</strong> {result.success ? '✅' : '❌'}</p>
              {result.error && <p><strong>Error:</strong> {result.error}</p>}
              <p><strong>API Image:</strong> {result.imageUrl || 'None'}</p>
              <p><strong>Fallback Image:</strong> {result.fallbackUrl}</p>
              
              {result.imageUrl && (
                <div className="mt-4">
                  <p className="mb-2"><strong>API Image Preview:</strong></p>
                  <img 
                    src={result.imageUrl} 
                    alt={result.game}
                    className="w-64 h-32 object-cover rounded"
                    onError={(e) => {
                      console.log(`API image failed to load for ${result.game}:`, result.imageUrl);
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => {
                      console.log(`API image loaded successfully for ${result.game}:`, result.imageUrl);
                    }}
                  />
                </div>
              )}
              
              <div className="mt-4">
                <p className="mb-2"><strong>Fallback Image Preview:</strong></p>
                <img 
                  src={result.fallbackUrl} 
                  alt={`${result.game} fallback`}
                  className="w-64 h-32 object-cover rounded"
                  onError={(e) => {
                    console.log(`Fallback image failed to load for ${result.game}:`, result.fallbackUrl);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log(`Fallback image loaded successfully for ${result.game}:`, result.fallbackUrl);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 