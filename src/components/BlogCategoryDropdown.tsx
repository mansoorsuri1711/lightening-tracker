'use client';

const categories = [
  { name: 'Take-Home Pay', href: '/blog/how-to-calculate-florida-take-home-pay' },
  { name: 'FICA Taxes', href: '/blog/fica-taxes-explained' },
  { name: 'Tax Brackets', href: '/blog/federal-tax-brackets' },
];

export default function BlogCategoryDropdown() {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <a
          key={category.href}
          href={category.href}
          className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-accent hover:text-accent"
        >
          {category.name}
        </a>
      ))}
    </div>
  );
}
