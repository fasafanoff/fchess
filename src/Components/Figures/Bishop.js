import React from "react";
import Piece from "./Piece";
import { FaChessBishop } from "react-icons/fa";

const Bishop = ( props ) => {


  
  return (
    <Piece {...props} component={FaChessBishop}/>
  );
};

export default Bishop;
