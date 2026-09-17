import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppLogo } from '@/components/AppLogo';
import { useColors } from '@/hooks/useColors';
import { useStudy } from '@/context/StudyContext';

const slides = [
  { kicker: 'LEARN WITH CLARITY', title: 'Build a stronger foundation in biomedicine.', body: 'Short theory, visual explanations and practice that help you remember what matters.', icon: 'book-open' },
  { kicker: 'PRACTICE WITH PURPOSE', title: 'Turn difficult concepts into confident answers.', body: 'Work through interactive questions and clinical cases, then understand every mistake.', icon: 'check-circle' },
  { kicker: 'KEEP YOUR MOMENTUM', title: 'A few minutes today goes a long way.', body: 'Your review queue keeps the right topics close, without grades or pressure.', icon: 'trending-up' },
];

export default function OnboardingScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { finishOnboarding } = useStudy();
  const [step, setStep] = useState(0);
  const slide = slides[step];
  const topInset = insets.top + (Platform.OS === 'web' ? 67 : 0);
  const complete = () => { finishOnboarding(); router.replace('/(tabs)'); };
  return (
    <View style={[styles.screen, { backgroundColor: colors.foreground, paddingTop: topInset }]}>
      <View style={styles.top}><AppLogo size={44} /><Pressable onPress={complete}><Text style={styles.skip}>SKIP</Text></Pressable></View>
      <View style={styles.center}>
        <View style={[styles.illustration, { backgroundColor: colors.primary }]}><Feather name={slide.icon as keyof typeof Feather.glyphMap} size={47} color="#FFFFFF" /></View>
        <Text style={styles.kicker}>{slide.kicker}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.body}>{slide.body}</Text>
      </View>
      <View style={[styles.bottom, { paddingBottom: insets.bottom + 22 }]}>
        <View style={styles.dots}>{slides.map((_, index) => <View key={index} style={[styles.dot, { backgroundColor: index === step ? '#FFFFFF' : '#557765', width: index === step ? 24 : 7 }]} />)}</View>
        <Pressable onPress={step === slides.length - 1 ? complete : () => setStep(step + 1)} style={({ pressed }) => [styles.button, { backgroundColor: colors.card, opacity: pressed ? 0.82 : 1 }]}><Text style={[styles.buttonText, { color: colors.foreground }]}>{step === slides.length - 1 ? 'Start learning' : 'Continue'}</Text><Feather name="arrow-right" size={17} color={colors.foreground} /></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 24 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  skip: { color: '#BBD8C4', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 45 },
  illustration: { width: 115, height: 115, borderRadius: 38, alignItems: 'center', justifyContent: 'center', marginBottom: 36 },
  kicker: { color: '#A8D2B4', fontSize: 10, fontWeight: '800', letterSpacing: 1.5, textAlign: 'center' },
  title: { color: '#FFFFFF', fontSize: 32, lineHeight: 37, fontWeight: '700', textAlign: 'center', letterSpacing: -0.9, marginTop: 12 },
  body: { color: '#C1D8C7', fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 14, maxWidth: 310 },
  bottom: { gap: 20 },
  dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
  dot: { height: 7, borderRadius: 4 },
  button: { borderRadius: 16, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  buttonText: { fontSize: 14, fontWeight: '800' },
});