import FilterablePosts from '@/components/FilterablePosts';
import { getPosts } from '@/service/posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Posts',
  description: 'heywon0909 관련 블로그 포스트 모음',
};

export default async function PostPage() {
  const posts = await getPosts();
  const categories = [...new Set(posts.map(post => post.category))];

  return <FilterablePosts posts={posts} categories={categories} />;
}
