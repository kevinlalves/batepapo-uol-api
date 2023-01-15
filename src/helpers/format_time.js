export default function formatedTime(date) {
  return date.toTimeString().slice(0, 8);
}
