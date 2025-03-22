import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS

const ResultPage = ({ closeResult, data }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const chartData = {
    labels: [
      "Parp inhibitors sensitivity",
      "Platinum based chemotherapy sensitivity",
      "Immunotherapy response",
    ],
    datasets: [
      {
        label: "Therapy Response Prediction",
        data: [
          data.therapy_response_prediction.parp_inhibitors_sensitivity,
          data.therapy_response_prediction
            .platinum_based_chemotherapy_sensitivity,
          data.therapy_response_prediction.immunotherapy_response,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  console.log(data.report_summary);
  return (
    <div>
      <div className="flex justify-between ">
        <h1 className="mb-4 text-3xl text-gray-900 dark:text-white ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Results
          </span>
        </h1>
        <button
          type="button"
          onClick={closeResult}
          className="float-right text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Go back
        </button>
      </div>
      <hr />

      <div className="mt-6 shadow-md p-4">
        <h1 className="mb-4 text-3xl text-gray-900 ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Report Summary
          </span>
        </h1>
        <hr /> <br />
        <div className="">
          <p className=" text-gray-900 ">{data?.report_summary}</p>
        </div>
      </div>
      <div className="mt-6 shadow-md p-4">
        <h1 className="mb-4 text-3xl text-gray-900  ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Therapeutic Implications
          </span>
        </h1>
        <hr /> <br />
        <div className="">
          <p className=" text-gray-900 ">{data?.therapeutic_implications}</p>
        </div>
      </div>
      <div className="mt-6 shadow-md p-4">
        <h1 className="mb-4 text-3xl text-gray-900  ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Therapy Response Prediction
          </span>
        </h1>
        <hr /> <br />
        <div className=" w-1/2 m-auto">
          <Doughnut data={chartData} />
        </div>
      </div>
      {/*
      <div>
        <div class="mt-4">
          <span class="mt-4 bg-gradient-to-r to-emerald-600 from-sky-400 text-gray-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
            Report Title:
          </span>
          <span className="text-sm text-gray-900 ">{data?.reportTitle}</span>
        </div>
        <div class="mt-4">
          <span class="bg-gradient-to-r to-emerald-600 from-sky-400 text-gray-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
            Report Date:
          </span>
          <span className="text-sm text-gray-900 ">{data?.reportDate}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 shadow-md p-4 mt-4">
        {tabData.map((tab, idx) => {
          return (
            <button type="button"
              className={`shadow-md p-4 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700
              ${idx === activeTabIndex
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
        <p>{JSON.stringify(tabData[activeTabIndex].content)}</p>
      </div> */}
    </div>
  );
};
export default ResultPage;
