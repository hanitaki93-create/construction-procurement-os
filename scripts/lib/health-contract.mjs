export function healthFieldMatches(body, field, expectedValue) {
  return (
    typeof body === 'object' &&
    body !== null &&
    Object.prototype.hasOwnProperty.call(body, field) &&
    body[field] === expectedValue
  );
}
