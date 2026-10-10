const blogLinks = [
  { name: 'How to Calculate BMI', href: '/blog/how-to-calculate-bmi' },
  { name: 'What Is BMI?', href: '/blog/what-is-bmi' },
  { name: 'BMI Formula', href: '/blog/bmi-formula' },
  { name: 'Height & Weight Chart', href: '/blog/height-and-weight-chart-for-women' },
];

export default function BlogCategoryDropdown() {
  return (
    <ul className="space-y-2">
      {blogLinks.map((link) => (
        <li key={link.href}>
          <a href={link.href} className="text-sm text-ink hover:text-brand hover:underline">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
