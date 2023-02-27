import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import { Home } from './pages/Home/Home'
import { Events } from './pages/Events/Events'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Signup } from './pages/Signup/Signup'
function App() {
  return (
    <div className="App">
      <Router>
          
          <Navbar/>
        
        <Routes>          
          <Route path="/" element={<Home />}/>
          <Route path="/events" element={<Events />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      
      </Router>
    </div>
  );
}

export default App;
