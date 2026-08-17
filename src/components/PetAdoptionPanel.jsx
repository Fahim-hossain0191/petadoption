"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, Button, Input, TextArea } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { LuHeart, LuLock, LuCheck } from "react-icons/lu";

const PetAdoptionPanel = ({ pet }) => {

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  /*
   * IMPORTANT:
   * This assumes your pet document contains ownerEmail.
   *
   * Example:
   * ownerEmail: "owner@gmail.com"
   */
  const isOwner =
    user?.email &&
    pet?.ownerEmail &&
    user.email === pet.ownerEmail;

  const handleAdoption = async (e) => {

    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!user) {
      setErrorMessage("Please login before requesting adoption.");
      return;
    }

    if (!pickupDate) {
      setErrorMessage("Please select a pickup date.");
      return;
    }

    try {

      setLoading(true);

      const adoptionRequest = {
        petId: pet._id,
        petName: pet.petName,

        userName: user.name,
        userEmail: user.email,

        pickupDate,
        message,

        status: "pending",

        requestDate: new Date().toISOString(),
      };

      const res = await fetch(
        "http://localhost:5000/adoption-requests",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(adoptionRequest),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to submit adoption request."
        );
      }

      setSuccessMessage(
        "Adoption request submitted successfully!"
      );

      setPickupDate("");
      setMessage("");

    } catch (error) {

      setErrorMessage(
        error.message || "Something went wrong."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <Card className="sticky top-28 rounded-3xl border-none shadow-xl overflow-hidden">

      {/* Header */}
      <div className="bg-[#649EC4] p-6 text-white">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-[#FFB1A0] flex items-center justify-center">

            <LuHeart size={24} />

          </div>

          <div>

            <h2 className="text-xl font-bold">
              Adopt {pet.petName}
            </h2>

            <p className="text-white/80 text-sm">
              Give {pet.petName} a loving home
            </p>

          </div>

        </div>

      </div>

      <div className="p-6">

        {/* ================= OWNER ================= */}

        {isOwner ? (

          <div className="text-center py-8">

            <div className="mx-auto w-16 h-16 rounded-full bg-[#99CBB8]/40 flex items-center justify-center">

              <LuCheck
                size={32}
                className="text-[#649EC4]"
              />

            </div>

            <h3 className="text-xl font-bold text-[#649EC4] mt-5">
              Your Pet Listing
            </h3>

            <p className="text-gray-500 mt-2 leading-6">
              You added this pet for adoption.
              You cannot submit an adoption request
              for your own pet.
            </p>

            <div className="mt-5 bg-[#FFF0DD] rounded-2xl p-4">

              <p className="text-sm text-gray-500">
                Owner
              </p>

              <p className="font-semibold text-gray-700">
                {pet.ownerEmail}
              </p>

            </div>

          </div>

        ) : !user ? (

          /* ================= NOT LOGGED IN ================= */

          <div className="text-center py-8">

            <div className="mx-auto w-16 h-16 rounded-full bg-[#FFB1A0]/30 flex items-center justify-center">

              <LuLock
                size={28}
                className="text-[#649EC4]"
              />

            </div>

            <h3 className="text-xl font-bold text-[#649EC4] mt-5">
              Login to Adopt
            </h3>

            <p className="text-gray-500 mt-2">
              You can view the pet details, but you
              need to login before submitting an
              adoption request.
            </p>

            <Link href="/login">

              <Button
                className="mt-6 w-full rounded-xl bg-[#FFB1A0] text-white font-semibold"
              >
                Login
              </Button>

            </Link>

          </div>

        ) : (

          /* ================= ADOPTION FORM ================= */

          <form
            onSubmit={handleAdoption}
            className="space-y-5"
          >

            <div>

              <h3 className="text-lg font-bold text-[#649EC4]">
                Adoption Request
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Fill out the form to request adoption.
              </p>

            </div>

            {/* Pet Name */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pet Name
              </label>

              <Input
                value={pet.petName}
                isReadOnly
                className="rounded-xl"
              />

            </div>

            {/* User Name */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>

              <Input
                value={user.name}
                isReadOnly
                className="rounded-xl"
              />

            </div>

            {/* User Email */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Email
              </label>

              <Input
                value={user.email}
                isReadOnly
                className="rounded-xl"
              />

            </div>

            {/* Pickup Date */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Date
              </label>

              <Input
                type="date"
                value={pickupDate}
                onChange={(e) =>
                  setPickupDate(e.target.value)
                }
                className="rounded-xl"
              />

            </div>

            {/* Message */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>

              <TextArea
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Tell the owner why you would like to adopt this pet..."
                className="rounded-xl"
                rows={5}
              />

            </div>

            {/* Error */}

            {errorMessage && (

              <div className="rounded-xl bg-red-100 text-red-600 p-3 text-sm">
                {errorMessage}
              </div>

            )}

            {/* Success */}

            {successMessage && (

              <div className="rounded-xl bg-[#99CBB8]/40 text-[#355C7D] p-3 text-sm">
                {successMessage}
              </div>

            )}

            {/* Adopt Button */}

            <Button
              type="submit"
              isDisabled={loading}
              className="w-full h-12 rounded-xl bg-[#FFB1A0] hover:bg-[#ff9d89] text-white font-bold"
            >
              {loading
                ? "Submitting..."
                : "Adopt Now ❤️"}
            </Button>

            {/* Status */}

            <p className="text-xs text-center text-gray-400">
              Your request will initially be marked as{" "}
              <span className="font-semibold">
                Pending
              </span>
              .
            </p>

          </form>

        )}

      </div>

    </Card>
  );
};

export default PetAdoptionPanel;