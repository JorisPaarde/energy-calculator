import fs from 'fs';
import path from 'path';

// Function to increment version
function incrementVersion(version) {
    const parts = version.split('.');
    parts[2] = (parseInt(parts[2]) + 1).toString();
    return parts.join('.');
}

// Update version in package.json
function updatePackageJson() {
    const packagePath = path.resolve('package.json');
    const pkgJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const oldVersion = pkgJson.version;
    pkgJson.version = incrementVersion(oldVersion);
    fs.writeFileSync(packagePath, JSON.stringify(pkgJson, null, 2) + '\n');
    return { oldVersion, newVersion: pkgJson.version };
}

// Update version in WordPress plugin file
function updatePluginFile(version) {
    const pluginPath = path.resolve('energy-calculator.php');
    let content = fs.readFileSync(pluginPath, 'utf8');
    
    // Update version in plugin header
    content = content.replace(
        /Version: \d+\.\d+\.\d+/,
        `Version: ${version}`
    );
    
    // Update version in wp_enqueue_script calls
    content = content.replace(
        /['"](?:\d+\.){2}\d+['"]/g,
        `'${version}'`
    );
    
    // Update version in wp_enqueue_style calls
    content = content.replace(
        /wp_enqueue_style\(\s*['"]energy-calculator-styles['"],\s*[^,]+,\s*\[[^\]]*\],\s*['"](?:\d+\.){2}\d+['"]\s*\)/g,
        `wp_enqueue_style('energy-calculator-styles', 'https://energy-calculator-ced.pages.dev/assets/main.css', array(), '${version}')`
    );
    
    fs.writeFileSync(pluginPath, content);
}

// Update version in readme.txt
function updateReadme(version) {
    const readmePath = path.resolve('readme.txt');
    if (fs.existsSync(readmePath)) {
        let content = fs.readFileSync(readmePath, 'utf8');
        
        // Update Stable tag
        content = content.replace(
            /Stable tag: \d+\.\d+\.\d+/,
            `Stable tag: ${version}`
        );
        
        // Update Version tested up to
        content = content.replace(
            /Tested up to: \d+\.\d+\.\d+/,
            `Tested up to: ${version}`
        );
        
        // Add changelog entry
        const today = new Date().toISOString().split('T')[0];
        const changelogEntry = `\n= ${version} - ${today} =\n* Version bump\n`;
        
        // Add entry after changelog header if it exists
        if (content.includes('== Changelog ==')) {
            content = content.replace(
                /== Changelog ==/,
                `== Changelog ==\n${changelogEntry}`
            );
        }
        
        fs.writeFileSync(readmePath, content);
    }
}

// Update version in dist-wp/energy-calculator.php if it exists
function updateDistPluginFile(version) {
    const distPluginPath = path.resolve('dist-wp/energy-calculator.php');
    if (fs.existsSync(distPluginPath)) {
        let content = fs.readFileSync(distPluginPath, 'utf8');
        
        // Update version in plugin header
        content = content.replace(
            /Version: \d+\.\d+\.\d+/,
            `Version: ${version}`
        );
        
        // Update version in script/style enqueues
        content = content.replace(
            /['"](?:\d+\.){2}\d+['"]/g,
            `'${version}'`
        );
        
        fs.writeFileSync(distPluginPath, content);
    }
}

try {
    // Increment version in package.json and get new version
    const { oldVersion, newVersion } = updatePackageJson();
    
    // Update version in all WordPress files
    updatePluginFile(newVersion);
    updateReadme(newVersion);
    updateDistPluginFile(newVersion);
    
    console.log(`Version updated: ${oldVersion} -> ${newVersion}`);
    console.log('Updated files:');
    console.log('- package.json');
    console.log('- energy-calculator.php');
    if (fs.existsSync(path.resolve('readme.txt'))) {
        console.log('- readme.txt');
    }
    if (fs.existsSync(path.resolve('dist-wp/energy-calculator.php'))) {
        console.log('- dist-wp/energy-calculator.php');
    }
    
    // Exit with success
    process.exit(0);
} catch (error) {
    console.error('Error updating version:', error);
    process.exit(1);
} 