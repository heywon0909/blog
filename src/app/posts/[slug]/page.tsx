import PostDetail from '@/components/PostDetail';
import { getPostData, getPosts, Post } from '@/service/posts';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);

  return (
    <section>
      <h1 className="text-xl font-semibold">{post.title}</h1>
      <PostDetail detail={post.content} />
    </section>
  );
}

export async function generateStaticParams() {
  const posts: Post[] = await getPosts();

  return posts.map(({ path }) => ({
    slug: path,
  }));
}
