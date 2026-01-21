



{['Lifestyle', 'Fashion', 'Tech'].map((cat) => (
  <Link
    key={cat}
    to={`/category/${cat.toLowerCase()}`}
    className="hover:text-site-pink transition-colors duration-500 px-4 py-2"
  >
    {cat}
  </Link>
))}