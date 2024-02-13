export function daysLeft(deadline) {
  const currentTime = Date.now();
  console.log("currentTime", currentTime);
  const difference = deadline - currentTime;
  console.log("difference", difference);

  const remainingDays = difference / (1000 * 3600 * 24);
  console.log("remainingDays", remainingDays);

  let daysLeft;
 
  daysLeft = Math.ceil(remainingDays);
  if (daysLeft <= 0) {
    daysLeft = "Ended";
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
