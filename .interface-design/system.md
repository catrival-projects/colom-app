# Colombia - Biodiversity & Heritage Design System

This document captures the design patterns and tokens established for the ColomApp project.

## Direction and Feel

- **Atmosphere**: Vibrant but Mysterious (Magical Realism), Lush, Elevation.
- **Tone**: Grounded, authoritative, yet inviting (editorial).

## Color World

- **Mist (Background)**: `oklch(0.97 0.01 240)` - A clean, high-altitude fog tint.
- **Emerald (Primary)**: `oklch(0.50 0.15 150)` - Jewel-toned greens for actions and brand.
- **Coffee (Foreground)**: `oklch(0.35 0.08 60)` - Deep earthy brown for text.
- **Orchid (Accent)**: `oklch(0.96 0.02 330)` - Subtle interactive glows.
- **River (Separator)**: `oklch(0.90 0.02 240)` - Semi-transparent water-toned borders.

## Depth Strategy: Layered & Textured

- **Base**: Mist Gray background.
- **Elevation**: Surfaces use `bg-card/50` with `backdrop-blur-sm`.
- **Borders**: Soft "River" borders (`border-border/60`).
- **Shadows**: Subtle "Ambient" shadows using primary hues.

## Signature Element: The Topographic Card

- **Pattern**: Cards with `rounded-xl`, subtle borders, and `shadow-sm`.
- **Interaction**: "Bloom" hover effect - `hover:bg-accent/30` with an inset primary shadow (`hover:shadow-[inset_2px_0_0_0_var(--color-primary)]`).

## Reusable Components

- **Data Tables**: Use `@tanstack/react-table` with `components/ui/table` primitives.
- **Navigation**: Mist-tinted glassmorphism with high backdrop-blur (`bg-background/80 blur-md`).
- **Map Controls**: Floating "Gemstone" style buttons (circular, elevated).

## Spacing & Typography

- **Grid**: 4px base (Tailwind default).
- **Headers**: Editorial weight, tight tracking.
- **Data**: Tabular spacing for numeric columns.
