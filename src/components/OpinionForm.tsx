'use client';

import { sendEmail } from '@/service/email';
import Form from 'next/form';
import { useActionState } from 'react';

function Loading() {
  return (
    <>
      <svg
        className="mr-3 size-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p>로딩중입니다...</p>
    </>
  );
}

export function OpinionForm() {
  const [message, formAction, isPending] = useActionState(sendEmail, null);

  return (
    <Form action={formAction} className="border  border-slate-400 flex flex-col gap-2 p-2 rounded-md w-full">
      <label htmlFor="email" className="font-bold text-gray-600">
        Your Email
      </label>
      <input name="email" id="email" type="email" className="border rounded-md" required autoFocus />
      <label htmlFor="subject" className="font-bold text-gray-600">
        Subject
      </label>
      <input name="subject" id="subject" type="text" className="border rounded-md" required />
      <label htmlFor="message" className="font-bold text-gray-600">
        message
      </label>
      <textarea rows={10} name="message" id="message" className="border rounded-md" required></textarea>
      <button type="submit" className="bg-indigo-500 text-white rounded-md p-2">
        Send Email
      </button>
      {isPending && (
        <div className="p-2 pl-2 bg-indigo-300 rounded-md flex items-center">
          <Loading />
        </div>
      )}
      {message && <div className="p-2 bg-gray-300 rounded-md flex items-center">{message}</div>}
    </Form>
  );
}
