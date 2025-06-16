const fs = require('fs-extra');
const path = require('path');

// Define source and destination paths
const paths = {
  public: {
    src: 'public',
    dest: 'dist/public'
  },
  assets: {
    src: 'src/assets',
    dest: 'dist/assets'
  },
  components: {
    src: 'src/components',
    dest: 'dist'
  }
};

// Copy files
async function copyFiles() {
  try {
    // Create dist directory if it doesn't exist
    await fs.ensureDir('dist');

    // Copy public files
    await fs.copy(paths.public.src, paths.public.dest);

    // Copy assets
    await fs.copy(paths.assets.src, paths.assets.dest);

    // Copy HTML files
    await fs.copy(paths.components.src, paths.components.dest, {
      filter: (src) => {
        return path.extname(src) === '.html';
      }
    });

    console.log('Assets copied successfully!');
  } catch (err) {
    console.error('Error copying assets:', err);
    process.exit(1);
  }
}

copyFiles(); 