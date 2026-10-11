export function convertDate(date){
    return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function convertHour(date){
  return new Date(date).toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit"
  })
}