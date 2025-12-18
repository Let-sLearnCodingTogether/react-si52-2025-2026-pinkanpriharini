import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import NavbarComponent from "../../components/Navbar";

interface UserProfile {
  username: string;
  email: string;
}

function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    username: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Extract user info from JWT token
    const token = localStorage.getItem("AuthToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setProfile({
          username: payload.username || "",
          email: payload.email || "",
        });
      } catch (error) {
        console.error("Could not decode token", error);
      }
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Simulate API call to update profile
      // In a real app, you'd call an API endpoint
      // const response = await ApiClient.put("/profile", profile);
      
      // For now, just update localStorage and show success
      setTimeout(() => {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Failed to update profile" });
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="container mx-auto py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Card className="shadow-lg">
              <Card.Header className="bg-primary text-white">
                <h3 className="mb-0">👤 My Profile</h3>
              </Card.Header>
              <Card.Body className="p-4">
                {message && (
                  <Alert variant={message.type === "success" ? "success" : "danger"} dismissible>
                    {message.text}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label className="fw-bold">Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={profile.username}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your username"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formEmail">
                    <Form.Label className="fw-bold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your email"
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    {!isEditing ? (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => setIsEditing(true)}
                          className="flex-grow-1"
                        >
                          ✏️ Edit Profile
                        </Button>
                        <Button
                          variant="secondary"
                          href="/movies"
                          className="flex-grow-1"
                        >
                          Back to Movies
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="success"
                          type="submit"
                          disabled={loading}
                          className="flex-grow-1"
                        >
                          {loading ? "Saving..." : "💾 Save Changes"}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setIsEditing(false)}
                          className="flex-grow-1"
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </Form>

                <hr className="my-4" />

                <div className="text-center">
                  <small className="text-muted">
                    Member since December 2025
                  </small>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
