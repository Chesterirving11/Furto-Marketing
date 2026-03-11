/**
 * Furto Marketing — Node.js Express Server
 * Usage:  npm start       (production)
 *         npm run dev     (development with auto-reload via nodemon)
 *
 * Gmail setup:
 *  1. Go to https://myaccount.google.com/apppasswords
 *  2. Generate an App Password for "Mail"
 *  3. Paste it as GMAIL_PASS below (replace YOUR_APP_PASSWORD)
 */

const express    = require('express');
const path       = require('path');
const nodemailer = require('nodemailer');

const app = express();

// ── Gmail credentials ───────────────────────────────────────
const GMAIL_USER = 'chesterfurto11@gmail.com';
const GMAIL_PASS = 'YOUR_APP_PASSWORD'; // <-- paste your Gmail App Password here

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: GMAIL_USER, pass: GMAIL_PASS },
});

// ── Middleware ──────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve all static files (HTML, CSS, JS, etc.) from this folder
app.use(express.static(path.join(__dirname)));

// ── API: Contact Form ───────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, company, service, message } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ success: false, error: 'Please fill in all required fields.' });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address.' });
  }

  // Sanitize strings (strip HTML tags)
  const strip = (str = '') => String(str).replace(/<[^>]*>/g, '').trim().slice(0, 1000);

  const name      = `${strip(firstName)} ${strip(lastName)}`;
  const cleanMail = strip(email);
  const cleanCo   = strip(company)  || 'N/A';
  const cleanSvc  = strip(service)  || 'N/A';
  const cleanMsg  = strip(message);

  console.log('\n📬 New contact form submission from:', name, `<${cleanMail}>`);

  try {
    await transporter.sendMail({
      from:    `"Furto Marketing" <${GMAIL_USER}>`,
      to:      GMAIL_USER,
      replyTo: cleanMail,
      subject: `New Inquiry from ${name} — Furto Marketing`,
      html: `
        <h2 style="color:#6c47ff;">New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
          <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
          <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${cleanMail}">${cleanMail}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Company</td><td style="padding:8px;">${cleanCo}</td></tr>
          <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Service</td><td style="padding:8px;">${cleanSvc}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${cleanMsg}</td></tr>
          <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Submitted</td><td style="padding:8px;">${new Date().toLocaleString()}</td></tr>
        </table>
      `,
    });
    console.log('✅ Email sent to', GMAIL_USER);
    res.json({ success: true, message: "Message received! We'll get back to you within 24 hours." });
  } catch (err) {
    console.error('❌ Email failed:', err.message);
    res.status(500).json({ success: false, error: 'Could not send email. Please try again.' });
  }
});

// ── Catch-all: serve index.html for any unmatched routes ────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── Start Server ────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀  Furto Marketing server running at:\n    http://localhost:${PORT}\n`);
});
