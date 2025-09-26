
import { Suspense } from 'react';
import CoupleProfileContent from './CoupleProfileContent';

export async function generateStaticParams() {
  return [
    { weddingId: 'wedding-sarah-michael' },
    { weddingId: 'wedding-emma-james' },
    { weddingId: 'wedding-alice-david' },
    { weddingId: 'WEDDING-2024-SARAH-MICHAEL' },
    { weddingId: 'WEDDING-2024-EMMA-JAMES' },
    { weddingId: 'WEDDING-2024-LISA-DAVID' },
  ];
}

export default function CoupleProfilePage({ params }: { params: { weddingId: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Profil yükleniyor...</p>
      </div>
    </div>}>
      <CoupleProfileContent weddingId={params.weddingId} />
    </Suspense>
  );
}
