import { OpinionForm } from '@/components/OpinionForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Me',
  description: 'heywon0909에게 메일 보내기',
};

export default function Page() {
  return (
    <section className="w-full max-w-[500px] mx-auto">
      <h2 className="text-xl font-semibold">Contact me</h2>
      <OpinionForm />
    </section>
  );
}
