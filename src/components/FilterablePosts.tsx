'use client';

import { Post } from '@/service/posts';
import { useState } from 'react';
import PostGrid from './PostGrid';
import Categories from './Categories';

interface Props {
  posts: Post[];
  categories: string[];
}
const ALL_POSTS = 'All Posts';

export default function FilterablePosts({ posts, categories }: Props) {
  const [selected, setSelected] = useState(ALL_POSTS);
  const filtered = selected === ALL_POSTS ? posts : posts.filter(v => v.category === selected);

  return (
    <section className="flex gap-2">
      <PostGrid posts={filtered} />
      <Categories
        categories={[ALL_POSTS, ...categories]}
        selected={selected}
        onClick={(value: string) => setSelected(value)}
      />
    </section>
  );
}
