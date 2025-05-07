import React from "react";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from "docx";

const FinalOutputPreview = ({ collectedData, onBack }) => {
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


  const downloadDocx = () => {
    const cellStyle = {
      margins: { top: 100, bottom: 100, left: 100, right: 100 },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      },
    };
  
    const heading = (text) =>
      new Paragraph({
        spacing: { before: 300, after: 100 },
        children: [new TextRun({ text, bold: true })],
      });
  
    const sectionChildren = [
      new Paragraph({
        alignment: "center",
        spacing: { after: 300 },
        children: [new TextRun({ text: "Final Output", bold: true, size: 28 })],
      }),
  
      // Job Info Table
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({ ...cellStyle, children: [new Paragraph("Business Unit")] }),
              new TableCell({ ...cellStyle, children: [new Paragraph(businessUnit)] }),
              new TableCell({ ...cellStyle, children: [new Paragraph("Job Family")] }),
              new TableCell({ ...cellStyle, children: [new Paragraph(jobFamily)] }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({ ...cellStyle, children: [new Paragraph("Department")] }),
              new TableCell({ ...cellStyle, children: [new Paragraph(department)] }),
              new TableCell({ ...cellStyle, children: [new Paragraph("Position Title")] }),
              new TableCell({ ...cellStyle, children: [new Paragraph(positionTitle)] }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({ ...cellStyle, children: [new Paragraph("Job Grade")] }),
              new TableCell({ ...cellStyle, children: [new Paragraph(jobGrade)] }),
              new TableCell({ ...cellStyle, children: [new Paragraph("Location")] }),
              new TableCell({ ...cellStyle, children: [new Paragraph(location)] }),
            ],
          }),
        ],
      }),
  
      heading("Role Summary/Purpose"),
      new Paragraph(roleSummary),
  
      heading("Key Accountabilities and Deliverables"),
      ...accountabilities.map((item) => new Paragraph("• " + item)),
  
      heading("Key Performance Indicators"),
      ...kpis.map((item) => new Paragraph("• " + item)),
  
      heading("Educational Qualifications"),
      new Paragraph(qualifications),
  
      heading("Relevant Industry Experience"),
      new Paragraph(industryExperience),
  
      heading("Technical Competencies"),
      ...competencies.map((item) => new Paragraph("• " + item)),
    ];
  
    const doc = new Document({ sections: [{ children: sectionChildren }] });
  
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "final-report.docx");
    });
  };
  

  return (
    <div className="bg-white shadow border rounded p-6 text-sm space-y-6">
      <div className="bg-blue-900 text-white text-center py-2 font-bold">
        Final Output
      </div>

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

      <div className="p-3 border border-gray-300">
        <h3 className="font-semibold mb-2">Role Summary/Purpose</h3>
        <p>{roleSummary}</p>
      </div>

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

      <div className="border border-gray-300 p-3">
        <h3 className="font-semibold mb-2">Technical Competencies</h3>
        <ul className="list-disc list-inside space-y-1">
          {competencies?.map((comp, idx) => (
            <li key={idx}>{comp}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-start gap-4">
        <button onClick={onBack} className="text-blue-600 hover:underline">
          Back
        </button>
        <button onClick={downloadDocx} className="text-purple-600 hover:underline">
  Download as DOCX
</button>

      </div>
    </div>
  );
};

export default FinalOutputPreview;
