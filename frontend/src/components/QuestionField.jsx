import { Grid, TextField } from "@mui/material";
import React from "react";

function QuestionField(props) {
  return (
    <>
      <Grid
        container
        rows={2}
        sx={{ width: "1016px", marginTop: "20px" }}
        spacing={2}
      >
        <Grid item md={12}>
          <TextField
            fullWidth
            type="text"
            name="title"
            value={props.title}
            label={`Question ${props.id + 1}`}
            size="small"
            onChange={(e) => props.handleOnChangeQuestion(e, props.id, false)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        {props.options.map((item, index) => {
          return (
            <>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  type="text"
                  value={item}
                  name={`f${index}`}
                  key={index}
                  label={`Option ${index + 1}`}
                  size="small"
                  onChange={(e) =>
                    props.handleOnChangeQuestion(e, props.id, true)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}

export default QuestionField;
