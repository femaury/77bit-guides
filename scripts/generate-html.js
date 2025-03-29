import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Base URL of your site
const siteUrl = 'https://guides.77-bit.wiki';

async function generate() {
  // Build the app first
  console.log('Building the app...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Get the path to the dist directory
  const distDir = path.resolve(__dirname, '../dist');
  
  // Read the template HTML file
  const templatePath = path.join(distDir, 'index.html');
  let templateHtml;
  
  try {
    templateHtml = fs.readFileSync(templatePath, 'utf8');
  } catch (error) {
    console.error(`Error reading template HTML: ${error.message}`);
    process.exit(1);
  }
  
  // Read the guides data directly from the JSON file
  let guidesData;
  try {
    const guidesPath = path.join(__dirname, '../src/data/guides.json');
    guidesData = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));
  } catch (error) {
    console.error(`Error reading guides data: ${error.message}`);
    process.exit(1);
  }
  
  // Create routes from guides data
  const routes = [
    // Home page
    {
      path: '/',
      title: '77-bit Guides',
      description: 'Community-created guides for the 77-Bit game. Learn useful tips, game data, mechanics, and more.',
      image: '/images/77bit_wiki.png',
      type: 'website'
    },
    // Guide pages
    ...guidesData.map(guide => ({
      path: `/guides/${guide.slug}`,
      title: guide.title,
      description: guide.description,
      image: guide.image,
      type: 'article'
    }))
  ];
  
  // Process each route
  for (const route of routes) {
    console.log(`Generating HTML for ${route.path}...`);
    
    // Format the title with site name
    const fullTitle = route.path === '/' 
      ? route.title 
      : `${route.title} | 77-bit Guides`;
    
    // Create absolute URLs
    const pageUrl = route.path === '/' 
      ? siteUrl 
      : `${siteUrl}${route.path}`;
    
    const imageUrl = route.image.startsWith('http') 
      ? route.image 
      : `${siteUrl}${route.image}`;
    
    // Create an HTML file with the proper metadata
    const metaTags = `
    <!-- Primary Meta Tags -->
    <meta name="description" content="${route.description}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${route.type}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:title" content="${fullTitle}">
    <meta property="og:description" content="${route.description}">
    <meta property="og:image" content="${imageUrl}">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${pageUrl}">
    <meta name="twitter:title" content="${fullTitle}">
    <meta name="twitter:description" content="${route.description}">
    <meta name="twitter:image" content="${imageUrl}">
    
    <!-- Canonical -->
    <link rel="canonical" href="${pageUrl}">
    `;
    
    // Add the meta tags to the HTML template
    let html = templateHtml;
    
    // Replace the title
    html = html.replace(/<title>.*?<\/title>/, `<title>${fullTitle}</title>`);
    
    // Remove any existing meta tags
    html = html.replace(/<meta\s+(?:name|property)=["'](?:description|og:title|og:description|og:image|og:url|og:type|twitter:card|twitter:title|twitter:description|twitter:image)["'][^>]*>/g, '');
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/g, '');
    
    // Insert our meta tags before </head>
    html = html.replace('</head>', `${metaTags}\n</head>`);
    
    // Determine the output location
    let outputDir;
    if (route.path === '/') {
      outputDir = distDir;
    } else {
      outputDir = path.join(distDir, route.path.slice(1)); // Remove leading slash
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'index.html');
    
    // Write the file
    fs.writeFileSync(outputPath, html);
    console.log(`Created ${outputPath}`);
  }
  
  console.log('HTML generation complete!');
}

generate().catch(error => {
  console.error('Generation failed:', error);
  process.exit(1);
}); 