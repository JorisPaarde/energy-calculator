<?php
/**
 * Plugin Name: Energy Calculator Widget
 * Description: Energy Label Calculator widget using React
 * Version: 1.0.0
 * Author: Your Name
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

function enqueue_energy_calculator_widget() {
    $license_key = get_option('energy_calculator_license_key', '');
    
    // Only enqueue if we have a valid license
    if (!energy_calculator_validate_license($license_key)) {
        return;
    }
    
    // Enqueue the React app from Cloudflare
    wp_enqueue_script(
        'energy-calculator',
        'https://energy-calculator-ced.pages.dev/assets/main.js',
        array(),
        '1.0.0',
        true
    );

    wp_enqueue_style(
        'energy-calculator-styles',
        'https://energy-calculator-ced.pages.dev/assets/main.css',
        array(),
        '1.0.0'
    );

    // Pass license key and validation status to JavaScript
    wp_localize_script(
        'energy-calculator',
        'energyCalculatorConfig',
        array(
            'licenseKey' => $license_key,
            'isValid' => energy_calculator_validate_license($license_key),
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('energy_calculator_verify')
        )
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
    add_options_page(
        'Energy Calculator Settings',
        'Energy Calculator',
        'manage_options',
        'energy-calculator-settings',
        'energy_calculator_settings_page'
    );
}
add_action('admin_menu', 'energy_calculator_admin_menu');

// Register settings
function energy_calculator_register_settings() {
    register_setting('energy_calculator_options', 'energy_calculator_license_key');
}
add_action('admin_init', 'energy_calculator_register_settings');

// Create the settings page
function energy_calculator_settings_page() {
    // Check user capabilities
    if (!current_user_can('manage_options')) {
        return;
    }

    // Save license key if form is submitted
    if (isset($_POST['energy_calculator_license_key'])) {
        $license_key = sanitize_text_field($_POST['energy_calculator_license_key']);
        if (energy_calculator_validate_license($license_key)) {
            update_option('energy_calculator_license_key', $license_key);
            $message = 'License key saved successfully.';
            $type = 'success';
        } else {
            $message = 'Invalid license key. Please try again.';
            $type = 'error';
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
        
        <form method="post" action="">
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
                               required>
                        <p class="description">Enter your 20-character license key</p>
                    </td>
                </tr>
            </table>
            <?php submit_button('Save License Key'); ?>
        </form>
    </div>
    <?php
}

// License key validation function
function energy_calculator_validate_license($key) {
    // For testing purposes, we'll accept keys that are exactly 20 characters
    // and start with 'EC-'
    if (strlen($key) !== 20) {
        return false;
    }
    
    if (substr($key, 0, 3) !== 'EC-') {
        return false;
    }
    
    // Add your actual validation logic here
    // For now, we'll accept any 20-char key starting with EC-
    return true;
}

// Modify the shortcode to check for valid license
function energy_calculator_shortcode($atts = []) {
    $license_key = get_option('energy_calculator_license_key', '');
    
    if (empty($license_key) || !energy_calculator_validate_license($license_key)) {
        return '<p>Please enter a valid license key in the Energy Calculator settings.</p>';
    }

    $widget_id = 'energy-calculator-widget-' . uniqid();
    return '<div id="' . esc_attr($widget_id) . '" data-license-key="' . esc_attr($license_key) . '"></div>
    <script>
        window.addEventListener("load", function() {
            if (window.initEnergyCalculator) {
                window.initEnergyCalculator("' . esc_js($widget_id) . '");
            }
        });
    </script>';
}
add_shortcode('energy_calculator', 'energy_calculator_shortcode'); 