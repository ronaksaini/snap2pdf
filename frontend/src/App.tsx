import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import PreviewPage from "./components/PreviewPage"

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </Router>
  )
}

export default App