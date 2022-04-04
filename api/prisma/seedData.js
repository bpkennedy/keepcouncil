module.exports.persons = [
  { id: 1, fullName: 'Andrew Harris', personType: 'COUNCIL_MEMBER', email: 'ward1@florissantmo.com', phoneNumber: 3142469150, ward: 1 },
  { id: 2, fullName: 'Paul Manganelli', personType: 'COUNCIL_MEMBER', email: 'ward2@florissantmo.com', phoneNumber: 3146066578, ward: 2 },
  { id: 3, fullName: 'Joseph Eagan', personType: 'COUNCIL_MEMBER', email: 'ward3@florissantmo.com', phoneNumber: 3143956838, ward: 3 },
  { id: 4, fullName: 'Jeff Caputa', personType: 'COUNCIL_MEMBER', email: 'ward4@florissantmo.com', phoneNumber: 3142391568, ward: 4 },
  { id: 5, fullName: 'Keith Schildroth', personType: 'COUNCIL_MEMBER', email: 'ward5@florissantmo.com', phoneNumber: 3148392927, ward: 5 },
  { id: 6, fullName: 'Patrick Mulcahy', personType: 'COUNCIL_MEMBER', email: 'ward6@florissantmo.com', phoneNumber: 3146061991, ward: 6 },
  { id: 7, fullName: 'Jackie Pagano', personType: 'COUNCIL_MEMBER', email: 'ward7@florissantmo.com', phoneNumber: 3148371315, ward: 7 },
  { id: 8, fullName: 'Robert Parson Jr.', personType: 'COUNCIL_MEMBER', email: 'ward8@florissantmo.com', phoneNumber: 3144222050, ward: 8 },
  { id: 9, fullName: 'Tommy Siam', personType: 'COUNCIL_MEMBER', email: 'ward9@florissantmo.com', phoneNumber: 3147572594, ward: 9 },
  { id: 10, fullName: 'Timothy J. Lowery', personType: 'MAYOR', email: 'tlowery@florissantmo.com' },
]

module.exports.hearingFromCitizens = [
  { id: 1, from: 'Billy Bob', content: 'this is long form content and stuff', meetingId: 1 },
]

module.exports.proclamations = [
  { id: 1, presentedTo: 'Joanne Smith', content: 'this is long form content and stuff', meetingId: 1 },
]

module.exports.resolutions = [
  { id: 1, introducedDate: new Date(), resolutionNumber: 334, resolutionTitle: `A new awesome resolution`, content: 'long text', introducedById: 3, passDate: new Date(), meetingId: 1 },
]

module.exports.communications = [
  { id: 1, dateReceived: new Date(), from: 'Billy Bob', content: 'this is long form content and stuff', communicationType: 'EMAIL', meetingId: 1 },
]

module.exports.publicHearings = [
  { id: 1, title: `Billy Bob's big bonanza of things`, topic: 'special topic here?', content: 'this is long form content and stuff', from: 'Billy Bob', meetingId: 1 },
]

module.exports.bills = [
  { id: 1, billNumber: 77, content: 'this is long form content and stuff', introducedById: 8, meetingId: 1 },
  { id: 2, billNumber: 23, content: 'different content', introducedById: 2, meetingId: 1 },
]

module.exports.boardAppointments = [
  { id: 1, expiration: new Date(), appointee: 'Danny Deckchair', appointedTo: `Mayor's assistant`, referredById: 9, meetingId: 1 },
]

module.exports.requests = [
  { id: 1, petitioner: 'Sally May Jones', title: 'Listen to my story', content: 'long explanation', accepted: true, acceptorId: 8, secondedById: 7, meetingId: 1 },
]

module.exports.announcements = [
  { id: 1, announcerId: 3, content: 'this is long form content and stuff', meetingId: 1 },
]

module.exports.motions = [
  { id: 2, carried: true, action: 'FIRST_READ', initiatorId: 8, seconderId: 7, billId: 1, meetingId: 1 },
  { id: 3, carried: true, action: 'SECOND_READ', initiatorId: 8, seconderId: 9, billId: 1, meetingId: 1 },
  { id: 4, carried: true, action: 'THIRD_READ', initiatorId: 8, seconderId: 3, billId: 1, meetingId: 1 },
]

module.exports.meetings = [{
  id: 1,
  date: new Date(),
}]
