<?php
/**
 * Plugin Name: Energy Calculator Widget
 * Description: Generate energy label indications for buildings based on user input
 * Version: 1.0.10
 * Author: JPwebcreation
 * Author URI: https://www.jpwebcreation.nl
 * License: GPL v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Register settings and add menu on plugin activation
function energy_calculator_activate() {
    add_option('energy_calculator_license_key', '');
}
register_activation_hook(__FILE__, 'energy_calculator_activate');

function enqueue_energy_calculator_widget() {
    $license_key = get_option('energy_calculator_license_key', '');
    
    // Only enqueue if we have a valid license
    if (!energy_calculator_validate_license($license_key)) {
        return;
    }
    
    // Enqueue React and ReactDOM from CDN
    wp_enqueue_script(
        'react',
        'https://unpkg.com/react@18/umd/react.production.min.js',
        array(),
        '1.0.10',
        true
    );

    wp_enqueue_script(
        'react-dom',
        'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
        array('react'),
        '1.0.10',
        true
    );
    
    // Enqueue the widget script from plugin directory
    wp_enqueue_script(
        'energy-calculator',
        plugins_url('assets/js/energy-calculator.js', __FILE__),
        array('react', 'react-dom'),
        '1.0.10',
        true
    );

    // Enqueue the initialization script
    wp_enqueue_script(
        'energy-calculator-init',
        plugins_url('assets/js/init.js', __FILE__),
        array('energy-calculator'),
        '1.0.10',
        true
    );

    // Enqueue the widget styles
    wp_enqueue_style(
        'energy-calculator-styles',
        plugins_url('assets/css/style.css', __FILE__),
        array(),
        '1.0.10'
    );

    // Pass license key and validation status to JavaScript
    $config = array(
        'licenseKey' => $license_key,
        'isValid' => energy_calculator_validate_license($license_key),
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('energy_calculator_verify')
    );
    
    wp_localize_script(
        'energy-calculator',
        'energyCalculatorConfig',
        $config
    );
}
add_action('wp_enqueue_scripts', 'enqueue_energy_calculator_widget');

// Add AJAX endpoint for license verification
function energy_calculator_verify_license() {
    check_ajax_referer('energy_calculator_verify', 'nonce');
    
    $license_key = get_option('energy_calculator_license_key', '');
    wp_send_json_success(array(
        'isValid' => energy_calculator_validate_license($license_key),
        'licenseKey' => $license_key
    ));
}
add_action('wp_ajax_energy_calculator_verify', 'energy_calculator_verify_license');
add_action('wp_ajax_nopriv_energy_calculator_verify', 'energy_calculator_verify_license');

// Add admin menu
function energy_calculator_admin_menu() {
    add_menu_page(
        'Energy Calculator Settings', // Page title
        'Energy Calculator', // Menu title
        'manage_options', // Capability required
        'energy-calculator', // Menu slug
        'energy_calculator_settings_page', // Function to display the page
        'dashicons-calculator', // Icon
        30 // Position
    );
}
add_action('admin_menu', 'energy_calculator_admin_menu');

// Register settings
function energy_calculator_register_settings() {
    register_setting(
        'energy_calculator_settings', // Option group
        'energy_calculator_license_key', // Option name
        array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default' => ''
        )
    );
}
add_action('admin_init', 'energy_calculator_register_settings');

// License key validation function
function energy_calculator_validate_license($key) {
    // Allow access without license key for specific domains
    $site_url = get_site_url();
    $allowed_domains = array(
        'mijnenergielabelberekenen.nl',
        'energy-calculator-ced.pages.dev'
    );
    
    foreach ($allowed_domains as $domain) {
        if (strpos($site_url, $domain) !== false) {
            return true;
        }
    }
    
    if (empty($key)) {
        return false;
    }
    
    // Key must be exactly 20 characters and start with EC-
    if (strlen($key) !== 20 || substr($key, 0, 3) !== 'EC-') {
        return false;
    }
    
    // Add your actual validation logic here
    // For now, we'll accept any 20-char key starting with EC-
    return true;
}

// Create the settings page
function energy_calculator_settings_page() {
    // Check user capabilities
    if (!current_user_can('manage_options')) {
        return;
    }

    $site_url = get_site_url();
    $allowed_domains = array(
        'mijnenergielabelberekenen.nl',
        'energy-calculator-ced.pages.dev'
    );
    
    $is_allowed_domain = false;
    foreach ($allowed_domains as $domain) {
        if (strpos($site_url, $domain) !== false) {
            $is_allowed_domain = true;
            break;
        }
    }

    if (isset($_POST['submit']) && check_admin_referer('energy_calculator_settings')) {
        $license_key = sanitize_text_field($_POST['energy_calculator_license_key']);
        update_option('energy_calculator_license_key', $license_key);
        $message = 'Settings saved.';
        $type = 'success';
        
        if (!$is_allowed_domain && !energy_calculator_validate_license($license_key)) {
            $message .= ' However, the license key appears to be invalid.';
            $type = 'warning';
        }
    }

    $license_key = get_option('energy_calculator_license_key', '');
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        
        <?php if (isset($message)): ?>
        <div class="notice notice-<?php echo $type; ?> is-dismissible">
            <p><?php echo esc_html($message); ?></p>
        </div>
        <?php endif; ?>

        <?php if ($is_allowed_domain): ?>
        <div class="notice notice-info">
            <p>License key is not required for this domain</p>
        </div>
        <?php endif; ?>

        <form method="post" action="">
            <?php wp_nonce_field('energy_calculator_settings'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="energy_calculator_license_key">License Key</label>
                    </th>
                    <td>
                        <input type="text" 
                               id="energy_calculator_license_key" 
                               name="energy_calculator_license_key" 
                               value="<?php echo esc_attr($license_key); ?>" 
                               class="regular-text"
                               pattern=".{20,20}"
                               title="License key must be exactly 20 characters long"
                               <?php echo $is_allowed_domain ? '' : 'required'; ?>>
                        <p class="description">
                            <?php if ($is_allowed_domain): ?>
                                License key is optional for this domain
                            <?php else: ?>
                                Enter your 20-character license key (format: EC-XXXXXXXXXXXXXXXXX)
                            <?php endif; ?>
                        </p>
                        <?php if (!$is_allowed_domain && !empty($license_key)): ?>
                            <p class="description">
                                License Status: 
                                <?php if (energy_calculator_validate_license($license_key)): ?>
                                    <span style="color: green;">Valid</span>
                                <?php else: ?>
                                    <span style="color: red;">Invalid</span>
                                <?php endif; ?>
                            </p>
                        <?php endif; ?>
                    </td>
                </tr>
            </table>
            <?php submit_button('Save Settings'); ?>
        </form>

        <div class="energy-calculator-info">
            <h2>Usage Instructions</h2>
            <p>To display the Energy Calculator on any page or post, use the following shortcode:</p>
            <code>[energy_calculator]</code>
            
            <h3>Requirements</h3>
            <ul>
                <?php if (!$is_allowed_domain): ?>
                <li>Valid license key (format: EC-XXXXXXXXXXXXXXXXX)</li>
                <?php endif; ?>
                <li>WordPress 5.0 or higher</li>
                <li>PHP 7.4 or higher</li>
            </ul>
            
            <h3>Support</h3>
            <p>For support inquiries <?php echo !$is_allowed_domain ? 'or to purchase a license key, ' : ''; ?>please contact support.</p>
        </div>
    </div>
    <?php
}

// Add CORS headers for AJAX requests
function energy_calculator_add_cors_headers() {
    header('Access-Control-Allow-Origin: https://energy-calculator-ced.pages.dev');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        status_header(200);
        exit();
    }
}
add_action('init', 'energy_calculator_add_cors_headers');

// Add shortcode for the widget
function energy_calculator_shortcode() {
    return '<div class="energy-calculator-widget"></div>';
}
add_shortcode('energy_calculator', 'energy_calculator_shortcode'); 