import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import Scheduling from "./Components/Scheduling"
import About from "./Components/About"
import Account from "./Components/AccountSetup"
import Messaging from "./Components/Messaging"
import Services from "./Components/Services"
import AccountLogin from "./Components/AccountLogin"
import AccountLogout from "./Components/AccountLogout"
import AccountSettings from "./Components/AccountSettings"
import AccountHome from "./Components/AccountHome"
import AccountCourse from "./Components/AccountCourse"
import ServicesCourse from "./Components/ServicesCourse"
import Lesson from "./Components/Lesson"
import Verification from "./Components/Verification"
import CreateCourse from "./Components/CreateCourse"
import PasswordForgot from "./Components/PasswordForgot"
import UsernameForgot from "./Components/UsernameForgot"
import PasswordReset from "./Components/PasswordReset"
import UsernameReset from "./Components/UsernameReset"
import MassMessaging from "./Components/MassMessaging"
import { Route, Routes } from "react-router-dom"
import Footer from './Components/Footer'; // Import Footer component

import 'bootstrap/dist/css/bootstrap.min.css';  // imports bootstrap styles

function App(){

  useEffect(() => {
    // Set Axios defaults
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = "https://harmonymusicbackend.vercel.app"; // Update with your backend domain

    // Fetch CSRF token on app load
    axios.get("/api/get-csrf-token/")
      .then(() => console.log("CSRF token initialized"))
      .catch(error => console.error("Error initializing CSRF token:", error));
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Account />} />
          <Route path="/contact" element={<Messaging />} />
          <Route path="/course-list" element={<Services />} />
          <Route path="/course-list/course/:courseId" element={<ServicesCourse />} />
          <Route path="/login" element={<AccountLogin />} />
          <Route path="/logout" element={<AccountLogout />} />
          <Route path="/account" element={<AccountHome />} />
          <Route path="/account/course/:courseId" element={<AccountCourse />} />
          <Route path="/account/course/:courseId/lesson/:lessonId" element={<Lesson />} />
          <Route path="/account/settings" element={<AccountSettings />} />
          <Route path="/account/create-course" element={<CreateCourse />} />
          <Route path="/account/mass-email" element={<MassMessaging />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/forgot-password" element={<PasswordForgot />} />
          <Route path="/forgot-username" element={<UsernameForgot />} />
          <Route path="/password-reset/:userId/:token" element={<PasswordReset />} />
          <Route path="/username-reset/:userId/:token" element={<UsernameReset />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
export default App
