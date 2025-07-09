"use client";

import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Truck, Lock, CreditCard, Mail, Globe } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  countries,
  getCountryByCode,
  getStatesForCountry,
  getAddressLabels,
  formatCurrency,
  stripeSupportedCurrencies,
} from "@/lib/countries";
import Image from "next/image";
import Link from "next/link";

const createShippingSchema = (countryCode: string) => {
  const labels = getAddressLabels(countryCode);

  return z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, `${labels.address} is required`),
    city: z.string().min(1, `${labels.city} is required`),
    state: labels.stateRequired
      ? z.string().min(1, `${labels.state} is required`)
      : z.string().optional(),
    postalCode: z.string().min(1, `${labels.postalCode} is required`),
    country: z.string().min(1, "Country is required"),
  });
};

// When country changes:
// (Removed unused handleCountryChange function)
 
type ShippingFormData = z.infer<ReturnType<typeof createShippingSchema>>;

export interface CheckoutFormProps {
  clientSecret: string;
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

export default function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { items, getTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("AU"); // Default to Australia or your choice
const [currency, setCurrency] = useState("AUD"); // Default to AUD
  const [agreed, setAgreed] = useState(false);
  const [agreementError, setAgreementError] = useState<string | null>(null);
  const country = getCountryByCode(selectedCountry);
  const addressLabels = getAddressLabels(selectedCountry);
  const statesForCountry = getStatesForCountry(selectedCountry);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ShippingFormData>({
    resolver: zodResolver(createShippingSchema(selectedCountry)),
    defaultValues: {
      country: selectedCountry,
    },
  });

  const subtotal = getTotal();
  const tax = selectedCountry === "US" ? subtotal * 0.08 : 0; // Only apply tax for US
  const total = subtotal + tax;

  // Update currency when country changes
  useEffect(() => {
    if (country && stripeSupportedCurrencies.includes(country.currency)) {
      setCurrency(country.currency);
    } else {
      setCurrency("USD"); // Fallback to USD for unsupported currencies
    }
  }, [country]);

  // Reset form when country changes
  useEffect(() => {
    setValue("country", selectedCountry);
    setValue("state", ""); // Reset state when country changes
  }, [selectedCountry, setValue]);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          toast.success("Payment successful!");
          clearCart();
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, clientSecret, clearCart]);

  const onSubmit = async (data: ShippingFormData) => {
    if (!agreed) {
      setAgreementError(
        "You must agree to the terms and conditions to proceed."
      );
      return;
    }

    setIsProcessing(true);
    setMessage(null);
    setAgreementError(null);

    if (!stripe) {
      setMessage("Stripe has not loaded yet. Please try again in a moment.");
      setIsProcessing(false);
      return;
    }

    try {
      const confirmPaymentOptions: any = {
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
          shipping: {
            name: `${data.firstName} ${data.lastName}`,
            phone: data.phone,
            address: {
              line1: data.address,
              city: data.city,
              state: data.state || undefined,
              postal_code: data.postalCode,
              country: data.country,
            },
          },
          receipt_email: data.email,
        },
        redirect: "always",
      };
      if (elements) {
        confirmPaymentOptions.elements = elements;
      }
      const { error, paymentIntent } = await stripe.confirmPayment(confirmPaymentOptions);

      if (error) {
        console.error("Payment error:", error);
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message || "Payment failed");
          toast.error(error.message || "Payment failed");
        } else {
          setMessage("An unexpected error occurred.");
          toast.error("An unexpected error occurred");
        }
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment successful! Check your email for confirmation.");

        // Send order confirmation email
        try {
          const orderEmailData = {
            customerEmail: data.email,
            customerName: `${data.firstName} ${data.lastName}`,
            orderNumber: `CZ-${Date.now().toString().slice(-6)}`,
            orderTotal: total,
            orderItems: items.map((item) => ({
              name: item.product.name,
              options: item.optionLabel || undefined,
              quantity: item.quantity,
              price: item.product.price,
              total: item.product.price * item.quantity,
            })),
            shippingAddress: {
              name: `${data.firstName} ${data.lastName}`,
              address: data.address,
              city: data.city,
              state: data.state || "",
              zipCode: data.postalCode,
            },
            paymentIntentId: paymentIntent.id,
          };

          await fetch("/api/send-order-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderEmailData),
          });
        } catch (emailError) {
          console.error("Error sending confirmation email:", emailError);
        }

        clearCart();
        window.location.href = `/order-confirmation?payment_intent=${paymentIntent.id}&payment_intent_client_secret=${paymentIntent.client_secret}`;
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setMessage("An unexpected error occurred.");
      toast.error("An unexpected error occurred");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Country Selection */}
              <div>
                <Label
                  htmlFor="country"
                  className="text-gray-300 flex items-center"
                >
                  <Globe className="mr-1 h-4 w-4" />
                  Country *
                </Label>
                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 max-h-60">
                    {countries.map((country) => (
                      <SelectItem
                        key={country.code}
                        value={country.code}
                        className="text-white hover:bg-gray-600"
                      >
                        {country.name} ({country.currencySymbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-gray-300">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-300">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="email"
                    className="text-gray-300 flex items-center"
                  >
                    <Mail className="mr-1 h-4 w-4" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-300">
                    Phone {country?.phoneCode} *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder={`${country?.phoneCode || "+1"} 123 456 7890`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address" className="text-gray-300">
                  {addressLabels.address} *
                </Label>
                <Input
                  id="address"
                  {...register("address")}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                {errors.address && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* City, State, Postal Code */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-gray-300">
                    {addressLabels.city} *
                  </Label>
                  <Input
                    id="city"
                    {...register("city")}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  {errors.city && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* State/Province - Show dropdown for supported countries, input for others */}
                <div>
                  <Label htmlFor="state" className="text-gray-300">
                    {addressLabels.state}{" "}
                    {addressLabels.stateRequired ? "*" : ""}
                  </Label>
                  {statesForCountry.length > 0 ? (
                    <Select onValueChange={(value) => setValue("state", value)}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue
                          placeholder={`Select ${addressLabels.state.toLowerCase()}`}
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600 max-h-60">
                        {statesForCountry.map((state) => (
                          <SelectItem
                            key={state.code}
                            value={state.code}
                            className="text-white hover:bg-gray-600"
                          >
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="state"
                      {...register("state")}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder={addressLabels.state}
                    />
                  )}
                  {errors.state && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="postalCode" className="text-gray-300">
                    {addressLabels.postalCode} *
                  </Label>
                  <Input
                    id="postalCode"
                    {...register("postalCode")}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder={
                      selectedCountry === "US"
                        ? "12345"
                        : selectedCountry === "CA"
                          ? "A1A 1A1"
                          : selectedCountry === "GB"
                            ? "SW1A 1AA"
                            : "12345"
                    }
                  />
                  {errors.postalCode && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Currency Notice */}
              {country && (
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3">
                  <div className="flex items-center text-blue-300 text-sm">
                    <Globe className="mr-2 h-4 w-4" />
                    <span>
                      Prices shown in {currency}.
                      {currency !== country.currency && (
                        <span className="text-yellow-300 ml-1">
                          (Your local currency: {country.currency})
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <PaymentElement
                  options={{
                    layout: "tabs",
                    paymentMethodOrder: ["card", "apple_pay", "google_pay"],
                    fields: {
                      billingDetails: {
                        name: "auto",
                        email: "auto",
                        phone: "auto",
                        address: "auto",
                      },
                    },
                  }}
                />
                {message && (
                  <div className="text-red-400 text-sm">{message}</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="bg-gray-800 border-gray-700 sticky top-4">
            <CardHeader>
              <CardTitle className="text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center overflow-hidden">
                        <Image
                          src={
                            item.optionImage ||
                            item.product.image?.[0] ||
                            "/placeholder.svg"
                          }
                          alt={item.product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium line-clamp-2">
                          {item.product.name}
                        </p>
                        {item.optionLabel && (
                          <p className="text-blue-400 text-xs font-medium">
                            {item.optionLabel}
                          </p>
                        )}
                        <p className="text-gray-400 text-xs">
                          {formatCurrency(item.product.price, currency)} each
                        </p>
                        <p className="text-gray-500 text-xs">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-white font-semibold">
                        {formatCurrency(
                          item.product.price * item.quantity,
                          currency
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="bg-gray-700" />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>
                      Subtotal (
                      {items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                      items)
                    </span>
                    <span>{formatCurrency(subtotal, currency)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping to {country?.name}</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  {tax > 0 && (
                    <div className="flex justify-between text-gray-300">
                      <span>Tax</span>
                      <span>{formatCurrency(tax, currency)}</span>
                    </div>
                  )}
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(total, currency)}</span>
                  </div>
                </div>

                {/* Email Notification Info */}
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 mt-4">
                  <div className="flex items-center text-blue-300 text-sm">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Order confirmation will be sent to your email</span>
                  </div>
                </div>

                {/* Agreement Checkbox - add this just above the Place Order Button */}
                <div className="flex items-center space-x-2 mt-4">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="accent-red-600"
                    required
                  />
                  <label htmlFor="agreement" className="text-sm text-gray-300">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="underline text-blue-400"
                      target="_blank"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="underline text-blue-400"
                      target="_blank"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>
                {agreementError && (
                  <p className="text-red-400 text-sm mt-1">{agreementError}</p>
                )}
                {/* Place Order Button */}
                <Button
                  type="submit"
                  disabled={isProcessing || !stripe || !elements}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 mt-6"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Lock className="mr-2 h-4 w-4" />
                      Pay {formatCurrency(total, currency)}
                    </div>
                  )}
                </Button>

                <p className="text-xs text-gray-400 text-center mt-4">
                  🔒 Your payment information is secure and encrypted with
                  Stripe
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
