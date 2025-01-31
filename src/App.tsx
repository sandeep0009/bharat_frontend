
import { ProtectedAdmin } from "./components/ProtectedAdmin"
import { Admin } from "./pages/Admin"
import { Route,Routes } from "react-router-dom"
import { PassKey } from "./pages/Passkey"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<ProtectedAdmin Component={Admin}/>}/>
      <Route path="/pass" element={<PassKey/>}/>
    </Routes>


    </>
    
  )
}

export default App
