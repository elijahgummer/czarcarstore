export interface Country {
  code: string
  name: string
  currency: string
  currencySymbol: string
  phoneCode: string
  addressFormat: "US" | "UK" | "EU" | "CA" | "AU" | "INTL"
}

export const countries: Country[] = [
  // North America
  { code: "US", name: "United States", currency: "USD", currencySymbol: "$", phoneCode: "+1", addressFormat: "US" },
  { code: "CA", name: "Canada", currency: "CAD", currencySymbol: "C$", phoneCode: "+1", addressFormat: "CA" },
  { code: "MX", name: "Mexico", currency: "MXN", currencySymbol: "$", phoneCode: "+52", addressFormat: "INTL" },

  // Europe
  { code: "GB", name: "United Kingdom", currency: "GBP", currencySymbol: "£", phoneCode: "+44", addressFormat: "UK" },
  { code: "DE", name: "Germany", currency: "EUR", currencySymbol: "€", phoneCode: "+49", addressFormat: "EU" },
  { code: "FR", name: "France", currency: "EUR", currencySymbol: "€", phoneCode: "+33", addressFormat: "EU" },
  { code: "IT", name: "Italy", currency: "EUR", currencySymbol: "€", phoneCode: "+39", addressFormat: "EU" },
  { code: "ES", name: "Spain", currency: "EUR", currencySymbol: "€", phoneCode: "+34", addressFormat: "EU" },
  { code: "NL", name: "Netherlands", currency: "EUR", currencySymbol: "€", phoneCode: "+31", addressFormat: "EU" },
  { code: "BE", name: "Belgium", currency: "EUR", currencySymbol: "€", phoneCode: "+32", addressFormat: "EU" },
  { code: "CH", name: "Switzerland", currency: "CHF", currencySymbol: "CHF", phoneCode: "+41", addressFormat: "EU" },
  { code: "AT", name: "Austria", currency: "EUR", currencySymbol: "€", phoneCode: "+43", addressFormat: "EU" },
  { code: "SE", name: "Sweden", currency: "SEK", currencySymbol: "kr", phoneCode: "+46", addressFormat: "EU" },
  { code: "NO", name: "Norway", currency: "NOK", currencySymbol: "kr", phoneCode: "+47", addressFormat: "EU" },
  { code: "DK", name: "Denmark", currency: "DKK", currencySymbol: "kr", phoneCode: "+45", addressFormat: "EU" },
  { code: "FI", name: "Finland", currency: "EUR", currencySymbol: "€", phoneCode: "+358", addressFormat: "EU" },
  { code: "PL", name: "Poland", currency: "PLN", currencySymbol: "zł", phoneCode: "+48", addressFormat: "EU" },
  { code: "CZ", name: "Czech Republic", currency: "CZK", currencySymbol: "Kč", phoneCode: "+420", addressFormat: "EU" },
  { code: "PT", name: "Portugal", currency: "EUR", currencySymbol: "€", phoneCode: "+351", addressFormat: "EU" },
  { code: "IE", name: "Ireland", currency: "EUR", currencySymbol: "€", phoneCode: "+353", addressFormat: "EU" },

  // Asia Pacific
  { code: "AU", name: "Australia", currency: "AUD", currencySymbol: "A$", phoneCode: "+61", addressFormat: "AU" },
  { code: "NZ", name: "New Zealand", currency: "NZD", currencySymbol: "NZ$", phoneCode: "+64", addressFormat: "AU" },
  { code: "JP", name: "Japan", currency: "JPY", currencySymbol: "¥", phoneCode: "+81", addressFormat: "INTL" },
  { code: "KR", name: "South Korea", currency: "KRW", currencySymbol: "₩", phoneCode: "+82", addressFormat: "INTL" },
  { code: "SG", name: "Singapore", currency: "SGD", currencySymbol: "S$", phoneCode: "+65", addressFormat: "INTL" },
  { code: "HK", name: "Hong Kong", currency: "HKD", currencySymbol: "HK$", phoneCode: "+852", addressFormat: "INTL" },
  { code: "MY", name: "Malaysia", currency: "MYR", currencySymbol: "RM", phoneCode: "+60", addressFormat: "INTL" },
  { code: "TH", name: "Thailand", currency: "THB", currencySymbol: "฿", phoneCode: "+66", addressFormat: "INTL" },
  { code: "IN", name: "India", currency: "INR", currencySymbol: "₹", phoneCode: "+91", addressFormat: "INTL" },
  { code: "CN", name: "China", currency: "CNY", currencySymbol: "¥", phoneCode: "+86", addressFormat: "INTL" },

  // Middle East & Africa
  {
    code: "AE",
    name: "United Arab Emirates",
    currency: "AED",
    currencySymbol: "د.إ",
    phoneCode: "+971",
    addressFormat: "INTL",
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    currency: "SAR",
    currencySymbol: "ر.س",
    phoneCode: "+966",
    addressFormat: "INTL",
  },
  { code: "IL", name: "Israel", currency: "ILS", currencySymbol: "₪", phoneCode: "+972", addressFormat: "INTL" },
  { code: "ZA", name: "South Africa", currency: "ZAR", currencySymbol: "R", phoneCode: "+27", addressFormat: "INTL" },

  // South America
  { code: "BR", name: "Brazil", currency: "BRL", currencySymbol: "R$", phoneCode: "+55", addressFormat: "INTL" },
  { code: "AR", name: "Argentina", currency: "ARS", currencySymbol: "$", phoneCode: "+54", addressFormat: "INTL" },
  { code: "CL", name: "Chile", currency: "CLP", currencySymbol: "$", phoneCode: "+56", addressFormat: "INTL" },
  { code: "CO", name: "Colombia", currency: "COP", currencySymbol: "$", phoneCode: "+57", addressFormat: "INTL" },

  // Additional Popular Countries
  { code: "RU", name: "Russia", currency: "RUB", currencySymbol: "₽", phoneCode: "+7", addressFormat: "INTL" },
  { code: "TR", name: "Turkey", currency: "TRY", currencySymbol: "₺", phoneCode: "+90", addressFormat: "INTL" },
  { code: "EG", name: "Egypt", currency: "EGP", currencySymbol: "ج.م", phoneCode: "+20", addressFormat: "INTL" },
  { code: "NG", name: "Nigeria", currency: "NGN", currencySymbol: "₦", phoneCode: "+234", addressFormat: "INTL" },
  { code: "KE", name: "Kenya", currency: "KES", currencySymbol: "KSh", phoneCode: "+254", addressFormat: "INTL" },
  { code: "GH", name: "Ghana", currency: "GHS", currencySymbol: "₵", phoneCode: "+233", addressFormat: "INTL" },
]

export const usStates = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
]

export const canadianProvinces = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "YT", name: "Yukon" },
]

export const ukCounties = [
  { code: "ENG", name: "England" },
  { code: "SCT", name: "Scotland" },
  { code: "WLS", name: "Wales" },
  { code: "NIR", name: "Northern Ireland" },
]

export const australianStates = [
  { code: "NSW", name: "New South Wales" },
  { code: "VIC", name: "Victoria" },
  { code: "QLD", name: "Queensland" },
  { code: "WA", name: "Western Australia" },
  { code: "SA", name: "South Australia" },
  { code: "TAS", name: "Tasmania" },
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "NT", name: "Northern Territory" },
]

export function getCountryByCode(code: string): Country | undefined {
  return countries.find((country) => country.code === code)
}

export function getStatesForCountry(countryCode: string) {
  switch (countryCode) {
    case "US":
      return usStates
    case "CA":
      return canadianProvinces
    case "GB":
      return ukCounties
    case "AU":
      return australianStates
    default:
      return []
  }
}

export function getAddressLabels(countryCode: string) {
  const country = getCountryByCode(countryCode)
  if (!country) return getDefaultAddressLabels()

  switch (country.addressFormat) {
    case "US":
      return {
        address: "Street Address",
        city: "City",
        state: "State",
        postalCode: "ZIP Code",
        stateRequired: true,
      }
    case "CA":
      return {
        address: "Street Address",
        city: "City",
        state: "Province",
        postalCode: "Postal Code",
        stateRequired: true,
      }
    case "UK":
      return {
        address: "Address Line 1",
        city: "City/Town",
        state: "County",
        postalCode: "Postcode",
        stateRequired: false,
      }
    case "AU":
      return {
        address: "Street Address",
        city: "Suburb/City",
        state: "State/Territory",
        postalCode: "Postcode",
        stateRequired: true,
      }
    case "EU":
      return {
        address: "Street Address",
        city: "City",
        state: "State/Region",
        postalCode: "Postal Code",
        stateRequired: false,
      }
    default:
      return getDefaultAddressLabels()
  }
}

function getDefaultAddressLabels() {
  return {
    address: "Street Address",
    city: "City",
    state: "State/Province/Region",
    postalCode: "Postal/ZIP Code",
    stateRequired: false,
  }
}

export function formatCurrency(amount: number, currencyCode: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(amount)
  } catch (error) {
    // Fallback for unsupported currencies
    const country = countries.find((c) => c.currency === currencyCode)
    const symbol = country?.currencySymbol || currencyCode
    return `${symbol}${amount.toFixed(2)}`
  }
}

// Stripe supported currencies for international payments
export const stripeSupportedCurrencies = [
  "USD",
  "EUR",
  "GBP",
  "CAD",
  "AUD",
  "JPY",
  "CHF",
  "SEK",
  "NOK",
  "DKK",
  "PLN",
  "CZK",
  "HUF",
  "BGN",
  "RON",
  "HRK",
  "SGD",
  "HKD",
  "MYR",
  "THB",
  "INR",
  "KRW",
  "BRL",
  "MXN",
  "AED",
  "SAR",
  "ILS",
  "ZAR",
  "TRY",
  "RUB",
]
