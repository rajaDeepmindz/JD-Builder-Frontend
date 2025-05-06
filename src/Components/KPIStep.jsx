import React, { useEffect } from "react";

const defaultKPIs = [
  "Employee net promoter score (eNPS)",
  "Quality of hire",
  "Succession bench strength",
  "Voluntary turnover rate of top performers",
  "Strategic advisory impact",
  "Revenue impact from people initiatives",
  "Employee productivity improvement",
  "Executive team retention rate",
];

const KPIStep = ({  kpis, setKpis, onNext, onBack }) => {
    console.log("kpis",kpis)
  useEffect(() => {
    if (kpis.length === 0) {
      setKpis(
        defaultKPIs.map((text) => ({
          text,
          checked: false,
          customText: text,
        }))
      );
    }
  }, [kpis, setKpis]);

  const toggleCheckbox = (i) => {
    const updated = [...kpis];
    updated[i].checked = !updated[i].checked;
    setKpis(updated);
  };

  const handleChange = (i, value) => {
    const updated = [...kpis];
    updated[i].customText = value;
    setKpis(updated);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Key Performance Indicators</h2>
      <p className="mb-4 text-gray-600">
        Auto-generated based on selected accountabilities.
      </p>
      <div className="space-y-3">
        {kpis.map((item, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded shadow-sm">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheckbox(i)}
                className="mt-1"
              />
              <textarea
                value={item.customText}
                onChange={(e) => handleChange(i, e.target.value)}
                disabled={!item.checked}
                rows="2"
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="text-blue-600 hover:underline">
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default KPIStep;
