export const getEventSlug = (event: {
  TITLE: string;
  PLACE: string;
  DATE: string;
}) => {
  return encodeURIComponent(`${event.TITLE}-${event.PLACE}-${event.DATE}`);
};
