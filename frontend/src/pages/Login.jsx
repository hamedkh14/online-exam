import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography textAlign={"center"} variant="h3" m={2}>
        Login
      </Typography>
      <Stack
        component="form"
        sx={{
          width: "350px",
        }}
        spacing={2}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          type="text"
          label="Email"
          size="small"
          id="email"
          name="email"
          value={email}
          onChange={onChange}
        />
        <TextField
          type="password"
          label="Password"
          size="small"
          id="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </>
  );
}

export default Login;
