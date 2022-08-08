import React from "react";
import { LinkStyle, HeaderStyle, LogoStyle, IconStyle } from "../styles/Header";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import HowToRegSharpIcon from "@mui/icons-material/HowToRegSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import AddSharpIcon from "@mui/icons-material/AddSharp";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <>
      <HeaderStyle>
        <LogoStyle>OnlineExam</LogoStyle>
        <Box>
          {user ? (
            <>
              <LinkStyle component={RouterLink} to="/examadd">
                <IconStyle>
                  <AddSharpIcon />
                </IconStyle>
                Add exam
              </LinkStyle>
              <LinkStyle onClick={onLogout}>
                <IconStyle>
                  <LogoutSharpIcon />
                </IconStyle>
                Logout
              </LinkStyle>
            </>
          ) : (
            <>
              <LinkStyle component={RouterLink} to="/register">
                <IconStyle>
                  <HowToRegSharpIcon />
                </IconStyle>
                Register
              </LinkStyle>
              <LinkStyle component={RouterLink} to="/login">
                <IconStyle>
                  <LoginSharpIcon />
                </IconStyle>
                Login
              </LinkStyle>
            </>
          )}
        </Box>
      </HeaderStyle>
    </>
  );
}

export default Header;
