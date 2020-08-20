import React, { useState, useEffect, useRef } from 'react';
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://localhost:4001";

function Live() {
  const [response, setResponse] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("data", data => {
  //       console.log(data)
  //     setResponse(data);
  //     scrollToBottom()
  //   });
  // }, []);

  return (
    <div
      style={{ height: '300px', overflowY: 'scroll', overflowAnchor: 'none' }}
    >
      <ul style={{ listStyleType: 'none' }}>
        {response.map((item, i) => (
          <li key={item._id}>
            <div style={{ display: 'flex' }}>
              <p style={{ color: 'red' }}>{item.timestamp}</p>
              <br />
              <p style={{ color: 'green', marginLeft: '20px' }}>
                {item.message}
              </p>
            </div>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <div style={{ overflowAnchor: 'auto', height: '1px' }}></div>
    </div>
  );
}

export default Live;
