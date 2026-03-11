<?php
/**
 * Furto Marketing — PHP Contact Form Handler
 * Endpoint: POST /contact.php
 * Used as fallback when the Node.js server is unavailable.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
    exit;
}

// ── Sanitize & validate inputs ──────────────────────────────
function clean(string $value, int $maxLen = 500): string {
    return substr(trim(strip_tags($value)), 0, $maxLen);
}

$firstName = clean($_POST['firstName'] ?? '');
$lastName  = clean($_POST['lastName']  ?? '');
$email     = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$company   = clean($_POST['company']   ?? '');
$service   = clean($_POST['service']   ?? '');
$message   = clean($_POST['message']   ?? '', 2000);

// Required field check
if (!$firstName || !$lastName || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please fill in all required fields.']);
    exit;
}

// ── Optional: send email ─────────────────────────────────────
$to      = 'chesterfurto11@gmail.com';
$subject = "New Contact: {$firstName} {$lastName}";
$body    = implode("\n", [
    "Name:    {$firstName} {$lastName}",
    "Email:   {$email}",
    "Company: " . ($company ?: 'N/A'),
    "Service: " . ($service ?: 'N/A'),
    "",
    "Message:",
    $message,
    "",
    "Submitted: " . date('Y-m-d H:i:s T'),
]);
$headers = implode("\r\n", [
    "From: {$email}",
    "Reply-To: {$email}",
    "X-Mailer: PHP/" . PHP_VERSION,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
]);

// Uncomment the line below to enable actual email delivery:
// mail($to, $subject, $body, $headers);

// ── Log submission (server-side) ─────────────────────────────
error_log("[Furto Contact] {$firstName} {$lastName} <{$email}> — {$subject}");

// ── Respond ──────────────────────────────────────────────────
echo json_encode([
    'success' => true,
    'message' => "Message received! We'll get back to you within 24 hours.",
]);
exit;
