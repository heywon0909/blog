'use client';

interface Props {
  categories: string[];
  selected?: string;
  onClick: (category: string) => void;
}

export default function Categories({ categories, selected, onClick }: Props) {
  return (
    <section className="text-cetner p-4">
      <h2 className="text-lg font-bold border-b border-sky-500 mb-2">Category</h2>
      <ul>
        {categories.map(category => (
          <li
            key={category}
            className={`${category === selected ? 'bg-blue-500 text-white' : ''} rounded-md p-1 cursor-pointer hover:text-blue-200`}
            onClick={() => onClick(category)}
            id={category}
          >
            {category}
          </li>
        ))}
      </ul>
    </section>
  );
}
