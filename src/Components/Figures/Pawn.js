import React from "react";
import Piece from "./Piece";
import { FaChessPawn } from "react-icons/fa";

const Pawn = (props) => {
  return <Piece {...props} component={FaChessPawn} />;
};

export default Pawn;

