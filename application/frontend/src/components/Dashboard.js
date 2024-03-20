import React, { useState, useEffect } from "react";
import "../css/Home.css";
import axios from 'axios';

function Dashboard(){
  return (
    <div className="dashboard">
      <h1>Welcome back!</h1>
      <div>
        <input type="text" 
        placeholder="Search for Users Here"
        // value={}
        //onChange={}
        />
      </div>
      <div>
        <template>
            <div class='users'>
                <div class='header'></div>
                <div class='body'></div>
            </div>
        </template>
    </div>
    </div>
  );
}
export default Dashboard;