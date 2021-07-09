export default function dateColor(date) {
  var today = new Date();
  date = date.split('/');
  date = new Date(`20${date[2]}-${date[1]}-${date[0]}`);
  if (date.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
    return '#5a8d48';
  }
  return 'rgba(25, 26, 26, 0.7)';
}
