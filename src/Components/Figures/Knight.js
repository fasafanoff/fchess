import React from "react";
import Piece from "./Piece";
import { FaChessKnight } from "react-icons/fa";

const Knight = (props) => {
  return <Piece {...props} component={FaChessKnight} />;
};

export default Knight;
