import { useLocation, useNavigate } from 'react-router-dom';
import { validateSource } from '../features/intake/engine/engine';

/** Source attribution adds context without preselecting any intake answers. */
export function useStartConversation(source?: string) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const origin = validateSource(source ?? (pathname === '/' ? 'homepage' : pathname.split('/')[1]));
  return () => navigate(`/start?source=${origin}`);
}
