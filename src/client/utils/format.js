export const staffToStr = (staff = {}) =>
  `${staff.last_name} ${staff.first_name} ${staff.middle_name}`;

export const locationToStr = (location = {}) =>
  `Корпус ${location.building}, ${location.room} ауд.`;

export const formatDate = (str) => new Date(str).toLocaleDateString('ru-RU');
