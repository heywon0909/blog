'use client';

import { Post } from '@/service/posts';
import PostCategory from './PostCategory';
import PostCard from './PostCard';
import { useState } from 'react';

interface Props {
  posts: Post[];
  categoryList: string[];
}

export default function PostSection({ posts, categoryList }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const postsByCategory = selectedCategory === 'all' ? posts : posts.filter(v => v.category === selectedCategory);

  return (
    <div className="flex gap-2 justify-center">
      <div className="w-2/3 p-2 grid grid-cols-3 gap-3">
        {postsByCategory.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
      <div className="w-44">
        <PostCategory
          categoryList={Array.from(categoryList.values())}
          selectedCategory={selectedCategory}
          onSelect={e => {
            setSelectedCategory((e.target as HTMLElement).id);
          }}
        />
      </div>
    </div>
  );
}
