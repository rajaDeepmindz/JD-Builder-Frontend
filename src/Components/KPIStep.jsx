import React, { useEffect } from "react";

// Transform KPI object (raw API structure) into array format
const transformApiKpis = (kpiObj) => {
  return Object.entries(kpiObj).map(([responsibility, kpiList]) => ({
    responsibility,
    kpis: kpiList.map((text) => ({
      text,
      checked: false,
      customText: text,
    })),
  }));
};

const KPIStep = ({ kpis, setKpis, onNext, onBack }) => {
  useEffect(() => {
    // Only transform if kpis is a plain object (raw API format)
    if (kpis && !Array.isArray(kpis)) {
      const transformed = transformApiKpis(kpis);
      setKpis(transformed);
    }
  }, [kpis]); // Don't include setKpis in deps to avoid unnecessary re-renders

  const toggleCheckbox = (groupIndex, kpiIndex) => {
    const updated = [...kpis];
    updated[groupIndex].kpis[kpiIndex].checked =
      !updated[groupIndex].kpis[kpiIndex].checked;
    setKpis(updated);
  };

  const handleChange = (groupIndex, kpiIndex, value) => {
    const updated = [...kpis];
    updated[groupIndex].kpis[kpiIndex].customText = value;
    setKpis(updated);
  };

  if (!Array.isArray(kpis)) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Key Performance Indicators</h2>
      <p className="mb-4 text-gray-600">
        Auto-generated based on selected accountabilities.
      </p>

      <div className="space-y-6">
        {kpis.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-gray-50 border p-4 rounded-lg">
            <h3 className="font-medium mb-3 text-gray-800">
              {group.responsibility}
            </h3>

            <div className="space-y-3">
              {group.kpis.map((item, kpiIndex) => (
                <div
                  key={kpiIndex}
                  className="flex items-start gap-3 bg-white p-3 rounded shadow-sm"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleCheckbox(groupIndex, kpiIndex)}
                    className="mt-1"
                  />
                  <textarea
                    value={item.customText}
                    onChange={(e) =>
                      handleChange(groupIndex, kpiIndex, e.target.value)
                    }
                    disabled={!item.checked}
                    rows="2"
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              ))}
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
    </div>
  );
};

export default KPIStep;
