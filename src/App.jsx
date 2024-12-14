import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from './components/intro';
import UserChoice from './components/userChoice';
import Result from './components/Result';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/user-choice" element={<UserChoice />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
