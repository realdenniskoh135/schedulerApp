import Header from './components/Header';
import Hero from './pages/Dashboard';
import Schedule from './pages/MySchedule';
import OneToOneCall from './pages/OneToOneCall';
import PriorityEmail from './pages/PriorityEmail';
import JoinCall from './pages/JoinCall';
<<<<<<< HEAD
import { useAuth } from 'wasp/client/auth';
=======
>>>>>>> a611305392a06a4890c81a73841c0c95ed3f2233

const landingPageNavigation = [
  { name: 'My Schedule', href: '/my-schedule' },
  { name: '1-to-1 Call', href: '/1-to-1' },
  { name: 'Priority Email', href: '/priority-email' },
  { name: 'Join Call', href: '/join' } 
];

export default function LandingPage() {
<<<<<<< HEAD
  const { data: user } = useAuth();
=======
>>>>>>> a611305392a06a4890c81a73841c0c95ed3f2233
  return (
    <div className='bg-white dark:text-white dark:bg-boxdark-2'>
      <Header navigation={landingPageNavigation} />

      <main className='isolate dark:bg-boxdark-2'>
<<<<<<< HEAD
      <Hero />
=======
        <Hero />
>>>>>>> a611305392a06a4890c81a73841c0c95ed3f2233
      </main>
    </div>
  );
}
