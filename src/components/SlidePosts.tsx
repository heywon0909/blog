import { getNonFeaturedPosts } from '@/service/posts';
import CarouselSlider from './CarouselSlider';
import PostCard from './PostCard';

export default async function SlidePosts() {
  const posts = await getNonFeaturedPosts();
  return (
    <section className='mt-3'>
      <h2 className="text-bold font-bold text-left text-lg">You may Like</h2>
      <CarouselSlider>
        {posts.map((post, index) => (
          <PostCard {...post} key={index} />
        ))}
      </CarouselSlider>
    </section>
  );
}
