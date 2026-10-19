import { Navigate } from 'react-router-dom';
import { ConstructionServicePage } from '../components/sections/ConstructionServicePage';
import { ConsultingDetailPage } from '../components/sections/ConsultingDetailPage';
import { DetailPage } from '../components/sections/DetailPage';
import { consultingDetails, isConsultingDetailKey } from '../data/consultingDetails';
import { constructionServices, isConstructionServiceKey } from '../data/constructionServices';
import { constructionExecutionPath } from '../data/navigation';
import { detailPages } from '../data/siteContent';

export function Detail({ page }: { page: string }) {
  if (isConstructionServiceKey(page)) return <>
    {page === 'construction-execution' && <>
      <link rel="canonical" href={`https://gradumgroup.com${constructionExecutionPath}`} />
      <meta property="og:url" content={`https://gradumgroup.com${constructionExecutionPath}`} />
    </>}
    <ConstructionServicePage content={constructionServices[page]} />
  </>;
  if (isConsultingDetailKey(page)) return <ConsultingDetailPage content={consultingDetails[page]} />;
  const content = detailPages[page];
  return content ? <DetailPage content={content} /> : <Navigate to="/" replace />;
}
