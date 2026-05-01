# OG Image Setup

## Required Image
Create an Open Graph image at: `public/og-image.jpg`

### Specifications:
- **Dimensions:** 1200 x 630 pixels
- **Format:** JPG or PNG
- **File size:** < 1MB
- **Content:** 
  - DMX Tech Services logo
  - Tagline: "Premium IT Services & Training Programs"
  - Brand colors (red/blue gradient)
  - Clean, professional design

### Alternative: Dynamic OG Images
For dynamic OG images per page, create `app/opengraph-image.tsx`:

```typescript
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'DMX Tech Services';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #2563eb 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <h1 style={{ fontSize: 80, fontWeight: 'bold', margin: 0 }}>
          DMX Tech Services
        </h1>
        <p style={{ fontSize: 40, margin: 20 }}>
          IT Services & Training Programs
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
```

## Current Status
Using placeholder path `/og-image.jpg` in all metadata.
Replace with actual image before production deployment.
