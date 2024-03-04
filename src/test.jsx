import { useState, useEffect } from 'react';
import axios from 'axios';

const IPTracker = () => {
    const [userIP, setUserIP] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [ipExists, setIpExists] = useState(false);
  
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
      <div className="popup h-5/6 text-6xl flex flex-col justify-center items-center bg-white w-11/12 rounded-xl text-center">
        <img src="./src/assets/CartoonStyleRobot.png" alt="" />
        <p>  يبدو انك سبق وجربت حظك </p>
      </div>
    );
  
    return (
      <div className='absolute bg-slate-800/60 h-[93rem] w-[43rem] flex items-center justify-center  z-50'>
      {ipExists && <Popup />}
    </div>
    );
  };
  

export default IPTracker;
