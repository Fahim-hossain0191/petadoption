
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