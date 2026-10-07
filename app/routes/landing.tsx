import Footer from '@ui/landing/Footer';
import Ideas from '@ui/landing/Ideas';
import Inspiration from '@ui/landing/Inspiration';
import LandingIntro from '@ui/landing/Intro';
import SignupSection from '@ui/landing/SignupSection';

interface LandingPageProps {}

export default function LandingPage({}: LandingPageProps) {
  return (
    <main>
      <LandingIntro />
      <Inspiration />
      <Ideas />
      <SignupSection />
      <Footer />
    </main>
  );
}
