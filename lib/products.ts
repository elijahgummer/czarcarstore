export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string[];
  category: "maintenance" | "electronics" | "interior" | "safety";
  rating: number;
  reviews: number;
  featured: boolean;
  inStock: true;
  specifications?: Record<string, string>;
}

const products: Product[] = [
  {
    id: "1",
    name: "Engine Funnel Car Universal Silicone Liquid Funnel",
    description:
      "Collapsible Silicone Car Funnel. High-quality, heat-resistant silicone (-20°C to 220°C). Foldable, space-saving design. Easy to clean and hang. Universal fitment for all cars. Available in blue or black color. Avoid cutting or prolonged high heat. Clean with neutral detergent.",
    price: 13.95,
    originalPrice: 19.95,
    discount: 30,
    image: [
      "/products/product-1/main.png",
      "/products/product-1/side.png",
      "/products/product-1/dimensions.png",
      "/products/product-1/blue.png",
      "/products/product-1/black.png",
      "/products/product-1/descript.png",
    ],
    category: "maintenance",
    rating: 4.7,
    reviews: 1247,
    featured: true,
    inStock: true,
    specifications: {
      Material: "High-quality silicone",
      "Temperature Range": "-20°C to 220°C",
      Design: "Foldable, space-saving",
      Fitment: "Universal for all cars",
      Colors: "Blue or Black",
      Package: "1 x Silicone Funnel",
    },
  },
  {
    id: "2",
    name: "Drift Car Dashboard Toy Model Swing Turning Ornament",
    description:
      "Add personality to your ride with this fun drift car dashboard toy. It swings as you drive, bringing motion and style to your interior! Cool race car design for drift lovers. Swings and turns with motion for a fun effect. Easy to place on your dashboard – no tools needed. A perfect gift for car enthusiasts.",
    price: 12.95,
    originalPrice: 18.95,
    discount: 32,
    image: ["/products/product-2/main.png", "/products/product-2/side.png", "/products/product-2/main-1.png", "/products/product-2/display.png", "/products/product-2/styles.png", "/products/product-2/ae-car.png", "/products/product-2/bugatti-car.png", "/products/product-2/ferrari-car.png", "/products/product-2/lambo-car.png", "/products/product-2/nissan-car.png"
      , "/products/product-2/gtr-car.png", "/products/product-2/supra-car.png", "/products/product-2/porsche-car.png", "/products/product-2/mercedes.png", 
    ],
    category: "interior",
    rating: 4.4,
    reviews: 892,
    featured: true,
    inStock: true,
    specifications: {
      Material: "Durable plastic",
      Fitment: "Universal – fits any car interior",
      Design: "Cool race car design",
      Function: "Swings and turns with motion",
      Installation: "No tools needed",
    },
  },
  {
    id: "3",
    name: "Car Motorcycle RGB LED Strobe Lights 8 Colors Flash Warning",
    description:
      "Light up your ride with this wireless RGB strobe light featuring 8 vibrant colors and multiple flashing modes, including SOS and constant light. 8 colors: white, red, blue, green, yellow, pink, purple, ice blue. Flash, cycle, SOS & constant light modes with memory function. Super bright, even in daylight. USB rechargeable (1hr charge = up to 60hrs use). Compact, waterproof & easy to install.",
    price: 14.95,
    originalPrice: 22.95,
    discount: 35,
    image: "/placeholder.svg?height=300&width=300",
    category: "electronics",
    rating: 4.6,
    reviews: 1523,
    featured: true,
    inStock: true,
    specifications: {
      Colors:
        "8 colors (white, red, blue, green, yellow, pink, purple, ice blue)",
      Modes: "Flash, cycle, SOS & constant light",
      Battery: "USB rechargeable",
      "Charge Time": "1 hour",
      "Usage Time": "Up to 60 hours",
      Features: "Waterproof, memory function",
    },
  },
  {
    id: "4",
    name: "TOPK Car Phone Holder Gravity Stand Dashboard Windshield Mount",
    description:
      "Latest hook clip design for air vents with double support feet for enhanced stability. Suction cup with sticky gel ensures strong grip in hot or cold weather. 360° rotation and 240° flip adjustment. Wide compatibility for smartphones 4.7-6.7 inches. Works with iPhone, Galaxy, HTC, Sony, LG and other smartphones. Washable and reusable suction cup.",
    price: 19.95,
    originalPrice: 29.95,
    discount: 33,
    image: "/placeholder.svg?height=300&width=300",
    category: "electronics",
    rating: 4.5,
    reviews: 2341,
    featured: false,
    inStock: true,
    specifications: {
      Compatibility: "4.7-6.7 inch smartphones",
      Mounting: "Air vent, dashboard, windshield",
      Rotation: "360° rotation, 240° flip",
      Design: "Gravity stand with hook clip",
      Features: "Washable suction cup, double support feet",
    },
  },
  {
    id: "5",
    name: "Car Interior LED Ambient Light Strips 1M/3M/5M Dashboard Console",
    description:
      "Add a cool glow to your car's interior with these flexible, energy-saving EL light strips. Available in 1M/3M/5M lengths. Multiple colors: White, Red, Blue, Green, Pink, Purple, Ice Blue, Yellow, Orange. USB or cigarette lighter power options. Wire diameter 2.3mm, DC 12V, temperature range -40°C to 80°C. Lifespan 10,000+ hours.",
    price: 14.95,
    originalPrice: 24.95,
    discount: 40,
    image: "/placeholder.svg?height=300&width=300",
    category: "interior",
    rating: 4.3,
    reviews: 1156,
    featured: false,
    inStock: true,
    specifications: {
      Lengths: "1M / 3M / 5M options",
      Colors: "9 colors available",
      "Wire Diameter": "2.3mm",
      Voltage: "DC 12V",
      "Temperature Range": "-40°C to 80°C",
      Lifespan: "10,000+ hours",
    },
  },
  {
    id: "6",
    name: "10pc Car Perfume Balms Fruit Scent Air Freshener Vent Accessories",
    description:
      "Keep your car smelling amazing with this set of 10 mini balms in refreshing scents like lemon, strawberry, grape, and more. Cute, compact, and easy to use—perfect for any car air vent. Long-lasting fragrance with variety of fruity scents. Easy to install and replace. Stylish and fun car accessory.",
    price: 17.95,
    originalPrice: 25.95,
    discount: 31,
    image: "/placeholder.svg?height=300&width=300",
    category: "interior",
    rating: 4.2,
    reviews: 789,
    featured: false,
    inStock: true,
    specifications: {
      Quantity: "10 pieces",
      Scents: "Lemon, strawberry, grape, fruit varieties",
      Installation: "Air vent compatible",
      Features: "Long-lasting fragrance",
      Design: "Cute and compact",
    },
  },
  {
    id: "7",
    name: "70g Car Cleaning Gel Slime Magic Mud Dust Remover Tool",
    description:
      "Easily clean hard-to-reach spots with this magic cleaning gel! Perfect for car vents, keyboards, and small crevices — it picks up dust, dirt, and crumbs with no mess. Soft, reusable slime texture. Safe for delicate surfaces. Removes dirt from tight spaces. Lightweight and portable.",
    price: 16.95,
    originalPrice: 24.95,
    discount: 32,
    image: "/placeholder.svg?height=300&width=300",
    category: "maintenance",
    rating: 4.4,
    reviews: 1634,
    featured: false,
    inStock: true,
    specifications: {
      Weight: "70g",
      Texture: "Soft, reusable slime",
      "Use Cases": "Car vents, keyboards, crevices",
      Features: "Safe for delicate surfaces",
      Portability: "Lightweight and portable",
    },
  },
  {
    id: "8",
    name: "Car Backup Camera 1080P HD 170° Wide Angle Night Vision",
    description:
      "Compact backup camera (4×1.5×2cm) with 1080P resolution and 170° viewing angle. Easy installation beside license plate. Crystal clear HD image with automatic white balance and built-in parking guide. Night vision up to 3 meters. Anti-interference wiring with 6-meter extension cable. Works in -30°C to 80°C.",
    price: 39.95,
    originalPrice: 59.95,
    discount: 33,
    image: "/placeholder.svg?height=300&width=300",
    category: "safety",
    rating: 4.5,
    reviews: 967,
    featured: false,
    inStock: true,
    specifications: {
      Resolution: "1280×1080 (1000TV Lines)",
      "Viewing Angle": "170°",
      "Night Vision": "0-3 meters",
      Size: "4×1.5×2cm",
      "Cable Length": "6 meters",
      "Temperature Range": "-30°C to 80°C",
    },
  },
  {
    id: "9",
    name: "1080P WiFi Dual Dash Cam Front Inside IR Night Vision Recorder",
    description:
      "Stay protected with this dual-lens dash cam capturing 1080P video both outside and inside your car. WiFi connectivity for easy video transfer. IR night vision for clear footage in low light. Wide angle lens with loop recording. Motion detection starts recording automatically. Compact design fits discreetly on dash.",
    price: 85.95,
    originalPrice: 129.95,
    discount: 34,
    image: "/placeholder.svg?height=300&width=300",
    category: "safety",
    rating: 4.6,
    reviews: 543,
    featured: false,
    inStock: true,
    specifications: {
      Resolution: "1080P Full HD",
      Cameras: "Dual (front + interior)",
      Connectivity: "WiFi",
      "Night Vision": "IR technology",
      Recording: "Loop recording",
      Features: "Motion detection, wide angle",
    },
  },
  {
    id: "10",
    name: "Universal Car Phone Mount Magnetic Dashboard Holder",
    description:
      "Strong magnetic car phone mount with 360° rotation. Universal compatibility for all smartphones. Easy one-hand operation with powerful magnets. Includes metal plates and 3M adhesive. Compact design fits dashboard, air vent, or windshield. Secure grip even on bumpy roads.",
    price: 11.95,
    originalPrice: 18.95,
    discount: 37,
    image: "/placeholder.svg?height=300&width=300",
    category: "electronics",
    rating: 4.3,
    reviews: 1876,
    featured: false,
    inStock: true,
    specifications: {
      Type: "Magnetic mount",
      Rotation: "360°",
      Compatibility: "Universal smartphones",
      Installation: "Dashboard, air vent, windshield",
      Includes: "Metal plates, 3M adhesive",
    },
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((product) => product.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  );
}
