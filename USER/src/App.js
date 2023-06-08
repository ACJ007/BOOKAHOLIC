import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./Log.css";

// import Drawer_ from './components/sidebar/Drawer';
import Homepage1 from "./components/Homepage1";
import UsePro from "./components/UsePro";
import EditPro from "./components/EditPro";
import Landingpage from "./components/Landingpage";
import UserHome from "./components/UserHome";
import Login from "./components/Login/index";
import Singup from "./components/Singup/index";
import UserLogin from "./components/UserLogin/index";
import SingleView from "./components/SingleView";

function App() {
  return (
    <div className="App">
      {/* <Homepage1/> */}

      {/* <Create/> */}
      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <WelcomePage/> */}
      {/* <UsePro/> */}
      {/* <EditPro/> */}
      {/* <Landingpage/> */}
      {/* <UserHome/> */}
      {/* <Drawer_/> */}
      

      <Routes>
        {/* <Route path="/signin" element={<Create/>}/> */}
        <Route path="/signup" element={<Singup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pro" element={<UsePro />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/edit" element={<EditPro />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/" element={<Landingpage/>} />
        <Route path="/book/:id" element={<SingleView/>} />
      </Routes>
    </div>
  );
}

export default App;
