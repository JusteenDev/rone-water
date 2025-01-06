import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from '../App.jsx'
import Admin from "./admin/Admin.jsx"


export default function Main(){  
    return(
      <div>
        <BrowserRouter>
          <Routes>
            {/* public route */}
             <Route path="/" element={<App/>} />
            {/* private route */}
             <Route path='/admin' element={<Admin/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }