// src/pages/api/register.ts
import type { APIRoute } from 'astro';

interface RegistrationData {
  firstName: string;
  lastName: string;
  companyName: string;
  jobTitle: string;
  workEmail: string;
  areaCode: string;
  phoneNumber: string;
  optIn: boolean;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as RegistrationData;
    
    // Validate required fields on server side as well
    const requiredFields: (keyof RegistrationData)[] = [
      'firstName', 'lastName', 'companyName', 'jobTitle', 
      'workEmail', 'areaCode', 'phoneNumber'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(JSON.stringify({ error: `${field} is required` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    if (!body.optIn) {
      return new Response(JSON.stringify({ error: 'Opt-in consent is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(body.workEmail)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Phone number validation
    if (body.phoneNumber.length < 5) {
      return new Response(JSON.stringify({ error: 'Invalid phone number' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Integrate with CRM
    
    console.log('Registration data:', body);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Registration successful' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};