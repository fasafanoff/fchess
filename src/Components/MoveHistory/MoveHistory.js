import React from 'react';
import {BoardContext} from '../BoardProvider/BoardProvider';

const MoveHistory = () => {
    const { game } = React.useContext(BoardContext);
    console.log(game);
    return (
        <div>
            
        </div>
    );
}

export default MoveHistory;
