/**
 * Validates required environment variables for frontend
 * Throws descriptive errors if any required variable is missing
 */
export function validateEnv(): void {
  const required = ['VITE_API_URL'];

  // Check frontend environment variables
  const missingFrontend: string[] = [];
  for (const variable of required) {
    if (!import.meta.env[variable]) {
      missingFrontend.push(variable);
    }
  }

  // Throw errors with descriptive messages if any required variables are missing
  if (missingFrontend.length > 0) {
    throw new Error(
      `Missing required frontend environment variables: ${missingFrontend.join(', ')}. ` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }

  // Log warnings for optional variables if they're missing
  const optional = [];

  const missingOptionalFrontend: string[] = [];
  for (const variable of optional) {
    if (!import.meta.env[variable]) {
      missingOptionalFrontend.push(variable);
    }
  }

  if (missingOptionalFrontend.length > 0) {
    console.warn(
      `Missing optional frontend environment variables: ${missingOptionalFrontend.join(', ')}. ` +
      'Some features may not work as expected.'
    );
  }

  console.log('✅ All required environment variables are present');
}