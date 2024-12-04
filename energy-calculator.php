<?php
/**
 * Plugin Name: Energy Calculator Widget
 * Description: Energy Label Calculator widget using React
 * Version: 1.0.1
 * Author: Your Name
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
    
    // Debug info
    error_log('Energy Calculator: Enqueuing scripts');
    error_log('License key status: ' . ($license_key ? 'Present' : 'Not present'));
    error_log('License validation: ' . (energy_calculator_validate_license($license_key) ? 'Valid' : 'Invalid'));
    
    // Only enqueue if we have a valid license
    if (!energy_calculator_validate_license($license_key)) {
        error_log('Energy Calculator: License validation failed, not enqueuing scripts');
        return;
    }
    
    // Enqueue the React app from Cloudflare with crossorigin attribute
    wp_enqueue_script(
        'energy-calculator',
        'https://energy-calculator-ced.pages.dev/assets/main.js',
        array(),
        '1.0.1',
        true
    );

    // Add crossorigin attribute to script tag
    add_filter('script_loader_tag', function($tag, $handle) {
        if ('energy-calculator' === $handle) {
            return str_replace(' src', ' crossorigin="anonymous" src', $tag);
        }
        return $tag;
    }, 10, 2);

    wp_enqueue_style(
        'energy-calculator-styles',
        'https://energy-calculator-ced.pages.dev/assets/main.css',
        array(),
        '1.0.1'
    );

    // Add crossorigin attribute to stylesheet
    add_filter('style_loader_tag', function($tag, $handle) {
        if ('energy-calculator-styles' === $handle) {
            return str_replace(' href', ' crossorigin="anonymous" href', $tag);
        }
        return $tag;
    }, 10, 2);

    // Pass license key and validation status to JavaScript
    $config = array(
        'licenseKey' => $license_key,
        'isValid' => energy_calculator_validate_license($license_key),
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('energy_calculator_verify'),
        'debug' => true
    );
    
    error_log('Energy Calculator Config: ' . json_encode($config));
    
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

// Add shortcode support
function energy_calculator_shortcode($atts = []) {
    $license_key = get_option('energy_calculator_license_key', '');
    
    error_log('Energy Calculator Shortcode: Rendering');
    error_log('License key status: ' . ($license_key ? 'Present' : 'Not present'));
    error_log('License validation: ' . (energy_calculator_validate_license($license_key) ? 'Valid' : 'Invalid'));
    
    if (empty($license_key) || !energy_calculator_validate_license($license_key)) {
        error_log('Energy Calculator Shortcode: License validation failed');
        return '<p>Please configure a valid license key in the Energy Calculator settings.</p>';
    }

    $widget_id = 'energy-calculator-widget-' . uniqid();
    
    return '<div id="' . esc_attr($widget_id) . '" 
                 data-license-key="' . esc_attr($license_key) . '" 
                 data-origin="' . esc_attr(site_url()) . '">
           </div>
           <script>
               console.log("Energy Calculator: Initializing widget", "' . esc_js($widget_id) . '");
               window.addEventListener("load", function() {
                   console.log("Energy Calculator: Window loaded");
                   if (window.initEnergyCalculator) {
                       console.log("Energy Calculator: initEnergyCalculator function found");
                       window.initEnergyCalculator("' . esc_js($widget_id) . '");
                   } else {
                       console.error("Energy Calculator: initEnergyCalculator function not found");
                       // Retry loading after a short delay
                       setTimeout(function() {
                           if (window.initEnergyCalculator) {
                               console.log("Energy Calculator: Retry initialization successful");
                               window.initEnergyCalculator("' . esc_js($widget_id) . '");
                           } else {
                               console.error("Energy Calculator: Failed to load after retry");
                           }
                       }, 2000);
                   }
               });
           </script>';
}
add_shortcode('energy_calculator', 'energy_calculator_shortcode'); 