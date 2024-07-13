import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isLoggedIn } from 'utils/auth';

export default function AuthGuard(Component: any, isProtected = true) {
  const authenticated = isLoggedIn();
  const AuthWrapper = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      if (!authenticated && isProtected) {
        router.push(`/login?redirect=${router.asPath}`);
      }
    }, []);

    if (authenticated || !isProtected) return <Component {...props} />;
    return null;
  };
  if (authenticated) {
    AuthWrapper.Layout = (Component as any).Layout;
  }
  return AuthWrapper;
}
