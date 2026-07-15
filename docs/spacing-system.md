# A3 Spacing System

The site uses a 4px primitive scale and semantic spacing contracts. Components consume semantic tokens; route-specific spacing values are not permitted.

## Primitive scale

| Token | Pixels |
| --- | ---: |
| `--space-0` | 0 |
| `--space-1` | 4 |
| `--space-2` | 8 |
| `--space-3` | 12 |
| `--space-4` | 16 |
| `--space-5` | 20 |
| `--space-6` | 24 |
| `--space-8` | 32 |
| `--space-10` | 40 |
| `--space-12` | 48 |
| `--space-14` | 56 |
| `--space-16` | 64 |
| `--space-18` | 72 |
| `--space-20` | 80 |
| `--space-24` | 96 |
| `--space-28` | 112 |

## Semantic contracts

| Token | Contract |
| --- | --- |
| `--space-section-block` | Symmetric padding for primary content sections |
| `--space-section-compact` | Compact reminder and closing bands only |
| `--space-hero-block` | Hero content padding; the fixed header height is added separately |
| `--space-section-content` | Section heading group to its primary content |
| `--space-heading-copy` | Heading to supporting copy |
| `--space-copy-stack` | Closely related paragraphs |
| `--space-copy-action` | Supporting copy to an action group |
| `--space-control-content` | Filters or controls to their grid/content |
| `--space-grid` | Row and column gaps for card grids and carousel rails |
| `--space-panel-gap` | Columns inside large panels and accordion showcases |
| `--space-card-padding` | Standard card padding |
| `--space-panel-padding` | Large panel and bento-card padding |

## Composition rules

- Primary sections use `Section` with `spacing="default"`; only thin reminder/final CTA bands use `spacing="compact"`.
- `SectionHeader` owns heading-to-copy spacing. Do not add margins to its heading or lead text.
- `ProductCollection` owns header-to-filter/grid spacing. `FilteredProductGrid` owns filter-to-grid spacing.
- `ProductImageGrid` and `ProductImageCarousel` use the same `--space-grid` token and the same `ProductImageCard` internal spacing.
- `ProcessAccordion` presentations may change columns and media, but trigger and panel rhythm remains shared.
- Adjacent sections do not use inter-section margins. Each section owns symmetric block padding.
- Page heroes share the `PageHero` copy rhythm. The home hero keeps its unique full-viewport composition but uses the same heading/copy/action relationships.

## Allowed exceptions

- Absolute positioning, media dimensions, borders and optical icon offsets are not layout spacing tokens.
- A new spacing variant requires a semantic name, documentation here and a design-system audit update. Page- or route-specific one-off spacing is not allowed.
