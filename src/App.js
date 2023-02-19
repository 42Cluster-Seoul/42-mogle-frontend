import { Route, Routes } from "react-router-dom";
import getServerStatus from "utils/getServerStatus";
import MobileLayout from "./components/MobileLayout";
import DesktopLayout from "./components/DesktopLayout";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Signup from "./pages/SignupPage";
import Auth from "./pages/Auth";
import DashboardPage from "./pages/DashboardPage";
import SettingPage from "./pages/SettingPage";
import ClosedPage from "./pages/ClosedPage";
import NotFoundPage from "./pages/NotFoundPage";


function App() {
  // if (getServerStatus() == false) {
	// 	console.log("FAILLL");
  //   return <ClosedPage />;
  // }
	getServerStatus()
	.then(status => {
		console.log(status);
		return <ClosedPage />;
	})
	.catch(error => {
		console.error(error);
	});

  return (
    <Routes>
      <Route element={<MobileLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth" element={<Auth />} />
      </Route>
      <Route element={<DesktopLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/setting" element={<SettingPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
