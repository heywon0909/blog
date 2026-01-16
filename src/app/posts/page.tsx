import PostSection from '@/components/PostSection';
import { getPosts } from '@/service/posts';

export default async function PostPage() {
  const posts = await getPosts();
  const categoryList = new Set<string>();
  categoryList.add('all');
  posts.map(v => categoryList.add(v.category));

  return <PostSection posts={posts} categoryList={Array.from(categoryList.values())} />;
}
