export const sleep = (time, unit = 'ms') => new Promise(resolve => setTimeout(resolve, unit === 'ms' ? time : time * 1000));
