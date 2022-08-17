import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import Counter from "../counter/Counter";

import "./UserProfile.css";

const UserProfile = () => {
  return (
    <div className="user-profile">
      <h1 className="title">User profile</h1>
      <Counter />
      <Link className="link" to={"/"}>
        <HomeIcon className="icon-home" />
      </Link>
    </div>
  );
};

export default UserProfile;
