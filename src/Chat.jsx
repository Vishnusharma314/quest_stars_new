import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";
import moment from "moment";

const Chat = () => {
  const [userName, setUserName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [article, setArticle] = useState("");
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    setArticle(e.target.value);
  };

  const onSearch = () => {
    if (article.trim() == "" || prompt.trim() == "") {
      alert("Please enter the prompt and select the article");
      return;
    }

    setChatData((prev) => {
      console.log(prev);
      [...prev, { senderChat: prompt, receiverChat: "" }];
    });

    axios
      .post(
        "https://9a03-106-222-216-211.ngrok-free.app/api/auth/gemini-article",
        {
          pubmedArticle: article,
          userQuestion: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        // const lastData = parseInt(chatData.length) - 1;
        // console.log("sgsfgdfgdfg", lastData);
        // chatData[lastData]["receiverChat"] = res.data.ai_answer;
        // console.log(chatData);

        //chatData[indexData].receiverChat = res.data.ai_answer;

        //setChatData(chatData);

        console.log(chatData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="mt-4">
        <div className="flex justify-between ">
          <h1 className="mb-4 text-3xl text-gray-900 dark:text-white ">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Chat
            </span>
          </h1>
        </div>
        <hr />
        <div className="mt-3 mb-3">
          <Dropdown
            label="Select Article"
            name="article"
            onSelect={handleChange}
            option={[
              {
                label:
                  "Baricitinib in patients admitted to \n  hospital with COVID-19 (RECOVERY): a randomised, controlled, \n open-label, platform trial and updated meta-analysis” by RECOVERY Collaborative Group",
                value:
                  "Baricitinib in patients admitted to hospital with COVID-19 (RECOVERY): a randomised, controlled, open-label, platform trial and updated meta-analysis” by RECOVERY Collaborative Group",
              },
              {
                label:
                  "PGB: A PubMed Graph Benchmark for Heterogeneous Network Representation Learning” by Eric W. Lee and Joyce C. Ho.",
                value:
                  "PGB: A PubMed Graph Benchmark for Heterogeneous Network Representation Learning” by Eric W. Lee and Joyce C. Ho.",
              },
              {
                label:
                  "Genomewide Association Study of Severe Covid-19 with Respiratory Failure” by Ellinghaus D, Degenhardt F, Bujanda L, et al.",
                value:
                  "Genomewide Association Study of Severe Covid-19 with Respiratory Failure” by Ellinghaus D, Degenhardt F, Bujanda L, et al.",
              },
              {
                label:
                  "A Phase I/II Clinical Trial to evaluate the efficacy of baricitinib to prevent respiratory insufficiency progression in onco-hematological patients affected with COVID-19: A structured summary of a study protocol for a randomised controlled trial” by Moreno-González G, Mussetti A, Albasanz-Puig A, et al.",
                value:
                  "A Phase I/II Clinical Trial to evaluate the efficacy of baricitinib to prevent respiratory insufficiency progression in onco-hematological patients affected with COVID-19: A structured summary of a study protocol for a randomised controlled trial” by Moreno-González G, Mussetti A, Albasanz-Puig A, et al.",
              },
              {
                label:
                  "Efficacy and safety of baricitinib plus standard of care for the treatment of critically ill hospitalised adults with COVID-19 on invasive mechanical ventilation or extracorporeal membrane oxygenation: an exploratory, randomised, placebo-controlled trial” by Ely EW, Ramanan AV, Kartman CE, et al.",
                value:
                  "Efficacy and safety of baricitinib plus standard of care for the treatment of critically ill hospitalised adults with COVID-19 on invasive mechanical ventilation or extracorporeal membrane oxygenation: an exploratory, randomised, placebo-controlled trial” by Ely EW, Ramanan AV, Kartman CE, et al.",
              },
              {
                label:
                  "Higher dose corticosteroids in patients admitted to hospital with COVID-19 who are hypoxic but not requiring ventilatory support (RECOVERY): a randomised, controlled, open-label, platform trial” by RECOVERY Collaborative Group.",
                value:
                  "Higher dose corticosteroids in patients admitted to hospital with COVID-19 who are hypoxic but not requiring ventilatory support (RECOVERY): a randomised, controlled, open-label, platform trial” by RECOVERY Collaborative Group.",
              },
              {
                label:
                  "Janus kinase inhibitors for the treatment of COVID-19” by Kramer A, Prinz C, Fichtner F, et al.",
                value:
                  "Janus kinase inhibitors for the treatment of COVID-19” by Kramer A, Prinz C, Fichtner F, et al.",
              },
              {
                label:
                  "A Review of Safety Outcomes from Clinical Trials of Baricitinib in Rheumatology, Dermatology and COVID-19” by Bieber T, Feist E, Irvine AD, et al.",
                value:
                  "A Review of Safety Outcomes from Clinical Trials of Baricitinib in Rheumatology, Dermatology and COVID-19” by Bieber T, Feist E, Irvine AD, et al.",
              },
              {
                label:
                  "Nebulized Furosemide for Pulmonary Inflammation in Intubated Patients With COVID-19: A Phase 2 Randomized Controlled Double-Blind Study” by Muscedere J, Maslove DM, Barden CJ, et al.",
                value:
                  "Nebulized Furosemide for Pulmonary Inflammation in Intubated Patients With COVID-19: A Phase 2 Randomized Controlled Double-Blind Study” by Muscedere J, Maslove DM, Barden CJ, et al.",
              },
              {
                label:
                  "Anti-synthetase syndrome is associated with a higher risk of hospitalization among patients with idiopathic inflammatory myopathy and COVID-19” by Wu W, Wang R, Xie C, et al.",
                value:
                  "Anti-synthetase syndrome is associated with a higher risk of hospitalization among patients with idiopathic inflammatory myopathy and COVID-19” by Wu W, Wang R, Xie C, et al.",
              },
            ]}
          />
        </div>
        <div style={{ position: "relative", height: "500px" }}>
          <div className="border-solid border-1 rounded-lg border-gray-300 p-4 chatBox">
            {Array.isArray(chatData) &&
              chatData.length > 0 &&
              chatData.map((chat, idx) => {
                return (
                  <div key={idx}>
                    <span className="flex justify-end text-[12px] mr-2 ">{`${userName}`}</span>
                    <div className="mb-4 p-3 flex flex-col w-lg  float-right rounded-lg bg-blue-500 senderChat">
                      <div className="float-right w-md">{chat.senderChat}</div>
                    </div>
                    <br />
                    <div className="flex justify-start text-[12px] mr-2 ">
                      MutationX AI
                    </div>
                    {chat.receiverChat !== "" ? (
                      <spn> ... </spn>
                    ) : (
                      <div className="mt-4 mb-4  p-3 flex flex-col  w-lg rounded-lg bg-blue-500">
                        <div className="float-left">{chat.receiverChat}</div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <div>
            {/* <form onSubmit={onSearch}> */}
            <label
              for="search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <input
                type="search"
                id="search"
                class="block w-full mt-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter prompt.."
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
              <button
                onClick={onSearch}
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Send
              </button>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
