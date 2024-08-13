import Header from './components/Header';
import Hero from './components/Hero';

const landingPageNavigation = [
  { name: 'My Schedule', href: '/schedule' },
  { name: '1-to-1 Call', href: '/1-to-1' },
  { name: 'Priority Email', href: '/priority-email' },
  { name: 'Join Call', href: '/join' }
];

export default function LandingPage() {
  return (
    <div className='bg-white dark:text-white dark:bg-boxdark-2'>
      <Header navigation={landingPageNavigation} />

      <main className='isolate dark:bg-boxdark-2'>
        <Hero />
      </main>
    </div>
  );
}
