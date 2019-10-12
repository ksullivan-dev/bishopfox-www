import React, { useEffect, useState } from 'react';
import moment from "moment";

import { requester } from "./utilities/apiUtils";

function App() {
  const [scans, updateScans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:3000/import';
      const result = await requester({ url, method: "GET"});
      updateScans(result.scans);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      {scans.map(scan => {
        return <div key={scan.id}>
          <div style={{ border: "1px solid red", padding: "10px", margin: 10}}>
            Scan from {moment(scan.start_time * 1000).format("MMM D, YYYY") }
          </div>
        </div>
      })}
    </div>
  );
}

export default App;
