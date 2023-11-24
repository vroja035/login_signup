import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";

//pages and components
import PublicHome from './components/PublicHome';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import HomeScreen from './components/HomeScreen';
import PersistState from './components/PersistState';


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<PublicHome/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route element={<PersistState/>}>
          <Route path="/home" element={<HomeScreen/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
