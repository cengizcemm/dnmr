import { Suspense } from 'react';
import InvitationContent from './InvitationContent';

export async function generateStaticParams() {
  return [
    { code: 'WEDDING-2024-SARAH-MICHAEL' },
    { code: 'WEDDING-2024-SARAH-MICHAEL-DEMO' },
    { code: 'WEDDING-2024-JOHN-JANE' },
    { code: 'WEDDING-2024-DEMO' },
    { code: 'WEDDING-2023-ALEX-EMMA' },
    { code: 'WEDDING-2023-DAVID-LISA' },
    { code: 'invalid-code' },
    { code: 'expired-code' }
  ];
}

function InvitationPageContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InvitationContent />
    </Suspense>
  );
}

export default function InvitationPage() {
  return <InvitationPageContent />;
}