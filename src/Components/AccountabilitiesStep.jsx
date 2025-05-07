import axios from "axios";
import React, { useEffect, useState } from "react";

const AccountabilitiesStep = ({
  roleSummary,
  jobDescription,
  accountabilities,
  setAccountabilities,
  onNext,
  onBack,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (accountabilities.length === 0 && jobDescription?.description) {
      setAccountabilities(
        jobDescription.description.map((text) => ({
          text,
          checked: false,
          customText: text,
        }))
      );
    }
  }, [accountabilities, jobDescription, setAccountabilities]);

  const toggleCheckbox = (i) => {
    const updated = [...accountabilities];
    updated[i].checked = !updated[i].checked;
    setAccountabilities(updated);
  };

  const handleChange = (i, value) => {
    const updated = [...accountabilities];
    updated[i].customText = value;
    setAccountabilities(updated);
  };
  const getKeyPerformanceIndicators = async (responsibilities) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://avtar.pharynxai.com/jd_creation/generate-kpis",
        responsibilities
      );
  
      const responsibilityKpis = response.data.responsibility_kpis;
  
      
  
      onNext(responsibilityKpis); // now it's a structured array
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleNextClick = () => {
    const selected = accountabilities
      .filter((a) => a.checked)
      .map((a) => a.customText);

    console.log(JSON.stringify({ responsibilities: selected }, null, 2));

    if (selected.length === 0) {
      alert("Please select at least one accountability.");
      return;
    }

    getKeyPerformanceIndicators({ responsibilities: selected });
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Key Accountabilities</h2>
      <p className="mb-4 text-gray-600">
        Based on role summary: <strong>{roleSummary}</strong>
      </p>
      <div className="space-y-3">
        {accountabilities.map((item, i) => (
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
          onClick={handleNextClick}
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
          }`}
        >
          {loading ? "Loading..." : "Next"}
        </button>
      </div>
    </>
  );
};

export default AccountabilitiesStep;
