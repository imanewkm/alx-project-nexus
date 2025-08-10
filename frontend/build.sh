#!/bin/bash
set -e

echo "Starting Expo Metro build..."
export EXPO_USE_METRO=1
npx expo export --platform web --output-dir dist --clear
echo "Build completed successfully!"
