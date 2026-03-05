# Ecoyaan Frontend Engineering Assignment - Checkout Flow

This project is a simplified, high-performance Checkout Flow built for the Ecoyaan interview process. It demonstrates proficiency in Next.js Server-Side Rendering (SSR), global state management, and modern UI/UX principles using Material UI.

## 🚀 Live Demo

[Click here to view the deployed application](#)

### Tech Stack

- **Framework**: Next.js 14+ (App Router)

- **Styling**: Material UI (MUI)

- **State Management**: Zustand

- **Form Handling**: React Hook Form

- **Validation**: Zod

- **Language**: TypeScript

### Architectural Choices

1. **Hybrid Rendering (SSR + Client Hydration)**

   The initial cart data is fetched on the server in the root `page.tsx` component. This ensures the data is available immediately on page load, fulfilling the SSR requirement. The data is then hydrated into a global Zustand store to allow for smooth, client-side transitions between checkout steps without additional network requests.

2. **State Management with Zustand**

   I chose Zustand over Redux or the Context API for its minimalist footprint and ease of use. It allows for persisting cart items and shipping details across the multi-step flow without the "provider-hell" or boilerplate typically associated with other libraries.

3. **High-Performance Forms**

   The shipping form is powered by React Hook Form and Zod. This combination provides:
   - **Non-controlled inputs:** Reducing unnecessary re-renders for a snappier UI.
   - **Schema-based validation:** Ensuring strict adherence to data formats (10-digit phone numbers, valid emails, etc.) before allowing the user to proceed.

## Features

- **Step-based Navigation:** A clean MUI Stepper guiding users through Cart, Shipping, and Payment.
- **Dynamic Calculations:** Automatic updates of subtotal and grand total based on the SSR mock data.
- **Simulated Payment:** A realistic payment gateway simulation with loading states and a success confirmation page.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop views using MUI's Grid system.

## Local Setup

1.  **Clone the repository:**

```bash
git clone https://github.com/thegoddo/checkout_assignment
cd checkout_assignment
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:
Navigate to <http://localhost:3000>.

Project Structure

```text
/src
/app # Next.js App Router (SSR Data Fetching)
/components # Modular UI & Checkout Step components
/store # Zustand State Management
/lib # Zod Validation Schemas & Utilities
/theme # MUI Theme configuration
```
