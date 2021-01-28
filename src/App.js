import './App.css';
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";


//pages import 
import AnalysisPage from "./Pages/Analysis/Analysis";
import PlayPage from "./Pages/Play/Play";
import MainPage from "./Pages/Main/Main"



//the token is needed if the user reloads the page so that the board position stays the same
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route component={MainPage} path="/" exact />
          <Route component={AnalysisPage} path="/analysis/:token" />
          <Route component={PlayPage} path="/play/:token" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
