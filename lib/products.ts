export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: "lighting" | "electronics" | "detailing"
  rating: number
  reviews: number
  featured: boolean
  inStock: boolean
  specifications?: Record<string, string>
}

const products: Product[] = [
  {
    id: "1",
    name: "Car Phone Holder Dashboard Mount",
    description:
      "Universal car phone holder with 360° rotation and strong suction cup. Compatible with all smartphones 4-7 inches. Easy one-hand operation.",
    price: 8.99,
    originalPrice: 15.99,
    discount: 44,
    image: "https://ae01.alicdn.com/kf/S8c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c.jpg",
    category: "electronics",
    rating: 4.5,
    reviews: 2847,
    featured: true,
    inStock: true,
  },
  {
    id: "2",
    name: "LED Strip Lights for Car Interior",
    description:
      "RGB LED strip lights with remote control and music sync. 16 million colors, waterproof design. Perfect for car interior ambient lighting.",
    price: 12.99,
    originalPrice: 24.99,
    discount: 48,
    image: "https://ae01.alicdn.com/kf/H8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a.jpg",
    category: "lighting",
    rating: 4.7,
    reviews: 1923,
    featured: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Car Air Freshener Diffuser",
    description:
      "Premium car air freshener with essential oil diffuser. USB powered with 3 scent modes. Includes 2 fragrance pads and essential oils.",
    price: 6.99,
    originalPrice: 12.99,
    discount: 46,
    image: "https://ae01.alicdn.com/kf/H9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b.jpg",
    category: "detailing",
    rating: 4.3,
    reviews: 1456,
    featured: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Wireless Car Charger Pad",
    description:
      "Fast wireless charging pad for car dashboard. 15W fast charging, compatible with iPhone and Android. Anti-slip silicone design.",
    price: 14.99,
    originalPrice: 29.99,
    discount: 50,
    image: "https://ae01.alicdn.com/kf/H7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c.jpg",
    category: "electronics",
    rating: 4.6,
    reviews: 3241,
    featured: false,
    inStock: true,
  },
  {
    id: "5",
    name: "Car Seat Gap Filler Organizer",
    description:
      "Leather car seat gap filler with storage pockets. Prevents items from falling between seats. Includes cup holder and phone slot.",
    price: 9.99,
    originalPrice: 19.99,
    discount: 50,
    image: "https://ae01.alicdn.com/kf/H6d6d6d6d6d6d6d6d6d6d6d6d6d6d6d6d6d6d6d6d.jpg",
    category: "detailing",
    rating: 4.4,
    reviews: 987,
    featured: false,
    inStock: true,
  },
  {
    id: "6",
    name: "Mini Dash Cam 1080P",
    description:
      "Compact 1080P dash cam with night vision and loop recording. 170° wide angle lens, G-sensor, and 32GB SD card included.",
    price: 24.99,
    originalPrice: 49.99,
    discount: 50,
    image: "https://ae01.alicdn.com/kf/H5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e.jpg",
    category: "electronics",
    rating: 4.2,
    reviews: 756,
    featured: false,
    inStock: true,
  },
  {
    id: "7",
    name: "Car Tire Pressure Gauge Digital",
    description:
      "Digital tire pressure gauge with LED display. Accurate readings up to 150 PSI. Compact design with keychain attachment.",
    price: 7.99,
    originalPrice: 15.99,
    discount: 50,
    image: "https://ae01.alicdn.com/kf/H4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f.jpg",
    category: "electronics",
    rating: 4.1,
    reviews: 432,
    featured: false,
    inStock: true,
  },
  {
    id: "8",
    name: "Car Window Sun Shade",
    description:
      "Retractable car window sun shade with UV protection. Easy installation, fits most car windows. Blocks 99% of harmful UV rays.",
    price: 11.99,
    originalPrice: 22.99,
    discount: 48,
    image: "https://ae01.alicdn.com/kf/H3g3g3g3g3g3g3g3g3g3g3g3g3g3g3g3g3g3g3g3g.jpg",
    category: "detailing",
    rating: 4.0,
    reviews: 623,
    featured: false,
    inStock: true,
  },
  {
    id: "9",
    name: "USB Car Charger Fast Charging",
    description:
      "Dual USB car charger with fast charging technology. LED display shows voltage and current. Compatible with all USB devices.",
    price: 5.99,
    originalPrice: 12.99,
    discount: 54,
    image: "https://ae01.alicdn.com/kf/H2h2h2h2h2h2h2h2h2h2h2h2h2h2h2h2h2h2h2h2h.jpg",
    category: "electronics",
    rating: 4.5,
    reviews: 1876,
    featured: false,
    inStock: true,
  },
  {
    id: "10",
    name: "Car Cleaning Gel Universal",
    description:
      "Universal cleaning gel for car interior details. Removes dust from air vents, keyboards, and tight spaces. Reusable and biodegradable.",
    price: 4.99,
    originalPrice: 9.99,
    discount: 50,
    image: "https://ae01.alicdn.com/kf/H1i1i1i1i1i1i1i1i1i1i1i1i1i1i1i1i1i1i1i1i.jpg",
    category: "detailing",
    rating: 4.3,
    reviews: 2134,
    featured: false,
    inStock: true,
  },
  {
    id: "11",
    name: "Car Backup Camera Wireless",
    description:
      "Wireless backup camera with 4.3 inch monitor. Easy installation, waterproof design, night vision capability. No wiring required.",
    price: 39.99,
    originalPrice: 79.99,
    discount: 50,
    image: "https://ae01.alicdn.com/kf/H0j0j0j0j0j0j0j0j0j0j0j0j0j0j0j0j0j0j0j0j.jpg",
    category: "electronics",
    rating: 4.4,
    reviews: 567,
    featured: false,
    inStock: true,
  },
  {
    id: "12",
    name: "Car Emergency Kit Multi-Tool",
    description:
      "Complete car emergency kit with jump starter, flashlight, glass breaker, and seatbelt cutter. Compact design fits in glove compartment.",
    price: 19.99,
    originalPrice: 39.99,
    discount: 50,
    image: "https://ae01.alicdn.com/kf/H9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k9k.jpg",
    category: "electronics",
    rating: 4.6,
    reviews: 891,
    featured: false,
    inStock: true,
  },
  {
    id: "13",
    name: "Magnetic Car Phone Mount",
    description:
      "Strong magnetic car phone mount for air vent. 360° rotation, one-hand operation. Includes 2 metal plates and 3M adhesive.",
    price: 6.99,
    originalPrice: 14.99,
    discount: 53,
    image: "https://ae01.alicdn.com/kf/H8l8l8l8l8l8l8l8l8l8l8l8l8l8l8l8l8l8l8l8l.jpg",
    category: "electronics",
    rating: 4.2,
    reviews: 1654,
    featured: false,
    inStock: true,
  },
  {
    id: "14",
    name: "Car Seat Covers Universal",
    description:
      "Universal car seat covers set of 4. Waterproof, breathable fabric. Easy installation, fits most car seats. Machine washable.",
    price: 16.99,
    originalPrice: 34.99,
    discount: 51,
    image: "https://ae01.alicdn.com/kf/H7m7m7m7m7m7m7m7m7m7m7m7m7m7m7m7m7m7m7m7m.jpg",
    category: "detailing",
    rating: 4.1,
    reviews: 743,
    featured: false,
    inStock: true,
  },
  {
    id: "15",
    name: "Car LED Headlight Bulbs H7",
    description:
      "LED headlight bulbs H7 with 6000K white light. 60W high power, 10000LM brightness. Easy plug-and-play installation, 50000 hour lifespan.",
    price: 22.99,
    originalPrice: 45.99,
    discount: 50,
    image: "https://ae01.alicdn.com/kf/H6n6n6n6n6n6n6n6n6n6n6n6n6n6n6n6n6n6n6n6n.jpg",
    category: "lighting",
    rating: 4.5,
    reviews: 1234,
    featured: false,
    inStock: true,
  },
  {
    id: "16",
    name: "Car Trunk Organizer Foldable",
    description:
      "Foldable car trunk organizer with multiple compartments. Heavy-duty construction, non-slip bottom. Perfect for groceries and tools.",
    price: 13.99,
    originalPrice: 27.99,
    discount: 50,
    image: "https://ae01.alicdn.com/kf/H5o5o5o5o5o5o5o5o5o5o5o5o5o5o5o5o5o5o5o5o.jpg",
    category: "detailing",
    rating: 4.3,
    reviews: 456,
    featured: false,
    inStock: true,
  },
  {
    id: "17",
    name: "Car Bluetooth FM Transmitter",
    description:
      "Bluetooth FM transmitter with dual USB charging ports. Hands-free calling, music streaming, LED display. Compatible with all devices.",
    price: 9.99,
    originalPrice: 19.99,
    discount: 50,
    image: "https://ae01.alicdn.com/kf/H4p4p4p4p4p4p4p4p4p4p4p4p4p4p4p4p4p4p4p4p.jpg",
    category: "electronics",
    rating: 4.0,
    reviews: 1987,
    featured: false,
    inStock: true,
  },
  {
    id: "18",
    name: "Car Floor Mats All Weather",
    description:
      "All-weather car floor mats set of 4. Heavy-duty rubber construction, custom fit design. Easy to clean, non-slip backing.",
    price: 18.99,
    originalPrice: 37.99,
    discount: 50,
    image: "https://ae01.alicdn.com/kf/H3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q3q.jpg",
    category: "detailing",
    rating: 4.4,
    reviews: 678,
    featured: false,
    inStock: true,
  },
]

export function getAllProducts(): Product[] {
  return products
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products
  return products.filter((product) => product.category === category)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  )
}
