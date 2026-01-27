import FeaturedPosts from '@/components/FeaturedPosts';
import SlidePosts from '@/components/SlidePosts';

export default async function Home() {
  return (
    <>
      <FeaturedPosts />
      <SlidePosts />
    </>
  );
}
