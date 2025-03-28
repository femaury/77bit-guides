# Guide Content Management

This document explains how to manage guide content in the 77-bit Guides application.

## Overview

The guide content is stored as Markdown files in the `public/content/` directory. These files can be exported directly from Notion, making it easy to maintain and update content.

## Exporting Content from Notion

1. Create or edit your guide in Notion
2. Use the "Export" function in Notion:
   - Click the "..." menu in the top-right corner
   - Select "Export"
   - Choose "Markdown & CSV" as the export format
   - Make sure "Include subpages" is checked if your guide has subpages
   - Click "Export"
3. Unzip the downloaded file
4. You'll get a Markdown (.md) file and possibly a folder with the same name containing images and other assets

## Adding a New Guide

We provide a helper script to add new guides to the application:

```bash
node scripts/add-guide.js --title "Your Guide Title" --description "A short description" --category "beginner" --content-file "./path-to-file.md" --assets-folder "./path-to-assets-folder"
```

Valid categories are:
- beginner
- intermediate 
- advanced
- mechanics
- quests

### Manual Process (Alternative)

If you prefer to add guides manually:

1. Export the Markdown content from Notion as described above
2. Save the file in the `public/content/` directory with a slug-friendly name (e.g., `your-guide-title.md`)
3. If you have an assets folder, copy it to `public/content/` as well
4. Add a new entry to the `guides` array in `src/data/guides.ts` with the appropriate metadata, including the `assetBasePath` if needed
5. Add a suitable image for the guide in `public/images/`

## Why Markdown?

We chose Markdown over HTML exports from Notion for several key reasons:

- **Clean Content**: Markdown provides clean content without embedded styling that might conflict with our site's theme
- **Better Integration**: Our custom styling works seamlessly with Markdown content
- **Easier Maintenance**: Markdown files are easier to read and edit if needed
- **Performance**: Markdown files are more lightweight and process faster
- **Consistent Styling**: Ensuring all guides have a consistent look and feel with our site's design

## Styling Guide Content

Markdown content is styled using our customized MarkdownContent component which preserves our site's theme.

If you need to adjust the appearance of specific elements, you can modify the styles in `src/index.css`.

## Best Practices

1. **Use Notion's formatting tools**: Headings, lists, tables, code blocks, and other formatting in Notion will be preserved when exported as Markdown.

2. **Images**: Make sure to provide the assets folder path when adding the guide.

3. **Preview before publishing**: Always preview the guide on your local development environment before deploying to production.

4. **Unique slugs**: Ensure each guide has a unique slug derived from its title.

5. **Consistent formatting**: Try to maintain a consistent formatting style across all guides.

## Troubleshooting

If your content doesn't appear correctly in the app:

1. Check that the Markdown file is properly placed in the `public/content/` directory
2. Verify that the `contentPath` in `guides.ts` correctly points to your file
3. If using images, ensure that `assetBasePath` is set correctly and points to the folder containing your images
4. Review the browser console for any errors loading the content
5. If styling is off, you may need to adjust the CSS in `src/index.css` 