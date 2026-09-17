import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppLogo } from '@/components/AppLogo';
import { useColors } from '@/hooks/useColors';
import { useStudy } from '@/context/StudyContext';

const disciplines = [
  { id: 'molecular-biology', title: 'Molecular biology', subtitle: 'DNA, RNA & gene expression', icon: 'activity', progress: 42 },
  { id: 'medical-genetics', title: 'Medical genetics', subtitle: 'Inheritance & diagnosis', icon: 'git-branch', progress: 18 },
  { id: 'biomedicine', title: 'Biomedicine', subtitle: 'Cells, therapy & omics', icon: 'layers', progress: 8 },
  { id: 'parasitology', title: 'Parasitology', subtitle: 'Cycles, hosts & prevention', icon: 'target', progress: 0 },
  { id: 'embryology', title: 'Embryology', subtitle: 'From gamete to organ', icon: 'heart', progress: 0 },
  { id: 'ontogeny', title: 'Ontogeny', subtitle: 'Growth, aging & repair', icon: 'trending-up', progress: 0 },
  { id: 'human-invasion', title: 'Human invasion', subtitle: 'Parasite–host interaction', icon: 'shield', progress: 0 },
] as const;

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { streak, completedLessons } = useStudy();
  const topInset = insets.top + (Platform.OS === 'web' ? 67 : 0);
  const cardWidth = Math.min((width - 52) / 2, 210);

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { paddingTop: topInset, paddingBottom: insets.bottom + 112 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerIdentity}>
          <AppLogo />
          <View>
            <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>BIO • MED TRAINER</Text>
            <Text style={[styles.greeting, { color: colors.foreground }]}>Good morning, Amina</Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/profile')}
          style={({ pressed }) => [styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}
        >
          <Feather name="bell" size={18} color={colors.foreground} />
          <View style={[styles.notificationDot, { backgroundColor: colors.primary }]} />
        </Pressable>
      </View>

      <View style={[styles.streakRow, { backgroundColor: colors.secondary }]}>
        <View style={[styles.streakIcon, { backgroundColor: colors.accent }]}>
          <Feather name="zap" size={17} color={colors.accentForeground} />
        </View>
        <View style={styles.streakCopy}>
          <Text style={[styles.streakTitle, { color: colors.foreground }]}>{streak} day streak</Text>
          <Text style={[styles.streakSub, { color: colors.mutedForeground }]}>Keep your rhythm going</Text>
        </View>
        <Text style={[styles.streakAction, { color: colors.primary }]}>TODAY</Text>
      </View>

      <View style={[styles.progressCard, { backgroundColor: colors.primary }]}>
        <View style={styles.progressCopy}>
          <Text style={styles.progressLabel}>YOUR STUDY PLAN</Text>
          <Text style={styles.progressHeadline}>Small sessions.{'\n'}Real progress.</Text>
          <Text style={styles.progressDetail}>You've completed {completedLessons.length + 4} of 24 recommended topics.</Text>
          <View style={styles.progressTrack}><View style={[styles.progressFill, { width: '27%' }]} /></View>
        </View>
        <View style={styles.progressCircle}>
          <Text style={styles.progressNumber}>27</Text>
          <Text style={styles.progressPercent}>%</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Continue learning</Text>
        <Pressable onPress={() => router.push('/course/molecular-biology')}><Text style={[styles.seeAll, { color: colors.primary }]}>VIEW COURSE</Text></Pressable>
      </View>
      <Pressable
        onPress={() => router.push('/lesson/molecular-biology-dna')}
        style={({ pressed }) => [styles.continueCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.88 : 1 }]}
      >
        <View style={[styles.lessonVisual, { backgroundColor: '#E5F4EA' }]}>
          <View style={styles.dnaRailLeft} />
          <View style={styles.dnaRailRight} />
          {[0, 1, 2, 3].map((item) => <View key={item} style={[styles.dnaRung, { top: 18 + item * 13, backgroundColor: colors.primary }]} />)}
        </View>
        <View style={styles.lessonCopy}>
          <Text style={[styles.lessonKicker, { color: colors.primary }]}>MOLECULAR BIOLOGY · 12 MIN</Text>
          <Text style={[styles.lessonTitle, { color: colors.foreground }]}>DNA replication</Text>
          <Text style={[styles.lessonSub, { color: colors.mutedForeground }]}>Leading & lagging strands</Text>
          <View style={styles.lessonMeta}><View style={[styles.miniProgressTrack, { backgroundColor: colors.secondary }]}><View style={[styles.miniProgressFill, { backgroundColor: colors.primary, width: '65%' }]} /></View><Text style={[styles.lessonPercent, { color: colors.mutedForeground }]}>65%</Text></View>
        </View>
        <View style={[styles.playButton, { backgroundColor: colors.foreground }]}><Feather name="play" size={14} color={colors.card} /></View>
      </Pressable>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Explore disciplines</Text>
        <Text style={[styles.countLabel, { color: colors.mutedForeground }]}>7 TOTAL</Text>
      </View>
      <View style={styles.grid}>
        {disciplines.map((discipline) => (
          <Pressable
            key={discipline.id}
            onPress={() => router.push({ pathname: '/course/[id]', params: { id: discipline.id } })}
            style={({ pressed }) => [styles.disciplineCard, { width: cardWidth, backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.84 : 1 }]}
          >
            <View style={[styles.disciplineIcon, { backgroundColor: discipline.progress ? colors.secondary : colors.muted }]}>
              <Feather name={discipline.icon} size={18} color={discipline.progress ? colors.primary : colors.mutedForeground} />
            </View>
            <Text style={[styles.disciplineTitle, { color: colors.foreground }]} numberOfLines={2}>{discipline.title}</Text>
            <Text style={[styles.disciplineSubtitle, { color: colors.mutedForeground }]} numberOfLines={2}>{discipline.subtitle}</Text>
            <View style={styles.disciplineFooter}>
              <View style={[styles.miniProgressTrack, { backgroundColor: colors.secondary }]}><View style={[styles.miniProgressFill, { backgroundColor: colors.primary, width: `${discipline.progress}%` }]} /></View>
              <Text style={[styles.disciplinePercent, { color: colors.mutedForeground }]}>{discipline.progress}%</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  headerIdentity: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  eyebrow: { fontSize: 10, fontWeight: '700', letterSpacing: 1.3, marginBottom: 4 },
  greeting: { fontSize: 18, fontWeight: '700', letterSpacing: -0.3 },
  iconButton: { width: 42, height: 42, borderRadius: 21, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  notificationDot: { position: 'absolute', top: 9, right: 10, width: 6, height: 6, borderRadius: 3, borderWidth: 1, borderColor: '#FFFFFF' },
  streakRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 16, marginBottom: 14 },
  streakIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  streakCopy: { flex: 1, marginLeft: 10 },
  streakTitle: { fontSize: 13, fontWeight: '700' },
  streakSub: { fontSize: 11, marginTop: 2 },
  streakAction: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  progressCard: { borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 26, minHeight: 173 },
  progressCopy: { flex: 1, paddingRight: 10 },
  progressLabel: { color: '#C8EBD2', fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginBottom: 8 },
  progressHeadline: { color: '#FFFFFF', fontSize: 23, lineHeight: 27, fontWeight: '700', letterSpacing: -0.6 },
  progressDetail: { color: '#D8F1DF', fontSize: 11, lineHeight: 16, marginTop: 9 },
  progressTrack: { height: 5, backgroundColor: '#5BA781', borderRadius: 3, marginTop: 13, width: '93%' },
  progressFill: { height: 5, backgroundColor: '#E6F7E8', borderRadius: 3 },
  progressCircle: { width: 77, height: 77, borderRadius: 39, borderWidth: 7, borderColor: '#A7DDB6', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-12deg' }] },
  progressNumber: { color: '#FFFFFF', fontSize: 25, fontWeight: '700', lineHeight: 27, transform: [{ rotate: '12deg' }] },
  progressPercent: { color: '#D8F1DF', fontSize: 10, fontWeight: '700', transform: [{ rotate: '12deg' }] },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', letterSpacing: -0.4 },
  seeAll: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  countLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  continueCard: { borderRadius: 21, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  lessonVisual: { width: 77, height: 88, borderRadius: 15, position: 'relative', overflow: 'hidden' },
  dnaRailLeft: { position: 'absolute', left: 25, top: 13, width: 4, height: 63, borderRadius: 3, backgroundColor: '#2F8F68', transform: [{ rotate: '18deg' }] },
  dnaRailRight: { position: 'absolute', left: 48, top: 13, width: 4, height: 63, borderRadius: 3, backgroundColor: '#81C79B', transform: [{ rotate: '-18deg' }] },
  dnaRung: { position: 'absolute', left: 27, width: 23, height: 3, borderRadius: 2, transform: [{ rotate: '5deg' }] },
  lessonCopy: { flex: 1, paddingHorizontal: 12 },
  lessonKicker: { fontSize: 9, letterSpacing: 0.7, fontWeight: '800', marginBottom: 5 },
  lessonTitle: { fontSize: 16, fontWeight: '700' },
  lessonSub: { fontSize: 11, marginTop: 3 },
  lessonMeta: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 13 },
  miniProgressTrack: { height: 4, width: 60, borderRadius: 2, overflow: 'hidden' },
  miniProgressFill: { height: 4, borderRadius: 2 },
  lessonPercent: { fontSize: 10, fontWeight: '600' },
  playButton: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  disciplineCard: { minHeight: 163, borderRadius: 19, borderWidth: 1, padding: 14 },
  disciplineIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  disciplineTitle: { fontSize: 14, fontWeight: '700', lineHeight: 18 },
  disciplineSubtitle: { fontSize: 10.5, lineHeight: 15, marginTop: 4, minHeight: 30 },
  disciplineFooter: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 'auto' },
  disciplinePercent: { fontSize: 10, fontWeight: '600' },
});
