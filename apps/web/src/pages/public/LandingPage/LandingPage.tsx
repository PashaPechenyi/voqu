import { Box, Typography, Button, Stack } from '@mui/material';
import img from '@/img/img1.jpg';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import LessonPreviewSection from './sections/LessonPreviewSection';

export function LandingPage() {
  return (
    <>
      <HeroSection />

      <FeaturesSection />
      <LessonPreviewSection />
    </>
  );
}
