import { NavLink } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/note", label: "Note" },
  { path: "/new", label: "New" },
  // { path: "/about", label: "About" },
  // { path: "/response", label: "Response" },
  // { path: "/profile/username", label: "Profile" },
];

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem("emailID");
    localStorage.removeItem("password");
    setIsLoggedIn(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "10px", backgroundColor: "white" }}>
      <nav>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "20px",
            margin: 0,
            padding: 0,
          }}
        >
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "#ff8800" : "black",
                  fontWeight: isActive ? "bold" : "normal",
                  padding: "8px 12px",
                  transition: "color 0.3s ease",
                })}
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          {!isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  style={{ textDecoration: "none", color: "black", padding: "8px 12px" }}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  style={{ textDecoration: "none", color: "black", padding: "8px 12px" }}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;