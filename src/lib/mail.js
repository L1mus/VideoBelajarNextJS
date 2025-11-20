import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/auth/verify-email?token=${token}`;
    const mailOptions = {
        from: '"VideoBelajar" <no-reply@videobelajar.com>',
        to: email,
        subject: "Verifikasi Akun VideoBelajar Anda",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Halo!</h2>
        <p>Terima kasih telah mendaftar di VideoBelajar. Silakan klik tombol di bawah ini untuk memverifikasi email Anda:</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">
          Verifikasi Email
        </a>
        <p style="margin-top: 20px; color: #666;">Atau salin link berikut: ${verificationUrl}</p>
        <p>Link ini akan kedaluwarsa dalam 24 jam.</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email verifikasi terkirim ke:", email);
        return true;
    } catch (error) {
        console.error("Gagal mengirim email:", error);
        return false;
    }
}