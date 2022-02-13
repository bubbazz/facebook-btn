import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleButton from 'react-bootstrap/Switch';

import React, { useState } from 'react';
import './App.css';


function App() {
  const [showBtn, toggleShowBtn] = useState(false);

  chrome.storage.sync.get("showBtn", ({ showBtn }) => {
    toggleShowBtn(showBtn);
  });
  const Change = async () => {
    let tabs = await chrome.tabs.query({ url: "*://*.facebook.com/*" });
    toggleShowBtn(!showBtn);
    chrome.storage.sync.set({ "showBtn": !showBtn });
    console.log(!showBtn)
    tabs.forEach(tab => {
      if (tab.id)
        chrome.tabs.sendMessage(tab.id, { showBtn: !showBtn }, function (response) {
          console.log(response);
        });
    })
  }
  return (
    <div className="App">
      <div className="box">
        <div className='settingbox'>
          <p className='righty'>Button Anzeigen</p>
          <ToggleButton checked={showBtn} onChange={() => Change()} className='lefty'></ToggleButton>
        </div>
      </div>
    </div >
  )
}

export default App;

