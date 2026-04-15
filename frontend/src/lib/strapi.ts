const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchStrapi(endpoint: string, options: RequestInit = {}) {
    const isDev = process.env.NODE_ENV === 'development';
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

        const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
            ...options,
            signal: controller.signal,
            cache: isDev ? 'no-store' : 'no-store', // Disable caching for more reliable real-time data
            next: { 
                revalidate: 0, // Disable ISR for real-time updates
                ...options.next 
            }
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error(`Strapi API Error: ${response.status} ${response.statusText} at ${endpoint}`);
            throw new Error(`Strapi response: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data || [];
    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.error(`Fetch timeout for ${endpoint}`);
        } else {
            console.error(`Fetch error for ${endpoint}:`, error.message);
        }
        return [];
    }
}

export function getStrapiMedia(url: string | null | undefined) {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('//')) return url;
    return `${STRAPI_URL}${url}`;
}
