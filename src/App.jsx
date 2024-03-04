import React, { useEffect, useState } from "react";
import WheelComponent from "./weel";
import "./index.css";
import "./App.css";
import TrPortal from "./portal";
import Confetti from "react-confetti";
import Test from "./test";
import axios from "axios";
import masarLogo from "./assets/massar_logo.png";

const App = () => {
  const [portal, setPortal] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [userIP, setUserIP] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(true);

  useEffect(() => {
    // Load name from local storage when the component mounts
    const storedName = localStorage.getItem("user_name");
    if (storedName) {
      setName(storedName);
      setIsInputVisible(false); // Hide the input field if there's a name stored
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    localStorage.setItem("user_name", name); // Save the name to local storage
    setIsInputVisible(false); // Hide the input field after submission
  };

  const segments = [
    "ايفون",
    "سماعة",
    "تلفزيون ",
    "لابتوب",
    "ثلاجة",
    "غسالة",
    "ريال",
    "قرشين",
    "بطاقة هدايا",
    " ايربودز",
  ];

  const weelColors = () => {
    let arr = [];
    let colors = ["#36A1BC", "#0B4F6A", "#90CBDA", "#228DA8", "#052C36"];
    segments.forEach((el) => {
      let color = colors.shift();
      arr.push(color);
      colors.push(color);
    });

    return arr;
  };
  const segColors = weelColors();
  const fetchUserIP = async () => {
    try {
      const ipResponse = await axios.get("https://api.ipify.org?format=json");
      setUserIP(ipResponse.data.ip);
      console.log("ip  ", ipResponse.data.ip);
      console.log("userIp  ", userIP);
      return ipResponse.data.ip; // Return the fetched IP address
    } catch (error) {
      console.error("Error fetching IP:", error);
      return null;
    }
  };

  const onFinished = async (winner) => {
    setPortal(false);
    setShow(winner);
const Name = localStorage.getItem("user_name");
    setName(Name);
    const userIp = await fetchUserIP(); // Wait for fetchUserIP to complete

    console.log("winner", winner);
    if (!userIp) {
      console.error("User IP not available.");
      return;
    }
    try {
      const response = await axios.post(
        "https://64d8b3c25f9bf5b879ce7999.mockapi.io/users",
        {
          winner: winner,
          ip: userIp, // Use the fetched IP address
          name: Name, // Pass the name
        }
      );
      // console.log("userIP", userIp);
      console.log(Name);
      console.log(response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
    return <Test/>
  };
  const WinPopup = () => (
    <div className="absolute -top-1 z-50 w-full h-full">
      <div className=" absolute h-full w-full text-center py-20 px-5  bg-slate-600/50 flex flex-col justify-around">
        <div className="bg-slate-50 w-full py-20 p-5 rounded-md shadow-lg flex flex-col gap-16">
          <h2 className="text-4xl">
            مبروك  {name}! فزت معنا ب{show}
            !
          </h2>
          <div className="">
            <button
              className="text-3xl text-white font-semibold bg-cyan-500 p-3 px-16"
              onClick={() => {
                setShow(false);
                window.location.reload();
                localStorage.removeItem("user_name");
              }}
            >
              تم
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Test />

      <div className=" block h-screen w-screen relative text-center ">
        <div className="flex flex-col h-full justify-start items-center gap-2 relative w-screen">
          <img src={masarLogo} alt="" className="w-52  pb-10" />
          <h1 className="text-center font-bold text-5xl text-white ">
            ضربة حظ!
          </h1>
          <p className="text-3xl text-white m-0">اهلا  {name}</p>
          {show && <Confetti width={380} height={1120} />}
          {portal && <TrPortal />}
          {show && <WinPopup />}
          <div className="w-screen">
            <WheelComponent
              segments={segments}
              segColors={segColors}
              winningSegment={"8"}
              onFinished={(winner) => onFinished(winner)}
              primaryColor="#5C9DAE"
              contrastColor="white"
              buttonText="ابدأ"
              isOnlyOnce={true}
            />
          </div>
          {isInputVisible && (
            <form
              onSubmit={handleSubmit}
              className="absolute bg-slate-800/50 w-screen h-screen flex justify-center items-center "
            >
              <div className="bg-slate-50 w-3/4 h-1/6 flex flex-col justify-center items-center gap-5 rounded-md">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك"
                  className="p-2 py-3 border w-3/4 rounded-md bg-cyan-600/20 placeholder:text-xl"
                />
                <button
                  type="submit"
                  className="text-xl text-white font-semibold bg-cyan-500 py-1 px-6 "
                >
                  ارسل
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
