import React from "react";
import Piece from "./Piece";
import { FaChessQueen } from "react-icons/fa";

const Queen = (props) => {
  return <Piece {...props} component={FaChessQueen} />;
};

export default Queen;

