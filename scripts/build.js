const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// Define paths
const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');
const publicDir = path.join(__dirname, '../public');

// Clean dist directory
console.log('Cleaning dist directory...');
fs.removeSync(distDir);
fs.ensureDirSync(distDir);

// Copy public files
console.log('Copying public files...');
fs.copySync(publicDir, distDir);

// Copy source files
console.log('Copying source files...');
fs.copySync(srcDir, path.join(distDir, 'src'));

// Build Tailwind CSS
console.log('Building Tailwind CSS...');
execSync('npx tailwindcss -i ./src/styles/input.css -o ./dist/src/styles/styles.css --minify', { stdio: 'inherit' });

// Optimize images
console.log('Optimizing images...');
execSync('node scripts/optimize-images.js', { stdio: 'inherit' });

// Copy optimized images to dist
console.log('Copying optimized images...');
fs.copySync(
  path.join(srcDir, 'assets/images/optimized'),
  path.join(distDir, 'src/assets/images/optimized')
);

console.log('Build completed successfully!'); 