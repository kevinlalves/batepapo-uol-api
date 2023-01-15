import { stripHtml } from "string-strip-html";

export default function sanitize(object) {
  for (const key of Object.keys(object)) {
    if (typeof(object[key]) === "string") {
      object[key] = stripHtml(object[key]).result.trim();
    }
  }
  return object;
}
