import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./components/authContext";

import Navbar from "./components/navbar.component";
import PaintsList from "./components/paints-list.component";
import LoginScreen from "./components/login-screen.component";
import EditPaint from "./components/edit-paint.component";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/all" element={<PaintsList />} />
          <Route path="/update/:id" element={<EditPaint />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}


export default App;
