import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext, AuthProvider } from "./components/authContext";

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
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/all" element={<PaintsList />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/update/:id" element={<EditPaint />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

// Higher-order component to protect private routes
function PrivateRoute({ component: Component, ...rest }) {
  const { isLoggedIn } = React.useContext(AuthContext);

  return (
    <Routes>
      <Route
        {...rest}
        element={isLoggedIn ? <Component /> : <Navigate to="/all" />}
      />
    </Routes>
  );
}

export default App;
