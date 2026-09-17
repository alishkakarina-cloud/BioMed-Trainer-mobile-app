import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';
import {
  formatSubscriptionPrice,
  subscriptionPeriods,
  subscriptionPlans,
  SubscriptionPeriod,
  SubscriptionPlanId,
} from '@/data/subscription';

export default function SubscriptionScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [period, setPeriod] = useState<SubscriptionPeriod>('sixMonths');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanId | null>(null);
  const topInset = insets.top + (Platform.OS === 'web' ? 67 : 0);
  const selectedPlanTitle = selectedPlan
    ? t(subscriptionPlans.find((plan) => plan.id === selectedPlan)?.titleKey ?? '')
    : '';

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: topInset, paddingBottom: insets.bottom + 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Pressable
          accessibilityLabel={t('subscription.back')}
          accessibilityRole="button"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}
        >
          <Feather name="arrow-left" size={18} color={colors.foreground} />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={[styles.kicker, { color: colors.primary }]}>{t('subscription.kicker')}</Text>
          <Text style={[styles.title, { color: colors.foreground }]}>{t('subscription.title')}</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{t('subscription.subtitle')}</Text>
        </View>
      </View>

      <View style={[styles.periodCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.periodLabel, { color: colors.mutedForeground }]}>{t('subscription.periodLabel')}</Text>
        <View style={styles.periodRow}>
          {subscriptionPeriods.map((item) => {
            const isSelected = period === item.id;
            return (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                onPress={() => setPeriod(item.id)}
                style={[
                  styles.periodButton,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.background,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text style={[styles.periodText, { color: isSelected ? colors.primaryForeground : colors.mutedForeground }]}>
                  {t(item.labelKey)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.planList}>
        {subscriptionPlans.map((plan, index) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <View key={plan.id} style={[styles.planCard, { backgroundColor: colors.card, borderColor: isSelected ? colors.primary : colors.border }]}>
              <View style={styles.planHeader}>
                <View style={[styles.planIcon, { backgroundColor: index === 0 ? colors.secondary : colors.accent }]}>
                  <Feather name={index === 0 ? 'book-open' : 'layers'} size={18} color={colors.primary} />
                </View>
                <View style={styles.planHeading}>
                  <Text style={[styles.planTitle, { color: colors.foreground }]}>{t(plan.titleKey)}</Text>
                  <Text style={[styles.planDescription, { color: colors.mutedForeground }]}>{t(plan.descriptionKey)}</Text>
                </View>
              </View>

              <View style={styles.priceRow}>
                <Text style={[styles.price, { color: colors.foreground }]}>{formatSubscriptionPrice(plan.prices[period])}</Text>
                <Text style={[styles.pricePeriod, { color: colors.mutedForeground }]}>{t('subscription.pricePeriod', { period: t(subscriptionPeriods.find((item) => item.id === period)?.labelKey ?? '') })}</Text>
              </View>

              <Pressable
                accessibilityRole="button"
                onPress={() => setSelectedPlan(plan.id)}
                style={({ pressed }) => [
                  styles.chooseButton,
                  {
                    backgroundColor: isSelected ? colors.secondary : colors.primary,
                    borderColor: isSelected ? colors.primary : colors.primary,
                    opacity: pressed ? 0.86 : 1,
                  },
                ]}
              >
                <Text style={[styles.chooseButtonText, { color: isSelected ? colors.primary : colors.primaryForeground }]}>
                  {t(isSelected ? 'subscription.selected' : 'subscription.choosePlan')}
                </Text>
                <Feather name={isSelected ? 'check' : 'arrow-up-right'} size={16} color={isSelected ? colors.primary : colors.primaryForeground} />
              </Pressable>
            </View>
          );
        })}
      </View>

      {selectedPlan ? (
        <View style={[styles.selectionNotice, { backgroundColor: colors.secondary }]}>
          <Feather name="check-circle" size={17} color={colors.primary} />
          <View style={styles.selectionCopy}>
            <Text style={[styles.selectionTitle, { color: colors.foreground }]}>{t('subscription.selectionTitle')}</Text>
            <Text style={[styles.selectionText, { color: colors.secondaryForeground }]}>
              {t('subscription.selectionMessage', {
                plan: selectedPlanTitle,
                period: t(subscriptionPeriods.find((item) => item.id === period)?.labelKey ?? ''),
              })}
            </Text>
          </View>
        </View>
      ) : null}

      <Text style={[styles.demoNote, { color: colors.mutedForeground }]}>{t('subscription.demoNote')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 20, marginBottom: 20 },
  backButton: { width: 38, height: 38, borderRadius: 19, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 19 },
  headerCopy: {},
  kicker: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 7 },
  title: { fontSize: 28, fontWeight: '700', letterSpacing: -0.8 },
  subtitle: { fontSize: 13, lineHeight: 19, marginTop: 8, maxWidth: 340 },
  periodCard: { marginHorizontal: 20, borderRadius: 19, borderWidth: 1, padding: 14, marginBottom: 14 },
  periodLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8, marginBottom: 10 },
  periodRow: { flexDirection: 'row', gap: 7 },
  periodButton: { flex: 1, borderRadius: 11, borderWidth: 1, paddingVertical: 10, alignItems: 'center' },
  periodText: { fontSize: 11, fontWeight: '800' },
  planList: { marginHorizontal: 20, gap: 12 },
  planCard: { borderRadius: 20, borderWidth: 1, padding: 16 },
  planHeader: { flexDirection: 'row', alignItems: 'center' },
  planIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  planHeading: { flex: 1, marginLeft: 11 },
  planTitle: { fontSize: 16, fontWeight: '700' },
  planDescription: { fontSize: 11, lineHeight: 15, marginTop: 3 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 18 },
  price: { fontSize: 25, fontWeight: '700', letterSpacing: -0.6 },
  pricePeriod: { fontSize: 11, marginLeft: 7 },
  chooseButton: { minHeight: 42, borderRadius: 13, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 16 },
  chooseButtonText: { fontSize: 12, fontWeight: '800' },
  selectionNotice: { marginHorizontal: 20, marginTop: 14, borderRadius: 16, padding: 13, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  selectionCopy: { flex: 1 },
  selectionTitle: { fontSize: 12, fontWeight: '800' },
  selectionText: { fontSize: 11, lineHeight: 16, marginTop: 3 },
  demoNote: { marginHorizontal: 22, fontSize: 10, lineHeight: 15, textAlign: 'center', marginTop: 16 },
});