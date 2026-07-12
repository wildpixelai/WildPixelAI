# public/assets/ — folder convention

Scalable structure so no single directory ends up holding hundreds of files.

```
assets/
├── free/               existing free-tier assets (unchanged — do not move)
├── personal/
│   ├── wallpapers/
│   ├── botanical/
│   ├── abstract/
│   ├── spiritual/
│   ├── illustrations/
│   ├── landscapes/
│   └── inspiration/
├── commercial/
│   ├── seamless-patterns/
│   ├── textile/
│   ├── home-decor/
│   ├── branding/
│   └── packaging/
│   └── wallpapers/
├── blog/               journal / story cover art
├── thumbnails/         small preview variants (grid cards, search results)
└── og/                 Open Graph / social share images
```

## Filename convention

Lowercase, hyphen-separated, descriptive — matches the asset's `id`/`slug` in
`data/assets/*.ts` so the URL, filename, and data record all agree:

```
radha-krishna-holi-festival-illustration.jpeg
vertical-black-stone-glow-abstract-background.jpeg
```

Avoid generic names (`image1.jpg`, `final-v2.png`) — they carry no SEO value
and make the folder unsearchable at scale.

## Adding a new asset

1. Drop the file in the folder matching its license tier + category above.
2. Add a matching record to `data/assets/free.ts`, `personal.ts`, or
   `commercial.ts` — `image` field must point to the exact path.
3. Fill in `alt`, `tags`, `category`, `theme`, `collection`, and `keywords` —
   these drive search, filters, and related-artwork matching. An asset
   without these is effectively invisible to search and cross-linking.
4. If it belongs in an existing `collection`, use that collection's `id`.
   New collections are picked up automatically (`data/collections.ts`
   derives the list from `assets`) — no separate collection file to edit.
