
import { Suspense } from 'react';
import InvitationsContent from './InvitationsContent';

function InvitationsPageContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InvitationsContent />
    </Suspense>
  );
}

export default function InvitationsPage() {
  return <InvitationsPageContent />;
}
