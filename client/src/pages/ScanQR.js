import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";

const ReceiveBlob = () => {
  const navigate = useNavigate();

  const handleNavigation = (roomId) => {
    navigate(`/receive/${roomId}`);
    navigate(0);
  };

  return (
    <div style={{ width: "600px", he: "600px" }} scanDelay="2000">
      <QrReader
        onResult={(result) => {
          if (result) {
            handleNavigation(result.text);
          }
        }}
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
};

export default ReceiveBlob;
