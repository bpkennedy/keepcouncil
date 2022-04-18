module.exports.persons = [
  { fullName: 'Andrew Harris', personType: 'COUNCIL_MEMBER', email: 'ward1@florissantmo.com', phoneNumber: 3142469150, ward: 1 },
  { fullName: 'Paul Manganelli', personType: 'COUNCIL_MEMBER', email: 'ward2@florissantmo.com', phoneNumber: 3146066578, ward: 2 },
  { fullName: 'Joseph Eagan', personType: 'COUNCIL_MEMBER', email: 'ward3@florissantmo.com', phoneNumber: 3143956838, ward: 3 },
  { fullName: 'Jeff Caputa', personType: 'COUNCIL_MEMBER', email: 'ward4@florissantmo.com', phoneNumber: 3142391568, ward: 4 },
  { fullName: 'Keith Schildroth', personType: 'COUNCIL_MEMBER', email: 'ward5@florissantmo.com', phoneNumber: 3148392927, ward: 5 },
  { fullName: 'Patrick Mulcahy', personType: 'COUNCIL_MEMBER', email: 'ward6@florissantmo.com', phoneNumber: 3146061991, ward: 6 },
  { fullName: 'Jackie Pagano', personType: 'COUNCIL_MEMBER', email: 'ward7@florissantmo.com', phoneNumber: 3148371315, ward: 7 },
  { fullName: 'Robert Parson Jr.', personType: 'COUNCIL_MEMBER', email: 'ward8@florissantmo.com', phoneNumber: 3144222050, ward: 8 },
  { fullName: 'Tommy Siam', personType: 'COUNCIL_MEMBER', email: 'ward9@florissantmo.com', phoneNumber: 3147572594, ward: 9 },
  { fullName: 'Timothy J. Lowery', personType: 'MAYOR', email: 'tlowery@florissantmo.com' },
]

module.exports.hearingFromCitizens = [
  { from: 'Billy Bob', content: 'this is long form content and stuff', meetingId: 1 },
]

module.exports.proclamations = [
  { presentedTo: 'Joanne Smith', content: 'this is long form content and stuff', meetingId: 1 },
]

module.exports.resolutions = [
  { introducedDate: new Date(), resolutionNumber: 334, resolutionTitle: `A new awesome resolution`, content: 'long text', introducedById: 3, passDate: new Date(), meetingId: 1 },
]

module.exports.communications = [
  { dateReceived: new Date(), from: 'Billy Bob', content: 'this is long form content and stuff', communicationType: 'EMAIL', meetingId: 1 },
]

module.exports.publicHearings = [
  { title: `Billy Bob's big bonanza of things`, topic: 'special topic here?', content: 'this is long form content and stuff', from: 'Billy Bob', meetingId: 1 },
]

module.exports.bills = [
  { billNumber: 77, content: 'this is long form content and stuff', introducedById: 8, meetingId: 1 },
  { billNumber: 23, content: 'different content', introducedById: 2, meetingId: 1 },
]

module.exports.boardAppointments = [
  { expiration: new Date(), appointee: 'Danny Deckchair', appointedTo: `Mayor's assistant`, referredById: 9, meetingId: 1 },
]

module.exports.requests = [
  { petitioner: 'Sally May Jones', title: 'Listen to my story', content: 'long explanation', accepted: true, acceptorId: 8, secondedById: 7, meetingId: 1 },
]

module.exports.announcements = [
  { announcerId: 3, content: 'this is long form content and stuff', meetingId: 1 },
]

module.exports.motions = [
  { carried: true, action: 'FIRST_READ', initiatorId: 8, seconderId: 7, billId: 1, meetingId: 1 },
  { carried: true, action: 'SECOND_READ', initiatorId: 8, seconderId: 9, billId: 1, meetingId: 1 },
  { carried: true, action: 'THIRD_READ', initiatorId: 8, seconderId: 3, billId: 1, meetingId: 1 },
]

module.exports.meetings = [{
  name: 'Test Meeting',
  date: new Date(),
}]
