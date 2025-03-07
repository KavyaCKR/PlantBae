import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/login"
import Test from "./components/test"
import Landing from "./components/landing"
import Dashboard from "./components/dashboard"
import Reminder from "./components/reminder"
import Create from "./components/create"
import { Toaster } from "sonner"
import SignUp from "./components/create"
import Contactus from "./components/contactus"
import Ai from "./components/ai"

function App() {


  return (
    <>
    <Toaster richColors position="top-center"/>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/landing" element={<Landing/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/reminder" element={<Reminder/>}/>
          <Route path="/create" element={<SignUp/>}/>
          <Route path="/contactus" element={<Contactus/>}/>
          <Route path="/askai" element={<Ai/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
