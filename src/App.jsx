import { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import MyAccount from "./components/MyAccount";
import { AuthContext } from "./context/AuthContext";
import Landingpage from "./components/Landingpage";
import React from "react";
import { useGeolocated } from "react-geolocated";

function App() {
  const { token } = useContext(AuthContext);

  const Demo = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
      useGeolocated({
        positionOptions: {
          enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
      });
    return !isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : coords ? (
      <table>
        <tbody>
          <tr>
            <td>latitude</td>
            <td>{coords.latitude}</td>
          </tr>
          <tr>
            <td>longitude</td>
            <td>{coords.longitude}</td>
          </tr>
          <tr>
            <td>altitude</td>
            <td>{coords.altitude}</td>
          </tr>
          <tr>
            <td>heading</td>
            <td>{coords.heading}</td>
          </tr>
          <tr>
            <td>speed</td>
            <td>{coords.speed}</td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  };

  return (
    <>
      <div>{Demo()}</div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/myaccount"
          element={token ? <MyAccount /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
