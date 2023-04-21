import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <NavLink to={ { pathname: "/scanQRtouploadFile" }}>
        <button>Scan QR</button>
      </NavLink>
    </div>
  );
};

export default HomePage;
