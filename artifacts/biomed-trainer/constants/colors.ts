/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    text: '#16382B',
    tint: '#2F8F68',

    // Core surfaces
    background: '#F4F8F3',
    foreground: '#16382B',

    // Cards / elevated surfaces
    card: '#FFFFFF',
    cardForeground: '#16382B',

    // Primary action color (buttons, links, active states)
    primary: '#2F8F68',
    primaryForeground: '#ffffff',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#E5F2E9',
    secondaryForeground: '#1F664A',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#EEF4EE',
    mutedForeground: '#6C8477',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#BEE6C9',
    accentForeground: '#185A3F',

    // Destructive actions (delete, error states)
    destructive: '#C8645A',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: '#D9E8DC',
    input: '#D9E8DC',
  },

  radius: 20,
};

export default colors;
