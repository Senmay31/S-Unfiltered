import * as jwt from 'jsonwebtoken';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTczOTcwOGRjNWIzN2Q2MDFhMGQzY2YiLCJlbWFpbCI6Ik9sdXdhc2V1bmFkbWluQHNtY2Jsb2cuY29tIiwiaWF0IjoxNzY5MjI4NTg4LCJleHAiOjE3NjkyMjk0ODh9.YWnL71oKshlvGQZF_O-HDSGiJtQOrgH7oULzYCR4vWo'; // your Bearer token, without 'Bearer '
const secret = process.env.JWT_SECRET || 'your_default_secret';

try {
  const decoded = jwt.verify(token, secret);
  console.log('✅ Token is valid!');
  console.log('Decoded payload:', decoded);
} catch (err) {
  console.error('❌ Token verification failed:', err.message);
}
