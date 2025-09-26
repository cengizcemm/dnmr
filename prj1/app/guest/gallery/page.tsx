
import { Suspense } from 'react';
import GalleryContent from './GalleryContent';

function GalleryPageContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GalleryContent />
    </Suspense>
  );
}

export default function GalleryPage() {
  return <GalleryPageContent />;
}
