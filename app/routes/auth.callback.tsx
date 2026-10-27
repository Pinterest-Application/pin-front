import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { setAccessToken } from '~/libs/auth';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      setAccessToken(token);

      navigate('/app', { replace: true });
    } else {
      navigate('/?error=auth_failed', { replace: true });
    }
  }, [searchParams, navigate]);

  return <div className="flex h-screen items-center justify-center text-neutral-600">Logging in...</div>;
}
