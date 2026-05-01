# SEO Quick Reference — DMX Tech Services

## 🔍 How to Check SEO Implementation

### 1. View Metadata in Browser
```bash
# Start dev server
npm run dev

# Visit any page and view source (Ctrl+U)
# Look for:
# - <title> tag
# - <meta name="description">
# - <meta property="og:*">
# - <meta name="twitter:*">
# - <link rel="canonical">
```

### 2. View Structured Data
```bash
# In browser console:
document.querySelectorAll('script[type="application/ld+json"]')

# Or view page source and search for:
# <script type="application/ld+json">
```

### 3. Test Sitemap
```bash
# Visit in browser:
http://localhost:3000/sitemap.xml

# Should show XML with all pages
```

### 4. Test Robots.txt
```bash
# Visit in browser:
http://localhost:3000/robots.txt

# Should show:
# User-agent: *
# Allow: /
# Disallow: /studio/
# Sitemap: https://dmxtechservices.com/sitemap.xml
```

---

## 🛠️ SEO Testing Tools

### Google Tools (Free)
1. **Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test structured data for any page

2. **PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Test performance and Core Web Vitals

3. **Mobile-Friendly Test**
   - URL: https://search.google.com/test/mobile-friendly
   - Test mobile usability

### Browser Extensions
1. **SEO Meta in 1 Click** (Chrome/Firefox)
   - View all meta tags instantly

2. **Lighthouse** (Built into Chrome DevTools)
   - Press F12 → Lighthouse tab → Generate report

### Schema Validators
1. **Schema.org Validator**
   - URL: https://validator.schema.org/
   - Paste JSON-LD to validate

2. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test live URL or code snippet

---

## 📝 Adding SEO to New Pages

### Step 1: Add Metadata
```typescript
// app/new-page/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title | DMX Tech Services",
  description: "150-160 character description here",
  keywords: ["keyword1", "keyword2", "keyword3"],
  openGraph: {
    title: "Page Title | DMX Tech Services",
    description: "Description for social sharing",
    url: "https://dmxtechservices.com/new-page",
    siteName: "DMX Tech Services",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Title | DMX Tech Services",
    description: "Description for Twitter",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://dmxtechservices.com/new-page",
  },
};
```

### Step 2: Add Breadcrumb Schema
```typescript
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export default function NewPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://dmxtechservices.com" },
          { name: "New Page", url: "https://dmxtechservices.com/new-page" }
        ]}
      />
      <main>
        {/* Page content */}
      </main>
    </>
  );
}
```

### Step 3: Add to Sitemap
```typescript
// app/sitemap.ts
// Add new static route:
{
  url: 'https://dmxtechservices.com/new-page',
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,
}
```

---

## 🎯 SEO Best Practices

### Title Tags
- ✅ 50-60 characters
- ✅ Include primary keyword
- ✅ Include brand name
- ✅ Unique for each page
- ❌ Don't keyword stuff

### Meta Descriptions
- ✅ 150-160 characters
- ✅ Include call-to-action
- ✅ Include primary keyword naturally
- ✅ Unique for each page
- ❌ Don't duplicate content from page

### Keywords
- ✅ 5-10 relevant keywords
- ✅ Mix of short-tail and long-tail
- ✅ Include location if relevant
- ❌ Don't repeat same keyword multiple times

### Images
- ✅ Use `next/image` component
- ✅ Add descriptive alt text
- ✅ Optimize file size (< 200KB)
- ✅ Use WebP format when possible
- ✅ Set width and height

### Structured Data
- ✅ Use appropriate schema types
- ✅ Include all required properties
- ✅ Test with Google Rich Results Test
- ✅ Keep data accurate and up-to-date

---

## 🚨 Common SEO Mistakes to Avoid

### ❌ Don't:
1. **Duplicate title tags** — Each page must have unique title
2. **Missing meta descriptions** — Every page needs one
3. **Broken canonical URLs** — Always use full absolute URLs
4. **Missing alt text** — All images need descriptive alt text
5. **Keyword stuffing** — Use keywords naturally
6. **Thin content** — Pages should have substantial content (300+ words)
7. **Slow page speed** — Optimize images and code
8. **Missing mobile optimization** — Test on mobile devices
9. **Broken links** — Check all internal/external links
10. **Missing structured data** — Add relevant schemas

### ✅ Do:
1. **Write for humans first** — SEO second
2. **Use semantic HTML** — `<header>`, `<main>`, `<article>`, etc.
3. **Create quality content** — Valuable, original, engaging
4. **Optimize for mobile** — Mobile-first approach
5. **Use internal linking** — Link to related pages
6. **Keep URLs clean** — Use hyphens, lowercase, descriptive
7. **Update content regularly** — Fresh content ranks better
8. **Monitor analytics** — Track performance and adjust
9. **Build quality backlinks** — Get links from reputable sites
10. **Test everything** — Use tools to validate implementation

---

## 📊 Monitoring SEO Performance

### Key Metrics to Track:
1. **Organic Traffic** — Google Analytics
2. **Keyword Rankings** — Google Search Console
3. **Click-Through Rate (CTR)** — Search Console
4. **Core Web Vitals** — PageSpeed Insights
5. **Indexed Pages** — Search Console
6. **Backlinks** — Ahrefs, Moz, or Search Console
7. **Bounce Rate** — Google Analytics
8. **Time on Page** — Google Analytics

### Monthly SEO Checklist:
- [ ] Review Google Search Console for errors
- [ ] Check Core Web Vitals scores
- [ ] Analyze top-performing pages
- [ ] Identify pages with low CTR
- [ ] Update outdated content
- [ ] Check for broken links
- [ ] Review keyword rankings
- [ ] Analyze competitor performance

---

## 🔗 Useful Resources

### Official Documentation:
- **Next.js Metadata API:** https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- **Schema.org:** https://schema.org/
- **Google Search Central:** https://developers.google.com/search

### SEO Tools:
- **Google Search Console:** https://search.google.com/search-console
- **Google Analytics:** https://analytics.google.com/
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Lighthouse:** Built into Chrome DevTools

### Learning Resources:
- **Google SEO Starter Guide:** https://developers.google.com/search/docs/beginner/seo-starter-guide
- **Moz Beginner's Guide to SEO:** https://moz.com/beginners-guide-to-seo
- **Ahrefs Blog:** https://ahrefs.com/blog/

---

## 💡 Pro Tips

1. **Focus on User Experience** — Good UX = Good SEO
2. **Content is King** — Quality content attracts links and engagement
3. **Mobile-First** — Google uses mobile-first indexing
4. **Page Speed Matters** — Faster pages rank better
5. **Structured Data Helps** — Rich results get more clicks
6. **Internal Linking** — Helps Google understand site structure
7. **Regular Updates** — Fresh content signals active site
8. **Monitor Competitors** — Learn from what works for them
9. **Be Patient** — SEO takes 3-6 months to show results
10. **Test Everything** — Always validate your implementation

---

**Questions? Contact the SEO Specialist! 🚀**
