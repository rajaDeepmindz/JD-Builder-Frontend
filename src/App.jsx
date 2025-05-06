import React, { useState } from "react";
import JobInfoStep from "./Components/JobInfoStep";
import AccountabilitiesStep from "./Components/AccountabilitiesStep";
import KPIStep from "./Components/KPIStep";
import CompetenciesStep from "./Components/CompetenciesStep";
import FinalOutputPreview from "./Components/FinalOutputPreview";

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessUnit: "",
    jobFamily: "",
    department: "Human Resources",
    positionTitle: "",
    jobGrade: "",
    location: "",
    roleSummary: "",
    qualifications: "",
    industryExperience: "",
    keyExperience: "",
    competencies: [],
  });

  const [accountabilities, setAccountabilities] = useState([]);
  const [kpis, setKpis] = useState([]);

  const [finalData, setFinalData] = useState(null);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
console.log("kpis",kpis)
const handleFinalSubmit = () => {
  const data = {
    ...formData,
    accountabilities: accountabilities
      .filter((a) => a.checked)
      .map((a) => a.customText),
    kpis: kpis
      .filter((k) => k.checked)
      .map((k) => k.customText), 
  };
  setFinalData(data);
  setStep(5);
};

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
      {step === 1 && (
        <JobInfoStep
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <AccountabilitiesStep
          roleSummary={formData.roleSummary}
          accountabilities={accountabilities}
          setAccountabilities={setAccountabilities}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <KPIStep
          accountabilities={accountabilities}
          kpis={kpis}
          setKpis={setKpis}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 4 && (
        <CompetenciesStep
          formData={formData}
          setFormData={setFormData}
          onBack={handleBack}
          onSubmit={handleFinalSubmit}

        />
      )}
      {step === 5 && finalData && (
        <FinalOutputPreview collectedData={finalData} onBack={handleBack} />
      )}
    </div>
  );
}
