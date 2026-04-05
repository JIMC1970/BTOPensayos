export function filterData(body, allowedFields) {
  const filtered = {};
  for (const key in body) {
    if (allowedFields.includes(key)) {
      filtered[key] = body[key];
    }
  }
  return filtered;
}