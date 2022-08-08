import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getExams, reset } from "../features/exam/examSlice";
import Spinner from "../components/Spinner";
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ButtonGroup } from "@mui/material/node";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { exams, isLoading, isError, message } = useSelector(
    (state) => state.exams
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getExams());

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Stack
        sx={{
          width: "1000px",
        }}
      >
        {exams.length > 0 ? (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Start date</TableCell>
                  <TableCell align="center">End date</TableCell>
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">Link</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exams.map((row, index) => (
                  <TableRow
                    key={row.title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.startDate}</TableCell>
                    <TableCell align="center">{row.endDate}</TableCell>
                    <TableCell align="center">{row.time}</TableCell>
                    <TableCell align="center">{row.link}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup>
                        <IconButton aria-label="delete" color="error">
                          <DeleteOutlineSharpIcon />
                        </IconButton>
                        <IconButton aria-label="edit" color="info">
                          <EditSharpIcon />
                        </IconButton>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <>
            <Typography variant="h5">You have not set any exams</Typography>
          </>
        )}
      </Stack>
    </>
  );
}

export default Dashboard;
