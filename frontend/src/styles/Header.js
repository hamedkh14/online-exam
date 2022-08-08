import { styled, Box, Typography, Link } from "@mui/material";

export const HeaderStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "1000px",
  height: "60px",
  borderRadius: "0 0 20px 20px",
  background: theme.palette.grey[900],
  boxShadow: theme.shadows[2],
  padding: "0px 20px",
  marginBottom: "30px",
}));

export const LogoStyle = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "17px",
}));

export const LinkStyle = styled(Link)(({ theme }) => ({
  color: "#fff",
  marginLeft: "10px",
  display: "inline-flex",
  alignItems: "center",
  fontSize: "15px",
}));
export const IconStyle = styled("div")(() => ({
  margin: "0 5px",
  fontSize: "14px",
}));
