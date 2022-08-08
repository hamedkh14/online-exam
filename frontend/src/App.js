import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContainerStyle } from "./styles";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import ExamAdd from "./pages/exam/ExamAdd";
import ExamEdit from "./pages/exam/ExamEdit";

function App() {
  return (
    <>
      <Router>
        <ContainerStyle>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/examadd" element={<ExamAdd />} />
            <Route path="/examedit" element={<ExamEdit />} />
          </Routes>
          <ToastContainer />
        </ContainerStyle>
      </Router>
    </>
  );
}

export default App;
