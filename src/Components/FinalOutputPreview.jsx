import React from "react";

const FinalOutputPreview = ({ collectedData , onBack}) => {
  const {
    businessUnit,
    jobFamily,
    department,
    positionTitle,
    jobGrade,
    location,
    roleSummary,
    accountabilities,
    kpis,
    qualifications,
    industryExperience,
    competencies,
  } = collectedData;
  console.log("collectedData", kpis);
  return (
    <div className="bg-white shadow border rounded p-6 text-sm space-y-6">
      {/* Header */}
      <div className="bg-blue-900 text-white text-center py-2 font-bold">
        Final Output
      </div>

      {/* Job Description Table */}
      <table className="w-full border text-left text-gray-800 text-sm">
        <tbody>
          <tr className="border">
            <td className="p-2 font-semibold w-1/4">Business Unit</td>
            <td className="p-2">{businessUnit}</td>
            <td className="p-2 font-semibold w-1/4">Job Family</td>
            <td className="p-2">{jobFamily}</td>
          </tr>
          <tr className="border">
            <td className="p-2 font-semibold">Department</td>
            <td className="p-2">{department}</td>
            <td className="p-2 font-semibold">Position Title</td>
            <td className="p-2">{positionTitle}</td>
          </tr>
          <tr className="border">
            <td className="p-2 font-semibold">Job Grade</td>
            <td className="p-2">{jobGrade}</td>
            <td className="p-2 font-semibold">Location</td>
            <td className="p-2">{location}</td>
          </tr>
        </tbody>
      </table>

      {/* Role summary */}
      <div className="p-3 border border-gray-300">
        <div className="p-3 border-r border-gray-300">
          <h3 className="font-semibold mb-2">Role Summary/Purpose</h3>
          <p>{roleSummary}</p>
        </div>
      </div>

      {/* Accountabilities and KPIs */}
      <div className="grid grid-cols-2 gap-4 border border-gray-300">
        <div className="p-3 border-r border-gray-300">
          <h3 className="font-semibold mb-2">
            Key Accountabilities and Deliverables
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {accountabilities?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="p-3">
          <h3 className="font-semibold mb-2">Key Performance Indicators</h3>
          <ul className="list-disc list-inside space-y-1">
            {kpis?.map((kpi, idx) => (
              <li key={idx}>{kpi}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Qualifications and Experience */}
      <div className="border border-gray-300">
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="p-3 font-semibold w-1/3">
                Educational Qualifications
              </td>
              <td className="p-3">{qualifications}</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">
                Relevant Industry Experience
              </td>
              <td className="p-3">{industryExperience}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Technical Competencies */}
      <div className="border border-gray-300 p-3">
        <h3 className="font-semibold mb-2">Technical Competencies</h3>
        <ul className="list-disc list-inside space-y-1">
          {competencies?.map((comp, idx) => (
            <li key={idx}>{comp}</li>
          ))}
        </ul>
      </div>
      <button onClick={onBack} className="text-blue-600 hover:underline">
          Back
        </button>
    </div>
  );
};

export default FinalOutputPreview;
