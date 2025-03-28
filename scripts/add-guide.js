#!/usr/bin/env node

/**
 * This script helps you add a new guide to the 77bit-guides app.
 * 
 * Usage:
 * node scripts/add-guide.js --title "Guide Title" --description "Guide description" --content-file "./path-to-file.md" --assets-folder "./path-to-assets"
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const crypto = require('crypto');

const copyFileAsync = promisify(fs.copyFile);
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);

// Parse command line arguments
const args = process.argv.slice(2);
const options = {};

for (let i = 0; i < args.length; i += 2) {
  if (args[i].startsWith('--')) {
    options[args[i].substring(2)] = args[i + 1];
  }
}

// Validate required arguments
const requiredArgs = ['title', 'description', 'content-file'];
const missingArgs = requiredArgs.filter(arg => !options[arg]);

if (missingArgs.length > 0) {
  console.error('Error: Missing required arguments: ' + missingArgs.join(', '));
  console.error(`
Usage:
  node scripts/add-guide.js --title "Guide Title" --description "Guide description" --content-file "./path-to-file.md" --assets-folder "./path-to-assets"
  `);
  process.exit(1);
}

// Generate slug from title
const generateSlug = (title) => {
  return title.toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
};

// Copy directory recursively
async function copyDirRecursive(source, target) {
  await mkdirAsync(target, { recursive: true });
  
  // Get all files and directories in the source
  const entries = await readdirAsync(source);
  
  for (const entry of entries) {
    const sourcePath = path.join(source, entry);
    const targetPath = path.join(target, entry);
    
    const stats = await statAsync(sourcePath);
    
    if (stats.isDirectory()) {
      // Recursive call for directories
      await copyDirRecursive(sourcePath, targetPath);
    } else {
      // Copy files
      await copyFileAsync(sourcePath, targetPath);
    }
  }
}

// Main function
async function addGuide() {
  try {
    const slug = generateSlug(options.title);
    const id = crypto.randomUUID().split('-')[0]; // Use first part of UUID as ID
    const contentSourcePath = path.resolve(options['content-file']);
    const contentTargetPath = path.join(process.cwd(), 'public', 'content', `${slug}.md`);
    
    // 1. Copy markdown file to public/content directory
    await copyFileAsync(contentSourcePath, contentTargetPath);
    console.log(`✅ Copied markdown file to: ${contentTargetPath}`);
    
    // 2. If assets folder is provided, copy it
    let assetsBasePath = '';
    if (options['assets-folder']) {
      const assetsSourcePath = path.resolve(options['assets-folder']);
      const assetsFolderName = path.basename(assetsSourcePath);
      const assetsTargetPath = path.join(process.cwd(), 'public', 'content', assetsFolderName);
      
      await copyDirRecursive(assetsSourcePath, assetsTargetPath);
      console.log(`✅ Copied assets folder to: ${assetsTargetPath}`);
      
      assetsBasePath = `/content/${assetsFolderName}`;
    }
    
    // 3. Update guides.ts to include the new guide
    const guidesFilePath = path.join(process.cwd(), 'src', 'data', 'guides.ts');
    const guidesContent = await readFileAsync(guidesFilePath, 'utf8');
    
    // Find the guides array closing bracket
    const guidesArrayEndIndex = guidesContent.indexOf('];');
    if (guidesArrayEndIndex === -1) {
      throw new Error('Could not find guides array in guides.ts');
    }
    
    // Create new guide entry
    let newGuideEntry = `
  {
    id: '${id}',
    title: '${options.title.replace(/'/g, "\\'")}',
    description: '${options.description.replace(/'/g, "\\'")}',
    image: '/images/guide-default.jpg', // Replace with actual image path later
    slug: '${slug}',
    contentPath: '/content/${slug}.md',
    lastUpdated: new Date(),`;
    
    // Add assetBasePath if provided
    if (assetsBasePath) {
      newGuideEntry += `
    assetBasePath: '${assetsBasePath}'`;
    }
    
    // Close the guide entry
    newGuideEntry += `
  },`;
    
    // Insert the new guide entry into the guides array
    const updatedGuidesContent = 
      guidesContent.slice(0, guidesArrayEndIndex) +
      newGuideEntry +
      guidesContent.slice(guidesArrayEndIndex);
    
    await writeFileAsync(guidesFilePath, updatedGuidesContent);
    console.log(`✅ Updated guides.ts with new guide: ${options.title}`);
    
    console.log('\n🎉 Guide added successfully!');
    console.log(`
Next steps:
1. Add a proper image for the guide at: public/images/guide-${slug}.jpg
2. Update the image path in src/data/guides.ts
3. Run the development server to verify the guide appears correctly
    `);
  } catch (error) {
    console.error('Error adding guide:', error);
    process.exit(1);
  }
}

addGuide(); 