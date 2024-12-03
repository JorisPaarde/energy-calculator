import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import archiver from 'archiver';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create public directory if it doesn't exist
const publicDir = join(__dirname, '../public/wp-plugin');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create dist-wp directory if it doesn't exist
const wpDistDir = join(__dirname, '../dist-wp');
if (!fs.existsSync(wpDistDir)) {
  fs.mkdirSync(wpDistDir);
}

// Create a write stream for our zip file
const output = fs.createWriteStream(join(wpDistDir, 'energy-calculator.zip'));
const publicOutput = fs.createWriteStream(join(publicDir, 'energy-calculator.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

output.on('close', () => {
  fs.copyFileSync(
    join(wpDistDir, 'energy-calculator.zip'),
    join(publicDir, 'energy-calculator.zip')
  );
  console.log(`WordPress plugin zip created and copied to public directory`);
});

archive.on('error', (err) => {
  throw err;
});

// Pipe archive data to the output file
archive.pipe(output);

// Add the PHP plugin file
archive.file(join(__dirname, '../energy-calculator.php'), { 
  name: 'energy-calculator.php' 
});

// Add readme.txt for WordPress plugin repository
archive.file(join(__dirname, '../readme.txt'), { 
  name: 'readme.txt' 
});

// Finalize the archive
archive.finalize(); 