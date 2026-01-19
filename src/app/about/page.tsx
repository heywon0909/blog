import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <section className="text-center">
      <h3 className="font-bold text-xl">안녕하세요 heywon0909입니다.</h3>
      <h3 className="font-semibold text-indigo-800">Frontend Engineer</h3>
      <Image src="/images/은혼.png" width={300} height={300} alt="은혼애니메이션 주인공" className="mx-auto" priority />
      <p>Next.js를 배우기 위해 열심히 공부하고 있습니다. 감사합니다.</p>
      <Link href="/contact">
        <button className="p-2 bg-indigo-500 rounded-full text-white hover:bg-indigo-800 mt-2">Contact</button>
      </Link>
    </section>
  );
}
