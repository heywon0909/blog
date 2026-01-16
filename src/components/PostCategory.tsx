'use client';

import { MouseEventHandler } from 'react';

interface Props {
  categoryList: string[];
  selectedCategory?: string;
  onSelect: MouseEventHandler<HTMLLIElement>;
}

export default function PostCategory({ categoryList, selectedCategory = 'all', onSelect }: Props) {
  return (
    <ul>
      {categoryList.map((category, index) => (
        <li
          key={index}
          className={`${category === selectedCategory ? 'bg-blue-300' : ''} rounded-md p-1`}
          onClick={onSelect}
          id={category}
        >
          {category}
        </li>
      ))}
    </ul>
  );
}
