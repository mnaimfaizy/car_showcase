# Car Images API Guide

## Overview

This guide explains the car image implementation in this project and provides instructions for using different free image APIs.

## Current Implementation

The project currently uses **placeholder images from Pexels** that rotate based on the car's make and model. This ensures:

- ✅ No API key required to run the app
- ✅ Consistent images for the same car
- ✅ High-quality professional photos
- ✅ Fast loading times

## Option 1: Keep Using Placeholders (Current)

**No setup required!** The app works out of the box with curated car images.

The `generateCarImageUrl()` function in `utils/index.ts` automatically selects from a pool of 8 high-quality car images based on the car's make and model.

## Option 2: Enable Dynamic Pexels Integration (Recommended)

To get car-specific images based on make, model, and year:

### Step 1: Get Your Free API Key

1. Visit [https://www.pexels.com/api/](https://www.pexels.com/api/)
2. Click "Get Started"
3. Sign up for a free account
4. Your API key will be displayed immediately

### Step 2: Add API Key to Environment

Add to your `.env.local` file:

```env
NEXT_PUBLIC_PEXELS_API_KEY=your_actual_pexels_api_key_here
```

### Step 3: Update the Code

In `utils/index.ts`, uncomment the `fetchCarImageFromPexels` function (lines ~60-90).

Then, update your components to use the async function:

**Before (CarCard.tsx):**

```tsx
<Image
  src={generateCarImageUrl(car)}
  alt="car model"
  fill
  priority
  className="object-contain"
/>
```

**After (CarCard.tsx):**

```tsx
// Add state to store the image URL
const [imageUrl, setImageUrl] = useState(generateCarImageUrl(car));

// Fetch the image on mount
useEffect(() => {
  fetchCarImageFromPexels(car).then(setImageUrl);
}, [car]);

<Image
  src={imageUrl}
  alt="car model"
  fill
  priority
  className="object-contain"
/>;
```

### Pexels API Limits (Free Tier)

- **Rate Limit**: 200 requests per hour
- **Monthly**: Unlimited
- **Cost**: FREE forever
- **Attribution**: Optional but appreciated

## Option 3: Use Unsplash API

Another excellent free alternative:

### Setup

1. Get API key from [https://unsplash.com/developers](https://unsplash.com/developers)
2. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_key
   ```

### Implementation

```typescript
export async function fetchCarImageFromUnsplash(car: CarProps) {
  const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  if (!apiKey) {
    return generateCarImageUrl(car);
  }

  const query = `${car.make} ${car.model} ${car.year} car`;

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${apiKey}`,
    );

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }

    return generateCarImageUrl(car);
  } catch (error) {
    console.error("Error fetching from Unsplash:", error);
    return generateCarImageUrl(car);
  }
}
```

### Unsplash API Limits (Free Tier)

- **Rate Limit**: 50 requests per hour
- **Demo Mode**: 50 requests per hour
- **Production**: 5,000 requests per hour (after approval)
- **Cost**: FREE

## Option 4: Use Pixabay API

### Setup

1. Register at [https://pixabay.com/api/docs/](https://pixabay.com/api/docs/)
2. Get your API key
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_PIXABAY_API_KEY=your_pixabay_key
   ```

### Implementation

```typescript
export async function fetchCarImageFromPixabay(car: CarProps) {
  const apiKey = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;

  if (!apiKey) {
    return generateCarImageUrl(car);
  }

  const query = `${car.make} ${car.model} car`;

  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=3`,
    );

    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      return data.hits[0].largeImageURL;
    }

    return generateCarImageUrl(car);
  } catch (error) {
    console.error("Error fetching from Pixabay:", error);
    return generateCarImageUrl(car);
  }
}
```

### Pixabay API Limits (Free Tier)

- **Rate Limit**: 100 requests per minute
- **Daily**: 5,000 requests
- **Cost**: FREE

## Comparison Table

| Feature            | Pexels   | Unsplash  | Pixabay     | Placeholder (Current) |
| ------------------ | -------- | --------- | ----------- | --------------------- |
| **Cost**           | Free     | Free      | Free        | Free                  |
| **Setup Required** | Yes      | Yes       | Yes         | No                    |
| **Requests/Hour**  | 200      | 50        | 6,000       | Unlimited             |
| **Image Quality**  | High     | Very High | Medium-High | High                  |
| **Car Photos**     | 100,000+ | Limited   | Many        | 8 curated             |
| **Specific Cars**  | Maybe    | Maybe     | Maybe       | No                    |
| **Attribution**    | Optional | Required  | Optional    | None                  |

## Recommendation

**For Development/Testing:**

- Use the current placeholder implementation (no setup needed)

**For Production:**

- **Best Choice**: Pexels API (200 requests/hour, excellent quality, easy setup)
- **Alternative**: Pixabay (higher limits, good quality)
- **Premium Feel**: Unsplash (best quality, but lower limits)

## Troubleshooting

### Images Not Loading

1. Check API key is correctly set in `.env.local`
2. Verify the environment variable name matches exactly
3. Restart the development server after changing `.env.local`
4. Check browser console for error messages
5. Verify you haven't exceeded rate limits

### Placeholder Images Showing Instead

This is the fallback behavior when:

- No API key is provided
- API request fails
- No matching images found
- Rate limit exceeded

This ensures the app always works, even without an API key!

## Questions?

If you have questions about implementing any of these solutions, please open an issue in the repository.
