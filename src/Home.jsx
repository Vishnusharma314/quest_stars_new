import { useEffect, useState } from "react";
import Header from "./Header";
import Dropdown from "./Dropdown";
import HistorySideBar from "./HistorySideBar";
import ResultPage from "./ResultPage";
import axios from "axios";
import { Hourglass, MutatingDots } from "react-loader-spinner";
import Chat from "./Chat";
//import { Form } from "react-router-dom";

function Home() {
  const [searchResults, setSearchResults] = useState("");
  const [isResultPage, setIsResultPage] = useState(false);
  const [promt, setPromt] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [promptData, setPromptData] = useState({
    geneName: "",
    coOccurringMutations: "",
    molecularType: "",
    mutationType: "",
    mutationPosition: "",
    ethnicity: "",
    associatedDiseaseName: "",
    riskFactor: "",
  });

  const tabData = [
    {
      label: "Search",
    },
    {
      label: "Chat",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setSearchResults(`Data`);
    }, 3000);
  }, []);

  const handleCloseResult = () => {
    setIsResultPage(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromptData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);
    console.log(promptData);

    // if (Object.values(promptData).includes("")) {
    //   alert("Please fill all the fields");
    //   return;
    // }

    let promt = `Generate a detailed scientific report and give therapeutic implications based on given genetic data:
    Gene Name:${promptData.geneName ? promptData.geneName : "not applicable"},
    Mutation Type:${
      promptData.mutationType ? promptData.mutationType : "not applicable"
    },
    Mutation Position:${
      promptData.mutationPosition
        ? promptData.mutationPosition
        : "not applicable"
    },
    Molecular Type:${
      promptData.molecularType ? promptData.molecularType : "not applicable"
    },
    Co-Occurring Mutations:${
      promptData.coOccurringMutations
        ? promptData.coOccurringMutations
        : "not applicable"
    },
    Risk Factor:${
      promptData.riskFactor ? promptData.riskFactor : "not applicable"
    },
    Associated Disease Name:${
      promptData.associatedDiseaseName
        ? promptData.associatedDiseaseName
        : "not applicable"
    },
    Ethnicity:${
      promptData.ethnicity ? promptData.ethnicity : "not applicable"
    } and Metrics Data`;

    console.log(promt.trim());
    httpCall(promt);
  };

  const httpCall = (promt) => {
    promt = promt.replace(/(?:\r\n|\r|\n)/g, "");
    axios
      .post(
        "https://9a03-106-222-216-211.ngrok-free.app/api/auth/gemini",
        {
          prompt: promt.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        setIsSearching(false);
        setSearchResults(response.data);
        setIsResultPage(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const historyPromt = (promt) => {
    setIsSearching(true);
    httpCall(promt);
  };

  useEffect(() => {
    axios
      .post(
        "https://9a03-106-222-216-211.ngrok-free.app/api/auth/history",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (res) {
        console.log(res.data);
        setHistory(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [searchResults]);

  return (
    <>
      <Header />
      <div className="mt-6 shadow-md mx-auto relative max-w-screen-xl">
        <div className="bg-white rounded-sm p-6 shadow-md">
          <div className="grid grid-cols-5 gap-4">
            <div className="mt-6">
              <HistorySideBar data={history} callback={historyPromt} />
            </div>
            {isSearching && (
              <div className="loader flex-col">
                <MutatingDots
                  visible={true}
                  height="100"
                  width="100"
                  color="#3065b8"
                  secondaryColor="#3065b8"
                  radius="12.5"
                  ariaLabel="mutating-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />

                {/* <p className="bg-blue-500 text-white">
                  Creating best mactch report
                </p> */}
              </div>
            )}
            {/* {!isResultPage && (
              <div className="col-span-4 relative ">
                <form onSubmit={handleFormSubmit}>
                  <div className="mt-6 shadow-md p-4">
                    <h1 className="mb-4 text-3xl text-gray-900 dark:text-white ">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        Biomarker Details
                      </span>
                    </h1>
                    <hr /> <br />
                    <div className="grid grid-cols-2 gap-4">
                      <Dropdown
                        label="Gene Name"
                        name="geneName"
                        onSelect={handleChange}
                        option={[
                          { label: "BRCA1", value: "BRCA1" },
                          { label: "TP53", value: "TP53" },
                          { label: "EGFR", value: "EGFR" },
                          { label: "KRAS", value: "KRAS" },
                          { label: "BRAF", value: "BRAF" },
                          { label: "PIK3CA", value: "PIK3CA" },
                          { label: "HER2", value: "HER2" },
                          { label: "ALK", value: "ALK" },
                          { label: "MET", value: "MET" },
                          { label: "PTEN", value: "PTEN" },
                        ]}
                      />
                      <Dropdown
                        label="Co-occurring Mutations"
                        name="coOccurringMutations"
                        onSelect={handleChange}
                        option={[
                          { label: "TP53, CHEK2", value: "TP53, CHEK2" },
                          { label: "ATM, RB1", value: "ATM, RB1" },
                          { label: "ALK, KRAS", value: "ALK, KRAS" },
                          { label: "NRAS, BRAF", value: "NRAS, BRAF" },
                          { label: "PIK3CA, PTEN", value: "PIK3CA, PTEN" },
                          { label: "HER2, AKT1", value: "HER2, AKT1" },
                          { label: "BRCA2, FGFR1", value: "BRCA2, FGFR1" },
                          { label: "ROS1, MET", value: "ROS1, MET" },
                          { label: "EGFR, RET", value: "EGFR, RET" },
                          { label: "APC, SMAD4", value: "APC, SMAD4" },
                        ]}
                      />
                      <Dropdown
                        label="Molecular Type"
                        name="molecularType"
                        onSelect={handleChange}
                        option={[
                          { label: "DNA", value: "DNA" },
                          //{ label: "Protein", value: "Protein" },
                          //{ label: "RNA", value: "RNA" },
                          //{ label: "DNA", value: "DNA" },
                          //{ label: "Protein", value: "Protein" },
                          // { label: "DNA", value: "DNA" },
                          //{ label: "RNA", value: "RNA" },
                          { label: "Protein", value: "Protein" },
                          // { label: "DNA", value: "DNA" },
                          { label: "RNA", value: "RNA" },
                        ]}
                      />
                      <Dropdown
                        label="Mutation Type"
                        name="mutationType"
                        onSelect={handleChange}
                        option={[
                          { label: "Missense", value: "Missense" },
                          { label: "Frameshift", value: "Frameshift" },
                          { label: "Deletion", value: "Deletion" },
                          { label: "Substitution", value: "Substitution" },
                          { label: "Insertion", value: "Insertion" },
                          { label: "Amplification", value: "Amplification" },
                          { label: "Duplication", value: "Duplication" },
                          { label: "Fusion", value: "Fusion" },
                          { label: "Splice Variant", value: "Splice Variant" },
                          { label: "Nonsense", value: "Nonsense" },
                        ]}
                      />
                      <Dropdown
                        label="Mutation Position (DNA/RNA/Protein)"
                        name="mutationPosition"
                        onSelect={handleChange}
                        option={[
                          {
                            label: "c.68_69delAG / p.Glu23ValfsTer17",
                            value: "c.68_69delAG / p.Glu23ValfsTer17",
                          },
                          {
                            label: "c.375G>T / p.Arg125Leu",
                            value: "c.375G>T / p.Arg125Leu",
                          },
                          {
                            label: "c.2235_2249del15 / p.Glu746_Ala750del",
                            value: "c.2235_2249del15 / p.Glu746_Ala750del",
                          },
                          {
                            label: "c.34G>T / p.Gly12Cys",
                            value: "c.34G>T / p.Gly12Cys",
                          },
                          {
                            label: "c.1799T>A / p.Val600Glu",
                            value: "c.1799T>A / p.Val600Glu",
                          },
                          {
                            label: "c.1633G>A / p.Glu545Lys",
                            value: "c.1633G>A / p.Glu545Lys",
                          },
                          {
                            label: "c.2329_2331dupGAT / p.Glu774dup",
                            value: "c.2329_2331dupGAT / p.Glu774dup",
                          },
                          { label: "EML4", value: "EML4" },
                          { label: "ALK (E13:A20)", value: "ALK (E13:A20)" },
                          { label: "c.2888", value: "c.2888" },
                          { label: "3C>G / p.?", value: "3C>G / p.?" },
                          {
                            label: "c.689G>T / p.Glu230*",
                            value: "c.689G>T / p.Glu230*",
                          },
                        ]}
                      />
                      <Dropdown
                        label="Ethnicity"
                        name="ethnicity"
                        onSelect={handleChange}
                        option={[
                          { label: "Caucasian", value: "Caucasian" },
                          { label: "Asian", value: "Asian" },
                          { label: "African", value: "African" },
                          { label: "Hispanic", value: "Hispanic" },
                          // { label: "Caucasian", value: "Caucasian" },
                          // { label: "Asian", value: "Asian" },
                          // { label: "African", value: "African" },
                          //  { label: "Hispanic", value: "Hispanic" },
                          // { label: "Caucasian", value: "Caucasian" },
                          // { label: "Asian", value: "Asian" },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="mt-6 shadow-md p-4">
                    <h1 className="mb-4 text-3xl text-gray-900 dark:text-white ">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        Disease Association
                      </span>
                    </h1>
                    <hr /> <br />
                    <div className="grid grid-cols-2 gap-4">
                      <Dropdown
                        label="Associated Disease Name"
                        name="associatedDiseaseName"
                        onSelect={handleChange}
                        option={[
                          { label: "Breast Cancer", value: "Breast Cancer" },
                          {
                            label: "Lung Adenocarcinoma",
                            value: "Lung Adenocarcinoma",
                          },
                          {
                            label: "Colorectal Cancer",
                            value: "Colorectal Cancer",
                          },
                          { label: "Melanoma", value: "Melanoma" },
                          { label: "Ovarian Cancer", value: "Ovarian Cancer" },
                          {
                            label: "Pancreatic Cancer",
                            value: "Pancreatic Cancer",
                          },
                          { label: "Glioblastoma", value: "Glioblastoma" },
                          {
                            label: "Prostate Cancer",
                            value: "Prostate Cancer",
                          },
                          { label: "Leukemia (AML)", value: "Leukemia (AML)" },
                          { label: "Gastric Cancer", value: "Gastric Cancer" },
                        ]}
                      />
                      <Dropdown
                        label="Risk Factor"
                        name="riskFactor"
                        onSelect={handleChange}
                        option={[
                          {
                            label: "BRCA1/BRCA2 mutation, Hormonal imbalance",
                            value: "BRCA1/BRCA2 mutation, Hormonal imbalance",
                          },
                          {
                            label: "EGFR mutation, Smoking, Air pollution",
                            value: "EGFR mutation, Smoking, Air pollution",
                          },
                          {
                            label: "KRAS/BRAF mutation, High",
                            value: "KRAS/BRAF mutation, High",
                          },
                          { label: "fat diet", value: "fat diet" },
                          {
                            label: "BRAF V600E mutation, UV Exposure",
                            value: "BRAF V600E mutation, UV Exposure",
                          },
                          {
                            label: "BRCA1 mutation, Family history",
                            value: "BRCA1 mutation, Family history",
                          },
                          {
                            label: "TP53 mutation, Diabetes, Obesity",
                            value: "TP53 mutation, Diabetes, Obesity",
                          },
                          {
                            label: "PTEN mutation, Ionizing radiation",
                            value: "PTEN mutation, Ionizing radiation",
                          },
                          {
                            label: "HER2/PIK3CA mutation, Aging",
                            value: "HER2/PIK3CA mutation, Aging",
                          },
                          { label: "FLT3", value: "FLT3" },
                          {
                            label: "ITD mutation, Benzene exposure",
                            value: "ITD mutation, Benzene exposure",
                          },
                          {
                            label:
                              "MET/ALK mutation, Helicobacter pylori infection",
                            value:
                              "MET/ALK mutation, Helicobacter pylori infection",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      type="submit"
                      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )} */}

            {!isResultPage && (
              <div className="col-span-4 relative ">
                <div className="flex flex-wrap gap-2 shadow-md p-4 mt-4">
                  {tabData.map((tab, idx) => {
                    return (
                      <button
                        type="button"
                        className={`shadow-md p-2 pl-4 pr-4 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700
                        ${
                          idx === activeTabIndex
                            ? "border-teal-500 bg-gradient-to-r to-emerald-600 from-sky-400 "
                            : "border-transparent hover:border-gray-200"
                        }`}
                        key={idx}
                        onClick={() => setActiveTabIndex(idx)}
                      >
                        {tab.label}
                      </button>

                      // <button
                      //   key={idx}
                      //   className={`py-2 border-b-4 transition-colors duration-300  ${idx === activeTabIndex
                      //     ? "border-teal-500"
                      //     : "border-transparent hover:border-gray-200"
                      //     }`}
                      //   onClick={() => setActiveTabIndex(idx)}
                      // >
                      //   {tab.label}
                      // </button>
                    );
                  })}
                </div>
                <div className="py-4">
                  {activeTabIndex == 0 && (
                    <form onSubmit={handleFormSubmit}>
                      <div className="mt-6 shadow-md p-4">
                        <h1 className="mb-4 text-3xl text-gray-900 dark:text-white ">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                            Biomarker Details
                          </span>
                        </h1>
                        <hr /> <br />
                        <div className="grid grid-cols-2 gap-4">
                          <Dropdown
                            label="Gene Name"
                            name="geneName"
                            onSelect={handleChange}
                            option={[
                              { label: "BRCA1", value: "BRCA1" },
                              { label: "TP53", value: "TP53" },
                              { label: "EGFR", value: "EGFR" },
                              { label: "KRAS", value: "KRAS" },
                              { label: "BRAF", value: "BRAF" },
                              { label: "PIK3CA", value: "PIK3CA" },
                              { label: "HER2", value: "HER2" },
                              { label: "ALK", value: "ALK" },
                              { label: "MET", value: "MET" },
                              { label: "PTEN", value: "PTEN" },
                            ]}
                          />
                          <Dropdown
                            label="Co-occurring Mutations"
                            name="coOccurringMutations"
                            onSelect={handleChange}
                            option={[
                              { label: "TP53, CHEK2", value: "TP53, CHEK2" },
                              { label: "ATM, RB1", value: "ATM, RB1" },
                              { label: "ALK, KRAS", value: "ALK, KRAS" },
                              { label: "NRAS, BRAF", value: "NRAS, BRAF" },
                              { label: "PIK3CA, PTEN", value: "PIK3CA, PTEN" },
                              { label: "HER2, AKT1", value: "HER2, AKT1" },
                              { label: "BRCA2, FGFR1", value: "BRCA2, FGFR1" },
                              { label: "ROS1, MET", value: "ROS1, MET" },
                              { label: "EGFR, RET", value: "EGFR, RET" },
                              { label: "APC, SMAD4", value: "APC, SMAD4" },
                            ]}
                          />
                          <Dropdown
                            label="Molecular Type"
                            name="molecularType"
                            onSelect={handleChange}
                            option={[
                              { label: "DNA", value: "DNA" },
                              //{ label: "Protein", value: "Protein" },
                              //{ label: "RNA", value: "RNA" },
                              //{ label: "DNA", value: "DNA" },
                              //{ label: "Protein", value: "Protein" },
                              // { label: "DNA", value: "DNA" },
                              //{ label: "RNA", value: "RNA" },
                              { label: "Protein", value: "Protein" },
                              // { label: "DNA", value: "DNA" },
                              { label: "RNA", value: "RNA" },
                            ]}
                          />
                          <Dropdown
                            label="Mutation Type"
                            name="mutationType"
                            onSelect={handleChange}
                            option={[
                              { label: "Missense", value: "Missense" },
                              { label: "Frameshift", value: "Frameshift" },
                              { label: "Deletion", value: "Deletion" },
                              { label: "Substitution", value: "Substitution" },
                              { label: "Insertion", value: "Insertion" },
                              {
                                label: "Amplification",
                                value: "Amplification",
                              },
                              { label: "Duplication", value: "Duplication" },
                              { label: "Fusion", value: "Fusion" },
                              {
                                label: "Splice Variant",
                                value: "Splice Variant",
                              },
                              { label: "Nonsense", value: "Nonsense" },
                            ]}
                          />
                          <Dropdown
                            label="Mutation Position (DNA/RNA/Protein)"
                            name="mutationPosition"
                            onSelect={handleChange}
                            option={[
                              {
                                label: "c.68_69delAG / p.Glu23ValfsTer17",
                                value: "c.68_69delAG / p.Glu23ValfsTer17",
                              },
                              {
                                label: "c.375G>T / p.Arg125Leu",
                                value: "c.375G>T / p.Arg125Leu",
                              },
                              {
                                label: "c.2235_2249del15 / p.Glu746_Ala750del",
                                value: "c.2235_2249del15 / p.Glu746_Ala750del",
                              },
                              {
                                label: "c.34G>T / p.Gly12Cys",
                                value: "c.34G>T / p.Gly12Cys",
                              },
                              {
                                label: "c.1799T>A / p.Val600Glu",
                                value: "c.1799T>A / p.Val600Glu",
                              },
                              {
                                label: "c.1633G>A / p.Glu545Lys",
                                value: "c.1633G>A / p.Glu545Lys",
                              },
                              {
                                label: "c.2329_2331dupGAT / p.Glu774dup",
                                value: "c.2329_2331dupGAT / p.Glu774dup",
                              },
                              { label: "EML4", value: "EML4" },
                              {
                                label: "ALK (E13:A20)",
                                value: "ALK (E13:A20)",
                              },
                              { label: "c.2888", value: "c.2888" },
                              { label: "3C>G / p.?", value: "3C>G / p.?" },
                              {
                                label: "c.689G>T / p.Glu230*",
                                value: "c.689G>T / p.Glu230*",
                              },
                            ]}
                          />
                          <Dropdown
                            label="Ethnicity"
                            name="ethnicity"
                            onSelect={handleChange}
                            option={[
                              { label: "Caucasian", value: "Caucasian" },
                              { label: "Asian", value: "Asian" },
                              { label: "African", value: "African" },
                              { label: "Hispanic", value: "Hispanic" },
                              // { label: "Caucasian", value: "Caucasian" },
                              // { label: "Asian", value: "Asian" },
                              // { label: "African", value: "African" },
                              //  { label: "Hispanic", value: "Hispanic" },
                              // { label: "Caucasian", value: "Caucasian" },
                              // { label: "Asian", value: "Asian" },
                            ]}
                          />
                        </div>
                      </div>
                      <div className="mt-6 shadow-md p-4">
                        <h1 className="mb-4 text-3xl text-gray-900 dark:text-white ">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                            Disease Association
                          </span>
                        </h1>
                        <hr /> <br />
                        <div className="grid grid-cols-2 gap-4">
                          <Dropdown
                            label="Associated Disease Name"
                            name="associatedDiseaseName"
                            onSelect={handleChange}
                            option={[
                              {
                                label: "Breast Cancer",
                                value: "Breast Cancer",
                              },
                              {
                                label: "Lung Adenocarcinoma",
                                value: "Lung Adenocarcinoma",
                              },
                              {
                                label: "Colorectal Cancer",
                                value: "Colorectal Cancer",
                              },
                              { label: "Melanoma", value: "Melanoma" },
                              {
                                label: "Ovarian Cancer",
                                value: "Ovarian Cancer",
                              },
                              {
                                label: "Pancreatic Cancer",
                                value: "Pancreatic Cancer",
                              },
                              { label: "Glioblastoma", value: "Glioblastoma" },
                              {
                                label: "Prostate Cancer",
                                value: "Prostate Cancer",
                              },
                              {
                                label: "Leukemia (AML)",
                                value: "Leukemia (AML)",
                              },
                              {
                                label: "Gastric Cancer",
                                value: "Gastric Cancer",
                              },
                            ]}
                          />
                          <Dropdown
                            label="Risk Factor"
                            name="riskFactor"
                            onSelect={handleChange}
                            option={[
                              {
                                label:
                                  "BRCA1/BRCA2 mutation, Hormonal imbalance",
                                value:
                                  "BRCA1/BRCA2 mutation, Hormonal imbalance",
                              },
                              {
                                label: "EGFR mutation, Smoking, Air pollution",
                                value: "EGFR mutation, Smoking, Air pollution",
                              },
                              {
                                label: "KRAS/BRAF mutation, High",
                                value: "KRAS/BRAF mutation, High",
                              },
                              { label: "fat diet", value: "fat diet" },
                              {
                                label: "BRAF V600E mutation, UV Exposure",
                                value: "BRAF V600E mutation, UV Exposure",
                              },
                              {
                                label: "BRCA1 mutation, Family history",
                                value: "BRCA1 mutation, Family history",
                              },
                              {
                                label: "TP53 mutation, Diabetes, Obesity",
                                value: "TP53 mutation, Diabetes, Obesity",
                              },
                              {
                                label: "PTEN mutation, Ionizing radiation",
                                value: "PTEN mutation, Ionizing radiation",
                              },
                              {
                                label: "HER2/PIK3CA mutation, Aging",
                                value: "HER2/PIK3CA mutation, Aging",
                              },
                              { label: "FLT3", value: "FLT3" },
                              {
                                label: "ITD mutation, Benzene exposure",
                                value: "ITD mutation, Benzene exposure",
                              },
                              {
                                label:
                                  "MET/ALK mutation, Helicobacter pylori infection",
                                value:
                                  "MET/ALK mutation, Helicobacter pylori infection",
                              },
                            ]}
                          />
                        </div>
                      </div>
                      <div className="mt-6 text-center">
                        <button
                          type="submit"
                          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  )}

                  {activeTabIndex == 1 && (
                    <div className="mt-6 shadow-md p-4">
                      <Chat />
                    </div>
                  )}
                </div>
              </div>
            )}

            {isResultPage && (
              <div className="col-span-4 mt-6">
                <ResultPage
                  closeResult={handleCloseResult}
                  data={searchResults}
                />
              </div>
            )}
          </div>

          {/*

        <div className="flex search-box">
          <button className="btn-search flex items-center justify-center ">
            <MagnifyingGlassIcon className="size-7 text-center text-white-900" />
          </button>
          <input
            type="text"
            className="input-search "
            placeholder="Type to Search..."
          />
        </div>

        <div className="flex justify-center m-10 mt-11">
          {searchResults != "" && (
            <div className="">
              <p className="text-[#818487]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                magnam porro tempora quos repellendus a molestias ex beatae
                voluptas voluptatem delectus facere exercitationem deleniti saepe
                vero id accusamus, neque cum asperiores adipisci tenetur omnis
                eos? Error excepturi vero vitae voluptate corrupti dolorem
                temporibus voluptatibus fugiat cum omnis repellat in quasi
                provident iusto, facilis, perferendis quae voluptatem eum ipsum
                nostrum suscipit! Officiis mollitia dolor laborum consequatur
                distinctio hic nulla culpa esse nesciunt, tempore minus optio
                fugit aperiam magni ex, ipsum delectus consequuntur asperiores.
                Nam omnis, magni quasi consequatur similique suscipit aliquam rem
                temporibus ab deserunt accusamus alias ex adipisci dolore est
                deleniti expedita accusantium velit? Laudantium quas, explicabo
                facere in consequatur praesentium cupiditate, obcaecati alias vero
                sit quod corrupti mollitia quaerat vel eligendi voluptatem earum,
                soluta quidem! Culpa alias vitae iusto rem eligendi, in voluptas
                tenetur nemo fugiat, tempore ipsam aliquam cupiditate perferendis
                aut unde, nobis esse incidunt maiores minus inventore obcaecati
                officia delectus eaque. Sit, reiciendis quis! Repellat cumque
                repudiandae aperiam fugiat dicta blanditiis quae a, sequi
                explicabo odit nisi harum, autem nobis est soluta sapiente. Ad
                dicta molestias vitae non neque officiis animi voluptatem
                accusantium perferendis eum cupiditate impedit illum nostrum illo
                fugit nisi nulla suscipit pariatur, officia expedita.
              </p>
            </div>
          )}
        </div> */}
          <footer>
            <p className="flex items-center justify-center">
              Created by
              <span className="ml-1"> Quest Stars</span>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Home;
