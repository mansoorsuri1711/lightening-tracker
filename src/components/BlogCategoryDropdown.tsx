'use client';

const categories = [
  { name: 'Measure Body Fat', href: '/blog/how-to-measure-body-fat' },
  { name: 'Calculate Percentage', href: '/blog/how-to-calculate-body-fat-percentage' },
  { name: 'Ideal Ranges', href: '/blog/ideal-body-fat-percentage' },
];

export default function BlogCategoryDropdown() {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <a
          key={category.href}
          href={category.href}
          className="rounded-full border border-black/20 bg-white px-3 py-1.5 text-xs font-medium text-black transition hover:border-black hover:underline"
        >
          {category.name}
        </a>
      ))}
    </div>
  );
}
