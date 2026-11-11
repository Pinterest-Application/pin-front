import Footer from '@ui/landing/Footer';
import Ideas from '@ui/landing/Ideas';
import Inspiration from '@ui/landing/Inspiration';
import LandingIntro from '@ui/landing/Intro';
import SignupSection from '@ui/landing/SignupSection';

export default function LandingPage() {
  return (
    <div>
      <LandingIntro />
      <Inspiration />
      <Ideas />
      <SignupSection />
      <Footer />
    </div>
  );
}
