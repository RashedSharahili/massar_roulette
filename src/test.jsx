import { useState, useEffect } from 'react';
import axios from 'axios';
import OopsImg from './assets/CartoonStyleRobot.png';
import loading from './assets/massar_logo.png'

const IPTracker = () => {
    const [userIP, setUserIP] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [ipExists, setIpExists] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Loading state

  
    useEffect(() => {
      const fetchUserIP = async () => {
        try {
          const ipResponse = await axios.get('https://api.ipify.org?format=json');
          setUserIP(ipResponse.data.ip);
          // Check if user's IP exists in the mock API
          const existingIPResponse = await axios.get(`https://64d8b3c25f9bf5b879ce7999.mockapi.io/users?ip=${ipResponse.data.ip}`);
          if (existingIPResponse.data.length > 0) {
            setResponseMessage('Your IP already exists in the database.');
            setIpExists(true);
          }else{
            setResponseMessage('');
          }
        } catch (error) {
          console.error('Error fetching IP:', error);
        }finally{
          setIsLoading(false);
        }
      };
  
      fetchUserIP();
    }, []);
  
    // const postDataToAPI = async () => {
    //   if (ipExists) {
    //     return; 
    //   }
      
    //   try {
    //     const response = await axios.post('https://64d8b3c25f9bf5b879ce7999.mockapi.io/users', {
    //       ip: userIP
    //     });
    //     setResponseMessage(response.data.message);
    //     setIpExists(true);
    //   } catch (error) {
    //     console.error('Error posting data:', error);
    //   }
    // };
    const Popup = () => (
      <div className='absolute bg-slate-800/60 h-full w-full flex items-center justify-center  z-50'>
      <div className="popup h-5/6 text-5xl flex flex-col justify-center items-center bg-white w-11/12 rounded-xl text-center">
        <img src={OopsImg} alt="" />
        <p>  يبدو انك سبق وجربت حظك </p>
      </div>
      </div>

    );
    if (isLoading) {
      // Render loading indicator if IP check is in progress
      return       <div className='absolute bg-slate-800/60 h-full w-full flex items-center justify-center  z-50'>
      <div className="popup h-full text-5xl flex flex-col justify-center items-center bg-[#122e4a] w-full rounded-xl text-center">

<img src={loading} className='animate-pulse w-1/2' alt="" />      
  </div>
        </div>;
    }
  
    return (
      <>
      {ipExists && <Popup />}
      </>
    );
  };
  

export default IPTracker;
