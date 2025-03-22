import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";

const Chat = () => {
  const [userName, setUserName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [article, setArticle] = useState("");
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    setUserName(localStorage.getItem("username") || "User");
  }, []);

  const handleChange = (e) => {
    setArticle(e.target.value);
  };

  const onSearch = async () => {
    if (article.trim() === "" || prompt.trim() === "") {
      alert("Please enter the prompt and select the article");
      return;
    }

    // Add sender message to chatData immediately
    const newChat = {
      senderChat: prompt,
      receiverChat: "Loading...",
    };

    setChatData((prev) => [...prev, newChat]);

    try {
      const response = await axios.post(
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
      );

      const aiResponse = response.data?.ai_answer || "No response from AI.";

      // Update receiver message with the actual response
      setChatData((prev) => {
        const updatedChat = [...prev];
        updatedChat[updatedChat.length - 1].receiverChat = aiResponse;
        return updatedChat;
      });

      setPrompt(""); // Clear input after sending
    } catch (error) {
      console.error("Error fetching AI response:", error);
      alert("Error fetching AI response. Please try again.");
    }
  };

  return (
    <>
      <div className="mt-4">
        <div className="flex justify-between">
          <h1 className="mb-4 text-3xl text-gray-900 dark:text-white">
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
        <div style={{ position: "relative", height: "500px", overflowY: "auto" }}>
          <div className="border-solid border-1 rounded-lg border-gray-300 p-4 chatBox">
            {chatData.length > 0 ? (
              chatData.map((chat, idx) => (
                <div key={idx}>
                  {/* Sender Chat */}
                  <div className="flex justify-end mb-2">
                    <div className="bg-blue-500 text-white p-3 rounded-lg max-w-lg">
                      <span className="text-sm font-bold">{userName}</span>
                      <div>{chat.senderChat}</div>
                    </div>
                  </div>

                  {/* Receiver Chat */}
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-300 text-black p-3 rounded-lg max-w-lg">
                      <span className="text-sm font-bold">MutationX AI</span>
                      <div>{chat.receiverChat}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No messages yet.</p>
            )}
          </div>

          {/* Input Section */}
          <div className="mt-4 relative">
            <input
              type="text"
              id="search"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="block w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter prompt..."
              required
            />
            <button
              onClick={onSearch}
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
