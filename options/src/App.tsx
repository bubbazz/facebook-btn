import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleButton from 'react-bootstrap/Switch';
import Toast from 'react-bootstrap/Toast';

import React, { useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-bootstrap';


const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];


function App() {
  const [currentColor, setcurrentColor] = useState<string>("#e8453c");
  const [show, toggleShow] = useState(false);

  chrome.storage.sync.get("color", ({ color }) => {
    setcurrentColor(color);
  })

  const setColor = (value: string) => {
    setcurrentColor(value);
    chrome.storage.sync.set({ "color": value });
    chrome.tabs.query({ url: "*://*.facebook.com/*" }, tabs => {
      let btn: any;
      chrome.storage.sync.get("showBtn", ({ showBtn }) => {
        btn = showBtn;
        tabs.forEach(tab => {
          if (tab.id)
            chrome.tabs.sendMessage(tab.id, { color: value, yolo: "test", showBtn: btn }, function (response) {
              console.log(response);
            });
        }
        );
      })
    });
  }
  return (
    <div className="App">
      <div className="box">
        <p>Choose a different button color!</p>
        <div className='settingbox'>
          {
            presetButtonColors.map(color => (
              <div onClick={() => setColor(color)} className={color.includes(currentColor) ? 'colorBox current' : 'colorBox'} style={{ backgroundColor: color }}></div>)
            )
          }
        </div>
        <div className='settingbox'>
          <p className='righty'>Hab ich den Job?</p>
          <ToggleButton checked={show} onChange={() => toggleShow(!show)} className='lefty'></ToggleButton>
        </div>
        <ToastContainer position='middle-center'>
          <Toast delay={3000} show={show} onClose={() => toggleShow(false)} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="mr-auto">Facebook Button</strong>
              <small>{new Date().toDateString()}</small>
            </Toast.Header>
            <Toast.Body>Wuhu ich Freu mich 😄</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </div >
  )
}

export default App;

