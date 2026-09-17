import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppLogo } from '@/components/AppLogo';
import { useColors } from '@/hooks/useColors';
import { Language, useStudy } from '@/context/StudyContext';

const languages: { code: Language; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'РУ', name: 'Русский' },
  { code: 'kk', label: 'ҚЗ', name: 'Қазақша' },
];

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { language, setLanguage, completedLessons } = useStudy();
  const topInset = insets.top + (Platform.OS === 'web' ? 67 : 0);
  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={{ paddingTop: topInset, paddingBottom: insets.bottom + 112 }} showsVerticalScrollIndicator={false}>
      <View style={styles.header}><Text style={[styles.kicker, { color: colors.primary }]}>YOUR SPACE</Text><Text style={[styles.title, { color: colors.foreground }]}>Profile</Text></View>
      <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <AppLogo size={54} />
        <View style={{ flex: 1, marginLeft: 13 }}><Text style={[styles.name, { color: colors.foreground }]}>Amina Sadykova</Text><Text style={[styles.email, { color: colors.mutedForeground }]}>Medical student · Year 2</Text></View>
        <Pressable style={[styles.editButton, { backgroundColor: colors.secondary }]}><Feather name="edit-2" size={15} color={colors.primary} /></Pressable>
      </View>
      <View style={styles.statsRow}>
        <View style={[styles.stat, { backgroundColor: colors.card, borderColor: colors.border }]}><Text style={[styles.statNumber, { color: colors.foreground }]}>27%</Text><Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Overall progress</Text></View>
        <View style={[styles.stat, { backgroundColor: colors.card, borderColor: colors.border }]}><Text style={[styles.statNumber, { color: colors.foreground }]}>{completedLessons.length + 4}</Text><Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Topics completed</Text></View>
      </View>
      <Pressable onPress={() => router.push('/onboarding')} style={({ pressed }) => [styles.planCard, { backgroundColor: colors.primary, opacity: pressed ? 0.87 : 1 }]}>
        <View style={{ flex: 1 }}><Text style={styles.planKicker}>FREE PLAN</Text><Text style={styles.planTitle}>Unlock all 7 disciplines</Text><Text style={styles.planSub}>Go deeper with unlimited practice and cases.</Text></View>
        <View style={styles.planArrow}><Feather name="arrow-up-right" size={19} color={colors.primary} /></View>
      </Pressable>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Preferences</Text>
      <View style={[styles.preferenceCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.preferenceHeading}><View style={[styles.preferenceIcon, { backgroundColor: colors.secondary }]}><Feather name="globe" size={17} color={colors.primary} /></View><View><Text style={[styles.preferenceTitle, { color: colors.foreground }]}>Learning language</Text><Text style={[styles.preferenceSub, { color: colors.mutedForeground }]}>Choose your content language</Text></View></View>
        <View style={styles.languageRow}>
          {languages.map((item) => <Pressable key={item.code} onPress={() => setLanguage(item.code)} style={[styles.languageButton, { backgroundColor: language === item.code ? colors.primary : colors.background, borderColor: language === item.code ? colors.primary : colors.border }]}><Text style={[styles.languageLabel, { color: language === item.code ? colors.primaryForeground : colors.mutedForeground }]}>{item.label}</Text></Pressable>)}
        </View>
      </View>
      <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {[
          { icon: 'bookmark', title: 'Saved topics', detail: 'Your personal collection' },
          { icon: 'credit-card', title: 'Subscription', detail: 'Manage your plan' },
          { icon: 'help-circle', title: 'Help & feedback', detail: 'We are here to help' },
        ].map((item, index) => <Pressable key={item.title} style={[styles.menuRow, index < 2 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}><View style={[styles.menuIcon, { backgroundColor: colors.muted }]}><Feather name={item.icon as keyof typeof Feather.glyphMap} size={16} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={[styles.menuTitle, { color: colors.foreground }]}>{item.title}</Text><Text style={[styles.menuSub, { color: colors.mutedForeground }]}>{item.detail}</Text></View><Feather name="chevron-right" size={17} color={colors.mutedForeground} /></Pressable>)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 20, marginBottom: 17 },
  kicker: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 7 },
  title: { fontSize: 28, fontWeight: '700', letterSpacing: -0.8 },
  profileCard: { marginHorizontal: 20, borderRadius: 20, borderWidth: 1, padding: 15, flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '700' },
  email: { fontSize: 11, marginTop: 4 },
  editButton: { width: 34, height: 34, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  statsRow: { flexDirection: 'row', gap: 10, marginHorizontal: 20, marginTop: 10 },
  stat: { flex: 1, borderRadius: 17, borderWidth: 1, padding: 15 },
  statNumber: { fontSize: 22, fontWeight: '700' },
  statLabel: { fontSize: 10, marginTop: 5 },
  planCard: { marginHorizontal: 20, marginTop: 23, marginBottom: 27, borderRadius: 20, padding: 18, flexDirection: 'row', alignItems: 'center' },
  planKicker: { color: '#C8EBD2', fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  planTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '700', marginTop: 7 },
  planSub: { color: '#D8F1DF', fontSize: 11, marginTop: 5 },
  planArrow: { width: 35, height: 35, borderRadius: 18, backgroundColor: '#DDF4E1', justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  sectionTitle: { marginHorizontal: 20, fontSize: 18, fontWeight: '700', marginBottom: 12 },
  preferenceCard: { marginHorizontal: 20, borderRadius: 19, borderWidth: 1, padding: 15, marginBottom: 13 },
  preferenceHeading: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  preferenceIcon: { width: 35, height: 35, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  preferenceTitle: { fontSize: 14, fontWeight: '700' },
  preferenceSub: { fontSize: 10, marginTop: 3 },
  languageRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  languageButton: { flex: 1, borderWidth: 1, borderRadius: 11, paddingVertical: 10, alignItems: 'center' },
  languageLabel: { fontSize: 12, fontWeight: '800' },
  menuCard: { marginHorizontal: 20, borderRadius: 19, borderWidth: 1, paddingHorizontal: 14 },
  menuRow: { paddingVertical: 13, flexDirection: 'row', alignItems: 'center', gap: 11 },
  menuIcon: { width: 32, height: 32, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  menuTitle: { fontSize: 13, fontWeight: '700' },
  menuSub: { fontSize: 10, marginTop: 3 },
});