# Constructive Constructors Website

A modern, responsive website for a construction company built with HTML, Tailwind CSS, and JavaScript.

## Project Structure

```
constructive-constructors/
├── src/                    # Source files
│   ├── assets/            # Static assets
│   │   └── images/        # Image files
│   ├── components/        # HTML components
│   │   ├── index.html     # Home page
│   │   ├── about.html     # About page
│   │   ├── services.html  # Services page
│   │   ├── projects.html  # Projects page
│   │   └── contact.html   # Contact page
│   ├── styles/           # CSS files
│   │   ├── input.css     # Tailwind input
│   │   └── styles.css    # Compiled CSS
│   ├── scripts/          # JavaScript files
│   │   ├── main.js       # Main JavaScript
│   │   └── projects.js   # Projects functionality
│   ├── data/             # Data files
│   │   └── projects.json # Project data
│   └── config/           # Configuration files
│       └── manifest.json # Web manifest
├── public/               # Public files
│   ├── robots.txt       # Robots file
│   ├── sitemap.xml      # Sitemap
│   └── site.webmanifest # Web manifest
├── scripts/             # Build scripts
│   ├── copy-assets.js   # Asset copying
│   └── optimize-images.js # Image optimization
├── dist/                # Build output
├── package.json         # Project configuration
├── tailwind.config.js   # Tailwind configuration
└── README.md           # Project documentation
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Optimize images:
   ```bash
   npm run optimize-images
   ```

## Development Workflow

1. **Adding New Pages**:
   - Create new HTML file in `src/components/`
   - Update navigation in all pages
   - Add page to sitemap.xml

2. **Adding New Projects**:
   - Add project images to `src/assets/images/projects/`
   - Add project data to `src/data/projects.json`
   - Run image optimization: `npm run optimize-images`

3. **Styling**:
   - Add custom styles to `src/styles/input.css`
   - Configure theme in `tailwind.config.js`

4. **JavaScript**:
   - Add new scripts to `src/scripts/`
   - Import in relevant HTML files

## Build Process

1. **Development**:
   - Watches for changes in source files
   - Compiles Tailwind CSS
   - Serves files locally

2. **Production**:
   - Minifies CSS
   - Optimizes images
   - Copies assets to dist folder
   - Generates production-ready files

## Technologies Used

- HTML5
- Tailwind CSS
- JavaScript (ES6+)
- Google Apps Script
- Sharp (for image optimization)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License 