export function getAppointmentsForDay(state, day) {
 
const appointmentsForDay = [];
const appointmentList = [];

for (const dayItem of state.days) {
  if (dayItem.name === day) {
    appointmentsForDay.push(...dayItem.appointments);
  }
}

for (const key in state.appointments) {
  const appointmentID = state.appointments[key].id;
  if (appointmentsForDay.includes(appointmentID)) {
    appointmentList.push(state.appointments[key])
  }
}

return appointmentList;
}

export function getInterview(state, interview) {
  const newInterviewObject = interview;

  if (newInterviewObject) {
    const interviewerID = interview.interviewer;
    if (typeof(interviewerID) === 'number') {
      newInterviewObject.interviewer = state.interviewers[interviewerID]
    }
  }

  return newInterviewObject
}

export function getInterviewersForDay(state, day) {
  const interviewsForDay = [];
  const interviewList = [];

for (const dayItem of state.days) {
  if (dayItem.name === day) {
    interviewsForDay.push(...dayItem.interviewers);
  }
}

for (const key in state.interviewers) {
  const inteviewerID = state.interviewers[key].id;
  if (interviewsForDay.includes(inteviewerID)) {
    interviewList.push(state.interviewers[key])
  }
}

return interviewList;
}