import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from '../App.jsx'
import Admin from "./admin/Admin.jsx"
import Login from "./auth/Login.jsx"

export default function Main(){  
    return(
      <div>
        <BrowserRouter>
          <Routes>
            {/* public route */}
             <Route path="/" element={<App/>} />
             <Route path="/login" element={<Login/>}/>
            {/* private route */}
             <Route path='/admin' element={<Admin/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }