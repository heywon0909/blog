'use client';
import Image from 'next/image';
import { Post } from '../service/posts';
import { useRouter } from 'next/navigation';

type Props = Post;

export default function PostCard({ path, title, category, description, date }: Props) {
  const router = useRouter();

  return (
    <div className="shadow-md rounded-md flex flex-col" onClick={() => router.push(`/posts/${path}/${title}`)}>
      <Image src={`/images/posts/${path}.png`} alt={title} width={380} height={200} className="rounded-t-md" />
      <div className="p-2 w-full flex flex-col items-center justify-between">
        <span className="text-xs w-full text-right">{date}</span>
        <h2 className="font-bold">{title}</h2>
        <p>{description}</p>
        <div id="badge" className="flex gap-2 text-xs bg-green-100 rounded-md p-1">
          {category}
        </div>
      </div>
    </div>
  );
}
