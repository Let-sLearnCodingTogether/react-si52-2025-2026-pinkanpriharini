import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import ApiClient from "../../../utils/ApiClient";

interface SignInForm {
  email: string;
  password: string;
}

function SignIn() {
  const[isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState<SignInForm>({
    email: "",
    password: "",
  });

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setForm({
        ...form,
        [name] : value
    })
}

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)
    try {
      const response = await ApiClient.post("/signIn", form);
      console.log(response.data);

      if(response.status === 200){
        //redirect user ke halaman movie 
        localStorage.setItem("AuthToken",)
        navigate("/movies", {
          replance : true
        })
      }
  
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)

    }
  };


  return (
    <div className="container mx-auto">
      <div className="d-flex justify-content-between mb-3">
        <h1>Sign In</h1>
      </div>

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={form.email}
            onChange={onHandleChange}
            name="email"
            type="email"
            placeholder="email"
            required
            autoComplete="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={form.password}
            onChange={onHandleChange}
            name="password"
            type="password"
            placeholder="password"
            required
            autoComplete="current-password"
          />
        </Form.Group>

        <div className="d-flex gap-3 align-items-center">
          <Button type="submit" variant="primary"
          disabled={isLoading}>
            {isLoading ? "Loadin..." : "Sign In"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SignIn;
