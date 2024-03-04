import React, { useEffect, useState } from "react";
import WheelComponent from "./weel";
import "./index.css";
import "./App.css";
import TrPortal from "./portal";
import Confetti from "react-confetti";
import Test from "./test";
import axios from "axios";
import masarLogo from './assets/massar_logo.png';

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
  const WinPopup = () => (
    <div className="absolute -top-1 z-50 w-full h-full">
    <div className=" absolute h-full w-full text-center py-20 px-5  bg-slate-600/50 flex flex-col justify-around">
      <div className="bg-slate-50 w-full py-20 p-5 rounded-md shadow-lg flex flex-col gap-16">
      <h2 className="text-5xl">
        مبروك!!! فزت معنا ب{show} !!!
      </h2>
      <div className="">
        <button
          className="text-5xl text-white font-semibold bg-cyan-500 p-3 px-16"
          onClick={() => {
            setShow(false);
            window.location.reload();
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
    <div className=" block h-screen w-screen relative text-center "
    >
      <div className="flex flex-col h-full justify-start items-center gap-2 relative w-screen">
      <img src={masarLogo} alt="" className="w-52  pb-10" />
      <h1 className="text-center font-bold text-5xl text-cyan-50 ">ضربة حظ!</h1>
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
      </div>

     
      </div>
    </>

  );
};

export default App;
