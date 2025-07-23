import { USER_FALLBACK_ICON } from "@/constants/images";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const onImageError = (e) => {
  e.target.src = USER_FALLBACK_ICON
}

export const formatNumber = (number, locale = 'en-US') => {
  if (isNaN(number)) return '0';
  return Number(number).toLocaleString(locale);
};

export const kFormatter = (num) => {
  if (Math.abs(num) >= 1.0e+9) {
    return (num / 1.0e+9).toFixed(1).replace(/\.0$/, '') + "B";
  }
  if (Math.abs(num) >= 1.0e+6) {
    return (num / 1.0e+6).toFixed(1).replace(/\.0$/, '') + "M";
  }
  if (Math.abs(num) >= 1.0e+3) {
    return (num / 1.0e+3).toFixed(1).replace(/\.0$/, '') + "K";
  }
  return num.toString();
}
