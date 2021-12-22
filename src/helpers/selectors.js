export function getAppointmentsForDay(state, day) {
  const result = [];
  //get the appointment array of the day from state
  const selectedDay = state.days.filter((d) => d.name === day);
  if (selectedDay.length === 0) {
    return result;
  }
  const appointments = selectedDay[0].appointments;
  const allAppointments = state.appointments;
  for (const appointment of appointments) {
    //add appointment id to result if matches
    if (allAppointments[appointment] !== undefined) {
      result.push(allAppointments[appointment]);
    }
  }
  return result;
}

export function getInterview(state, interview) {
  const result = {};
  const interviewList = state.interviewers;
  if (interview === null) {
    return null;
  }
  //get the name of the student and id of interviewer
  const studentName = interview.student;
  const interviewerID = interview.interviewer;
  result.student = studentName;
  for (const id in interviewList) {
    //key id is a string, so convert it into a number
    if (Number(id) === interviewerID) {
      result.interviewer = interviewList[id];
      return result;
    }
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const result = [];
  //find the selected day from state obj
  const selectedDay = state.days.filter((d) => d.name === day);
  if (selectedDay.length === 0) {
    return result;
  }
  //once the selected day is found, get its interviews
  const interviews = selectedDay[0].interviewers;
  const allInterviewers = state.interviewers;
  for (const interviewer of interviews) {
    //add the interviewer obj into result
    const interviewerObj = { ...allInterviewers[interviewer] };
    result.push(interviewerObj);
  }
  return result;
}