import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Wheel } from "react-custom-roulette";
import axios from "axios";

const Roulette = ({ data, userIP }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [rouletteData, setRouletteData] = useState(data);

  useEffect(() => {
    const addShortString = data.map((item) => ({
      completeOption: item.text,
      option: item.text.length >= 30 ? item.text.substring(0, 30).trimEnd() + "..." : item.text
    }));
    setRouletteData(addShortString);
  }, [data]);

  const fetchIPAddress = async () => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserIP = async () => {
      const ip = await fetchIPAddress();
      // setUserIP(ip); // No need to set userIP state here
      return ip;
    };
    fetchUserIP();
  }, []);

  const handleSpinClick = async () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    const selected = data[newPrizeNumber]; // Get the selected item
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  
    try {
      await axios.post("https://64d8b3c25f9bf5b879ce7999.mockapi.io/users", {
        ip: userIP, // Include userIP in the request
        selectedItem: selected
      });
      alert("Selected item has been posted to the API: " + selected.text);
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Error posting data to the API.");
    }
  };
  

  return (
    <div className="roulette-container">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={rouletteData}
        onStopSpinning={() => setMustSpin(false)}
        outerBorderColor="#ccc"
        outerBorderWidth={9}
        innerBorderColor="#f2f2f2"
        radiusLineColor="transparent"
        radiusLineWidth={1}
        textColors="#f5f5f5"
        textDistance={55}
        fontSize={10}
        backgroundColors={[
          "#3f297e",
          "#175fa9",
          "#169ed8"
        ]}
        spinDuration={0.2}
      />
      <button className="button roulette-button" onClick={handleSpinClick}>
        Spin
      </button>
    </div>
  );
};

Roulette.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  userIP: PropTypes.string.isRequired
};

export default Roulette;
