export default function CategoryList({ categories, setCategory }) {
  return (
    <div className="space-y-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className="block text-left"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}