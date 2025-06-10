export default function Attachments({ attachments }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-bold text-lg mb-2">Attachments</h3>
      <div className="flex gap-4">
        {attachments.map((a) =>
          a.type === "image" ? (
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              key={a.url}
            >
              <img
                src={a.url}
                alt={a.name}
                className="w-32 h-32 object-cover rounded shadow"
                title={a.name}
              />
            </a>
          ) : (
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              key={a.url}
              className="flex items-center bg-gray-100 px-4 py-2 rounded shadow"
            >
              <span className="mr-2">📄</span>
              {a.name}
            </a>
          )
        )}
      </div>
    </div>
  );
}