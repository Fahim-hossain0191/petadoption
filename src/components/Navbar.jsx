// "use client";

// import { authClient } from "@/lib/auth-client";
// import {
//   Avatar,
//   Button,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
// } from "@heroui/react";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const Navbar = () => {
//   const { data: session } = authClient.useSession();

//   const user = session?.user;

//   const handleSignOut = async () => {
//     await authClient.signOut();
//   };

//   return (
//     <nav className="bg-[#649EC4] shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-3">
//           <Image
//             src="/assets/Logo.png"
//             alt="Pet Adopt"
//             width={60}
//             height={60}
//           />

//           <h1 className="text-2xl font-bold text-[#FFF0DD]">
//             Pet<span className="text-[#FFB1A0]">Adopt</span>
//           </h1>
//         </Link>

//         {/* Navigation */}
//         <ul className="hidden md:flex items-center gap-8 text-[#FFF0DD] font-medium">
//           <li>
//             <Link href="/" className="hover:text-[#FFB1A0] transition">
//               Home
//             </Link>
//           </li>

//           <li>
//             <Link href="/pets" className="hover:text-[#FFB1A0] transition">
//               All Pets
//             </Link>
//           </li>

//           {user && (
//             <>
//               <li>
//                 <Link
//                   href="/my-requests"
//                   className="hover:text-[#FFB1A0] transition"
//                 >
//                   My Requests
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   href="/add-pet"
//                   className="hover:text-[#FFB1A0] transition"
//                 >
//                   Add Pet
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>

//         {/* Right Side */}
//         <div>
//          {user ? (
//   <Dropdown placement="bottom-end">
//     <DropdownTrigger>
//       <div className="cursor-pointer">
//         <Image
//           src={user?.image || "/assets/default-avatar.png"}
//           alt={user?.name}
//           referrerPolicy="no-referrer"
//           className="w-11 h-11 rounded-full object-cover border-2 border-[#FFB1A0]"
//         />
//       </div>
//     </DropdownTrigger>

//     <DropdownMenu aria-label="Profile Menu">
//       <DropdownItem key="profile" isReadOnly>
//         <div className="flex flex-col">
//           <span className="font-semibold">{user?.name}</span>
//           <span className="text-xs text-gray-500">{user?.email}</span>
//         </div>
//       </DropdownItem>

//       <DropdownItem
//         key="dashboard"
//         as={Link}
//         href="/dashboard"
//       >
//         Dashboard
//       </DropdownItem>

//       <DropdownItem
//         key="requests"
//         as={Link}
//         href="/my-requests"
//       >
//         My Requests
//       </DropdownItem>

//       <DropdownItem
//         key="add-pet"
//         as={Link}
//         href="/add-pet"
//       >
//         Add Pet
//       </DropdownItem>

//       <DropdownItem
//         key="logout"
//         color="danger"
//         onPress={handleSignOut}
//       >
//         Logout
//       </DropdownItem>
//     </DropdownMenu>
//   </Dropdown>
// ) : (
//   <Link href="/login">
//     <Button className="bg-[#FFB1A0] text-white rounded-xl hover:bg-[#ff9a84]">
//       Login
//     </Button>
//   </Link>
// )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
"use client";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);

const menuRef = useRef(null);

useEffect(() => {
  const handler = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handler);

  return () => document.removeEventListener("mousedown", handler);
}, []);

  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="bg-[#649EC4] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/Logo.png"
            alt="Pet Adopt"
            width={60}
            height={60}
          />

          <h1 className="text-3xl font-bold text-[#FFF0DD]">
            Pet<span className="text-[#FFB1A0]">Adopt</span>
          </h1>
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-10 text-[#FFF0DD] font-semibold">
          <li>
            <Link href="/" className="hover:text-[#FFB1A0] transition">
              Home
            </Link>
          </li>

          <li>
            <Link href="/pets" className="hover:text-[#FFB1A0] transition">
              All Pets
            </Link>
          </li>

          {user && (
            <>
              <li>
                <Link
                  href="/my-requests"
                  className="hover:text-[#FFB1A0] transition"
                >
                  My Requests
                </Link>
              </li>

              <li>
                <Link
                  href="/add-pet"
                  className="hover:text-[#FFB1A0] transition"
                >
                  Add Pet
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right Side */}
      <div className="relative" ref={menuRef}>
  {user ? (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        <Image
          src={user.image || "/assets/default-avatar.png"}
          alt="profile"
          width={42}
          height={42}
          className="rounded-full border-2 border-[#FFB1A0]"
        />

        <FaChevronDown
          className={`text-white duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border overflow-hidden">

          <div className="px-4 py-3 border-b">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">
              {user.email}
            </p>
          </div>

          <Link
            href="/dashboardPage"
            className="block px-4 py-3 hover:bg-gray-100"
          >
            Dashboard
          </Link>

    

          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
          >
            Logout
          </button>

        </div>
      )}
    </>
  ) : (
    <Link href="/login">
      <Button className="bg-[#FFB1A0] text-white">
        Login
      </Button>
    </Link>
  )}
</div>
      </div>
    </nav>
  );
};

export default Navbar;