import {environment } from '../../../environments/environment';

export const API_KEY = environment.API_KEY;

export const ALL_ROLES = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Employee' },
  { id: 3, name: 'Project Manager' },
];

export const ALL_LOCATIONS = [
  { id: 1, name: 'New York' },
  { id: 2, name: 'London' },
  { id: 3, name: 'Kharkiv' },
  { id: 4, name: 'St.Petersburg' },
  { id: 5, name: 'Voronezh' },
  { id: 6, name: 'Kherson' },
  { id: 7, name: 'Zug' },
  { id: 8, name: 'Kyiv' },
  { id: 9, name: 'Dnepr' },
  { id: 10, name: 'Odessa' },
  { id: 11, name: 'Lublin' },
  { id: 12, name: 'Buenos Aires' },
  { id: 13, name: 'Wroclaw' },
  { id: 14, name: 'Riga' },
  { id: 15, name: 'Sofia' },
  { id: 16, name: 'Wroclaw' },
];

export const ALL_POSITIONS = [
  { id: 1, name: 'PM' },
  { id: 2, name: 'Developer' },
  { id: 3, name: 'QA' },
];

export const TICKET_TYPES = [
  { id: 1, name: 'Technical task' },
  { id: 2, name: 'Bug' },
  { id: 3, name: 'Improvement' },
  { id: 4, name: 'New Feature' },
  { id: 5, name: 'Task' },
];

export const STATUS_TYPES = [
  { id: 1, name: 'Open' },
  { id: 2, name: 'Development' },
  { id: 3, name: 'Ready for QA' },
  { id: 4, name: 'Test' },
  { id: 5, name: 'Closed' },
];


