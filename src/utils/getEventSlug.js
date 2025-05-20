export const getEventSlug = (event) => {
    return encodeURIComponent(`${event.TITLE}-${event.PLACE}-${event.DATE}`);
};
