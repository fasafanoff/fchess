import React from "react";
import Piece from "./Piece";

import { FaChessKing } from "react-icons/fa";

const King = (props) => {
  return <Piece {...props}  component={FaChessKing} />;
};

export default King;
