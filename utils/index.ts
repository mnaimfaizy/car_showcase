import { manufacturers } from "./../constants/index";
import { CarProps, FilterProps } from "@/types";
import { carsData } from "@/data/cars";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  // Simulate async operation to maintain API-like behavior
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Filter the local seed data based on provided filters
  let filteredCars = carsData;

  // Filter by manufacturer
  if (manufacturer) {
    filteredCars = filteredCars.filter(
      (car) => car.make.toLowerCase() === manufacturer.toLowerCase(),
    );
  }

  // Filter by year
  if (year && year > 0) {
    filteredCars = filteredCars.filter((car) => car.year === year);
  }

  // Filter by model
  if (model) {
    filteredCars = filteredCars.filter((car) =>
      car.model.toLowerCase().includes(model.toLowerCase()),
    );
  }

  // Filter by fuel type
  if (fuel) {
    filteredCars = filteredCars.filter(
      (car) => car.fuel_type.toLowerCase() === fuel.toLowerCase(),
    );
  }

  // Apply limit
  const limitedResults = limit ? filteredCars.slice(0, limit) : filteredCars;

  return limitedResults;
}

// Generate car image URL using a placeholder service
// Since Imagin Studio now requires payment, we're using placeholder images
// Alternative: Integrate with Pexels API for dynamic car photos
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const { make, model } = car;

  // Generate a consistent placeholder based on the car
  // You can replace this with actual Pexels API integration
  // See fetchCarImageFromPexels function below for dynamic implementation

  const carQuery = `${make}-${model}`.toLowerCase().replace(/\s+/g, "-");
  const seed = carQuery
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Use a selection of high-quality car images from Pexels as placeholders
  const placeholderImages = [
    "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/193999/pexels-photo-193999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/100650/pexels-photo-100650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  // Select image based on car make/model to ensure consistency
  const imageIndex = seed % placeholderImages.length;

  return placeholderImages[imageIndex];
};

// Optional: Function to fetch actual car images from Pexels API (requires API key)
// Uncomment and use this if you want dynamic car-specific images
/*
export async function fetchCarImageFromPexels(car: CarProps) {
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
  
  if (!apiKey) {
    return generateCarImageUrl(car); // Fallback to placeholder
  }
  
  const query = `${car.make} ${car.model} ${car.year} car`;
  
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );
    
    const data = await response.json();
    
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.large; // or .medium, .small
    }
    
    return generateCarImageUrl(car); // Fallback to placeholder
  } catch (error) {
    console.error('Error fetching from Pexels:', error);
    return generateCarImageUrl(car); // Fallback to placeholder
  }
}
*/

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};
