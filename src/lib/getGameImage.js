export async function getGameImage(game) {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  
  if (!accessKey) {
    console.error('Unsplash access key not found in environment variables');
    return null;
  }
  
  // Enhanced query map with more specific and relevant search terms
  const queryMap = {
    valorant: "valorant game esports tournament",
    cs2: "counter strike 2 esports championship",
    lol: "league of legends world championship",
    dota: "dota 2 international tournament",
    fortnite: "fortnite battle royale esports",
    overwatch: "overwatch 2 esports league"
  };
  
  const query = queryMap[game] || "esports tournament";
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=5&client_id=${accessKey}`;
  
  console.log(`Fetching from Unsplash: ${url}`);

  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error(`Unsplash API error: ${res.status} - ${res.statusText}`);
      return null;
    }
    
    const data = await res.json();
    console.log(`Unsplash response for ${game}:`, data);
    
    if (data.results && data.results.length > 0) {
      // Return the highest quality image available
      const image = data.results[0];
      const imageUrl = image.urls.regular || image.urls.small;
      console.log(`Selected image URL for ${game}:`, imageUrl);
      return imageUrl;
    }
    
    console.log(`No images found for ${game}`);
    return null;
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return null;
  }
}

// Fallback images for each game in case API fails
export const fallbackImages = {
  valorant: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  cs2: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
  lol: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
  dota: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
  fortnite: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
  overwatch: "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?auto=format&fit=crop&w=1200&q=80"
}; 