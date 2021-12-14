import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
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
      console.log(response[0].data);
      console.log(response[1].data);
      console.log(response[2].data);
      setState((prev) => ({
        ...prev,
        days: days,
        appointments: appointments,
        interviewers: interviewers,
      }));
    });
  }, []);

  const setDay = (day) => {
    setState({ ...state, day });
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
    let dayCpy = [];
    for (const d of state.days) {
      let dCpy = { ...d };
      if (dCpy.name === state.day) {
        dCpy.spots = spots;
      }
      dayCpy.push(dCpy);
    }
    console.log(dayCpy);
    return dayCpy;
  };

  //change the local state when an interview is booked - PUT
  const bookInterview = function (id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    //update the list of appointments with new appointment obj
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //setState({ ...state, appointments });
    //update API db with new appointment
    console.log("outside of promise");
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        //set state if response code is 204
        console.log("hi");
        if (response.status === 204) {
          console.log("hello");
          let days = updateDaySpots(appointments);
          setState({ ...state, appointments, days });
        }
        return;
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  };

  const cancelInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview,
    };
    //update the list of appointments with new appointment obj
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        if (response.status === 204) {
          let days = updateDaySpots(appointments);
          setState({ ...state, appointments, days });
          //updateDaySpots();
        }
        return;
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
