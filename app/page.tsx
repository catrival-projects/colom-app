import Header from '@/components/shared/header';
import MapDataLoader from '@/components/maps/map-data-loader';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-linear-to-b from-blue-50 to-white">
      <Header title="Colombia en un Vistazo" className="mb-4" />
      <MapDataLoader />
    </main>
  );
}
