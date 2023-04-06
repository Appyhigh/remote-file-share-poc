import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SendBlob from "./pages/SendBlob";
import ScanQR from "./pages/ScanQR";
import ReceiveBlob from "./pages/ReceiveBlob";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/send" element={<SendBlob />} />
        <Route path="/scan" element={<ScanQR />} />
        <Route path="/receive/:roomId" element={<ReceiveBlob />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
