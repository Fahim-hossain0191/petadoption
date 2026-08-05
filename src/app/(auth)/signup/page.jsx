// "use client";

// import React from "react";
// import { Card } from "@heroui/react";
// import {
//   Button,
//   Description,
//   FieldError,
//   Form,
//   Input,
//   Label,
//   TextField,
// } from "@heroui/react";
// import { FaGoogle } from "react-icons/fa";
// import { authClient } from "@/lib/auth-client";
// import { redirect } from "next/navigation";
// import { Check } from "@gravity-ui/icons";

// const SignUpPage = () => {
//   // const onSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const formData = new FormData(e.currentTarget);
//   //   const user = Object.fromEntries(formData.entries());

//   //   const { data, error } = await authClient.signUp.email({
//   //     email: user.email,
//   //     password: user.password,
//   //     name: user.name,
//   //     image: user.image,
//   //   });

//   //   if (data) {
//   //     redirect("/");
//   //   }

//   //   if (error) {
//   //     alert(error.message);
//   //   }
//   // };

//   const onSubmit = async (e) => {
//   e.preventDefault();
//   setErrorMessage("");

//   const formData = new FormData(e.currentTarget);
//   const user = Object.fromEntries(formData.entries());

//   // Password Validation
//   // if (user.password.length < 6) {
//   //   setErrorMessage("Password must be at least 6 characters.");
//   //   return;
//   // }

//   // if (!/[A-Z]/.test(user.password)) {
//   //   setErrorMessage("Password must contain at least one uppercase letter.");
//   //   return;
//   // }

//   // if (!/[a-z]/.test(user.password)) {
//   //   setErrorMessage("Password must contain at least one lowercase letter.");
//   //   return;
//   // }
//   validate={(value) => {
//   if (value.length < 6) {
//     return "Password must be at least 6 characters";
//   }

//   if (!/[A-Z]/.test(value)) {
//     return "Password must contain an uppercase letter";
//   }

//   if (!/[a-z]/.test(value)) {
//     return "Password must contain a lowercase letter";
//   }

//   return null;
// }}

//   if (user.password !== user.confirmPassword) {
//     setErrorMessage("Password and Confirm Password do not match.");
//     return;
//   }

//   const { data, error } = await authClient.signUp.email({
//     email: user.email,
//     password: user.password,
//     name: user.name,
//     image: user.image,
//   });

//   if (data) {
//     redirect("/login"); // or "/"
//   }

//   if (error) {
//     setErrorMessage(error.message || "Registration failed.");
//   }
// };
//   const handleGoogleSignIn = async () => {
//     await authClient.signIn.social({
//       provider: "google",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF0DD] flex items-center justify-center px-6 py-10">
//       <div className="grid lg:grid-cols-2 max-w-6xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

//         {/* Left Side */}
//         <div className="hidden lg:flex flex-col justify-center p-16 text-white bg-[#99CBB8]">
//           <h1 className="text-5xl font-bold leading-tight">
//             Welcome to
//             <br />
//             <span className="text-cyan-400">Wanderlust</span>
//           </h1>

//           <p className="mt-6 text-gray-300 text-lg leading-8">
//             Join thousands of travelers discovering breathtaking destinations,
//             creating unforgettable memories, and sharing adventures around the
//             world.
//           </p>

//           <div className="space-y-5 mt-12">
//             <div className="flex items-center gap-3">
//               <Check className="text-cyan-400" />
//               <span>Book destinations instantly</span>
//             </div>

//             <div className="flex items-center gap-3">
//               <Check className="text-cyan-400" />
//               <span>Save your favorite places</span>
//             </div>

//             <div className="flex items-center gap-3">
//               <Check className="text-cyan-400" />
//               <span>Secure & fast authentication</span>
//             </div>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="flex justify-center items-center p-8 md:p-12 bg-white">
//           <Card className="shadow-none w-full max-w-md border-none">

//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-slate-800">
//                 Create Account
//               </h2>

//               <p className="text-gray-500 mt-2">
//                 Start your next adventure today.
//               </p>
//             </div>

//        <div className="">

//             <Form
//               className="flex flex-col gap-5"
//               render={(props) => <form {...props} />}
//               onSubmit={onSubmit}
//             >
//               <TextField isRequired name="name">
//                 <Label>Name</Label>
//                 <Input
//                   className="rounded-xl"
//                   placeholder="John Doe"
//                 />
//                 <FieldError />
//               </TextField>

//               <TextField isRequired name="email" type="email">
//                 <Label>Email</Label>
//                 <Input
//                   className="rounded-xl"
//                   placeholder="john@example.com"
//                 />
//                 <FieldError />
//               </TextField>

//               <TextField isRequired name="image" type="url">
//                 <Label>Profile Image</Label>
//                 <Input
//                   className="rounded-xl"
//                   placeholder="https://example.com/photo.jpg"
//                 />
//                 <FieldError />
//               </TextField>

//               <TextField
//                 isRequired
//                 minLength={8}
//                 name="password"
//                 type="password"
//                 validate={(value) => {
//                   if (value.length < 8) {
//                     return "Password must be at least 8 characters";
//                   }

//                   if (!/[A-Z]/.test(value)) {
//                     return "Password must contain one uppercase letter";
//                   }

//                   if (!/[0-9]/.test(value)) {
//                     return "Password must contain one number";
//                   }

//                   return null;
//                 }}
//               >
//                 <Label>Password</Label>

//                 <Input
//                   className="rounded-xl"
//                   placeholder="********"
//                 />

//                 <Description>
//                   Minimum 8 characters, 1 uppercase & 1 number.
//                 </Description>

//                 <FieldError />
//               </TextField>
           
//               <TextField
//   isRequired
//   name="confirmPassword"
//   type="password"
// >
//   <Label>Confirm Password</Label>

//   <Input
//     className="rounded-xl"
//     placeholder="Confirm Password"
//   />

//   <FieldError />
// </TextField>
           

//               <Button
//                 type="submit"
//                 className="w-full h-12 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold mt-2"
//               >
//                 Create Account
//               </Button>
//             </Form>
//        </div>

//             <div className="flex items-center my-6">
//               <div className="flex-1 h-px bg-gray-300"></div>

//               <span className="px-4 text-gray-500 text-sm">
//                 OR
//               </span>

//               <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             <Button
//               onClick={handleGoogleSignIn}
//               variant="bordered"
//               className="w-full h-12 rounded-xl border-gray-300 hover:bg-gray-100"
//             >
//               <FaGoogle className="text-red-500 text-lg" />
//               Continue with Google
//             </Button>

//             <p className="text-center text-sm text-gray-500 mt-8">
//               Already have an account?
//               <span className="text-cyan-600 font-semibold cursor-pointer ml-1 hover:underline">
//                 Sign In
//               </span>
//             </p>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@heroui/react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Check } from "@gravity-ui/icons";

const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (user.password !== user.confirmPassword) {
      setErrorMessage("Password and Confirm Password do not match.");
      setLoading(false);
      return;
    }

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    if (data) {
      redirect("/login");
    }

    if (error) {
      setErrorMessage(error.message || "Registration failed.");
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF0DD] flex items-center justify-center px-6 py-10">
      <div className="grid lg:grid-cols-2 max-w-6xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center p-16 text-white bg-[#99CBB8]">

          <h1 className="text-5xl font-bold leading-tight">
            Welcome to
            <br />
            <span className="text-cyan-500">
              Wanderlust
            </span>
          </h1>

          <p className="mt-6 text-gray-700 text-lg leading-8">
            Join thousands of travelers discovering breathtaking destinations,
            creating unforgettable memories, and sharing adventures around the
            world.
          </p>

          <div className="space-y-5 mt-12">

            <div className="flex items-center gap-3">
              <Check className="text-cyan-500" />
              <span>Book destinations instantly</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="text-cyan-500" />
              <span>Save your favorite places</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="text-cyan-500" />
              <span>Secure & fast authentication</span>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center items-center p-8 md:p-12 bg-white">

          <Card className="shadow-none w-full max-w-md border-none">

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800">
                Create Account
              </h2>

              <p className="text-gray-500 mt-2">
                Start your next adventure today.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-5 rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-red-700">
                {errorMessage}
              </div>
            )}

            <Form
              className="flex flex-col gap-5"
              render={(props) => <form {...props} />}
              onSubmit={onSubmit}
            >

              <TextField isRequired name="name">
                <Label>Name</Label>
                <Input
                  className="rounded-xl"
                  placeholder="John Doe"
                />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="email"
                type="email"
              >
                <Label>Email</Label>

                <Input
                  className="rounded-xl"
                  placeholder="john@example.com"
                />

                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="image"
                type="url"
              >
                <Label>Photo URL</Label>

                <Input
                  className="rounded-xl"
                  placeholder="https://example.com/photo.jpg"
                />

                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="password"
                type="password"
                validate={(value) => {

                  if (value.length < 6) {
                    return "Password must be at least 6 characters";
                  }

                  if (!/[A-Z]/.test(value)) {
                    return "Password must contain one uppercase letter";
                  }

                  if (!/[a-z]/.test(value)) {
                    return "Password must contain one lowercase letter";
                  }

                  return null;
                }}
              >
                <Label>Password</Label>

                <Input
                  className="rounded-xl"
                  placeholder="Enter Password"
                />

                <Description>
                  Minimum 6 characters, one uppercase & one lowercase letter.
                </Description>

                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="confirmPassword"
                type="password"
              >
                <Label>Confirm Password</Label>

                <Input
                  className="rounded-xl"
                  placeholder="Confirm Password"
                />

                <FieldError />
              </TextField>
                            <Button
                type="submit"
                isDisabled={loading}
                className="w-full h-12 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold mt-2 transition-all duration-300"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </Form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300"></div>

              <span className="px-4 text-gray-500 text-sm font-medium">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Sign In */}
            <Button
              onClick={handleGoogleSignIn}
              variant="bordered"
              className="w-full h-12 rounded-xl border-gray-300 hover:bg-gray-100"
            >
              <FaGoogle className="text-red-500 text-lg" />
              Continue with Google
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-500 mt-8">
              Already have an account?
              <Link
                href="/login"
                className="text-cyan-600 font-semibold ml-1 hover:underline"
              >
                Sign In
              </Link>
            </p>

          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;