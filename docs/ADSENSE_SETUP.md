# AdSense Setup for 77-Bit Guides

This document provides instructions for setting up Google AdSense on the 77-Bit Guides website. The integration has been designed to be subtle and minimally intrusive while still supporting server costs.

## Prerequisites

1. You need a Google AdSense account. If you don't have one, sign up at [Google AdSense](https://www.google.com/adsense/).
2. Your website must be approved by Google AdSense before ads can be displayed.

## Configuration Steps

### 1. Update the Publisher ID

You need to replace the placeholder publisher ID with your actual AdSense publisher ID in two files:

#### In `index.html`:

```html
<!-- IMPORTANT: Replace XXXXXXXXXXXXXXXX with your actual AdSense publisher ID -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```

#### In `src/components/ads/AdSense.tsx`:

```tsx
<ins
  className="adsbygoogle"
  style={{ display: 'block', height: format === 'rectangle' ? '160px' : 'auto' }}
  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // IMPORTANT: Replace with your actual AdSense publisher ID
  data-ad-slot={slot}
  data-ad-format={format === 'auto' ? 'auto' : 'rectangle'}
  data-full-width-responsive="true"
/>
```

### 2. Update Ad Unit Slots

You need to create ad units in your AdSense account and replace the placeholder slot IDs with your actual ad unit IDs:

1. Home page horizontal ad: Update the slot in `src/pages/HomePage.tsx` (current: "1234567890")
2. Guide detail page sidebar ad: Update the slot in `src/pages/GuideDetailPage.tsx` (current: "2345678901")
3. Guide detail page bottom ad: Update the slot in `src/pages/GuideDetailPage.tsx` (current: "3456789012")

## Ad Placement

The current implementation places ads in the following locations:

1. **Home Page**: Horizontal ads displayed after every 6 guide cards.
2. **Guide Detail Page**: 
   - Rectangle ad fixed at the bottom of the sidebar with the Table of Contents filling the available space above (desktop only)
   - Horizontal/responsive ad at the bottom of the article content

## Ad Viewability

The implementation is optimized for ad viewability:

1. **Fixed Height Rectangle**: Sidebar ads use a predictable fixed height for consistent placement
2. **Sticky Sidebar Layout**: The sidebar has a max-height of the viewport, with the Table of Contents scrollable and the ad fixed at the bottom
3. **Intersection Observer**: Ads are loaded when they approach the viewport (within 200px) and become visible

AdSense requires that ads have good viewability to count impressions and generate revenue. The current implementation:
- Uses a fixed-height rectangle ad format positioned consistently at the bottom of the sidebar
- Maximizes screen real estate by making the Table of Contents scrollable while keeping the ad visible
- Uses an Intersection Observer with rootMargin to preload ads as users approach them
- Maintains a balance between visibility and user experience

## Customization

If you'd like to adjust the appearance or placement of ads:

1. **Styling**: Modify the CSS classes in the `AdSense` component in `src/components/ads/AdSense.tsx`
2. **Layout**: Adjust the placement in `HomePage.tsx` and `GuideDetailPage.tsx`
3. **Frequency**: Change the number of guides between ads by modifying the chunk size in `HomePage.tsx`
4. **Sidebar Layout**: Adjust the max-height and flex properties in the sidebar container in `GuideDetailPage.tsx`

## Disabling Ads in Development

Ads are only loaded in production environments. In development mode, the ad containers will be visible but no actual ads will be displayed.

## Best Practices

1. **User Experience**: Keep ad density low to maintain a good user experience
2. **Design Integration**: The current implementation uses the site's color scheme and styling to make ads blend in
3. **Transparency**: Ads include a small "Advertisement" label for transparency
4. **Responsive Layout**: The sidebar layout adapts to different screen heights while maintaining ad visibility
5. **Performance**: The Intersection Observer prevents loading ads until they're approaching the viewport

## Troubleshooting

If ads are not displaying:

1. Ensure your AdSense account is active and approved
2. Check that you've correctly replaced all placeholder IDs
3. Verify your ad units are active in the AdSense dashboard
4. Check the browser console for any AdSense errors
5. Make sure your site doesn't have any content policy violations
6. Verify that ads have sufficient viewability (at least partially visible on screen)

## References

- [Google AdSense Help](https://support.google.com/adsense/)
- [AdSense Program Policies](https://support.google.com/adsense/answer/48182)
- [Ad Viewability Best Practices](https://support.google.com/adsense/answer/7100895) 