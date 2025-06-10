import React, { useState } from 'react';
import { FaUpload, FaBars, FaTimes, FaUser, FaHistory, FaFlask, FaNotesMedical, FaFileMedical } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import mockReport from '../data/mockReport.json';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Main = () => {
  const [patientData, setPatientData] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState('demographics');
  const [activeTestGroup, setActiveTestGroup] = useState(null);
  const loadDemoData = () => {
    setPatientData(mockReport);
    setShowSidebar(true);
    setActiveTab('demographics');
  };
  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setPatientData(data);
          setShowSidebar(true);
        } catch (error) {
          alert('Invalid JSON file. Please upload a valid patient data file.');
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  // Generate chart data for test results
  const generateChartData = (testResults) => {
    if (!testResults || !testResults.length) return null;
    
    return {
      labels: testResults.map(result => result.name),
      datasets: [
        {
          label: 'Test Values',
          data: testResults.map(result => result.value),
          backgroundColor: testResults.map(result => 
            result.flag === 'Normal' ? 'rgba(75, 192, 192, 0.6)' : 
            result.flag === 'High' ? 'rgba(255, 99, 132, 0.6)' : 
            'rgba(255, 206, 86, 0.6)'
          ),
          borderColor: testResults.map(result => 
            result.flag === 'Normal' ? 'rgba(75, 192, 192, 1)' : 
            result.flag === 'High' ? 'rgba(255, 99, 132, 1)' : 
            'rgba(255, 206, 86, 1)'
          ),
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <>
       <header className='w-[100vw] h-[10vh] bg-white flex justify-between items-center px-6 shadow-md border-b-2 border-blue-600'>
        <div className='font-bold text-blue-600 text-xl'>Tahsilli</div>
        <div className='font-semibold text-gray-700'>Your AI based Healthcare Partner</div>
        <div className='flex items-center gap-2'>
          {patientData && (
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className='p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100'
            >
              {showSidebar ? <FaTimes /> : <FaBars />}
            </button>
          )}

              <button 
                onClick={loadDemoData}
                className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded'
              >
                Demo Report
              </button>
            </div>
      </header>

      <div className='h-[90vh] w-[100vw] flex bg-gray-100'>
        {/* Sidebar */}
        {showSidebar && patientData && (
          <div className='w-[15%] h-full bg-white shadow-md p-4 overflow-y-auto'>
            {/* Patient Info */} 
            <div className='mb-6'>
              <h2 className='font-bold text-lg mb-2 text-blue-600 border-b pb-2'>
                Patient ID: {patientData.patientId}
              </h2>
            </div>

            {/* Navigation */}
            <nav className='space-y-2'>
              <button 
                onClick={() => setActiveTab('demographics')}
                className={`flex items-center gap-2 w-full text-left p-2 rounded ${activeTab === 'demographics' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <FaUser /> Demographics
              </button>
              
              <div>
                <h3 className='font-medium text-gray-500 text-sm mt-4 mb-2'>Test Results</h3>
                {patientData?.tests?.map((test, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      setActiveTab('tests'); 
                      setActiveTestGroup(test);
                    }}
                    className={`flex items-center gap-2 w-full text-left p-2 rounded ${
                      activeTab === 'tests' && activeTestGroup?.category === test.category 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <FaFlask /> {test.category}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setActiveTab('doctorNotes')}
                className={`flex items-center gap-2 w-full text-left p-2 rounded ${activeTab === 'doctorNotes' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <FaNotesMedical /> Doctor Notes
              </button>
              
              <button 
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 w-full text-left p-2 rounded ${activeTab === 'history' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <FaHistory /> History
              </button>
              
              <button 
                onClick={() => setActiveTab('attachments')}
                className={`flex items-center gap-2 w-full text-left p-2 rounded ${activeTab === 'attachments' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <FaFileMedical /> Attachments
              </button>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className={`${showSidebar ? 'w-[85%] border-l-2 border-blue-600' : 'w-full'} h-full bg-white overflow-y-auto p-6`}>
          {!patientData ? (
            <div className='h-full flex flex-col items-center justify-center'>
              <div className='text-center max-w-md mx-auto'>
                <h2 className='text-2xl font-bold text-blue-600 mb-4'>Welcome to Tahsilili Dashboard</h2>
                <p className='text-gray-600 mb-8'>Please upload patient data (JSON format) to start analyzing results</p>
                <div className='relative'>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                  />
                  <button className='flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-full'>
                    <FaUpload /> Upload Patient Data
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Demographics Tab */}
              {activeTab === 'demographics' && (
                <div>
                  <h2 className='text-2xl font-bold mb-6 text-blue-600 border-b pb-2'>Patient Demographics</h2>
                  <div className='grid grid-cols-2 gap-6'>
                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <h3 className='text-lg font-medium mb-3'>Personal Information</h3>
                      <div className='space-y-2'>
                        <p><span className='font-medium'>Name:</span> {patientData.demographics.name}</p>
                        <p><span className='font-medium'>Gender:</span> {patientData.demographics.gender}</p>
                        <p><span className='font-medium'>Age:</span> {patientData.demographics.age}</p>
                        <p><span className='font-medium'>Date of Birth:</span> {new Date(patientData.demographics.dob).toLocaleDateString()}</p>
                        <p><span className='font-medium'>Nationality:</span> {patientData.demographics.nationality}</p>
                      </div>
                    </div>
                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <h3 className='text-lg font-medium mb-3'>Medical Record</h3>
                      <div className='space-y-2'>
                        <p><span className='font-medium'>Hospital ID:</span> {patientData.demographics.hospitalId}</p>
                        <p><span className='font-medium'>Patient ID:</span> {patientData.patientId}</p>
                        <p><span className='font-medium'>Report Date:</span> {new Date(patientData.demographics.reportDate).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Test Results Tab */}
              {activeTab === 'tests' && activeTestGroup && (
                <div>
                  <h2 className='text-2xl font-bold mb-2 text-blue-600'>{activeTestGroup.category}</h2>
                  <h3 className='text-lg font-medium mb-6 text-gray-600 border-b pb-2'>{activeTestGroup.group}</h3>
                  
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {/* Results Table */}
                    <div className='bg-gray-50 p-4 rounded-lg overflow-x-auto'>
                      <h3 className='text-lg font-medium mb-3'>Test Results</h3>
                      <table className='w-full border-collapse'>
                        <thead>
                          <tr className='bg-gray-100'>
                            <th className='text-left p-3 border'>Test Name</th>
                            <th className='text-left p-3 border'>Result</th>
                            <th className='text-left p-3 border'>Unit</th>
                            <th className='text-left p-3 border'>Reference Range</th>
                            <th className='text-left p-3 border'>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeTestGroup.results.map((result, idx) => (
                            <tr key={idx} className={result.flag !== 'Normal' ? 'bg-red-50' : ''}>
                              <td className='p-3 border'>{result.name}</td>
                              <td className='p-3 border font-medium'>{result.value}</td>
                              <td className='p-3 border'>{result.unit}</td>
                              <td className='p-3 border'>{result.referenceRange}</td>
                              <td className={`p-3 border font-medium ${
                                result.flag === 'Normal' ? 'text-green-600' :
                                result.flag === 'High' ? 'text-red-600' : 'text-yellow-600'
                              }`}>
                                {result.flag}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Chart */}
                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <h3 className='text-lg font-medium mb-3'>Graphical View</h3>
                      <div className='h-72'>
                        {activeTestGroup.results.length > 0 && activeTestGroup.results[0].value !== "Negative" && (
                          <Line
                            data={generateChartData(activeTestGroup.results)}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              scales: {
                                y: {
                                  beginAtZero: true
                                }
                              }
                            }}
                          />
                        )}
                        {(activeTestGroup.results.length === 0 || activeTestGroup.results[0].value === "Negative") && (
                          <div className='h-full flex items-center justify-center text-gray-500'>
                            No numerical data available for charting
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Doctor Notes Tab */}
              {activeTab === 'doctorNotes' && (
                <div>
                  <h2 className='text-2xl font-bold mb-6 text-blue-600 border-b pb-2'>Doctor Notes</h2>
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <p className='whitespace-pre-line'>{patientData.doctorNotes}</p>
                  </div>
                </div>
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <div>
                  <h2 className='text-2xl font-bold mb-6 text-blue-600 border-b pb-2'>Patient History</h2>
                  <div className='space-y-4'>
                    {patientData.history?.visits?.map((visit, idx) => (
                      <div key={idx} className='bg-gray-50 p-4 rounded-lg'>
                        <h3 className='font-medium mb-2'>{new Date(visit.date).toLocaleDateString()}</h3>
                        <p className='mb-3'>{visit.notes}</p>
                        
                        <h4 className='font-medium text-sm text-gray-600 mb-2'>Lab Results:</h4>
                        <div className='grid grid-cols-3 gap-2'>
                          {visit.labs && Object.entries(visit.labs).map(([key, value]) => (
                            <div key={key} className='p-2 bg-white rounded border'>
                              <div className='text-sm font-medium'>{key}</div>
                              <div>{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attachments Tab */}
              {activeTab === 'attachments' && (
                <div>
                  <h2 className='text-2xl font-bold mb-6 text-blue-600 border-b pb-2'>Attachments</h2>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {patientData.attachments?.map((attachment, idx) => (
                      <div key={idx} className='bg-gray-50 p-4 rounded-lg flex items-center justify-between'>
                        <div>
                          <p className='font-medium'>{attachment.name}</p>
                          <p className='text-sm text-gray-500'>Type: {attachment.type}</p>
                        </div>
                        <a 
                          href={attachment.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded'
                        >
                          View
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;