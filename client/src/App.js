import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Scan from "./pages/Scan";
import UploadFile from "./pages/UploadFile";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/scanQRtouploadFile" element={ <Scan />} />
        <Route path="/file/:roomId" element={<UploadFile />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
