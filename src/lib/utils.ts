import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with clsx
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Converts Sanity block content to HTML string
 * @param rawDescription - Sanity block content array
 * @returns HTML string with paragraph tags
 */
export function convertSanityBlockToHtml(
  rawDescription: Array<{ children: Array<{ text: string }> }> | undefined
): string {
  if (!rawDescription || !Array.isArray(rawDescription)) {
    return "";
  }

  return rawDescription
    .map((block) => {
      const text = block.children
        .map((child) => child.text)
        .join("");
      return `<p class="mt-4">${text}</p>`;
    })
    .join("");
}

/**
 * Safely formats phone number for tel: links
 * @param phone - Phone number string
 * @returns Formatted phone number
 */
export function formatPhoneForLink(phone: string): string {
  return phone.replace(/\s+/g, "");
}

/**
 * Checks if code is running in browser environment
 * @returns True if in browser, false otherwise
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Safely handles navigation to external links
 * @param url - URL to navigate to
 */
export function navigateToExternal(url: string): void {
  if (isBrowser()) {
    window.location.href = url;
  }
}
