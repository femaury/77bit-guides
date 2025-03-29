import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Array of routes to prerender (you'll need to expand this based on your guides)
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
  
  // Start the preview server
  console.log('Starting preview server...');
  const server = execSync('npm run preview -- --port 5173', { 
    stdio: 'pipe',
    detached: true
  });
  
  // Give the server time to start
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    // Launch puppeteer
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: 'new', // Use the new headless mode
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    for (const route of routesToPrerender) {
      console.log(`Prerendering ${route}...`);
      const page = await browser.newPage();
      
      // Navigate to the page
      await page.goto(`http://localhost:5173${route}`, {
        waitUntil: 'networkidle2'
      });
      
      // Wait some time to ensure all React effects have run
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
      
      // Get the HTML content
      let html = await page.content();
      
      // Clean up some paths
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
      
      // Determine the output path
      let outputPath;
      if (route === '/') {
        outputPath = path.join(__dirname, '../dist/index.html');
      } else {
        // For /guides/X paths, we create a folder structure
        const dirPath = path.join(__dirname, '../dist', route);
        fs.mkdirSync(dirPath, { recursive: true });
        outputPath = path.join(dirPath, 'index.html');
      }
      
      // Write the file
      fs.writeFileSync(outputPath, html);
      console.log(`Saved ${outputPath}`);
      
      await page.close();
    }
    
    await browser.close();
    console.log('Prerendering complete!');
    
  } catch (error) {
    console.error('Error during prerendering:', error);
  } finally {
    // Kill the preview server
    if (server.pid) {
      try {
        process.kill(-server.pid);
      } catch (e) {
        console.error('Failed to kill server:', e);
      }
    }
  }
}

prerender().catch(console.error); 