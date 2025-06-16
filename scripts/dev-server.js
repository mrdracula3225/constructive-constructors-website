const express = require('express');
const path = require('path');
const chokidar = require('chokidar');
const { execSync } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '../src')));
app.use(express.static(path.join(__dirname, '../public')));

// Watch for changes in source files
const watcher = chokidar.watch([
  path.join(__dirname, '../src/**/*.html'),
  path.join(__dirname, '../src/**/*.css'),
  path.join(__dirname, '../src/**/*.js')
]);

// Rebuild Tailwind CSS on changes
watcher.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  try {
    execSync('npx tailwindcss -i ./src/styles/input.css -o ./src/styles/styles.css', { stdio: 'inherit' });
    console.log('Tailwind CSS rebuilt successfully');
  } catch (error) {
    console.error('Error rebuilding Tailwind CSS:', error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Development server running at http://localhost:${PORT}`);
  console.log('Watching for file changes...');
}); 