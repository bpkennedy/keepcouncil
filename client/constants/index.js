export const HOME_VIEW_NAME = 'index'
export const EDIT_VIEW_NAME = 'edit'
export const VIEW_NAMES = [HOME_VIEW_NAME, EDIT_VIEW_NAME]

export const API_PATH = 'http://localhost:3001/api/v1'

export const EMAIL_ENUM = 'EMAIL'
export const MAIL_ENUM = 'MAIL'

export const APPROVE_MINUTES_ENUM = 'APPROVE_MINUTES'
export const ADJOURN_ENUM = 'ADJOURN'
export const FIRST_READ_ENUM = 'FIRST_READ'
export const SECOND_READ_ENUM = 'SECOND_READ'
export const THIRD_READ_ENUM = 'THIRD_READ'
export const REPORT_ENUM = 'REPORT'
export const PRESENT_ENUM = 'PRESENT'
export const ADD_BILL_ENUM = 'ADD_BILL'
export const ANNOUNCE_ENUM = 'ANNOUNCE'
export const APPOINT_ENUM = 'APPOINT'
export const REAPPOINT_ENUM = 'REAPPOINT'
export const ACCEPT_ENUM = 'ACCEPT'
export const SUSPEND_ENUM = 'SUSPEND'
export const POSTPONE_ENUM = 'POSTPONE'

export const ACTIONS = [
  { display: 'Approve Minutes', value: APPROVE_MINUTES_ENUM },
  { display: 'Adjourn', value: ADJOURN_ENUM },
  { display: 'First Read', value: FIRST_READ_ENUM },
  { display: 'Second Read', value: SECOND_READ_ENUM },
  { display: 'Third Read', value: THIRD_READ_ENUM },
  { display: 'Report', value: REPORT_ENUM },
  { display: 'Add Bill', value: ADD_BILL_ENUM },
  { display: 'Present', value: PRESENT_ENUM },
  { display: 'Announce', value: ANNOUNCE_ENUM },
  { display: 'Appoint', value: APPOINT_ENUM },
  { display: 'Reappoint', value: REAPPOINT_ENUM },
  { display: 'Accept', value: ACCEPT_ENUM },
  { display: 'Suspend', value: SUSPEND_ENUM },
  { display: 'Postpone', value: POSTPONE_ENUM },
]

export const POSITIONS = [{
  display: 'Council Member',
  value: 'COUNCIL_MEMEBER',
}, {
  display: 'Mayor',
  value: 'MAYOR',
}, {
  display: 'City Clerk',
  value: 'CITY_CLERK',
}, {
  display: 'City Attorney',
  value: 'CITY_ATTORNEY',
}]

export const PERSON_TYPE = 'person'
export const MEETING_TYPE = 'meeting'
export const MOTION_TYPE = 'motion'
export const BILL_TYPE = 'bill'
export const HEARING_FROM_CITIZEN_TYPE = 'hearingFromCitizen'
export const PROCLAMATION_TYPE = 'proclamation'
export const RESOLUTION_TYPE = 'resolution'
export const COMMUNICATION_TYPE = 'communication'
export const PUBLIC_HEARING_TYPE = 'publicHearing'
export const BOARD_APPOINTMENT_TYPE = 'boardAppointment'
export const REQUEST_TYPE = 'request'
export const ANNOUNCEMENT_TYPE = 'announcement'

export const AGENDA_ITEM_TYPES = [{
  display: 'Person',
  value: PERSON_TYPE,
  formComponentName: 'person-form',
}, {
  display: 'Meeting',
  value: MEETING_TYPE,
  formComponentName: 'meeting-form',
}, {
  display: 'Motion',
  value: MOTION_TYPE,
  formComponentName: 'motion-form',
}, {
  display: 'Bill',
  value: BILL_TYPE,
  formComponentName: 'bill-form',
}, {
  display: 'Hearing From Citizen',
  value: HEARING_FROM_CITIZEN_TYPE,
  formComponentName: 'hearing-from-citizen-form',
}, {
  display: 'Proclamation',
  value: PROCLAMATION_TYPE,
  formComponentName: 'proclamation-form',
}, {
  display: 'Resolution',
  value: RESOLUTION_TYPE,
  formComponentName: 'resolution-form',
}, {
  display: 'Communication',
  value: COMMUNICATION_TYPE,
  formComponentName: 'communication-form',
}, {
  display: 'Public Hearing',
  value: PUBLIC_HEARING_TYPE,
  formComponentName: 'public-hearing-form',
}, {
  display: 'Board Appointment',
  value: BOARD_APPOINTMENT_TYPE,
  formComponentName: 'board-appointment-form',
}, {
  display: 'Request',
  value: REQUEST_TYPE,
  formComponentName: 'request-form',
}, {
  display: 'Announcement',
  value: ANNOUNCEMENT_TYPE,
  formComponentName: 'announcement-form',
}]

export const itemTypeFromValue = value => AGENDA_ITEM_TYPES.find(ai => ai.value === value)
