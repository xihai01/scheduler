import React, { Fragment } from "react";
import { useVisualMode } from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
        console.log("error saving");
        transition(ERROR_SAVE, true);
      });
  };

  const trash = function () {
    //pop up a confirm message to alert user is about to delete an appointment
    transition(CONFIRM);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          time={props.time}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => {
            //render form component with current name and id of interviewer
            transition(EDIT);
          }}
          onDelete={() => {
            trash();
          }}
        />
      )}
      {(mode === EMPTY && props.time !== "5pm") && (
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
      {mode === CONFIRM && (
        <Confirm
          message="Delete the Appointment?"
          onConfirm={() => {
            const interview = null;
            transition(DELETING, true);
            console.log("deleting");
            props
              .cancelInterview(props.id, interview)
              .then(() => {
                //transition to empty mode
                transition(EMPTY);
              })
              .catch((error) => {
                console.log("error deleting");
                transition(ERROR_DELETE, true);
              });
          }}
          onCancel={() => {
            back();
          }}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          onSave={(name, interviewer) => {
            save(name, interviewer);
          }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment"
          onClose={() => {
            back();
          }}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment"
          onClose={() => {
            back();
          }}
        />
      )}
    </article>
  );
}
