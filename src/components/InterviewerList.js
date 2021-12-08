import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;
  const interviewerItems = interviewers.map((person) => {
    return (
      <InterviewerListItem
        key={person.id}
        id={person.id}
        name={person.name}
        avatar={person.avatar}
        selected={person.id === interviewer}
        setInterviewer={setInterviewer}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerItems}
      </ul>
    </section>
  );
}
