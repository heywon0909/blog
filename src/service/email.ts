'use server';

import nodemailer from 'nodemailer';

export async function sendEmail(currentState: string | null, formData: FormData) {
  try {
    const email = String(formData.get('email'));
    const subject = String(formData.get('subject'));
    const message = String(formData.get('message'));

    if (!email || !subject || !message) {
      return '모든 필드를 채워주세요. 😢';
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Contact Form" <${email}>`, // ✅
      to: process.env.GMAIL_USER,
      subject,
      text: message,
      html: `<h1>${subject}</h1><div>${message}</div><br/><p>보낸사람: ${email}</p>`,
    });
  } catch (error) {
    const errorInfo = error as Error;
    return errorInfo.message || '이메일 전송에 실패하였습니다. 😢';
  }

  return '이메일이 성공적으로 전송되었습니다! 🎉';
}

export async function sendContactEmail(formData: FormData) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '서바 요청에 실패하였습니다. 😢');
  }
}
