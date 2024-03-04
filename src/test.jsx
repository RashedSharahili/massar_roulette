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
            setResponseMessage('Your IP has been not added to the database.');
          }
        } catch (error) {
          console.error('Error fetching IP:', error);
        }
      };
  
      fetchUserIP();
    }, []);
  
    const postDataToAPI = async () => {
      if (ipExists) {
        return; 
      }
      
      try {
        const response = await axios.post('https://64d8b3c25f9bf5b879ce7999.mockapi.io/users', {
          ip: userIP
        });
        setResponseMessage(response.data.message);
        setIpExists(true);
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };
  
    return (
      <div>
        <h1>Your IP: {userIP}</h1>
        <button onClick={postDataToAPI} disabled={ipExists}>Post IP to API</button>
        <p>Response: {responseMessage}</p>
      </div>
    );
  };
  

export default IPTracker;
