export type SubscriptionPeriod = 'monthly' | 'sixMonths' | 'yearly';
export type SubscriptionPlanId = 'singleDiscipline' | 'allDisciplines';

export const subscriptionPeriods: {
  id: SubscriptionPeriod;
  labelKey: string;
}[] = [
  { id: 'monthly', labelKey: 'subscription.periodMonthly' },
  { id: 'sixMonths', labelKey: 'subscription.periodSixMonths' },
  { id: 'yearly', labelKey: 'subscription.periodYearly' },
];

export const subscriptionPlans: {
  id: SubscriptionPlanId;
  titleKey: string;
  descriptionKey: string;
  prices: Record<SubscriptionPeriod, number>;
}[] = [
  {
    id: 'singleDiscipline',
    titleKey: 'subscription.singleTitle',
    descriptionKey: 'subscription.singleDescription',
    prices: {
      monthly: 4000,
      sixMonths: 12990,
      yearly: 16990,
    },
  },
  {
    id: 'allDisciplines',
    titleKey: 'subscription.allTitle',
    descriptionKey: 'subscription.allDescription',
    prices: {
      monthly: 7990,
      sixMonths: 19900,
      yearly: 39990,
    },
  },
];

export function formatSubscriptionPrice(price: number) {
  return `${price.toLocaleString('ru-RU').replace(/\u00a0/g, ' ')} ₸`;
}