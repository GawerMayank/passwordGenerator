import React from "react";

const Footer = () => {
  return (
    <div className="footer text-center fixed bottom-0 w-full bg-slate-900 flex flex-col">
      <div className=" font-bold text-xl text-white flex justify-center items-center space-x-2">
        <span>Password Generator</span>
        <img className="invert" src="/lock.svg" alt="" />
      </div>
      <div className=" text-white flex items-center justify-center s">
        Created with
        <img className=" m-2" src="/heart.svg" width={20} alt="" />
        by Mayank
      </div>
    </div>
  );
};

export default Footer;
