/**
 * Validates a URL to ensure it uses a safe protocol (http or https) or is a relative/mailto link.
 * Prevents execution of malicious schemes like `javascript:`, `data:`, or `vbscript:`.
 *
 * @param url - The URL string to validate
 * @returns The original URL if safe, or null if malicious/invalid
 */
export function validateSafeUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  
  const trimmedUrl = url.trim();
  
  if (trimmedUrl === "") return null;

  try {
    // If it's a relative URL or mailto, it's generally safe for our use-cases
    if (trimmedUrl.startsWith("/") || trimmedUrl.startsWith("#") || trimmedUrl.startsWith("mailto:")) {
      return trimmedUrl;
    }

    const parsedUrl = new URL(trimmedUrl);
    
    // Only allow http and https protocols
    if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
      return parsedUrl.toString();
    }
    
    // If it's any other protocol (javascript:, data:, etc.), reject it
    return null;
  } catch {
    // If URL parsing fails, reject it
    return null;
  }
}
