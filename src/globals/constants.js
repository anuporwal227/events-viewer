const HEADERS = ['Event Type', 'Timestamp', 'Information'];
const DATA_ROW = [
    new Date().getTime(),
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent semper magna ligula, mattis rhoncus leo vehicula ut. Maecenas efficitur nibh at nisl ultricies tempus.'
];

const DATA = (eventType) => {
    return [...Array(100).keys()].map(i => [eventType, ...DATA_ROW]);
};

export const EVENTS = () => {
  return [...Array(100).keys()].map(i => {
    return {
        eventName: `Event Type ${i+1}`,
        eventId: `event_${i}`,
        content:{
            headers: HEADERS,
            data: DATA(i+1)
        }
    }
  });
};