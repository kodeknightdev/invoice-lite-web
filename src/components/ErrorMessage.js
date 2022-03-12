import { getErrorMessage } from '../utils/errors';

export default function ErrorMessage({ error }) {
  if (!error) return null;
  return <p className="error">{getErrorMessage(error)}</p>;
}
