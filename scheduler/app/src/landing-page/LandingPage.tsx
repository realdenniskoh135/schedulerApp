import Header from './components/Header';
import Hero from './pages/Dashboard';
import Schedule from './pages/MySchedule';
import OneToOneCall from './pages/OneToOneCall';
import PriorityEmail from './pages/PriorityEmail';
import JoinCall from './pages/JoinCall';
import { useAuth } from 'wasp/client/auth';

const landingPageNavigation = [
  { name: 'My Schedule', href: '/my-schedule' },
  { name: '1-to-1 Call', href: '/1-to-1' },
  { name: 'Priority Email', href: '/priority-email' },
  { name: 'Join Call', href: '/join' } 
];

export default function LandingPage() {
  const { data: user } = useAuth();
  return (
    <div className='bg-white dark:text-white dark:bg-boxdark-2'>
      <Header navigation={landingPageNavigation} />

      <main className='isolate dark:bg-boxdark-2'>
      <Hero />
      </main>
    </div>
  );
}
