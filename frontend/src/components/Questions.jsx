import { Button, Grid } from "@mui/material";
import React from "react";
import QuestionField from "./QuestionField";

function Questions(props) {
  return (
    <>
      {props.questions.map((item, index) => {
        return (
          <QuestionField id={index} title={item.title} options={item.options} />
        );
      })}
      <Grid item md={6} textAlign={"right"}>
        <Button variant="contained" onClick={props.handleAppend}>
          Add Question
        </Button>
      </Grid>
    </>
  );
}

export default Questions;
