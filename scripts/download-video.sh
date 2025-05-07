#!/bin/bash

# Create videos directory if it doesn't exist
mkdir -p public/videos

# Remove existing video files
rm -f public/videos/*.mp4

# Download a gaming background video
echo "Downloading video..."
curl -L "https://assets.mixkit.co/videos/preview/mixkit-gaming-studio-with-neon-lights-2078-large.mp4" -o public/videos/gaming-bg.mp4

# Check if download was successful
if [ -f "public/videos/gaming-bg.mp4" ]; then
    echo "Video downloaded successfully!"
    ls -l public/videos/gaming-bg.mp4
else
    echo "Error: Video download failed"
    exit 1
fi 