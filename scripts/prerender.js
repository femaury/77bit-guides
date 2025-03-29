import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Array of routes to prerender
const routesToPrerender = [
  '/',
  '/guides/how-to-play-77-bit',
  '/guides/tutorial',
  '/guides/choosing-a-class',
  '/guides/all-about-weapons'
];

async function prerender() {
  // Build the app first
  console.log('Building the app...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Starting prerendering process...');
  
  try {
    // Get the absolute path to the dist directory
    const distDir = path.resolve(__dirname, '../dist');
    
    // Launch puppeteer
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    // Start a new server that we'll control directly
    const server = await browser.createBrowserContext();
    
    for (const route of routesToPrerender) {
      console.log(`Prerendering ${route}...`);
      
      // Create the file path where this route's content will be saved
      const outputDir = route === '/' 
        ? distDir 
        : path.join(distDir, route);
      
      const outputPath = path.join(outputDir, 'index.html');
      
      // Create directories if they don't exist
      if (route !== '/') {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Create a data URL with the index.html content
      let indexContent;
      try {
        indexContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
      } catch (error) {
        console.error(`Error reading index.html: ${error.message}`);
        throw error;
      }
      
      // Create a new page
      const page = await browser.newPage();
      
      // Load the file directly
      const indexPath = `file://${path.join(distDir, 'index.html')}`;
      await page.goto(indexPath, {
        waitUntil: 'networkidle0'
      });
      
      // Update the URL and force navigation to the route
      await page.evaluate((targetRoute) => {
        // In client-side routing, we often have a mechanism to handle routes
        window.location.hash = targetRoute;
        
        // If using React Router, you might need to trigger route change differently
        // This dispatches hashchange which many routers listen to
        window.dispatchEvent(new HashChangeEvent('hashchange'));
        
        // Let the app update
        return new Promise(resolve => setTimeout(resolve, 500));
      }, route === '/' ? '/' : route);
      
      // Wait for the page content to load
      await page.waitForSelector('#root', { timeout: 5000 });
      
      // Additional wait for React to render
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Extract the SEO data
      const seoData = await page.evaluate(() => {
        // Try to get the data from window.__SEO_DATA__
        // @ts-expect-error - This is for our build process
        const windowData = window.__SEO_DATA__;
        
        // If that's not available, extract from meta tags directly
        if (!windowData) {
          const data = {};
          data.title = document.title;
          
          // Get meta description
          const descriptionTag = document.querySelector('meta[name="description"]');
          data.description = descriptionTag ? descriptionTag.getAttribute('content') : '';
          
          // Get OG image
          const ogImageTag = document.querySelector('meta[property="og:image"]');
          data.image = ogImageTag ? ogImageTag.getAttribute('content') : '';
          
          // Get OG URL
          const ogUrlTag = document.querySelector('meta[property="og:url"]');
          data.url = ogUrlTag ? ogUrlTag.getAttribute('content') : '';
          
          // Get OG type
          const ogTypeTag = document.querySelector('meta[property="og:type"]');
          data.type = ogTypeTag ? ogTypeTag.getAttribute('content') : 'website';
          
          // Get canonical
          const canonicalTag = document.querySelector('link[rel="canonical"]');
          data.canonical = canonicalTag ? canonicalTag.getAttribute('href') : '';
          
          return data;
        }
        
        return windowData;
      });
      
      // Get the current HTML content
      let html = await page.content();
      
      // Clean up some paths (if needed)
      html = html.replace(/\/_assets\//g, '/assets/');
      
      // More thorough removal of existing meta tags, including those with data-rh attributes
      html = html.replace(/<meta\s+(?:name|property)=["'](?:description|og:title|og:description|og:image|og:url|og:type|twitter:card|twitter:title|twitter:description|twitter:image)["'][^>]*>/g, '');
      html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/g, '');
      
      // Define the base URL using the correct domain from the HTML
      const baseUrl = 'https://guides.77-bit.wiki';
      
      // Create full URLs for paths
      const pageUrl = route === '/' 
        ? baseUrl 
        : `${baseUrl}${route}`;
      
      // Format the image URL properly
      let imageUrl = seoData.image;
      if (imageUrl && !imageUrl.startsWith('http')) {
        // Handle relative image URLs
        imageUrl = imageUrl.startsWith('/') 
          ? `${baseUrl}${imageUrl}` 
          : `${baseUrl}/${imageUrl}`;
      }
      
      // Use a default image if none is provided
      if (!imageUrl) {
        imageUrl = `${baseUrl}/images/default-og-image.png`;
      }
      
      // Ensure we have description
      const description = seoData.description || 
        'Guides and tutorials for playing 77 Bit, the turn-based dungeon crawler.';
      
      // Inject proper meta tags before </head> with data-prerender attribute to identify our tags
      html = html.replace('</head>', `
    <!-- Primary Meta Tags -->
    <meta name="description" content="${description}" data-prerender="true">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${seoData.type || 'website'}" data-prerender="true">
    <meta property="og:url" content="${pageUrl}" data-prerender="true">
    <meta property="og:title" content="${seoData.title}" data-prerender="true">
    <meta property="og:description" content="${description}" data-prerender="true">
    <meta property="og:image" content="${imageUrl}" data-prerender="true">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" data-prerender="true">
    <meta name="twitter:url" content="${pageUrl}" data-prerender="true">
    <meta name="twitter:title" content="${seoData.title}" data-prerender="true">
    <meta name="twitter:description" content="${description}" data-prerender="true">
    <meta name="twitter:image" content="${imageUrl}" data-prerender="true">
    
    <!-- Canonical -->
    <link rel="canonical" href="${pageUrl}" data-prerender="true">
    
    <!-- Script to prevent React Helmet from adding duplicate tags -->
    <script>
      // Flag that indicates metadata is already present from prerendering
      window.__PRERENDERED_METADATA__ = true;
    </script>
</head>`);
      
      // Write the file
      fs.writeFileSync(outputPath, html);
      console.log(`Saved ${outputPath}`);
      
      await page.close();
    }
    
    await browser.close();
    console.log('Prerendering complete!');
    
  } catch (error) {
    console.error('Error during prerendering:', error);
    throw error; // Re-throw to properly fail the process
  }
}

prerender().catch(error => {
  console.error('Prerender process failed:', error);
  process.exit(1); // Exit with error code to fail CI
}); 