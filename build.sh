#!/bin/bash
set -e

echo "Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader

echo "Installing Node.js dependencies..."
npm ci

echo "Building frontend assets..."
npm run build

echo "Setting up Laravel directories..."
mkdir -p storage/framework/{sessions,views,cache} storage/logs bootstrap/cache
chmod -R 755 storage bootstrap/cache || true

echo "Build completed successfully!"
