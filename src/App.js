import "./App.css";
import React from 'react';
// npm install -S react-router-dom  use this to update the package in package.json also else it update only in dev
import {
  BrowserRouter,
  // Switch,
  Routes,
  Route,
  // Redirect, 
} from "react-router-dom";

// import About component
import About, { AboutUs } from "./components/About";
// import ContactUs component
// import ContactUs from "./components/ContactUs";

import Login from "./components/Login";

import SignUp from "./components/SignUp";

// import UpdateProfile from "./components/UpdateProfile";

// import UpdateEquipmentDetails from "./components/UpdateEquipmentDetails";

// import SetEquipmentDetails from "./components/SetEquipmentDetails";

// import SearchProducts from "./components/SearchProducts";
class App extends React.Component {


  static name = '';
  static token = '';

  render() {

    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            {/* <Route path="/UpdateProfile" element={<UpdateProfile />} /> */}
            {/* <Route path="/UpdateEquipmentDetails" element={<UpdateEquipmentDetails />} /> */}
            {/* <Route path="/SetEquipmentDetails" element={<SetEquipmentDetails />} /> */}
            {/* <Route path="/SearchProducts" element={<SearchProducts />} /> */}
            {/* <Route path='/SignOut' element={<Login />} /> */}
            <Route path='*' exact={true} element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }

}
export default App;

