export default function Tabs({ categories, selected, onSelect }) {
  return (
    <div className="flex gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-2 rounded ${
            selected === cat
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}