import InterviewerList from "components/InterviewerList";

export function getAppointmentsForDay(state, day) {
  let result = [];
  //get the appointment array of the day from state
  let selectedDay = state.days.filter((d) => d.name === day);
  if (selectedDay.length === 0) {
    return result;
  }
  let appointments = selectedDay[0].appointments;
  let allAppointments = state.appointments;
  for (const appointment of appointments) {
    //add appointment id to result if matches
    if (allAppointments[appointment] !== undefined) {
      result.push(allAppointments[appointment]);
    }
  }
  return result;
}

export function getInterview(state, interview) {
  let result = {};
  let interviewList = state.interviewers;
  if (interview === null) {
    return null;
  }
  //get the name of the student and id of interviewer
  let studentName = interview.student;
  let interviewerID = interview.interviewer;
  result.student = studentName;
  for (const id in interviewList) {
    if (id == interviewerID) {
      result.interviewer = interviewList[id];
      return result;
    }
  }
  return null;
}
