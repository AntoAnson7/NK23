import {BrowserRouter as Router} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import {RouterPaths} from './components/RouterPaths'

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar/>
          <RouterPaths/>
      </Router>
    </div>
  );
}

export default App;
