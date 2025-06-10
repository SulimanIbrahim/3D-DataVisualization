const flagColors = {
  Normal: "bg-green-100 text-green-700",
  High: "bg-red-100 text-red-700",
  Low: "bg-yellow-100 text-yellow-700",
};

export default function TestTable({ tests }) {
  if (!tests) return null;
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-bold text-lg mb-2">{tests.group}</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Unit</th>
            <th>Flag</th>
            <th>Reference Range</th>
          </tr>
        </thead>
        <tbody>
          {tests.results.map((res) => (
            <tr key={res.name}>
              <td>{res.name}</td>
              <td>{res.value}</td>
              <td>{res.unit}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded ${
                    flagColors[res.flag] || "bg-gray-100"
                  }`}
                >
                  {res.flag}
                </span>
              </td>
              <td>{res.referenceRange}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}