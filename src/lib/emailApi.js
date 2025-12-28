/**
 * Send email notification via serverless function
 * @param {Object} params
 * @param {'contact' | 'referral' | 'career'} params.type - Type of email to send
 * @param {Object} params.data - Form data to include in email
 */
export async function sendEmailNotification({ type, data }) {
  const response = await fetch('/.netlify/functions/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type, data }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to send email' }));
    throw new Error(error.error || 'Failed to send email notification');
  }

  return response.json();
}
