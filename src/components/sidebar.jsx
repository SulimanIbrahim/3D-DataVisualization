export default function Sidebar({ patient }) {
  return (
    <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-2">
      <h2 className="font-bold text-xl mb-2">Patient</h2>
      <div>
        <strong>Name:</strong> {patient.name}
      </div>
      <div>
        <strong>Gender:</strong> {patient.gender}
      </div>
      <div>
        <strong>Age:</strong> {patient.age}
      </div>
      <div>
        <strong>DOB:</strong> {patient.dob}
      </div>
      <div>
        <strong>Hospital ID:</strong> {patient.hospitalId}
      </div>
      <div>
        <strong>Report Date:</strong>{" "}
        {new Date(patient.reportDate).toLocaleString()}
      </div>
    </aside>
  );
}