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

// Add menu page for settings
function energy_calculator_settings_menu() {
    add_options_page(
        'Energy Calculator Settings',
        'Energy Calculator',
        'manage_options',
        'energy-calculator-settings',
        'energy_calculator_settings_page'
    );
}
add_action('admin_menu', 'energy_calculator_settings_menu');

// Register settings
function energy_calculator_register_settings() {
    register_setting('energy_calculator_options', 'energy_calculator_client_key');
}
add_action('admin_init', 'energy_calculator_register_settings');

// Settings page HTML
function energy_calculator_settings_page() {
    ?>
    <div class="wrap">
        <h2>Energy Calculator Settings</h2>
        <form method="post" action="options.php">
            <?php settings_fields('energy_calculator_options'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row">Client Key</th>
                    <td>
                        <input type="text" name="energy_calculator_client_key" 
                               value="<?php echo esc_attr(get_option('energy_calculator_client_key')); ?>" />
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

function enqueue_energy_calculator_widget() {
    $client_key = get_option('energy_calculator_client_key', '');
    
    // Enqueue the React app from Cloudflare
    wp_enqueue_script(
        'energy-calculator',
        'https://energy-calculator-ced.pages.dev/assets/main.js',
        array(),
        '1.0.0',
        true
    );

    // Enqueue the CSS from Cloudflare
    wp_enqueue_style(
        'energy-calculator-styles',
        'https://energy-calculator-ced.pages.dev/assets/main.css',
        array(),
        '1.0.0'
    );

    // Add client key to JavaScript
    wp_add_inline_script('energy-calculator', 
        'window.ENERGY_CALCULATOR_CLIENT_KEY = "' . esc_js($client_key) . '";',
        'before'
    );
}
add_action('wp_enqueue_scripts', 'enqueue_energy_calculator_widget');

// Add shortcode support
function energy_calculator_shortcode($atts = []) {
    $client_key = get_option('energy_calculator_client_key', '');
    if (empty($client_key)) {
        return '<p>Please configure the Energy Calculator client key in settings.</p>';
    }

    $widget_id = 'energy-calculator-widget-' . uniqid();
    return '<div id="' . esc_attr($widget_id) . '" data-client-key="' . esc_attr($client_key) . '"></div>
    <script>
        window.addEventListener("load", function() {
            if (window.initEnergyCalculator) {
                window.initEnergyCalculator("' . esc_js($widget_id) . '");
            }
        });
    </script>';
}
add_shortcode('energy_calculator', 'energy_calculator_shortcode'); 