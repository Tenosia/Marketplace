import { useEffect, useState } from 'react';
import AuthPageWrapper from '../components/AuthPageWrapper'
import Input from '../components/inputs/Input'
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';
import GoogleButton from '../components/button/GoogleButton';

interface SigninValidationErrors {
  email?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  refCode?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';

  const location = useLocation();
  const navigate = useNavigate();

  // Helper to parse query params
  const getQueryParam = (key: string): string | null => {
    const params = new URLSearchParams(location.search);
    return params.get(key);
  };

  const fromValue = getQueryParam("from");
  const refCode = getQueryParam("refCode");

    const [formData, setFormData] = useState({
        email: "",
        firstname: "",
        lastname: "",
        username: "",
        refCode: "",
        confirmPassword: "",
        password: "",
    });
  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          firstname: formData.firstname,
          lastname: formData.lastname,
          refCode: formData.refCode || undefined,
        }),
      });
      
      const data = await response.json();
      setLoading(false);
      
      if (data.success) {
        const redirectTo = fromValue || '/login';
        navigate(redirectTo);
      } else {
        const fieldErrors: SigninValidationErrors = {};
        if (data.message?.includes('email')) fieldErrors.email = data.message;
        if (data.message?.includes('username')) fieldErrors.username = data.message;
        setErrors(fieldErrors);
      }
    } catch (error) {
      setLoading(false);
      setErrors({ email: 'An error occurred. Please try again.' });
    }
  };
    const [errors, setErrors] = useState<SigninValidationErrors>({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    refCode: "",
    confirmPassword: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error for that field
  };

  const validate = () => {
    const errors: SigninValidationErrors = {};
    if (!formData.email.trim()) errors.email = "Email is required";

    if (!formData.firstname.trim()) {
      errors.firstname = "First name is required";
    } else if (formData.firstname.length < 3) {
      errors.firstname = "First name must be at least 3 characters";
    } else if (formData.firstname.length > 17) {
      errors.firstname = "First name must be less than 17 characters";
    }

    if (!formData.lastname.trim()) {
      errors.lastname = "Last name is required";
    } else if (formData.lastname.length < 3) {
      errors.lastname = "Last name must be at least 3 characters";
    } else if (formData.lastname.length > 17) {
      errors.lastname = "Last name must be less than 17 characters";
    }

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    } else if (formData.username.length > 17) {
      errors.username = "Username must be less than 17 characters";
    } else if (formData.username.trim().includes(" ")) {
      errors.username = "Username cannot contain spaces";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else {
      const regExp = new RegExp(
        "^(?=.*\\d)(?=.*[!@#$%^&*()+-_,.?'\":{}|<>])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
      );
      if (!regExp.test(formData.password)) {
        errors.password =
          "Password must have at least 8 characters, 1 special character, 1 uppercase letter, 1 number, and 1 lowercase letter";
      }
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  useEffect(() => {
    if (refCode) {
      setFormData((prev) => ({ ...prev, refCode: refCode }));
    }
  }, [refCode]);

  const signupWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      const response = await fetch(`${baseUrl}/auth/register/google`, {
        method: "GET",
        credentials: 'include',
      });
      const data = await response.json();
      setGoogleLoading(false);
      if (data.success && typeof window !== "undefined" && data.url) {
        window.location.replace(data.url);
      }
    } catch (error) {
      setGoogleLoading(false);
      // Error handling can be improved with toast notifications
    }
  };
  return (
    <AuthPageWrapper
        details={{
            head: 'Create an Account',
            // body: 'Join us to start your journey in Web3.',
            body: 'Enter your details and start creating, collecting and selling NFTs.'
        }}
        isLogin={false}
    >
        <form
        autoComplete="off"
        onSubmit={signup}
        className="flex flex-col gap-3 w-full"
      >
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          error={errors.email}
          additionalStyles="border-transparent"
        />
        <Input
          type="text"
          placeholder="First Name"
          value={formData.firstname}
          onChange={(e) => handleInputChange("firstname", e.target.value)}
          error={errors.firstname}
          additionalStyles="border-transparent"
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={(e) => handleInputChange("lastname", e.target.value)}
          error={errors.lastname}
          additionalStyles="border-transparent"
        />
        <Input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          error={errors.username}
          additionalStyles="border-transparent"
        />
        <Input
          type="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          error={errors.password}
          additionalStyles="border-transparent"
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          additionalStyles="border-transparent"
        />
        <Input
          type="text"
          placeholder="Refferal Code (Optional)"
          value={
            formData.refCode === null ||
            formData.refCode === undefined ||
            refCode === "null"
              ? ""
              : formData.refCode
          }
          onChange={(e) => handleInputChange("refCode", e.target.value)}
          error={errors.refCode}
          additionalStyles="border-transparent"
          disabled={
            refCode !== null &&
            refCode !== "null" &&
            refCode !== undefined &&
            refCode !== ""
              ? true
              : false
          }
        />
        <Button
          loading={loading}
          disabled={loading}
          sxclass={"mt-4"}
          variant="primary"
          size="lg"
        >
          {loading ? "Processing" : "Create Account"}
        </Button>
      </form>
      <div
        className={
          "py-8 text-sm leading-[150%] text-center tracking-[-0.02em] text-muted font-bold"
        }
      >
        Or
      </div>
      <GoogleButton onClick={signupWithGoogle} type="button">
        {googleLoading ? "a moment please..." : "Sign up with Google"}
      </GoogleButton>
    </AuthPageWrapper>
  )
}

export default SignupPage
