import PostDetail from '@/components/PostDetail';
import { getPost, getPosts, Post } from '@/service/posts';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [path, title] = slug;
  const decodedTitle = decodeURIComponent(title);
  const post = await getPost(path);

  return (
    <>
      <h1 className="text-xl font-semibold">{decodedTitle}</h1>
      <PostDetail detail={post} />
    </>
  );
}

export async function generateStaticParams() {
  const posts: Post[] = await getPosts();

  return posts.map(({ path, title }) => ({
    slug: [path, title],
  }));
}
