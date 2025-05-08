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
  const spacing = new Paragraph({ spacing: { after: 200 } }); // 25px gap

  const cellStyle = {
    margins: { top: 100, bottom: 100, left: 100, right: 100 },
    width: { size: 50, type: WidthType.PERCENTAGE },
  };

  const bulletList = (items) => items.map((item) => new Paragraph("• " + item));

  const sectionChildren = [
    // Blue Title Heading
    new Paragraph({
      alignment: "center",
      spacing: { after: 300 },
      children: [new TextRun({ text: "Job Description", bold: true, size: 30, color: "FFFFFF" })],
      shading: { fill: "1C398E" },
      padding: { top: 10, bottom: 10, left: 10, right: 10 },
    }),

    spacing,

    // Job Info Table
    // Job Info Table
new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          ...cellStyle,
          children: [new Paragraph({ children: [new TextRun({ text: "Business Unit", bold: true })] })],
        }),
        new TableCell({
          ...cellStyle,
          children: [new Paragraph(businessUnit)],
        }),
        new TableCell({
          ...cellStyle,
          children: [new Paragraph({ children: [new TextRun({ text: "Job Family", bold: true })] })],
        }),
        new TableCell({
          ...cellStyle,
          children: [new Paragraph(jobFamily)],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          ...cellStyle,
          children: [new Paragraph({ children: [new TextRun({ text: "Department", bold: true })] })],
        }),
        new TableCell({
          ...cellStyle,
          children: [new Paragraph(department)],
        }),
        new TableCell({
          ...cellStyle,
          children: [new Paragraph({ children: [new TextRun({ text: "Position Title", bold: true })] })],
        }),
        new TableCell({
          ...cellStyle,
          children: [new Paragraph(positionTitle)],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          ...cellStyle,
          children: [new Paragraph({ children: [new TextRun({ text: "Job Grade", bold: true })] })],
        }),
        new TableCell({
          ...cellStyle,
          children: [new Paragraph(jobGrade)],
        }),
        new TableCell({
          ...cellStyle,
          children: [new Paragraph({ children: [new TextRun({ text: "Location", bold: true })] })],
        }),
        new TableCell({
          ...cellStyle,
          children: [new Paragraph(location)],
        }),
      ],
    }),
  ],
}),


    spacing,

    // Role Summary Table (Fixed layout)
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 2,
              ...cellStyle,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: "Role Summary/Purpose", bold: true })],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 2,
              ...cellStyle,
              children: [new Paragraph(roleSummary)],
            }),
          ],
        }),
      ],
    }),

    spacing,

    // Accountabilities and KPIs Table
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              ...cellStyle,
              children: [new Paragraph({ children: [new TextRun({ text: "Key Accountabilities and Deliverables", bold: true })] })],
            }),
            new TableCell({
              ...cellStyle,
              children: [new Paragraph({ children: [new TextRun({ text: "Key Performance Indicators", bold: true })] })],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ ...cellStyle, children: bulletList(accountabilities) }),
            new TableCell({ ...cellStyle, children: bulletList(kpis) }),
          ],
        }),
      ],
    }),

    spacing,

    // Educational Qualifications Table
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              ...cellStyle,
              children: [new Paragraph({ children: [new TextRun({ text: "Educational Qualifications", bold: true })] })],
            }),
            new TableCell({
              ...cellStyle,
              children: [new Paragraph(qualifications)],
            }),
          ],
        }),
      ],
    }),

    spacing,

    // Relevant Industry Experience Table
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              ...cellStyle,
              children: [new Paragraph({ children: [new TextRun({ text: "Relevant Industry Experience", bold: true })] })],
            }),
            new TableCell({
              ...cellStyle,
              children: [new Paragraph(industryExperience)],
            }),
          ],
        }),
      ],
    }),

    spacing,

    // Technical Competencies Table
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              ...cellStyle,
              children: [new Paragraph({ children: [new TextRun({ text: "Technical Competencies", bold: true })] })],
            }),
            new TableCell({
              ...cellStyle,
              children: bulletList(competencies),
            }),
          ],
        }),
      ],
    }),
  ];

  const doc = new Document({ sections: [{ children: sectionChildren }] });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "final-report.docx");
  });
};


  return (
    <div className="bg-white shadow border rounded p-6 text-sm space-y-6">
      <div className="bg-blue-900 text-white text-center py-2 font-bold">
        Job Description
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
        <button
          onClick={downloadDocx}
          className="text-purple-600 hover:underline"
        >
          Download as DOCX
        </button>
      </div>
    </div>
  );
};

export default FinalOutputPreview;
