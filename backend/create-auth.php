<?php
/**
 * Script to create auth.json for Nova
 * Called from composer.json pre-install-cmd
 */

if (getenv('NOVA_USERNAME') && getenv('NOVA_PASSWORD')) {
    $auth = [
        'http-basic' => [
            'nova.laravel.com' => [
                'username' => trim(getenv('NOVA_USERNAME')),
                'password' => trim(getenv('NOVA_PASSWORD')),
            ]
        ]
    ];
    file_put_contents('auth.json', json_encode($auth, JSON_PRETTY_PRINT));
    echo "Created auth.json from environment variables\n";
}

