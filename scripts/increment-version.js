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
    const package = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const oldVersion = package.version;
    package.version = incrementVersion(oldVersion);
    fs.writeFileSync(packagePath, JSON.stringify(package, null, 2) + '\n');
    return { oldVersion, newVersion: package.version };
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
        /'1\.0\.0'/g,
        `'${version}'`
    );
    
    fs.writeFileSync(pluginPath, content);
}

// Update version in readme.txt
function updateReadme(version) {
    const readmePath = path.resolve('readme.txt');
    if (fs.existsSync(readmePath)) {
        let content = fs.readFileSync(readmePath, 'utf8');
        content = content.replace(
            /Stable tag: \d+\.\d+\.\d+/,
            `Stable tag: ${version}`
        );
        fs.writeFileSync(readmePath, content);
    }
}

try {
    // Increment version in package.json and get new version
    const { oldVersion, newVersion } = updatePackageJson();
    
    // Update version in other files
    updatePluginFile(newVersion);
    updateReadme(newVersion);
    
    console.log(`Version updated: ${oldVersion} -> ${newVersion}`);
    
    // Exit with success
    process.exit(0);
} catch (error) {
    console.error('Error updating version:', error);
    process.exit(1);
} 