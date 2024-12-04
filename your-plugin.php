function enqueue_energy_calculator_widget() {
    // Enqueue the main JS file
    wp_enqueue_script(
        'energy-calculator',
        get_template_directory_uri() . '/path/to/assets/main.js',
        array(),
        '1.0.0',
        true
    );

    // Enqueue the CSS file
    wp_enqueue_style(
        'energy-calculator-styles',
        get_template_directory_uri() . '/path/to/assets/main.css',
        array(),
        '1.0.0'
    );
}
add_action('wp_enqueue_scripts', 'enqueue_energy_calculator_widget'); 