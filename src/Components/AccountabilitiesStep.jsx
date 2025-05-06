import React, { useEffect } from "react";

const defaultAccountabilities = [
  "Cultivate a high performing PeopleOps team capable of exceeding expectations and objectives.",
  "Drive business performance by strategically acquiring and developing high-potential talent across all levels.",
  "Maximize employee engagement and productivity by fostering an innovative culture.",
  "Strengthen management effectiveness with coaching and development.",
  "Serve as a trusted advisor to the CEO and executive team.",
];

const AccountabilitiesStep = ({
  roleSummary,
  accountabilities,
  setAccountabilities,
  onNext,
  onBack,
}) => {
  useEffect(() => {
    if (accountabilities.length === 0) {
      setAccountabilities(
        defaultAccountabilities.map((text) => ({
          text,
          checked: false,
          customText: text,
        }))
      );
    }
  }, [accountabilities, setAccountabilities]);

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
          onClick={onNext}
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default AccountabilitiesStep;
