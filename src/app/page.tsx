import { getPosts, Post } from '../service/posts';
import CarouselSlider from '../components/CarouselSlider';
import PostCard from '../components/PostCard';

export default async function Home() {
  const posts: Post[] = await getPosts();

  const featuredPosts = posts.filter(post => post.featured);
  const recommendedPosts = posts.filter(post => !post.featured);

  return (
    <section>
      <div className="p-2">
        <h2 className="text-bold font-bold text-left text-lg">Featured Posts</h2>
        <div className="p-2 grid grid-cols-3 gap-3">
          {featuredPosts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
        <div className="w-2/3 mx-auto">
          <CarouselSlider>
            {recommendedPosts.map((post, index) => (
              <PostCard {...post} key={index} />
            ))}
          </CarouselSlider>
        </div>
      </div>
    </section>
  );
}
