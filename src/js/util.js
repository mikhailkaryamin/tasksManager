export const getRandom = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

export const hasValueObj = (obj, value) => Object.values(obj).some((el) => el === value);
