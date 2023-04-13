import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <NavLink to={{ pathname: "/send" }}>
        <button>Send File</button>
      </NavLink>
      <NavLink to={{ pathname: "/receive" }}>
        <button>Receive File</button>
      </NavLink>
    </div>
  );
};

export default HomePage;
