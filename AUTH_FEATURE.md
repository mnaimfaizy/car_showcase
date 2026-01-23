# Authentication Feature

## Overview

The Car Showcase application now includes a modern login/signup modal interface. This is a **UI-only implementation** and does not currently connect to any backend authentication service.

## Features

### 🔐 Dual Mode Interface

- **Login Mode**: Email and password authentication
- **Signup Mode**: Full registration with name, email, password, and confirmation

### ✨ UI Components

#### Login Form

- Email address input
- Password input
- "Remember me" checkbox
- "Forgot password?" link
- Social login buttons (Google, GitHub)

#### Signup Form

- Full name input
- Email address input
- Password input
- Confirm password input
- Social signup buttons (Google, GitHub)

### ✅ Client-Side Validation

The modal includes comprehensive form validation:

- **Email Validation**: Checks for valid email format
- **Password Requirements**: Minimum 6 characters
- **Password Confirmation**: Ensures passwords match during signup
- **Required Fields**: All fields are validated before submission
- **Real-time Feedback**: Error messages appear below fields

### 🎨 Design Features

- **HeadlessUI Dialog**: Smooth transitions and accessibility
- **Responsive Design**: Works on all screen sizes
- **Tailwind Styling**: Matches existing design system
- **Focus States**: Clear visual feedback for keyboard navigation
- **Error States**: Red borders and messages for invalid inputs

## Usage

### Opening the Modal

The auth modal is triggered by clicking the "Sign In" button in the navigation bar.

### Switching Between Modes

Users can toggle between login and signup modes using the link at the bottom of the modal:

- "Don't have an account? Sign up"
- "Already have an account? Sign in"

### Form Submission

Currently, form submissions:

1. Validate all inputs
2. Log form data to console
3. Show success alert
4. Close the modal

**Note**: No actual authentication is performed. This is a frontend-only implementation.

## File Structure

```
components/
├── AuthModal.tsx       # Main authentication modal component
└── Navbar.tsx          # Updated to include modal trigger
```

## Implementation Details

### State Management

The modal uses React `useState` for:

- Form data (email, password, name, confirmPassword)
- Validation errors
- Login/signup mode toggle
- Modal open/close state

### Validation Logic

```typescript
// Email validation
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Password validation
- Minimum 6 characters
- Required field check

// Signup-specific validation
- Name required
- Passwords must match
```

## Future Enhancements

### Backend Integration

To make this functional, you'll need to:

1. **Choose an Authentication Provider**
   - Supabase (recommended for Next.js)
   - Firebase Authentication
   - Auth0
   - NextAuth.js
   - Clerk

2. **Update Form Submission**

   ```tsx
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

     if (isLogin) {
       // Call login API
       const { data, error } = await supabase.auth.signInWithPassword({
         email: formData.email,
         password: formData.password,
       });
     } else {
       // Call signup API
       const { data, error } = await supabase.auth.signUp({
         email: formData.email,
         password: formData.password,
         options: {
           data: {
             name: formData.name,
           },
         },
       });
     }
   };
   ```

3. **Add Social OAuth**

   ```tsx
   const handleGoogleLogin = async () => {
     await supabase.auth.signInWithOAuth({
       provider: "google",
     });
   };
   ```

4. **Implement User State Management**
   - Create user context
   - Store authentication tokens
   - Handle session management
   - Implement logout functionality

5. **Protected Routes**
   - Add authentication checks
   - Redirect unauthenticated users
   - Show user-specific content

### Recommended: Supabase Integration

Supabase is recommended because:

- ✅ Free tier available
- ✅ Built-in authentication
- ✅ OAuth providers included
- ✅ PostgreSQL database
- ✅ Real-time subscriptions
- ✅ Excellent Next.js integration

**Quick Setup:**

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

```tsx
// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
```

## Customization

### Styling

The modal uses Tailwind classes and can be customized by modifying:

- Colors: Change `primary-blue` to your brand color
- Borders: Adjust `rounded-lg`, `rounded-2xl` values
- Spacing: Modify padding and margin classes
- Fonts: Update font weights and sizes

### Validation Rules

Modify validation in the `handleSubmit` function:

- Change password minimum length
- Add password complexity requirements
- Add additional field validations

### Social Providers

Currently shows Google and GitHub. To add more:

```tsx
<button className="social-button">{/* Add Facebook, Twitter, etc. */}</button>
```

## Accessibility

The modal includes:

- ✅ Keyboard navigation support
- ✅ Focus trap within modal
- ✅ ESC key to close
- ✅ ARIA labels and roles
- ✅ Screen reader friendly
- ✅ Proper form labels

## Testing

### Manual Testing Checklist

- [ ] Modal opens on "Sign In" click
- [ ] Modal closes on close button click
- [ ] Modal closes on outside click
- [ ] Form validation works for all fields
- [ ] Toggle between login/signup works
- [ ] Social buttons are clickable (no action yet)
- [ ] Form clears on modal close
- [ ] Errors clear when typing
- [ ] Submit shows success message
- [ ] Responsive on mobile devices

### Test Scenarios

1. **Empty Form Submission**: Should show all required field errors
2. **Invalid Email**: Should show email format error
3. **Short Password**: Should show minimum length error
4. **Password Mismatch**: Should show passwords don't match error
5. **Valid Submission**: Should show success alert

## Security Considerations

When implementing backend:

⚠️ **Important Security Practices:**

- Never store passwords in plain text
- Use HTTPS in production
- Implement rate limiting
- Add CSRF protection
- Use secure session management
- Implement password reset flow
- Add email verification
- Use environment variables for secrets
- Implement 2FA (optional but recommended)

## Resources

- [HeadlessUI Dialog Documentation](https://headlessui.com/react/dialog)
- [Supabase Authentication](https://supabase.com/docs/guides/auth)
- [NextAuth.js](https://next-auth.js.org/)
- [Auth0](https://auth0.com/)
- [Clerk](https://clerk.com/)

---

**Status**: ✅ UI Complete | ⏳ Backend Pending  
**Last Updated**: January 23, 2026
