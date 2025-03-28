# 77-bit Guides

A community-driven guides repository for the 77-bit game. This application serves as a temporary solution until a full-fledged wiki is developed.

## Features

- 📚 Comprehensive game guides for 77-bit
- 📱 Responsive design for all devices
- 🎨 Beautiful UI based on the 77-bit game style
- 📝 Markdown content directly from Notion
- 🔍 SEO-optimized for better discoverability

## Tech Stack

- **Framework**: React with Vite
- **Styling**: TailwindCSS
- **Components**: Radix UI
- **Routing**: React Router
- **Content**: Markdown exported from Notion
- **Deployment**: Ready for Vercel, Netlify, or similar platforms

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/77bit-guides.git
   cd 77bit-guides
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Adding Guides

Guides are stored as Markdown files in the `public/content/` directory. You can easily export these files from Notion.

### Using the Helper Script

We provide a helper script to add new guides:

```bash
node scripts/add-guide.js --title "Your Guide Title" --description "A short description" --category "beginner" --content-file "./path-to-file.md" --assets-folder "./path-to-assets-folder"
```

### Manual Process

1. Export content from Notion as Markdown
2. Save the file in `public/content/`
3. If your guide has images, add the assets folder to `public/content/`
4. Add a new entry to the `guides` array in `src/data/guides.ts`
5. Add a corresponding image in `public/images/`

For detailed instructions, see [Guide Content Management](./docs/GUIDE_MANAGEMENT.md).

## Deployment

This project is ready to be deployed to any static site hosting service:

```bash
# Build the project
npm run build

# Preview the build locally
npm run preview
```

## Future Improvements

- Implement search functionality
- Add social sharing features
- Develop user-contributed guides
- Create a full-fledged wiki with user accounts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- All guide content belongs to the 77-bit community
- This is an unofficial fan project and is not affiliated with the official 77-bit game
