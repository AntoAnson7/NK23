import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { RouterPaths } from "./components/RouterPaths";
import useReady from "./components/useReady";
import { Loader } from "./components/Loader";
import "./App.css";

function App() {
  const { ready } = useReady(500);
  // return (
  //   <div className="App">
  //     {ready !== true ? (
  //       <Loader />
  //     ) : (
  //       <Router>
  //         <Navbar />
  //         <RouterPaths />
  //       </Router>
  //     )}
  //   </div>
  // );

  return (
    <div className="App">
      <Router>
        <Navbar />
        <RouterPaths />
      </Router>
    </div>
  );
}

export default App;
