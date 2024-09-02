import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Preview from "./components/Preview";

function App() {
  return (
    <>
      <div className="max-w-5xl mx-auto p-4 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
