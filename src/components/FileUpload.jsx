// This just takes a JSON file, parses and uplinks to parent for now.
export default function FileUpload({ onParse }) {
  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        onParse(json);
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  }
  return (
    <div className="my-4">
      <label className="block mb-1 font-semibold">Upload Lab JSON:</label>
      <input
        type="file"
        accept=".json"
        onChange={handleFile}
        className="border px-2 py-1 rounded"
      />
    </div>
  );
}