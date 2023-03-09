import React from 'react';
// import ReactDOM from 'react-dom'
// import App from './Views/App';

// ReactDOM.render(<App/>, document.getElementById('root'));

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import NoPage from "./pages/NoPage";
import Account from "./pages/Account";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Discover from './pages/Discover';
import PageNotFound from './pages/PageNotFound';

export default function App() {
const [loginStatus, setLoginStatus] = React.useState(true);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>}>
          <Route index element={<Home />} /> {/** Default route */}
          <Route path="account" element={<Account />} />
          <Route path="discover" element={<Discover />} />
          <Route path="login" element={<SignIn oginStatus={loginStatus} setLoginStatus={setLoginStatus}/>} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);