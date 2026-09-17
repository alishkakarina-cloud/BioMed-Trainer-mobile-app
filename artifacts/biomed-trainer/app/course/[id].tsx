import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

const courseInfo: Record<string, { title: string; eyebrow: string; description: string; icon: string }> = {
  'molecular-biology': { title: 'Molecular biology', eyebrow: 'DISCIPLINE 01', description: 'Understand the molecular language of life, from DNA structure to gene expression.', icon: 'activity' },
  'medical-genetics': { title: 'Medical genetics', eyebrow: 'DISCIPLINE 02', description: 'Read inheritance patterns and connect genetic mechanisms to diagnosis.', icon: 'git-branch' },
  biomedicine: { title: 'Biomedicine', eyebrow: 'DISCIPLINE 03', description: 'Explore the cellular technologies shaping the future of medicine.', icon: 'layers' },
};

const topics = [
  { title: 'DNA replication', duration: '12 min', type: 'Interactive lesson', free: true, complete: false },
  { title: 'RNA transcription & processing', duration: '10 min', type: 'Theory + visual', free: true, complete: false },
  { title: 'Translation & the genetic code', duration: '14 min', type: 'Practice set', free: false, complete: false },
  { title: 'Regulation of gene expression', duration: '16 min', type: 'Clinical case', free: false, complete: false },
  { title: 'Mutations & DNA repair', duration: '13 min', type: 'Interactive lesson', free: false, complete: false },
];

export default function CourseScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const course = courseInfo[id ?? 'molecular-biology'] ?? courseInfo['molecular-biology'];
  const topInset = insets.top + (Platform.OS === 'web' ? 67 : 0);
  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={{ paddingBottom: insets.bottom + 30 }} showsVerticalScrollIndicator={false}>
      <View style={[styles.hero, { backgroundColor: colors.foreground, paddingTop: topInset + 10 }]}>
        <Pressable onPress={() => router.back()} style={styles.back}><Feather name="arrow-left" size={19} color="#FFFFFF" /></Pressable>
        <View style={[styles.heroIcon, { backgroundColor: colors.primary }]}><Feather name={course.icon as keyof typeof Feather.glyphMap} size={23} color="#FFFFFF" /></View>
        <Text style={styles.eyebrow}>{course.eyebrow}</Text>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.description}>{course.description}</Text>
        <View style={styles.courseMeta}><Text style={styles.metaText}>27% complete</Text><View style={styles.heroTrack}><View style={[styles.heroFill, { width: '27%' }]} /></View><Text style={styles.metaText}>2.5 hrs</Text></View>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyHeading}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Course topics</Text><Text style={[styles.topicCount, { color: colors.mutedForeground }]}>{topics.length} TOPICS</Text></View>
        <View style={styles.topicList}>
          {topics.map((topic, index) => (
            <Pressable
              key={topic.title}
              disabled={!topic.free}
              onPress={() => router.push('/lesson/molecular-biology-dna')}
              style={({ pressed }) => [styles.topicRow, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.82 : 1 }]}
            >
              <View style={[styles.topicNumber, { backgroundColor: index === 0 ? colors.primary : colors.muted }]}>{topic.free ? <Text style={[styles.numberText, { color: index === 0 ? '#FFFFFF' : colors.mutedForeground }]}>{index + 1}</Text> : <Feather name="lock" size={13} color={colors.mutedForeground} />}</View>
              <View style={{ flex: 1 }}><Text style={[styles.topicTitle, { color: colors.foreground }]}>{topic.title}</Text><Text style={[styles.topicDetail, { color: colors.mutedForeground }]}>{topic.type} · {topic.duration}</Text></View>
              {topic.free ? <Feather name="chevron-right" size={18} color={colors.primary} /> : <Text style={[styles.lockedLabel, { color: colors.mutedForeground }]}>PRO</Text>}
            </Pressable>
          ))}
        </View>
        <View style={[styles.unlockCard, { backgroundColor: colors.secondary }]}>
          <View style={[styles.unlockIcon, { backgroundColor: colors.accent }]}><Feather name="unlock" size={16} color={colors.accentForeground} /></View>
          <View style={{ flex: 1 }}><Text style={[styles.unlockTitle, { color: colors.foreground }]}>Open the full course</Text><Text style={[styles.unlockSub, { color: colors.mutedForeground }]}>Get every topic, case and practice set.</Text></View>
          <Feather name="arrow-right" size={18} color={colors.primary} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  hero: { paddingHorizontal: 21, paddingBottom: 24 },
  back: { width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: '#42624F', alignItems: 'center', justifyContent: 'center', marginBottom: 25 },
  heroIcon: { width: 46, height: 46, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 17 },
  eyebrow: { color: '#A8D2B4', fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 8 },
  title: { color: '#FFFFFF', fontSize: 31, fontWeight: '700', letterSpacing: -1 },
  description: { color: '#C1D8C7', fontSize: 13, lineHeight: 19, marginTop: 10, maxWidth: 320 },
  courseMeta: { marginTop: 24, flexDirection: 'row', alignItems: 'center', gap: 9 },
  metaText: { color: '#C1D8C7', fontSize: 10, fontWeight: '700' },
  heroTrack: { height: 5, borderRadius: 3, backgroundColor: '#3C6D52', flex: 1, overflow: 'hidden' },
  heroFill: { height: 5, backgroundColor: '#9BD7A9', borderRadius: 3 },
  body: { paddingHorizontal: 20, paddingTop: 24 },
  bodyHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 },
  sectionTitle: { fontSize: 19, fontWeight: '700', letterSpacing: -0.4 },
  topicCount: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  topicList: { gap: 9 },
  topicRow: { borderRadius: 17, borderWidth: 1, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 11 },
  topicNumber: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  numberText: { fontSize: 12, fontWeight: '800' },
  topicTitle: { fontSize: 13, fontWeight: '700' },
  topicDetail: { fontSize: 10, marginTop: 4 },
  lockedLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 0.7 },
  unlockCard: { borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 11, marginTop: 22 },
  unlockIcon: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  unlockTitle: { fontSize: 13, fontWeight: '700' },
  unlockSub: { fontSize: 10, marginTop: 3 },
});