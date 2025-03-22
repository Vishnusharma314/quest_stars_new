import moment from "moment";

const HistorySideBar = ({ data, callback }) => {
  const historyCall = (promt) => {
    callback(promt);
  };

  return (
    <>
      <div className="text-lg shadow-md p-4">
        <h1 className="mb-4 text-3xl text-gray-900  ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            History
          </span>
        </h1>
        <hr />
        <div className="h-screen overflow-y-auto">
          {data &&
            data.map((item) => {
              return (
                <div className="mt-4 mb-4 shadow-md pb-4" key={item.id}>
                  <div>
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                      Date:
                    </span>
                    <span className="text-sm text-gray-900 text-[12px] font-medium">
                      {moment(item.dateTime).format("DD MMMM YYYY h:mm a")}
                    </span>
                  </div>
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                    Search Query:
                  </span>
                  <span className="text-sm text-gray-900 ">
                    <div className="mt-2">
                      <span
                        onClick={() => historyCall(item.prompt)}
                        className=" text-gray-500 limitlen hover:cursor-pointer"
                        title={item.prompt}
                      >
                        {" "}
                        {item.prompt}{" "}
                      </span>
                    </div>
                  </span>
                </div>
              );
            })}

          {/* <div className="mt-4 mb-4 shadow-md pb-4">
            <div>
              <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                Date:
              </span>
              <span className="text-sm text-gray-900 ">24/01/2024 5:55PM</span>
            </div>
            <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
              Search Parameters:
            </span>
            <span className="text-sm text-gray-900 ">
              <div className="mt-2">
                <span>Associated Disease Name: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Co-Occurring Mutations: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Ethnicity: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Gene Name: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Molecular Type: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Mutation Position:</span>{" "}
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Mutation Type:</span>{" "}
                <span className="ml-4 text-gray-500">xyz</span>
              </div>
              <div className="mt-2">
                <span>Risk Factor: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
            </span>
          </div> */}

          {/* <div className="mt-4 mb-4 shadow-md pb-4">
            <div>
              <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                Date:
              </span>
              <span className="text-sm text-gray-900 ">24/01/2024 5:55PM</span>
            </div>
            <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
              Search Parameters:
            </span>
            <span className="text-sm text-gray-900 ">
              <div className="mt-2">
                <span>Associated Disease Name: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Co-Occurring Mutations: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Ethnicity: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Gene Name: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Molecular Type: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Mutation Position:</span>{" "}
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Mutation Type:</span>{" "}
                <span className="ml-4 text-gray-500">xyz</span>
              </div>
              <div className="mt-2">
                <span>Risk Factor: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
            </span>
          </div> */}
          {/* <div className="mt-4 mb-4 shadow-md pb-4">
            <div>
              <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                Date:
              </span>
              <span className="text-sm text-gray-900 ">24/01/2024 5:55PM</span>
            </div>
            <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
              Search Parameters:
            </span>
            <span className="text-sm text-gray-900 ">
              <div className="mt-2">
                <span>Associated Disease Name: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Co-Occurring Mutations: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Ethnicity: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Gene Name: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Molecular Type: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Mutation Position:</span>{" "}
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
              <div className="mt-2">
                <span>Mutation Type:</span>{" "}
                <span className="ml-4 text-gray-500">xyz</span>
              </div>
              <div className="mt-2">
                <span>Risk Factor: </span>
                <span className="ml-4 text-gray-500">xyz </span>
              </div>
            </span>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default HistorySideBar;
