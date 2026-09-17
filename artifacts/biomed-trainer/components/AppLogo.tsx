import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useColors } from '@/hooks/useColors';

export function AppLogo({ size = 42 }: { size?: number }) {
  const colors = useColors();
  return (
    <View style={[styles.wrap, { width: size, height: size, borderRadius: size * 0.3, backgroundColor: colors.secondary }]}>
      <Image source={require('@/assets/images/icon.png')} style={{ width: size * 0.72, height: size * 0.72 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
});