#!/bin/bash

# Create videos directory if it doesn't exist
mkdir -p public/videos

# Download gaming background videos from Pexels
curl -L "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" -o public/videos/gaming-bg-1.mp4
curl -L "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" -o public/videos/gaming-bg-2.mp4
curl -L "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" -o public/videos/gaming-bg-3.mp4

echo "Videos downloaded successfully!" 