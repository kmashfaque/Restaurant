import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";


function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>

     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
