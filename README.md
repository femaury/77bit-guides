# 77-bit Guides

A community-driven guides repository for the 77-bit game. This application serves as a temporary solution until a full-fledged wiki is developed.

## Features

- 📚 Comprehensive game guides for 77-bit
- 📱 Responsive design for all devices
- 🎨 Beautiful UI based on the 77-bit game style
- 📝 Markdown support for rich content formatting
- 🔍 SEO-optimized for better discoverability

## Tech Stack

- **Framework**: React with Vite
- **Styling**: TailwindCSS
- **Components**: Radix UI
- **Routing**: React Router
- **Content**: Markdown with react-markdown
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

For the initial version, guides are stored as hardcoded data in `src/data/guides.ts`. To add a new guide:

1. Add a new entry to the `guides` array in `src/data/guides.ts`
2. Make sure to include all required fields (id, title, description, image, slug, category, content)
3. Write the guide content in Markdown format
4. Add a corresponding image in `public/images/`

## Deployment

This project is ready to be deployed to any static site hosting service:

```bash
# Build the project
npm run build

# Preview the build locally
npm run preview
```

## Future Improvements

- Add a proper CMS for easier content management
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
