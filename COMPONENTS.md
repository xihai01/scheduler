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
- Props: time
- Used by:

### Appointment/Empty

- State:
- Props: onAdd
- Used by:

### Appointment/Show

- State: display interviewee/interviewer, edit/delete
- Props: student, interviewer, onEdit, onDelete
- Used by:

### Appointment/Form

- State:
- Props:
- Used by:

### Appointment/Status

- State:
- Props: message
- Used by:

### Appointment/Error

- State:
- Props: message, onClose
- Used by:

### Appointment/Confirm

- State:
- Props: message, onConfirm, onCancel
- Used by: