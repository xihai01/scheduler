# Scheduler project breakdown

## Components

- Button
- DayList
- DayListItem
- InterviewerList
- InterviewerListItem
- Appointment
- Appointment/Header
- Appointment/Empty
- Appointment/Show
- Appointment/Form
- Appointment/Status
- Appointment/Error
- Appointment/Confirm

### Button

- State: Base, Confirm, Danger, Clickable, Disabled
- Props: confirm, danger, onClick, disabled
- Used by:

### DayList

- State: none
- Props: days, day, setDay
- Used by:

### DayListItem

- State: base (not full), selected, full
- Props: name, spots, selected, setDay
- Used by: DayList

### InterviewerList

- State: inital, selected, clicked
- Props: interviewers, setInterviewer, interviewer
- Used by:

### InterviewerListItem

- State: Unselected, selected, clicked
- Props: id, name, avatar, selected, setInterviewer
- Used by: InterviewerList

### Appointment

- State:
- Props:
- Used by:

### Appointment/Header

- State:
- Props:
- Used by:

### Appointment/Empty

- State:
- Props:
- Used by:

### Appointment/Show

- State:
- Props:
- Used by:

### Appointment/Form

- State:
- Props:
- Used by:

### Appointment/Status

- State:
- Props:
- Used by:

### Appointment/Error

- State:
- Props:
- Used by:

### Appointment/Confirm

- State:
- Props:
- Used by: