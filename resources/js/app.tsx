import '../css/app.css';

import axios from 'axios';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Set up CSRF token for axios and Inertia requests
const getCSRFToken = () => {
    const token = document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
    return token ? token.content : '';
};

const refreshCSRFToken = async () => {
    try {
        const response = await fetch('/csrf-token');
        const data = await response.json();
        const tokenMeta = document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
        if (tokenMeta && data.csrf_token) {
            tokenMeta.content = data.csrf_token;
            axios.defaults.headers.common['X-CSRF-TOKEN'] = data.csrf_token;
        }
        return data.csrf_token;
    } catch (error) {
        console.warn('Failed to refresh CSRF token:', error);
        return getCSRFToken();
    }
};

// Initial CSRF token setup
let csrfToken = getCSRFToken();
if (csrfToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}

// Set up axios interceptor to handle 419 errors
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 419) {
            // CSRF token expired, refresh it
            csrfToken = await refreshCSRFToken();
            // Retry the original request
            if (error.config) {
                error.config.headers['X-CSRF-TOKEN'] = csrfToken;
                return axios.request(error.config);
            }
        }
        return Promise.reject(error);
    }
);

// Set up CSRF token for Inertia.js requests
router.on('before', (event: any) => {
    if (event.detail.visit.method.toLowerCase() !== 'get') {
        const currentToken = getCSRFToken();
        
        // Add CSRF token to headers
        event.detail.visit.headers = event.detail.visit.headers || {};
        event.detail.visit.headers['X-CSRF-TOKEN'] = currentToken;
        
        // Also add CSRF token to form data
        if (event.detail.visit.data) {
            if (typeof event.detail.visit.data === 'object' && event.detail.visit.data !== null) {
                event.detail.visit.data._token = currentToken;
            }
        } else {
            event.detail.visit.data = { _token: currentToken };
        }
    }
});

// Handle Inertia errors, particularly 419 CSRF errors
router.on('error', async (event: any) => {
    if (event.detail.errors && event.detail.errors.message === 'CSRF token mismatch.') {
        console.log('CSRF token mismatch detected, refreshing token...');
        await refreshCSRFToken();
        // Show user-friendly message
        if (typeof window !== 'undefined' && window.alert) {
            window.alert('Session expired. Please try again.');
        }
    }
});

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
