export function getErrorMessage(error, fallback = 'Something went wrong.') {
  return error?.response?.data?.message || error?.response?.data?.detail || error?.message || fallback;
}
