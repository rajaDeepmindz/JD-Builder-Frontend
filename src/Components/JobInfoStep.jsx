import axios from "axios";
import React, { useState } from "react";

const JobInfoStep = ({ formData, setFormData, onNext }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "businessUnit",
      "jobFamily",
      "positionTitle",
      "jobGrade",
      "location",
      "department",
      "roleSummary",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = "This field is required.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const jobInfoPayload = {
    department: formData.department,
    position_title: formData.positionTitle,
    summary: formData.roleSummary,
  };

  const handleNext = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://avtar.pharynxai.com/jd_creation/generate-job-description",
        jobInfoPayload
      );

      // Pass the jobDescription data to the next step
      onNext(response.data);
    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    "Human Resources (HR)",
    "Finance",
    "Marketing",
    "Sales",
    "Operations",
    "IT (Information Technology)",
    "Customer Service / Support",
    "Research and Development (R&D)",
    "Legal / Compliance",
    "Executive / Leadership",
  ];

  const cities = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Surat",
    "Nagpur",
    "Indore",
    "Bhopal",
    "Patna",
    "Chandigarh",
    "Coimbatore",
    "Thiruvananthapuram",
    "Visakhapatnam",
    "Vadodara",
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
            {errors[name] && (
              <p className="text-red-600 text-sm mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

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
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="text-red-600 text-sm mt-1">{errors.location}</p>
          )}
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
            <option value="">Select a department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-red-600 text-sm mt-1">{errors.department}</p>
          )}
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
          {errors.roleSummary && (
            <p className="text-red-600 text-sm mt-1">{errors.roleSummary}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
          

      <button
          onClick={handleNext}
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

export default JobInfoStep;
