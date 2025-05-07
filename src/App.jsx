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

  const [jobDescription, setJobDescription] = useState(null);
  const [accountabilities, setAccountabilities] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [finalData, setFinalData] = useState(null);
  const handleBack = () => setStep((prev) => prev - 1);

  const onNextStep1 = (generatedJD) => {
    setJobDescription(generatedJD);
    setStep(2);
  };

  const onNextStep2 = (kpisFromAPI) => {
    setKpis(kpisFromAPI);
    setStep(3);
  };
  const onNextStep3 = () => {
    setStep(4);
  };

  const onFinalSubmit = () => {
    const final = {
      ...formData,
      jobDescription,
      accountabilities: accountabilities
        .filter((a) => a.checked)
        .map((a) => a.customText),
      kpis: kpis
        .flatMap((group) =>
          group.kpis.filter((kpi) => kpi.checked).map((kpi) => kpi.customText)
        ),
    };
    setFinalData(final);
    setStep(5);
  };

  
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
      {step === 1 && (
        <JobInfoStep
          formData={formData}
          setFormData={setFormData}
          onNext={onNextStep1}
        />
      )}
      {step === 2 && (
        <AccountabilitiesStep
          roleSummary={formData.roleSummary}
          jobDescription={jobDescription}
          accountabilities={accountabilities}
          setAccountabilities={setAccountabilities}
          onNext={onNextStep2}
          onBack={handleBack}
        />
      )}
    {step === 3 && (
  <KPIStep
    kpis={kpis}
    setKpis={setKpis}
    onNext={onNextStep3}
    onBack={handleBack}
  />
)}

      {step === 4 && (
        <CompetenciesStep
          formData={formData}
          setFormData={setFormData}
          onBack={handleBack}
          onSubmit={onFinalSubmit}
        />
      )}
      {step === 5 && finalData && (
        <FinalOutputPreview collectedData={finalData} onBack={handleBack} />
      )}
    </div>
  );
}
