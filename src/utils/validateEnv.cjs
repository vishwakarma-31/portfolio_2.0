/**
 * Validates required environment variables for both frontend and backend
 * Throws descriptive errors if any required variable is missing
 */

/**
 * Validates environment variables
 * @throws {Error} If any required environment variables are missing
 */
function validateEnv() {
  const required = {
    frontend: ['VITE_API_URL'],
    backend: ['PORT', 'FRONTEND_URL', 'EMAIL_USER', 'EMAIL_PASS', 'RECIPIENT_EMAIL']
  };

  // Check backend environment variables
  const missingBackend = [];
  for (const variable of required.backend) {
    if (!process.env[variable]) {
      missingBackend.push(variable);
    }
  }

  // Throw errors with descriptive messages if any required variables are missing
  if (missingBackend.length > 0) {
    throw new Error(
      `Missing required backend environment variables: ${missingBackend.join(', ')}. ` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }

  // Log warnings for optional variables if they're missing
  const optional = {
    backend: ['SLACK_WEBHOOK_URL']
  };

  const missingOptionalBackend = [];
  for (const variable of optional.backend) {
    if (!process.env[variable]) {
      missingOptionalBackend.push(variable);
    }
  }

  if (missingOptionalBackend.length > 0) {
    console.warn(
      `Missing optional backend environment variables: ${missingOptionalBackend.join(', ')}. ` +
      'Some features may not work as expected.'
    );
  }

  console.log('✅ All required environment variables are present');
}

module.exports = { validateEnv };