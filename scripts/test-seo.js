// scripts/test-seo.js
import puppeteer from 'puppeteer';

async function testSEO() {
  // Start the server in development mode (assume it's already running)
  
  try {
    // Launch puppeteer
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: false, // Open a visible browser for demo purposes
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: null,
    });
    
    // Target guide URL
    const url = 'http://localhost:5173/guides/tutorial';
    
    console.log(`Testing SEO for ${url}...`);
    const page = await browser.newPage();
    
    // Navigate to the page
    await page.goto(url, {
      waitUntil: 'networkidle2'
    });
    
    // Wait for React effects to run
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Extract metadata
    const metadata = await page.evaluate(() => {
      // Get all meta tags
      const metaTags = Array.from(document.querySelectorAll('meta'));
      const metaData = {};
      
      metaTags.forEach(tag => {
        const name = tag.getAttribute('name') || tag.getAttribute('property');
        const content = tag.getAttribute('content');
        if (name && content) {
          metaData[name] = content;
        }
      });
      
      // Get title
      metaData['title'] = document.title;
      
      // Get canonical link
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        metaData['canonical'] = canonical.getAttribute('href');
      }
      
      // SEO data from window
      // @ts-expect-error - This is for our test process
      metaData['__SEO_DATA__'] = window.__SEO_DATA__;
      
      return metaData;
    });
    
    // Display results
    console.log('==== SEO Metadata ====');
    console.log(JSON.stringify(metadata, null, 2));
    console.log('=====================');
    
    // Now take a screenshot to visually verify
    await page.screenshot({ path: './seo-test-screenshot.png', fullPage: true });
    console.log('Screenshot saved to seo-test-screenshot.png');
    
    // Keep browser open for manual inspection
    console.log('Browser is open for manual inspection. Press Ctrl+C to exit.');
    
    // Check HTML head content
    const headContent = await page.evaluate(() => {
      return document.head.innerHTML;
    });
    
    console.log('==== HTML Head Content ====');
    console.log(headContent);
    console.log('==========================');
    
  } catch (error) {
    console.error('Error during SEO test:', error);
  }
}

testSEO().catch(console.error); 