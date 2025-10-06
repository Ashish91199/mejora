import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import Home from "./component/home";
import CreateToken from "./CreateToken";
import Swap from "./Swap";
import TokenList from "./component/TokenList";
import SplashScreen from "./component/SplashScreen";
import InviteFriends from "./InviteFriends";
import Rank from "./Rank";
import ScratchBonus from "./ScratchBonus";
import Earn from "./Earn";
import Wallet from "./Wallet";
import Profile from "./Profile";
import WebAr from "./WebAr";
import Deposit from "./Deposit";
import Triangle from "./Triangle";
import Level from "./LevelSelector";
import Withdraw from "./Withdraw";
import Deposithistory from "./Deposithistory";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createtoken" element={<CreateToken />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/tokenlist" element={<TokenList />} />
          <Route path="/invitefriends" element={<InviteFriends />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/scratchbonus" element={<ScratchBonus />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/webar" element={<WebAr />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/triangle" element={<Triangle />} />
          <Route path="/level" element={<Level />} />
          <Route path="/Withdraw" element={< Withdraw />} />
          <Route path="/Deposithistory" element={< Deposithistory />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
