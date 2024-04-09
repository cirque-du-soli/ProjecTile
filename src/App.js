import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./contexts/authContext.js";

// STYLE imports
import './styles/App.css';
import "./styles/tailwind.css";

// PAGE imports
import Login from "./pages/auth/login.js";
import Regi from "./pages/auth/regi.js";
import Home from "./pages/user/user-home-page.js";
import Settings from "./pages/user/user-settings-page.js";
import PageNotFound from "./pages/misc/PageNotFound.js";
import { NavigateBefore } from "@mui/icons-material";

function App() {
  //check if logged in
  const [authState, setAuthState] = useState(false);
  const [userState, setUserState] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/auth`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          console.log(response.data);
          setUserState(response.data);

          setAuthState(true);
        }
      });
  }, [localStorage.getItem("accessToken")]);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{ authState, setAuthState, userState, setUserState }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/regi" element={<Regi />} />
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/*" element={<PageNotFound />}  />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
