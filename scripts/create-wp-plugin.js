import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import archiver from 'archiver';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create dist-wp directory if it doesn't exist
const wpDistDir = join(__dirname, '../dist-wp');
if (!fs.existsSync(wpDistDir)) {
  fs.mkdirSync(wpDistDir);
}

// Ensure public/wp-plugin directory exists
const publicWPDir = join(__dirname, '../public/wp-plugin');
if (!fs.existsSync(publicWPDir)) {
  fs.mkdirSync(publicWPDir, { recursive: true });
}

// Create a write stream for our zip file
const zipPath = join(wpDistDir, 'energy-calculator.zip');
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

// Listen for all archive data to be written
output.on('close', function() {
  try {
    console.log(`WordPress plugin zip created in ${wpDistDir}`);
    console.log(`Total bytes: ${archive.pointer()}`);

    // Copy to dist/wp-plugin for GitHub Pages
    const distWPDir = join(__dirname, '../dist/wp-plugin');
    if (!fs.existsSync(distWPDir)) {
      fs.mkdirSync(distWPDir, { recursive: true });
    }
    
    fs.copyFileSync(zipPath, join(distWPDir, 'energy-calculator.zip'));
    console.log('Copied zip to dist/wp-plugin directory');
    
    // Copy to public/wp-plugin for git tracking
    fs.copyFileSync(zipPath, join(publicWPDir, 'energy-calculator.zip'));
    console.log('Copied zip to public/wp-plugin directory');
  } catch (err) {
    console.error('Error copying zip file:', err);
    process.exit(1);
  }
});

// Good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('Warning during archiving:', err);
  } else {
    // throw error to stop the script
    throw err;
  }
});

// Good practice to catch this error explicitly
archive.on('error', function(err) {
  console.error('Error during archiving:', err);
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add the PHP plugin file
archive.file(join(__dirname, '../energy-calculator.php'), { 
  name: 'energy-calculator/energy-calculator.php' 
});

// Create assets directory structure
const distDir = join(__dirname, '../dist');

// Add all JS files from dist
if (fs.existsSync(distDir)) {
  const jsFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.js'));
  jsFiles.forEach(file => {
    archive.file(join(distDir, file), {
      name: `energy-calculator/assets/js/${file}`
    });
  });

  // Add all CSS files from dist
  const cssFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.css'));
  cssFiles.forEach(file => {
    archive.file(join(distDir, file), {
      name: `energy-calculator/assets/css/${file}`
    });
  });

  // Add any assets from dist/assets if it exists
  const assetsDir = join(distDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    archive.directory(assetsDir, 'energy-calculator/assets');
  }
}

// Add readme.txt for WordPress plugin repository
const readmeContent = `=== Energy Calculator ===
Contributors: jpwebcreation
Tags: energy label, calculator, utilities, energy efficiency, building energy
Requires at least: 5.0
Tested up to: 6.4
Stable tag: ${JSON.parse(fs.readFileSync(join(__dirname, '../package.json'))).version}
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Generate energy label indications for buildings based on user input. Created by JPwebcreation (www.jpwebcreation.nl).

== Description ==
The Energy Calculator plugin helps users generate an energy label indication for their building based on various input parameters. This tool provides a quick and easy way to get an indication of a building's energy efficiency rating.

Created by JPwebcreation (www.jpwebcreation.nl), this calculator offers:
* Simple and intuitive interface
* Instant energy label indication
* Visual representation of the energy label
* Easy to integrate using shortcode

Download the latest version: [Energy Calculator Plugin](https://energy-calculator-ced.pages.dev/wp-plugin/energy-calculator.zip)

== Installation ==
1. Download the plugin from: https://energy-calculator-ced.pages.dev/wp-plugin/energy-calculator.zip
2. Upload the plugin files to the /wp-content/plugins/energy-calculator directory
3. Activate the plugin through the 'Plugins' screen in WordPress
4. Use the shortcode [energy_calculator] to display the calculator on any page or post

== Frequently Asked Questions ==
= Is this an official energy label? =
No, this calculator provides an indication only. For an official energy label, please consult an authorized energy advisor.

= How do I contact the developer? =
You can reach out to JPwebcreation at www.jpwebcreation.nl

= Where can I download the latest version? =
You can always download the latest version from:
https://energy-calculator-ced.pages.dev/wp-plugin/energy-calculator.zip

== Changelog ==
= ${JSON.parse(fs.readFileSync(join(__dirname, '../package.json'))).version} =
* Initial release of the Energy Label Calculator

== Credits ==
Developed by JPwebcreation (www.jpwebcreation.nl)
`;

archive.append(readmeContent, { name: 'energy-calculator/readme.txt' });

// Finalize the archive and wait for the 'close' event
archive.finalize(); 