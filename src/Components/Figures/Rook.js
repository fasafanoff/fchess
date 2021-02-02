import React from "react";
import Piece from "./Piece";
import { FaChessRook } from "react-icons/fa";

const Rook = (props) => {
  return <Piece {...props} component={FaChessRook} />;
};

export default Rook;
