// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// import { Button, Card } from "@heroui/react";
// import { authClient } from "@/lib/auth-client";

// import {
//   LuPencil,
//   LuTrash2,
//   LuEye,
//   LuClipboardList,
//   LuX,
//   LuCheck,
//   LuBan,
//   LuMapPin,
// } from "react-icons/lu";

// const MyListingPage = () => {
//   const { data: session } = authClient.useSession();

//   const user = session?.user;

//   const [pets, setPets] = useState([]);
//   const [requests, setRequests] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [selectedPet, setSelectedPet] = useState(null);
//   const [showRequests, setShowRequests] = useState(false);

//   // --------------------------------------------------
//   // GET PETS
//   // --------------------------------------------------

//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchPets = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch(
//           `http://localhost:5000/my-listings?email=${encodeURIComponent(
//             user.email
//           )}`,
//           {
//             cache: "no-store",
//           }
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch pets");
//         }

//         const data = await res.json();

//         setPets(data);
//       } catch (error) {
//         console.error("Error loading pets:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPets();
//   }, [user?.email]);

//   // --------------------------------------------------
//   // GET ADOPTION REQUESTS
//   // --------------------------------------------------

//   const handleRequests = async (pet) => {
//     try {
//       setSelectedPet(pet);

//       const res = await fetch(
//         `http://localhost:5000/adoption-requests?petId=${pet._id}`,
//         {
//           cache: "no-store",
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Failed to fetch requests");
//       }

//       const data = await res.json();

//       setRequests(data);
//       setShowRequests(true);
//     } catch (error) {
//       console.error("Error loading requests:", error);
//       alert("Failed to load adoption requests.");
//     }
//   };

//   // --------------------------------------------------
//   // APPROVE REQUEST
//   // --------------------------------------------------

//   const handleApprove = async (requestId) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/adoption-requests/${requestId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             status: "approved",
//           }),
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Failed to approve request");
//       }

//       setRequests((previous) =>
//         previous.map((request) =>
//           request._id === requestId
//             ? { ...request, status: "approved" }
//             : request
//         )
//       );

//       alert("Request approved successfully.");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to approve request.");
//     }
//   };

//   // --------------------------------------------------
//   // REJECT REQUEST
//   // --------------------------------------------------

//   const handleReject = async (requestId) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/adoption-requests/${requestId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             status: "rejected",
//           }),
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Failed to reject request");
//       }

//       setRequests((previous) =>
//         previous.map((request) =>
//           request._id === requestId
//             ? { ...request, status: "rejected" }
//             : request
//         )
//       );

//       alert("Request rejected.");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to reject request.");
//     }
//   };

//   // --------------------------------------------------
//   // DELETE PET
//   // --------------------------------------------------

//   const handleDelete = async (petId) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this pet?"
//     );

//     if (!confirmed) return;

//     try {
//       const res = await fetch(
//         `http://localhost:5000/pets/${petId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Failed to delete pet");
//       }

//       setPets((previous) =>
//         previous.filter((pet) => pet._id !== petId)
//       );

//       alert("Pet deleted successfully.");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to delete pet.");
//     }
//   };

//   // --------------------------------------------------
//   // STATS
//   // --------------------------------------------------

//   const totalListings = pets.length;

//   const availablePets = pets.filter(
//     (pet) => pet.status !== "adopted"
//   ).length;

//   const adoptedPets = pets.filter(
//     (pet) => pet.status === "adopted"
//   ).length;

//   // --------------------------------------------------
//   // LOADING
//   // --------------------------------------------------

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#FFF0DD] p-8">
//         <div className="flex justify-center items-center h-64">
//           <p className="text-lg text-[#649EC4] font-semibold">
//             Loading your listings...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // --------------------------------------------------
//   // PAGE
//   // --------------------------------------------------

//   return (
//     <div className="min-h-screen bg-[#FFF0DD] p-6 md:p-8">

//       {/* Header */}

//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-[#649EC4]">
//           My Listings 🐾
//         </h1>

//         <p className="mt-2 text-gray-600">
//           Manage the pets you have added for adoption.
//         </p>
//       </div>

//       {/* Stats */}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

//         {/* Total */}

//         <Card className="p-6 rounded-2xl border border-[#99CBB8]/40 shadow-md">
//           <p className="text-sm text-gray-500">
//             Total Listings
//           </p>

//           <h2 className="text-3xl font-bold text-[#649EC4] mt-2">
//             {totalListings}
//           </h2>
//         </Card>

//         {/* Available */}

//         <Card className="p-6 rounded-2xl border border-[#99CBB8]/40 shadow-md">
//           <p className="text-sm text-gray-500">
//             Available
//           </p>

//           <h2 className="text-3xl font-bold text-[#99CBB8] mt-2">
//             {availablePets}
//           </h2>
//         </Card>

//         {/* Adopted */}

//         <Card className="p-6 rounded-2xl border border-[#99CBB8]/40 shadow-md">
//           <p className="text-sm text-gray-500">
//             Adopted
//           </p>

//           <h2 className="text-3xl font-bold text-[#FFB1A0] mt-2">
//             {adoptedPets}
//           </h2>
//         </Card>

//       </div>

//       {/* No Listings */}

//       {pets.length === 0 ? (
//         <div className="bg-white rounded-3xl p-12 text-center shadow-md">

//           <div className="text-5xl mb-4">
//             🐾
//           </div>

//           <h2 className="text-2xl font-bold text-[#649EC4]">
//             No Listings Yet
//           </h2>

//           <p className="text-gray-500 mt-2">
//             You haven't added any pets for adoption.
//           </p>

//           <Link href="/addPet">
//             <Button className="mt-6 bg-[#FFB1A0] text-white rounded-xl px-6">
//               Add Your First Pet
//             </Button>
//           </Link>

//         </div>
//       ) : (

//         /* Pets */

//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

//           {pets.map((pet) => (

//             <Card
//               key={pet._id}
//               className="overflow-hidden rounded-3xl bg-white border border-[#99CBB8]/40 shadow-md hover:shadow-xl transition"
//             >

//               {/* Image */}

//               <div className="relative h-60 w-full bg-[#99CBB8]">

//                 <Image
//                   src={pet.imageUrl}
//                   alt={pet.petName}
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 768px) 100vw, 400px"
//                 />

//                 {/* Status */}

//                 <div className="absolute top-4 left-4">

//                   <span
//                     className={`px-4 py-2 rounded-full text-sm font-semibold ${
//                       pet.status === "adopted"
//                         ? "bg-[#FFB1A0] text-white"
//                         : "bg-[#FFF0DD] text-[#649EC4]"
//                     }`}
//                   >
//                     {pet.status === "adopted"
//                       ? "Adopted"
//                       : "Available"}
//                   </span>

//                 </div>

//               </div>

//               {/* Content */}

//               <div className="p-5">

//                 <div className="flex justify-between items-start">

//                   <div>

//                     <h2 className="text-2xl font-bold text-[#649EC4]">
//                       {pet.petName}
//                     </h2>

//                     <p className="text-gray-500 mt-1">
//                       {pet.species}
//                       {pet.breed
//                         ? ` • ${pet.breed}`
//                         : ""}
//                     </p>

//                   </div>

//                   <div className="text-right">

//                     <p className="text-xs text-gray-500">
//                       Adoption Fee
//                     </p>

//                     <p className="text-xl font-bold text-[#FFB1A0]">
//                       ৳
//                       {Number(
//                         pet.adoptionFee || 0
//                       ).toLocaleString()}
//                     </p>

//                   </div>

//                 </div>

//                 {/* Location */}

//                 <div className="flex items-center gap-2 mt-4 text-gray-600">

//                   <LuMapPin
//                     size={17}
//                     className="text-[#649EC4]"
//                   />

//                   <span>
//                     {pet.location}
//                   </span>

//                 </div>

//                 {/* Buttons */}

//                 <div className="grid grid-cols-2 gap-2 mt-5">

//                   {/* Requests */}

//                   <Button
//                     onPress={() => handleRequests(pet)}
//                     className="bg-[#99CBB8] text-white rounded-xl"
//                   >
//                     <LuClipboardList size={17} />
//                     Requests
//                   </Button>

//                   {/* Edit */}

//                   <Link
//                     href={`/updatePet/${pet._id}`}
//                     className="w-full"
//                   >

//                     <Button className="w-full bg-[#649EC4] text-white rounded-xl">
//                       <LuPencil size={17} />
//                       Edit
//                     </Button>

//                   </Link>

//                   {/* View */}

//                   <Link
//                     href={`/allPets/${pet._id}`}
//                     className="w-full"
//                   >

//                     <Button
//                       variant="bordered"
//                       className="w-full border-[#649EC4] text-[#649EC4] rounded-xl"
//                     >
//                       <LuEye size={17} />
//                       View
//                     </Button>

//                   </Link>

//                   {/* Delete */}

//                   <Button
//                     onPress={() => handleDelete(pet._id)}
//                     className="bg-[#FFB1A0] text-white rounded-xl"
//                   >
//                     <LuTrash2 size={17} />
//                     Delete
//                   </Button>

//                 </div>

//               </div>

//             </Card>

//           ))}

//         </div>

//       )}

//       {/* =====================================================
//           REQUESTS MODAL
//       ====================================================== */}

//       {showRequests && (

//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">

//           <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

//             {/* Modal Header */}

//             <div className="flex items-center justify-between p-6 border-b">

//               <div>

//                 <h2 className="text-2xl font-bold text-[#649EC4]">
//                   Adoption Requests
//                 </h2>

//                 {selectedPet && (
//                   <p className="text-gray-500 mt-1">
//                     Requests for{" "}
//                     <span className="font-semibold">
//                       {selectedPet.petName}
//                     </span>
//                   </p>
//                 )}

//               </div>

//               <button
//                 type="button"
//                 onClick={() => setShowRequests(false)}
//                 className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FFF0DD] text-[#649EC4] hover:bg-[#FFB1A0] hover:text-white"
//               >
//                 <LuX size={20} />
//               </button>

//             </div>

//             {/* Modal Body */}

//             <div className="p-6">

//               {requests.length === 0 ? (

//                 <div className="text-center py-10">

//                   <LuClipboardList
//                     size={45}
//                     className="mx-auto text-[#99CBB8]"
//                   />

//                   <h3 className="text-xl font-semibold mt-4 text-[#649EC4]">
//                     No Requests
//                   </h3>

//                   <p className="text-gray-500 mt-2">
//                     Nobody has requested this pet yet.
//                   </p>

//                 </div>

//               ) : (

//                 <div className="space-y-4">

//                   {requests.map((request) => (

//                     <div
//                       key={request._id}
//                       className="rounded-2xl border border-[#99CBB8]/40 p-5"
//                     >

//                       {/* Request Information */}

//                       <div className="flex justify-between items-start gap-4">

//                         <div>

//                           <h3 className="text-lg font-bold text-[#649EC4]">
//                             {request.userName}
//                           </h3>

//                           <p className="text-sm text-gray-500">
//                             {request.userEmail}
//                           </p>

//                           <div className="mt-3 space-y-1 text-sm">

//                             <p>
//                               <span className="font-semibold">
//                                 Pickup Date:
//                               </span>{" "}
//                               {request.pickupDate}
//                             </p>

//                             <p>
//                               <span className="font-semibold">
//                                 Message:
//                               </span>{" "}
//                               {request.message}
//                             </p>

//                           </div>

//                         </div>

//                         {/* Status */}

//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                             request.status === "approved"
//                               ? "bg-[#99CBB8] text-white"
//                               : request.status === "rejected"
//                               ? "bg-[#FFB1A0] text-white"
//                               : "bg-[#FFF0DD] text-[#649EC4]"
//                           }`}
//                         >
//                           {request.status}
//                         </span>

//                       </div>

//                       {/* Buttons */}

//                       {request.status === "pending" && (

//                         <div className="flex gap-3 mt-5">

//                           <Button
//                             onPress={() =>
//                               handleApprove(request._id)
//                             }
//                             className="flex-1 bg-[#99CBB8] text-white rounded-xl"
//                           >
//                             <LuCheck size={17} />
//                             Approve
//                           </Button>

//                           <Button
//                             onPress={() =>
//                               handleReject(request._id)
//                             }
//                             className="flex-1 bg-[#FFB1A0] text-white rounded-xl"
//                           >
//                             <LuBan size={17} />
//                             Reject
//                           </Button>

//                         </div>

//                       )}

//                       {request.status !== "pending" && (

//                         <div className="mt-4 text-sm text-gray-500">
//                           This request has already been{" "}
//                           <span className="font-semibold">
//                             {request.status}
//                           </span>
//                           .
//                         </div>

//                       )}

//                     </div>

//                   ))}

//                 </div>

//               )}

//             </div>

//             {/* Modal Footer */}

//             <div className="border-t p-5 flex justify-end">

//               <Button
//                 onPress={() => setShowRequests(false)}
//                 className="bg-[#649EC4] text-white rounded-xl px-6"
//               >
//                 Close
//               </Button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// };

// export default MyListingPage;
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import {
  LuEye,
  LuPencil,
  LuTrash2,
  LuClipboardList,
} from "react-icons/lu";

const MyListingPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyPets = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://localhost:5000/my-listings/${encodeURIComponent(
            user.email
          )}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch your pets");
        }

        const data = await res.json();

        setPets(data);
      } catch (error) {
        console.error("My listings error:", error);
        setError("Could not load your pets.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPets();
  }, [user?.email]);

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-[#FFF0DD] p-8">
        <h1 className="text-3xl font-bold text-[#649EC4]">
          My Listings
        </h1>

        <p className="mt-4 text-gray-500">
          Loading your pets...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FFF0DD] p-8">
        <div className="bg-white rounded-2xl p-10 text-center shadow">
          <h2 className="text-2xl font-bold text-[#649EC4]">
            Please Login
          </h2>

          <p className="mt-2 text-gray-500">
            You need to login to see your listings.
          </p>

          <Link href="/login">
            <Button className="mt-5 bg-[#FFB1A0] text-white rounded-xl">
              Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF0DD] p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#649EC4]">
          My Listings 🐾
        </h1>

        <p className="mt-2 text-gray-600">
          Pets that you have added for adoption.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500 text-sm">
            Total Listings
          </p>

          <h2 className="text-3xl font-bold text-[#649EC4] mt-2">
            {pets.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500 text-sm">
            Available
          </p>

          <h2 className="text-3xl font-bold text-[#99CBB8] mt-2">
            {
              pets.filter(
                (pet) => pet.status !== "adopted"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500 text-sm">
            Adopted
          </p>

          <h2 className="text-3xl font-bold text-[#FFB1A0] mt-2">
            {
              pets.filter(
                (pet) => pet.status === "adopted"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* No pets */}
      {!error && pets.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center shadow">
          <h2 className="text-2xl font-bold text-[#649EC4]">
            You haven't added any pets yet 🐾
          </h2>

          <p className="text-gray-500 mt-2">
            Add your first pet to see it here.
          </p>

          <Link href="/addPet">
            <Button className="mt-5 bg-[#FFB1A0] text-white rounded-xl">
              Add Pet
            </Button>
          </Link>
        </div>
      )}

      {/* My Pets */}
      {pets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {pets.map((pet) => (
            <Card
              key={pet._id}
              className="overflow-hidden rounded-2xl bg-white shadow-md"
            >

              {/* Image */}
              <div className="relative h-56 w-full">
                <Image
                  src={pet.imageUrl}
                  alt={pet.petName}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>

              {/* Content */}
              <div className="p-5">

                <div className="flex justify-between items-start">

                  <div>
                    <h2 className="text-2xl font-bold text-[#649EC4]">
                      {pet.petName}
                    </h2>

                    <p className="text-gray-500">
                      {pet.species} • {pet.breed}
                    </p>
                  </div>

                  <span className="font-bold text-[#FFB1A0]">
                    ৳{Number(pet.adoptionFee).toLocaleString()}
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  📍 {pet.location}
                </p>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-5">

                  <Link
                    href={`/allPets/${pet._id}`}
                    className="w-full"
                  >
                    <Button
                      className="w-full bg-[#649EC4] text-white rounded-xl"
                    >
                      <LuEye />
                      View
                    </Button>
                  </Link>

                  <Link
                    href={`/updatePet/${pet._id}`}
                    className="w-full"
                  >
                    <Button
                      className="w-full bg-[#99CBB8] text-white rounded-xl"
                    >
                      <LuPencil />
                      Edit
                    </Button>
                  </Link>

                  <Button
                    className="bg-[#FFF0DD] text-[#649EC4] rounded-xl"
                  >
                    <LuClipboardList />
                    Requests
                  </Button>

                  <Button
                    color="danger"
                    className="rounded-xl"
                  >
                    <LuTrash2 />
                    Delete
                  </Button>

                </div>

              </div>
            </Card>
          ))}

        </div>
      )}

    </div>
  );
};

export default MyListingPage;