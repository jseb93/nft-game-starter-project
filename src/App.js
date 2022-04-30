import {ethers} from "ethers";
import React, { useEffect, useState } from "react";
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import SelectCharacter from "./Components/SelectCharacter";
import Arena from "./Components/Arena";
import { CONTRACT_ADDRESS, transformCharacterData } from "./constants";
import myEpicGame from "./utils/MyEpicGame.json";
import LoadignIndicator from "./Components/LoadingIndicator";


// Constants
const TWITTER_HANDLE = 'gutter_crypto';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;


const App = () => {
  // const checkEthereum = ()=>{
  //   const {ethereum} = window;
  //   if (!ethereum) {
  //     return false;
  //   }else{
  //     return true;
  //   }
  // }
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const renderContent = () => {
    if (isLoading){
      return <LoadignIndicator />;
    }
    else if (!currentAccount){
      return(
        <div className="connect-wallet-container">
          <img src="https://cloudflare-ipfs.com/ipfs/QmSA1HDSyzRqXHtYGBworaMKCfPPMSDwamLJLapfamZYj2"/>
        <button
          className="cta-button connect-wallet-button"
          onClick={connectWalletAction}
        >
          Connect Wallet to Get Started
        </button>
        </div> 
      )
    } else if(!characterNFT){
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
    } else{
      return <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT}/>
    }
  }

  const checkNetwork = async () => {
    try{
      if(window.ethereum.networkVersion !== "4") {
        alert("Rinkeby Test Network に接続してください!");
      } else{
        console.log("Rinkeby に接続されています.");
      }
    }catch(error){
      console.log(error);
    }
  }

  const checkIfWalletIsConnected = async () => {
    try{
      const {ethereum} = window;
      if(!ethereum){
        console.log("Make sure you have MetaMask!");
        setIsLoading(false);
        return;
      }else{
        console.log("We have the ethereum object", ethereum);
        const accounts = await ethereum.request({method: "eth_accounts"});
        if(accounts.length!==0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account);
        }
        else {
          console.log("No authorized account found");
        }
      }
    }catch(error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const connectWalletAction = async () => {
    try{
      const {ethereum} = window;
      if(!ethereum){
        console.log("no ethereum");
      } else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
        checkNetwork();
      }
    }catch(error){
      console.log(error);
    }
  }



  useEffect(() => {
    setIsLoading(true);
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    const fetchNFTMetadata = async () => {
      console.log("Checking for Character NFT on address:", currentAccount);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        signer
      );
      const txn = await gameContract.checkIfUserHasNFT();
      if (txn.name){
        console.log("User has character NFT",transformCharacterData(txn));
        setCharacterNFT(transformCharacterData(txn));
      } else{
        console.log("No character NFT found");
      }
      setIsLoading(false);
    };

    if (currentAccount) {
      console.log("CurrentAccount:", currentAccount);
      fetchNFTMetadata();
    }
  }, [currentAccount]);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
        <p className="header gradient-text">⚡️ METAVERSE GAME ⚡️</p>
          <p className="sub-text">プレイヤーと協力してボスを倒そう✨</p>
          {renderContent()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built with @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
