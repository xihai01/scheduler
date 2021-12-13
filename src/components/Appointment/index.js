import React, { Fragment } from "react";
import { useVisualMode } from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    //show saving status mode
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        //transition to show mode
        transition(SHOW);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const trash = function () {
    const interview = null;
    //transition to deleting status mode
    transition(DELETING);
    props
      .cancelInterview(props.id, interview)
      .then(() => {
        //transition to empty mode
        transition(EMPTY);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          time={props.time}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            trash();
          }}
        />
      )}
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          onSave={(name, interviewer) => {
            save(name, interviewer);
          }}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
    </article>
  );
}
