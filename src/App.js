import Loginform from "./Components/Loginform";
import Home from "./Components/Home";
import Signupform from "./Components/Signupform";
import { Error } from "./Components/Error";
import "./firebaseconfig";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Signupform />} />
          <Route path="login" element={<Loginform />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<Error errorcode={404} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
