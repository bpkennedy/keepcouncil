export const HOME_VIEW_NAME = 'index'
export const CREATE_VIEW_NAME = 'create'
export const VIEW_NAMES = [HOME_VIEW_NAME, CREATE_VIEW_NAME]

export const API_PATH = 'http://localhost:3001/api/v1/'

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

export const AGENDA_ITEM_TYPES = [{
  display: 'Person',
  value: 'person',
  formComponentName: 'person-form',
}, {
  display: 'Meeting',
  value: 'meeting',
  formComponentName: 'meeting-form',
}, {
  display: 'Motion',
  value: 'motion',
  formComponentName: 'motion-form',
}, {
  display: 'Bill',
  value: 'bill',
  formComponentName: 'bill-form',
}, {
  display: 'Hearing From Citizen',
  value: 'hearingFromCitizen',
  formComponentName: 'hearing-from-citizen-form',
}, {
  display: 'Proclamation',
  value: 'proclamation',
  formComponentName: 'proclamation-form',
}, {
  display: 'Resolution',
  value: 'resolution',
  formComponentName: 'resolution-form',
}, {
  display: 'Communication',
  value: 'communication',
  formComponentName: 'communication-form',
}, {
  display: 'Public Hearing',
  value: 'publicHearing',
  formComponentName: 'public-hearing-form',
}, {
  display: 'Board Appointment',
  value: 'boardAppointment',
  formComponentName: 'board-appointment-form',
}, {
  display: 'Request',
  value: 'request',
  formComponentName: 'request-form',
}, {
  display: 'Announcement',
  value: 'announcement',
  formComponentName: 'announcement-form',
}]
