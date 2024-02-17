export function daysLeft(deadline) {
  const currentTime = Date.now();
  const difference = deadline - currentTime;
  const remainingDays = difference / (1000 * 3600 * 24);

  let daysLeft;

  daysLeft = Math.ceil(remainingDays);
  if (daysLeft <= 0) {
    daysLeft = 0;
  }
  return daysLeft;
}

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
