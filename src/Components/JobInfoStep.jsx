import React from "react";

const JobInfoStep = ({ formData, setFormData, onNext }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const departments = [
    "Human Resources (HR)", "Finance", "Marketing", "Sales", "Operations",
    "IT (Information Technology)", "Customer Service / Support",
    "Research and Development (R&D)", "Legal / Compliance",
    "Executive / Leadership",
  ];

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Job Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          ["Business Unit", "businessUnit"],
          ["Job Family", "jobFamily"],
          ["Position Title", "positionTitle"],
          ["Job Grade", "jobGrade"],
        ].map(([label, name]) => (
          <div key={name}>
            <label className="block mb-2 text-white font-medium bg-blue-700 px-3 py-1 rounded">
              {label}
            </label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        ))}

        {/* ✅ Location Field */}
        <div className="md:col-span-2">
  <label className="block mb-2 text-white font-medium bg-blue-700 px-3 py-1 rounded">
    Location
  </label>
  <select
    name="location"
    value={formData.location}
    onChange={handleChange}
    className="w-full border rounded px-3 py-2"
  >
    <option value="">Select a city</option>
    {[
      "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai",
      "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
      "Surat", "Nagpur", "Indore", "Bhopal", "Patna",
      "Chandigarh", "Coimbatore", "Thiruvananthapuram", "Visakhapatnam", "Vadodara"
    ].map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ))}
  </select>
</div>


        <div className="md:col-span-2">
          <label className="block mb-2 text-white font-medium bg-blue-700 px-3 py-1 rounded">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            {departments.map((dept) => (
              <option key={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 text-white font-medium bg-blue-700 px-3 py-1 rounded">
            Role Summary
          </label>
          <textarea
            name="roleSummary"
            value={formData.roleSummary}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="3"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
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

export default JobInfoStep;
