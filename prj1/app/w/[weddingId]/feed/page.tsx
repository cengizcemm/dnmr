
import { Suspense } from 'react';
import FeedContent from './FeedContent';

export async function generateStaticParams() {
  return [
    { weddingId: 'WEDDING-2024-SARAH-MICHAEL' },
    { weddingId: 'WEDDING-2024-JOHN-JANE' },
    { weddingId: 'WEDDING-2023-ALEX-EMMA' },
    { weddingId: 'WEDDING-2023-DAVID-LISA' },
    { weddingId: 'WEDDING-2024-DEMO' },
    { weddingId: 'WEDDING-2024-SARAH-MICHAEL-DEMO' }
  ];
}

function FeedPageContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedContent />
    </Suspense>
  );
}

export default function FeedPage() {
  return <FeedPageContent />;
}
