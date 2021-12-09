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
