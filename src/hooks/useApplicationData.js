import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import stateReducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "reducer/state_reducer";

export function useApplicationData() {
  const [state, dispatch] = useReducer(stateReducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //requests to API server to fetch state data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      const days = response[0].data;
      const appointments = response[1].data;
      const interviewers = response[2].data;
      dispatch({
        type: SET_APPLICATION_DATA,
        days: days,
        appointments: appointments,
        interviewers: interviewers,
      });
    });
  }, []);

  const setDay = (day) => {
    dispatch({ type: SET_DAY, day: day });
  };

  //input: app. array, state, set state fcn
  const updateDaySpots = function (appointments) {
    let spots = 0;
    //get the days appointments
    const listOfAppForDay = state.days.filter((d) => {
      return d.name === state.day;
    })[0].appointments;
    //count number of spots left
    for (const app of listOfAppForDay) {
      if (appointments[app].interview === null) {
        spots++;
      }
    }
    //update days state with number of spots
    const dayCpy = [];
    for (const d of state.days) {
      const dCpy = { ...d };
      if (dCpy.name === state.day) {
        dCpy.spots = spots;
      }
      dayCpy.push(dCpy);
    }
    return dayCpy;
  };

  //change the local state when an interview is booked - PUT
  const bookInterview = function (id, interview) {
    //update API db with new appointment
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        //set state if response code is 204
        if (response.status === 204) {
          dispatch({
            type: SET_INTERVIEW,
            id: id,
            interview: interview,
            updateDaySpots: updateDaySpots,
          });
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const cancelInterview = function (id, interview) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        if (response.status === 204) {
          dispatch({
            type: SET_INTERVIEW,
            id: id,
            interview: interview,
            updateDaySpots: updateDaySpots,
          });
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
