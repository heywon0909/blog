'use server';

import nodemailer from 'nodemailer';

export async function sendEmail(currentState: string | null, formData: FormData) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  const email = String(formData.get('email'));
  const subject = String(formData.get('subject'));
  const message = String(formData.get('message'));
  console.log('email', email, subject, message);
  if (!email || !subject || !message) {
    return '폼에 정보를 기입해주세요 🔎';
  }
  const info = await transporter.sendMail({
    from: `"Contact Form" <${email}>`, // ✅
    to: process.env.GMAIL_USER,
    subject,
    text: message,
  });

  console.log('info', info.messageId);
  return '메일이 전송되었습니다. 📥';
}
