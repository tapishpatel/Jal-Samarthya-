#!/bin/bash

# Jal Samarthya - Fly.io Deployment Script
# This script automates the deployment process to Fly.io

echo "🌿 Jal Samarthya - Fly.io Deployment Script"
echo "============================================"

# Check if flyctl is installed
if ! command -v flyctl &> /dev/null; then
    echo "❌ flyctl not found. Please install Fly.io CLI first:"
    echo "   curl -L https://fly.io/install.sh | sh"
    exit 1
fi

# Login to Fly.io (if not already logged in)
echo "🔐 Checking Fly.io authentication..."
if ! flyctl auth whoami &> /dev/null; then
    echo "Please log in to Fly.io:"
    flyctl auth login
fi

# Create the app (only on first deployment)
echo "🚀 Creating Fly.io app..."
if ! flyctl apps list | grep -q "jal-samarthya"; then
    flyctl apps create jal-samarthya --generate-name
fi

# Set required environment variables
echo "🔧 Setting environment variables..."
flyctl secrets set \
  DATABASE_URL="your_neon_database_url_here" \
  GEE_API_KEY="your_google_earth_engine_api_key_here" \
  SESSION_SECRET="$(openssl rand -base64 32)"

# Optional: Set object storage variables if needed
# flyctl secrets set \
#   DEFAULT_OBJECT_STORAGE_BUCKET_ID="your_bucket_id" \
#   PRIVATE_OBJECT_DIR="your_private_dir" \
#   PUBLIC_OBJECT_SEARCH_PATHS="your_search_paths"

# Deploy the application
echo "🌍 Deploying to Fly.io..."
flyctl deploy

# Show deployment status
echo "✅ Deployment complete!"
echo "🔗 Your app URL: https://jal-samarthya.fly.dev"
echo "📊 Monitor your app: flyctl status"
echo "📝 View logs: flyctl logs"

echo ""
echo "🔧 Post-deployment checklist:"
echo "1. Update your DATABASE_URL secret with your actual Neon database URL"
echo "2. Update your GEE_API_KEY secret with your Google Earth Engine API key"
echo "3. Test the application at https://jal-samarthya.fly.dev"
echo "4. Monitor logs for any issues: flyctl logs"