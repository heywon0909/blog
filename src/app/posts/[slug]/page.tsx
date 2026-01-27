import Image from 'next/image';
import { getPostData, getPosts, Post } from '@/service/posts';
import PostContent from '@/components/PostContent';
import AdjacentPostCard from '@/components/AdjacentPostCard';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { title, description } = await getPostData(slug);

  return {
    title,
    description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);
  const { title, path, next, prev } = post;

  return (
    <article className="rounded-2xl overflow-hidden bg-gray-100 shadow-lg m-4">
      <Image
        src={`/images/posts/${path}.png`}
        alt={title}
        width={750}
        height={420}
        className="w-full h-1/5 max-h-[500px]"
      />
      <PostContent post={post} />
      <section className="flex shadow-md">
        {prev && <AdjacentPostCard post={prev} type="prev" />}
        {next && <AdjacentPostCard post={next} type="next" />}
      </section>
    </article>
  );
}

export async function generateStaticParams() {
  const posts: Post[] = await getPosts();

  return posts.map(({ path }) => ({
    slug: path,
  }));
}
