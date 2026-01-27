import Link from 'next/link';

export default function Header() {
  const menuList = [
    { text: 'home', route: '/' },
    { text: 'posts', route: '/posts' },
    { text: 'about', route: '/about' },
    { text: 'contact', route: '/contact' },
  ];

  return (
    <header className="p-2 flex justify-between">
      <Link href={'/'}>
        <h1 className="font-semibold text-xl">HEYWON0909</h1>
      </Link>
      <nav className="flex gap-4">
        {menuList.map(({ text, route }, index) => (
          <Link href={route} key={index}>
            {text}
          </Link>
        ))}
      </nav>
    </header>
  );
}
