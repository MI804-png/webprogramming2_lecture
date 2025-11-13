#!/bin/bash

# Exit on error
set -e

echo "Setting up Laravel application..."

# Create storage directories if they don't exist
mkdir -p storage/logs
mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions  
mkdir -p storage/framework/views
mkdir -p bootstrap/cache
mkdir -p database

# Set permissions
chmod -R 755 storage || true
chmod -R 755 bootstrap/cache || true

# Create database file if it doesn't exist
if [ ! -f database/database.sqlite ]; then
    echo "Creating SQLite database..."
    touch database/database.sqlite
    chmod 664 database/database.sqlite || true
fi

# Clear any existing caches
echo "Clearing caches..."
php artisan config:clear || true
php artisan route:clear || true  
php artisan view:clear || true

# Run migrations
echo "Running database migrations..."
php artisan migrate --force || true

# Seed the database if it's empty
echo "Checking if database needs seeding..."
USER_COUNT=$(php artisan tinker --execute="echo \App\Models\User::count();" 2>/dev/null | tail -n1 || echo "0")
if [ "$USER_COUNT" = "0" ]; then
    echo "Seeding database..."
    php artisan db:seed --force || true
fi

echo "Caching configuration..."
# Cache for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Starting Laravel server..."
# Start the server
exec php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
