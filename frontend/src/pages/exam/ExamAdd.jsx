import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import QuestionField from "../../components/QuestionField.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addExam, reset } from "../../features/exam/examSlice";
import Spinner from "../../components/Spinner.jsx";

function ExamAdd() {
  const [dataForm, setDataForm] = useState({
    title: "",
    link: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [dataQuestion, setDataQuestion] = useState([
    {
      id: 0,
      title: "",
      options: ["", "", "", ""],
      correctAnswer: "0",
    },
  ]);

  const { isLoading, isSuccess, isError } = useSelector((state) => state.exams);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    let examData = dataForm;
    examData.questions = dataQuestion;

    dispatch(addExam(examData));
  };

  const handleAddQuestion = () => {
    setDataQuestion([
      ...dataQuestion,
      {
        id: dataQuestion.length,
        title: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);
  };

  const onChange = (e) => {
    setDataForm((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeQuestion = (e, id, isoptions = false) => {
    let newDataQuestion = dataQuestion[id];
    if (isoptions) {
      let newOptions = newDataQuestion.options.map((x, index) =>
        e.target.name === `f${index}` ? e.target.value : x
      );
      setDataQuestion((items) =>
        items.map((x) => (x.id === id ? { ...x, options: newOptions } : x))
      );
    } else {
      setDataQuestion((items) =>
        items.map((x) =>
          x.id === id ? { ...x, [e.target.name]: e.target.value } : x
        )
      );
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(reset());
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Box component="form" autoComplete="off" onSubmit={onSubmit}>
        <Typography variant="h4" m={2}>
          Exam Add
        </Typography>
        <Grid container rows={2} sx={{ width: "1016px" }} spacing={2}>
          <Grid item md={6}>
            <TextField
              fullWidth
              type="text"
              name="title"
              value={dataForm.title}
              label="Title"
              size="small"
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              type="text"
              name="link"
              value={dataForm.link}
              label="Link"
              size="small"
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              value={dataForm.startDate}
              type={"date"}
              name="startDate"
              label="Start date"
              size="small"
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              value={dataForm.endDate}
              type={"date"}
              name="endDate"
              label="End date"
              size="small"
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              type="text"
              name="description"
              value={dataForm.description}
              label="Description"
              rows={4}
              onChange={onChange}
              multiline
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <br />
        <hr style={{ borderTop: "1px solid #ddd" }} />
        {dataQuestion.map((item, index) => {
          return (
            <QuestionField
              key={index}
              id={index}
              title={item.title}
              options={item.options}
              handleOnChangeQuestion={onChangeQuestion}
            />
          );
        })}
        <Grid container rows={2} sx={{ width: "1000px", marginTop: "20px" }}>
          <Grid item md={6}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
          <Grid item md={6} textAlign={"right"}>
            <Button variant="outlined" onClick={handleAddQuestion}>
              Add Question
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Exam creation was not successful!
        </Alert>
      </Snackbar>
      <Snackbar open={isSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Exam created successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default ExamAdd;
