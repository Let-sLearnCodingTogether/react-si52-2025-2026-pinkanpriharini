import { useNavigate } from "react-router";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";

interface User {
  username: string;
  email: string;
}

function NavbarComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user info from localStorage or API
    // For now, we'll extract from token if available
    const token = localStorage.getItem("AuthToken");
    if (token) {
      // Decode JWT to get username (basic approach)
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({
          username: payload.username || "User",
          email: payload.email || "user@example.com"
        });
      } catch (error) {
        console.log("Could not decode token", error);
        setUser({ username: "User", email: "user@example.com" });
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("AuthToken");
    // Navigate to signin
    navigate("/signIn", { replace: true });
  };

  return (
    <Navbar bg="dark" expand="lg" sticky="top" className="mb-4">
      <Navbar.Brand href="/movies" className="text-white fw-bold">
        🎬 Movie App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-light"
              id="dropdown-basic"
              className="d-flex align-items-center gap-2"
              style={{ border: "none", cursor: "pointer" }}
            >
              <div
                className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                style={{ width: "35px", height: "35px" }}
              >
                <span className="text-white fw-bold">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" className="mt-2">
              <Dropdown.Header>
                <div className="text-truncate">
                  <strong>{user?.username || "User"}</strong>
                </div>
                <small className="text-muted">{user?.email || "email@example.com"}</small>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item href="/profile" className="text-dark">
                Profile
              </Dropdown.Item>
              <Dropdown.Item href="/movies" className="text-dark">
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="text-danger fw-bold">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
