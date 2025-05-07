import React from "react";
import Select from "react-select";

const options = [
  "Junior Business HR",
  "Quality Management Systems",
  "Process & Service Excellence",
  "Certification & Compliance Auditing",
  "Performance monitoring & reporting",
  "Analytics & Insights",
  "Talent Management",
].map((item) => ({ label: item, value: item }));
const CompetenciesStep = ({ formData, setFormData, onBack, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompetencyChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({ ...prev, competencies: selectedValues }));
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Competency Requirements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <label className="block mb-2 text-white font-medium bg-blue-700 px-3 py-1 rounded">
      Educational Qualifications
    </label>
    <select
      name="qualifications"
      value={formData.qualifications}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2"
    >
      <option value="">Select qualification</option>
      {[
        "B.Tech / B.E. in Computer Science",
        "B.Tech / B.E. in Information Technology",
        "BBA (Bachelor of Business Administration)",
        "MBA in Human Resources",
        "MBA in Finance",
        "MBA in Marketing",
        "Bachelor of Commerce (B.Com)",
        "Master of Commerce (M.Com)",
        "CA (Chartered Accountant)",
        "CS (Company Secretary)",
        "B.Sc. in Computer Science",
        "M.Sc. in Data Science",
        "BCA (Bachelor of Computer Applications)",
        "MCA (Master of Computer Applications)",
        "PGDM (Post Graduate Diploma in Management)",
        "Diploma in Business Analytics",
        "Diploma in Software Engineering",
        "Bachelor in Supply Chain Management",
        "M.Tech in Data Engineering",
        "Certification in Project Management (PMP)"
      ].map((qualification) => (
        <option key={qualification} value={qualification}>
          {qualification}
        </option>
      ))}
    </select>
  </div>

  {/* Keep these as regular inputs */}
  {[
  ["Relevant Industry Experience", "industryExperience"],
].map(([label, name]) => (
  <div key={name} className="mb-4">
    <label className="block mb-2 text-white font-medium bg-blue-700 px-3 py-1 rounded">
      {label}
    </label>

    {name === "industryExperience" ? (
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">Select experience</option>
        <option value="0-1">0-1 years</option>
        <option value="1-3">1-3 years</option>
        <option value="3-5">3-5 years</option>
        <option value="5-10">5-10 years</option>
        <option value="10+">10+ years</option>
      </select>
    ) : (
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
    )}
  </div>
))}

</div>


      <div className="mt-6">
        <label className="block mb-2 text-white font-medium bg-blue-700 px-3 py-1 rounded w-fit">
          Technical Competencies
        </label>
        <Select
          options={options}
          isMulti
          value={options.filter((o) =>
            formData.competencies.includes(o.value)
          )}
          onChange={handleCompetencyChange}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="text-blue-600 hover:underline">
          Back
        </button>
        <button
          onClick={onSubmit}
          className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default CompetenciesStep;
