import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { register, reset } from "../features/auth/authSlice";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(
    (e) => {
      if (isError) {
        toast.error(message);
      }

      if (isSuccess || user) {
        navigate("/");
      }

      dispatch(reset());
    },
    [user, isError, isSuccess, message, navigate, dispatch]
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography textAlign={"center"} variant="h3" m={2}>
        Register
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
          label="Name"
          size="small"
          id="name"
          name="name"
          value={name}
          onChange={onChange}
        />
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

export default Register;
