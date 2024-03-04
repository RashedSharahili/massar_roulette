import React, { useEffect, useState } from "react";
import WheelComponent from "./weel";
import "./index.css";
import "./App.css";
import TrPortal from "./portal";
import Confetti from "react-confetti";
import Test from "./test";
import axios from "axios";

const App = () => {
  const [portal, setPortal] = useState(false);
  const [show, setShow] = useState(false);
  const [userIP, setUserIP] = useState('');


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
    "سماعة ايربودز",
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
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      setUserIP(ipResponse.data.ip);
      console.log("ip  ", ipResponse.data.ip);
      console.log("userIp  ", userIP);
      return ipResponse.data.ip; // Return the fetched IP address
    } catch (error) {
      console.error('Error fetching IP:', error);
      return null;
    }
  };
  
  const onFinished = async (winner) => {
    setPortal(false);
    setShow(winner);
  
    const userIp = await fetchUserIP(); // Wait for fetchUserIP to complete
    
    console.log("winner", winner);
    if (!userIp) {
      console.error('User IP not available.');
      return;
    }
    try {
      const response = await axios.post('https://64d8b3c25f9bf5b879ce7999.mockapi.io/users', {
        winner: winner,
        ip: userIp // Use the fetched IP address
      });
      // console.log("userIP", userIp);
      // console.log(response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  
  return (
    <>
    <div className="h-screen p-4 w-full relative flex flex-col justify-center items-center gap-5"
    >
      {/* <Test /> */}
      <h1 className="text-center font-bold text-7xl text-cyan-100 ">ضربة حظ!</h1>
      {show && <Confetti width={600} height={1120} />}
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
      {portal && <TrPortal />}
      {show && (
        <div className=" absolute h-[210vh] w-[153vw] text-center py-20 px-5  bg-slate-600/50 flex flex-col justify-around">
          <div className="bg-slate-50 w-full py-20 p-5 rounded-md shadow-lg flex flex-col gap-16">
          <h2 className="text-5xl">
            مبروك!!! فزت معنا ب{show} !!!
          </h2>
          <div className="">
            <button
              className="text-5xl text-white font-semibold bg-cyan-500 p-3 px-16"
              onClick={() => setShow(false)}
            >
              تم
            </button>
          </div>
          </div>
        </div>
      )}
    </div>
    </>

  );
};

export default App;
