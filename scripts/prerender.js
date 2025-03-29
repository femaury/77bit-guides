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
      
      // Read the existing index.html file
      let indexContent;
      try {
        indexContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
      } catch (error) {
        console.error(`Error reading index.html: ${error.message}`);
        throw error;
      }
      
      // Create a new page
      const page = await browser.newPage();
      
      // Set content to our index.html
      await page.setContent(indexContent, {
        waitUntil: 'networkidle0',
      });
      
      // Set the route for the page to render
      await page.evaluate((currentRoute) => {
        // This will be executed in the browser context
        window.history.pushState({}, '', currentRoute);
        
        // Dispatch a popstate event to trigger route change
        const popStateEvent = new PopStateEvent('popstate');
        window.dispatchEvent(popStateEvent);
        
        // Let React router handle the new URL
        return new Promise(resolve => setTimeout(resolve, 500));
      }, route);
      
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
      
      // Remove any existing meta tags
      html = html.replace(/<meta\s+(?:name|property)=["'](?:description|og:title|og:description|og:image|og:url|og:type|twitter:card|twitter:title|twitter:description|twitter:image)["']\s+content=["'][^"']*["']\s*\/?>/g, '');
      html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/g, '');
      
      // Inject proper meta tags before </head>
      html = html.replace('</head>', `
    <meta name="description" content="${seoData.description}">
    <meta property="og:title" content="${seoData.title}">
    <meta property="og:description" content="${seoData.description}">
    <meta property="og:image" content="${seoData.image}">
    <meta property="og:url" content="${seoData.url}">
    <meta property="og:type" content="${seoData.type}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${seoData.title}">
    <meta name="twitter:description" content="${seoData.description}">
    <meta name="twitter:image" content="${seoData.image}">
    <link rel="canonical" href="${seoData.canonical}">
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