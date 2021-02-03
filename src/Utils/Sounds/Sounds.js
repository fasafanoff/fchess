import moveSelf from "../../sounds/move-self.webm";
import capture from "../../sounds/capture.webm";
import moveCheck from "../../sounds/move-check.webm";
import promote from "../../sounds/promote.webm";
import checkmate from "../../sounds/game-end.webm";
import castle from "../../sounds/castle.webm";

function initSounds(gameClient)
{
    let moveSelfO = new Audio(moveSelf);
    let captureO = new Audio(capture);
    let moveCheckO = new Audio(moveCheck);
    let promoteO = new Audio(promote);
    let endgame = new Audio(checkmate);
    let castleO = new Audio(castle);

    let soundsToPlay = {
      castle: false,
      capture: false,
      promote: false,
    };

    
  
  let SoundsHandler = () => {
    const state= gameClient.getStatus();
      if (state.isCheckmate || state.isStalemate || state.isRepetition)
        endgame.play();
      else if (state.isCheck) moveCheckO.play();
      else if (soundsToPlay.castle) castleO.play();
      else if (soundsToPlay.promote) promoteO.play();
      else if (soundsToPlay.capture) captureO.play();
      else moveSelfO.play();

      for (let key in soundsToPlay) soundsToPlay[key] = false;
    };

    gameClient.on("move", () => {
      setImmediate(SoundsHandler);
    });
    gameClient.on("capture", () => {
      soundsToPlay.capture = true;
    });
    gameClient.on("castle", () => {
      soundsToPlay.castle = true;
    });
    gameClient.on("promote", () => {
      soundsToPlay.promote = true;
    });
}

export default initSounds;