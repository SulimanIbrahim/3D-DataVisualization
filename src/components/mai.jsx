import { useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Tabs from "./components/tabs";
import TestTable from "./components/testTable";
import TrendChart from "./components/TrendCharts";
import Attachments from "./components/Attachments";
import FileUpload from "./components/FileUpload";
import mockData from "./data/mockReport.json";
 const App=() => {
  const [report, setReport] = useState(mockData);
  const [selectedCategory, setSelectedCategory] = useState(
    mockData.tests[0].category
  );
  function handleFileParse(parsedJson) {
    setReport(parsedJson);
    setSelectedCategory(parsedJson.tests[0].category);
  }

  return (
    <div className="flex min-h-screen bg-yellow-200 text-black">
      <Sidebar patient={report.demographics} />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="p-4 flex flex-col gap-4">
          
          <FileUpload onParse={handleFileParse} />
          <Tabs
            categories={report.tests.map((t) => t.category)}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <TestTable
            tests={report.tests.find((t) => t.category === selectedCategory)}
          />
          <TrendChart history={report.history} />
          <Attachments attachments={report.attachments} />
          <div className="mt-4 p-4 bg-white rounded shadow">
            <strong>Doctor's Notes:</strong>
            <p className="text-gray-700">{report.doctorNotes}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;
