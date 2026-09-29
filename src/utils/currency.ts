/**
 * Utility functions for Indian Rupees (INR - ₹) formatting and currency conversions
 */

export const formatINR = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0.00';
  }
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export const formatINRSymbol = (amount: number): string => {
  return formatINR(amount);
};

export const CURRENCY_SYMBOL = '₹';
export const CURRENCY_CODE = 'INR';
