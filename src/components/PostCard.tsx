import Image from 'next/image';
import { Post } from '../service/posts';
import Link from 'next/link';

type Props = Post;

export default function PostCard({ path, title, category, description, date }: Props) {
  return (
    <Link href={`/posts/${path}`}>
      <article className="shadow-md rounded-md flex flex-col overflow-hidden hover:shadow-lg">
        <Image src={`/images/posts/${path}.png`} alt={title} width={380} height={200} className="rounded-t-md w-full" />
        <div className="p-2 w-full flex flex-col items-center">
          <time className="text-xs w-full text-right text-gray-700">{date.toString()}</time>
          <h2 className="font-bold">{title}</h2>
          <p className="w-full truncate text-center">{description}</p>
          <span id="badge" className="gap-2 text-xs bg-green-100 rounded-md px-2 my-2">
            {category}
          </span>
        </div>
      </article>
    </Link>
  );
}
