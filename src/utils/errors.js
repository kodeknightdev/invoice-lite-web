// ASP.NET Core returns validation failures as
// { title, status, errors: { "LineItems[0].Quantity": ["..."] } }
// and business rule violations as problem details { title, detail }.

export function getErrorMessage(error, fallback = 'Something went wrong.') {
  const data = error?.response?.data;
  if (data?.message) return data.message;
  if (data?.errors) return Object.values(data.errors).flat()[0] || 'Please check the form.';
  if (data?.detail) return data.detail;
  if (data?.title) return data.title;
  return error?.message || fallback;
}

export function getFieldErrors(error) {
  const errors = error?.response?.data?.errors;
  if (!errors) return {};
  return Object.fromEntries(
    Object.entries(errors).map(([key, messages]) => [key.charAt(0).toLowerCase() + key.slice(1), messages[0]])
  );
}
