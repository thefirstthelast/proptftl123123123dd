<?php

/**
 * Скрипт для проверки креденшиалов Nova
 * 
 * Использование:
 * NOVA_USERNAME=your-email NOVA_PASSWORD=your-password php check-nova-credentials.php
 */

$username = getenv('NOVA_USERNAME');
$password = getenv('NOVA_PASSWORD');

if (!$username || !$password) {
    echo "❌ Ошибка: Установите переменные окружения:\n";
    echo "   NOVA_USERNAME=your-email\n";
    echo "   NOVA_PASSWORD=your-password\n";
    echo "\nИли запустите:\n";
    echo "   NOVA_USERNAME=your-email NOVA_PASSWORD=your-password php check-nova-credentials.php\n";
    exit(1);
}

echo "🔍 Проверка креденшиалов Nova...\n";
echo "   Username: " . $username . "\n";
echo "   Password: " . str_repeat('*', strlen($password)) . "\n\n";

// Создаем auth.json для проверки
$auth = [
    'http-basic' => [
        'nova.laravel.com' => [
            'username' => trim($username),
            'password' => trim($password),
        ]
    ]
];

file_put_contents('auth.json', json_encode($auth, JSON_PRETTY_PRINT));
echo "✅ Создан auth.json\n\n";

// Пробуем установить Nova через Composer
echo "📦 Проверка доступа к репозиторию Nova...\n";

$ch = curl_init('https://nova.laravel.com/packages.json');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, $username . ':' . $password);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    echo "❌ Ошибка подключения: " . $error . "\n";
    exit(1);
}

if ($httpCode === 200) {
    echo "✅ Креденшиалы правильные! (HTTP 200)\n";
    echo "   Доступ к репозиторию Nova подтвержден.\n\n";
    
    // Проверяем, можем ли мы получить информацию о пакете
    $data = json_decode($response, true);
    if ($data && isset($data['packages'])) {
        echo "✅ Репозиторий доступен, найдено пакетов: " . count($data['packages']) . "\n";
    }
    
    echo "\n📝 Теперь добавьте эти переменные в Railway:\n";
    echo "   NOVA_USERNAME=" . $username . "\n";
    echo "   NOVA_PASSWORD=" . $password . "\n";
    
    exit(0);
} elseif ($httpCode === 401) {
    echo "❌ Неправильные креденшиалы! (HTTP 401)\n";
    echo "   Проверьте email и пароль.\n";
    exit(1);
} else {
    echo "❌ Неожиданный ответ: HTTP " . $httpCode . "\n";
    echo "   Ответ: " . substr($response, 0, 200) . "\n";
    exit(1);
}

