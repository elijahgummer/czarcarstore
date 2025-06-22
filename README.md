# CzarCar - Premium Car Accessories Ecommerce

A modern, fully-functional ecommerce website built with Next.js 14, React, TypeScript, and Stripe payments.

## 🚗 Features

### Core Functionality
- **Complete Ecommerce Flow**: Browse products → Add to cart → Secure checkout → Order confirmation
- **Stripe Integration**: Real payment processing with webhooks
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark Theme**: Sleek dark UI with red and silver accents
- **Product Management**: Categories, filtering, search, and sorting
- **Shopping Cart**: Persistent cart with quantity management
- **Form Validation**: Robust form handling with Zod validation

### Technical Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Hook Form** for form handling
- **Stripe Elements** for secure payments
- **Toast Notifications** for user feedback
- **Error Boundaries** for error handling
- **SEO Optimized** with proper metadata

## 🛠️ Setup Instructions

### 1. Clone and Install
\`\`\`bash
git clone <your-repo>
cd czarcar-ecommerce
npm install
\`\`\`

### 2. Environment Variables
Create a `.env.local` file with your Stripe keys:

\`\`\`env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here  
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 3. Get Stripe Keys
1. Create a [Stripe account](https://stripe.com)
2. Get your test keys from the Stripe Dashboard
3. Set up a webhook endpoint for `/api/webhook`
4. Add the webhook secret to your environment variables

### 4. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see your store!

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Stripe Webhook Setup
1. In Stripe Dashboard, create a webhook endpoint
2. Point it to: `https://your-domain.vercel.app/api/webhook`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy the webhook secret to your environment variables

## 📱 Product Categories

- **Lighting**: LED strobe lights, underglow kits, headlight conversions
- **Electronics**: Dash cams, backup cameras, tire pressure monitors
- **Detailing**: Professional kits, ceramic coatings, microfiber towels

## 🔧 Customization

### Adding Products
Edit `lib/products.ts` to add/modify products:

\`\`\`typescript
{
  id: "unique-id",
  name: "Product Name", 
  description: "Product description",
  price: 99.99,
  category: "lighting" | "electronics" | "detailing",
  // ... other properties
}
\`\`\`

### Styling
- Colors defined in `tailwind.config.ts`
- Custom styles in `app/globals.css`
- Component-specific styles using Tailwind classes

### Payment Processing
- Payment logic in `components/CheckoutForm.tsx`
- Stripe API routes in `app/api/`
- Webhook handling in `app/api/webhook/route.ts`

## 🛡️ Security Features

- **Stripe Security**: PCI-compliant payment processing
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error boundaries
- **Environment Variables**: Secure API key management
- **HTTPS Required**: Secure connections for payments

## 📊 Performance

- **Server Components**: Faster initial page loads
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Optimized caching strategies

## 🎨 Design System

- **Typography**: Inter font family
- **Colors**: Dark theme with red (#ef4444) and silver (#c0c0c0) accents
- **Components**: Consistent shadcn/ui component library
- **Responsive**: Mobile-first responsive design
- **Animations**: Smooth hover effects and transitions

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify your Stripe keys are correct
3. Ensure webhook endpoints are properly configured
4. Check network requests in browser dev tools

## 🔄 Future Enhancements

- User authentication and accounts
- Order history and tracking
- Product reviews and ratings
- Inventory management
- Admin dashboard
- Email notifications
- Advanced analytics
