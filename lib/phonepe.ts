
import { Order } from '../types';

// Configuration
export const PHONEPE_MERCHANT_ID = "YOUR_MERCHANT_ID"; // Replace with real ID
export const PHONEPE_SALT_KEY = "YOUR_SALT_KEY"; // Replace with real Key

// For a serverless app, we can use UPI Intent Links for mobile payments
export const generateUPIIntentLink = (order: Order) => {
  const pa = "your-upi-id@ybl"; // Replace with your Merchant UPI ID
  const pn = "Balajee Traders";
  const am = order.total.toString();
  const tr = order.id; // Transaction Ref
  const tn = `Order ${order.id}`; // Transaction Note
  
  // Construct UPI URL
  // encodeURIComponent is crucial
  return `upi://pay?pa=${pa}&pn=${encodeURIComponent(pn)}&am=${am}&tr=${tr}&tn=${encodeURIComponent(tn)}&cu=INR`;
};

// Simulation helper
export const simulatePhonePePayment = (amount: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate 90% success rate
      resolve(true); 
    }, 3000);
  });
};
