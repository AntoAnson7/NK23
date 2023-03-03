import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import { Home } from './pages/Home/Home'
import { Events } from './pages/Events/Events'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Signup } from './pages/Signup/Signup'
import { Cultural } from './pages/Events/Cultural/Cultural'
import { Technical } from './pages/Events/Technical/Technical'
import {Competitions} from './pages/Events/Technical/Competitions/Competitions'
import {Workshops} from './pages/Events/Technical/Workshops/Workshops'

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
          <Route path="/events/cultural" element={<Cultural/>}/>
          <Route path="/events/technical" element={<Technical/>}/>
          
          <Route path="/events/technical/competitions" element={<Competitions/>}/>
          <Route path="/events/technical/workshops" element={<Workshops/>}/>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
