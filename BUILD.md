# Build and Deployment Workflow

This project consists of two parts:
1. A React application hosted on Cloudflare Pages
2. A WordPress plugin that integrates the hosted React app

## Development

bash
Start development server
npm run dev


The development server will run at http://localhost:3000 with hot module reloading enabled.

## Building

### 1. React Application (Cloudflare Pages)

The React application is automatically built and deployed by Cloudflare Pages when pushing to the repository.

Build settings in Cloudflare Pages:
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: 18.x

The application will be available at: `https://energy-calculator-ced.pages.dev/`

### 2. WordPress Plugin

To create the WordPress plugin package:


Install dependencies if not done yet
```bash
npm install
```

Create WordPress plugin zip
```bash 
npm run build:wp
```


This will create a zip file in the `dist-wp` directory containing:
- energy-calculator.php
- readme.txt

### Combined Build

To build both the React application and create the WordPress plugin:

```bash
npm run build:all
```


## Deployment Process

1. Push changes to repository
   - Cloudflare Pages automatically builds and deploys the React application

2. Create WordPress plugin package
```bash
npm run build:wp
```

3. Distribute the WordPress plugin zip from `dist-wp/energy-calculator.zip`

## File Structure

├── src/ # React application source
├── dist/ # Built React application (for Cloudflare)
├── dist-wp/ # WordPress plugin package
├── scripts/ # Build scripts
│ └── create-wp-plugin.js
├── energy-calculator.php # WordPress plugin main file
└── readme.txt # WordPress plugin readme

## Version Management

When updating versions:

1. Update version in package.json
2. Update version in energy-calculator.php
3. Update version in readme.txt
4. Update version in wp_enqueue_script calls

## Required Dependencies


Install all dependencies
```bash
npm install
```
Build dependencies
```bash
npm install --save-dev archiver
```

## Environment Setup

1. Node.js >= 20.0.0
2. npm or yarn
3. Cloudflare Pages account
4. WordPress installation for testing

## Testing

1. Local Development Testing:
```bash
npm run dev
```

2. WordPress Plugin Testing:
   - Install the generated zip in a test WordPress environment
   - Verify shortcode functionality
   - Test in different themes

## Troubleshooting

Common issues:

1. Build fails
   - Check Node.js version
   - Verify all dependencies are installed
   - Clear npm cache and node_modules

2. Plugin not loading
   - Check browser console for script loading errors
   - Verify Cloudflare URLs are accessible
   - Check WordPress debug log

3. Cloudflare deployment issues
   - Verify build settings in Cloudflare Pages
   - Check build logs in Cloudflare dashboard

## Security Considerations

1. Asset Security
   - All assets are served via HTTPS from Cloudflare
   - WordPress plugin validates shortcode output

2. WordPress Integration
   - No sensitive data stored in WordPress
   - All output is properly escaped

## Maintenance

Regular maintenance tasks:

1. Update dependencies
```bash
npm update
```

2. Check for WordPress compatibility
3. Monitor Cloudflare Pages usage
4. Update version numbers when releasing updates

## Support

For issues:
1. GitHub Issues for code problems
2. WordPress support forum for plugin integration
3. Cloudflare dashboard for hosting issues