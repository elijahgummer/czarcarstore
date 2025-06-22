# Stripe Payment Setup Guide

## 🚀 Quick Setup (5 minutes)

### 1. Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete the verification process
3. Access your [Stripe Dashboard](https://dashboard.stripe.com)

### 2. Get Your API Keys
1. In Stripe Dashboard, go to **Developers** → **API Keys**
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)
4. Add them to your `.env.local` file:

\`\`\`env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
\`\`\`

### 3. Set Up Webhooks (Optional but Recommended)
1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter: `https://your-domain.vercel.app/api/webhook`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the **Signing secret** and add to `.env.local`:

\`\`\`env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
\`\`\`

### 4. Test Payments
Use these test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Any future expiry date and any 3-digit CVC.

### 5. Go Live
1. Complete Stripe account verification
2. Replace test keys with live keys (starting with `pk_live_` and `sk_live_`)
3. Update webhook endpoint to production URL

## 💰 Current Product Prices
- Phone Holder: $8.99 (was $15.99)
- LED Strip Lights: $12.99 (was $24.99)  
- Air Freshener: $6.99 (was $12.99)
- Wireless Charger: $14.99 (was $29.99)
- And more starting from $4.99!

## 🔒 Security Features
- PCI DSS compliant
- 3D Secure authentication
- Fraud detection
- Encrypted payments
- No card details stored on your server

## 📞 Support
- Stripe Documentation: [stripe.com/docs](https://stripe.com/docs)
- Test your integration: [stripe.com/docs/testing](https://stripe.com/docs/testing)
