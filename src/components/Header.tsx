import React from "react";

interface headerProps {
    del : boolean;
    setDel:(value:boolean|((prev:boolean)=>boolean))=>void;
}

export const Header: React.FC<headerProps> = ({del,setDel}) => {
  return (
    <div>
      <header className="App-header">Welcome</header>
      <label style={{ fontSize: "20px" }}>Delete</label>
      <input
        type="checkbox"
        onChange={() => {
          setDel((prev) => {
            return !prev;
          });
        }}
        checked={del}
      ></input>
    </div>
  );
};

