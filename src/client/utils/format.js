export const staffToStr = (obj = {}) =>
  Object.entries(obj)
    .filter(([prop]) => prop !== 'id')
    .map(([, val]) => val)
    .join(' ');

export const locationToStr = (location = {}) => `${location.building}, ${location.room} каб.`;

export const formatDate = (str) => new Date(str).toLocaleDateString('ru-RU');
