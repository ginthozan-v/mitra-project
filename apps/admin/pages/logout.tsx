import { useEffect } from 'react';
import { logout } from 'utils/auth';

export default function () {
  useEffect(() => {
    logout();
  }, []);
  return null;
}
