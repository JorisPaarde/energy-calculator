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
    $client_key = get_option('energy_calculator_client_key', '');
    
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