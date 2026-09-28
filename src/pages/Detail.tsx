import { Navigate } from 'react-router-dom';
import { DetailPage } from '../components/sections/DetailPage';
import { detailPages } from '../data/siteContent';

export function Detail({ page }: { page: string }) {
  const content = detailPages[page];
  return content ? <DetailPage content={content} /> : <Navigate to="/" replace />;
}
