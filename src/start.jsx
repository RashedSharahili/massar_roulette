import { useState, useEffect } from "react";
import axios from 'axios';
import FormularioTexto from "./DraggeableForm";

const Start = () => {
  const [ipExists, setIpExists] = useState(false);
  const [userIP, setUserIP] = useState('');

  useEffect(() => {
    const fetchUserIP = async () => {
      try {
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        setUserIP(ipResponse.data.ip);
        // Check if user's IP exists in the mock API
        const existingIPResponse = await axios.get(`https://64d8b3c25f9bf5b879ce7999.mockapi.io/users?ip=${ipResponse.data.ip}`);
        if (existingIPResponse.data.length > 0) {
          setIpExists(true);
        }
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };

    fetchUserIP();
  }, []);


  return (
    <div>
      {/* Render FormularioTexto and pass userIP and name props */}
      {ipExists ? null : <FormularioTexto userIP={userIP} name={name} />}    
    </div>
  );
};

export default Start;
