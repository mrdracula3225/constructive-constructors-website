const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../images');
const outputDir = path.join(__dirname, '../images/optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Image optimization settings
const settings = {
    webp: {
        quality: 80,
        effort: 6
    },
    jpeg: {
        quality: 80,
        progressive: true
    }
};

// Process each image
async function optimizeImages() {
    const files = fs.readdirSync(sourceDir);
    
    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const inputPath = path.join(sourceDir, file);
            const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
            
            try {
                // Convert to WebP
                await sharp(inputPath)
                    .webp(settings.webp)
                    .toFile(outputPath);
                
                console.log(`✓ Converted ${file} to WebP`);
                
                // Create responsive sizes
                const sizes = [800, 1200, 1600];
                for (const size of sizes) {
                    const responsivePath = path.join(
                        outputDir,
                        file.replace(/\.(jpg|jpeg|png)$/i, `-${size}.webp`)
                    );
                    
                    await sharp(inputPath)
                        .resize(size)
                        .webp(settings.webp)
                        .toFile(responsivePath);
                    
                    console.log(`  ✓ Created ${size}px version`);
                }
            } catch (error) {
                console.error(`✗ Error processing ${file}:`, error);
            }
        }
    }
}

optimizeImages().catch(console.error); 