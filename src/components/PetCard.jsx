"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@heroui/react";
import {
  LuMapPin,
  LuHeart,
  LuArrowUpRight,
} from "react-icons/lu";
import { FaVenusMars } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const PetCard = ({ collection }) => {
  const {
    _id,
    petName,
    species,
    breed,
    age,
    gender,
    location,
    adoptionFee,
    imageUrl,
  } = collection;

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handleAdopt = () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    window.location.href = `/pets/${_id}`;
  };

  return (
    <div className="group w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-[#99CBB8]/40">

      {/* ================= IMAGE ================= */}
      <div className="relative h-64 w-full overflow-hidden bg-[#99CBB8]">

        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={petName || "Pet"}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#649EC4]">
            No Image
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Species */}
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-[#FFF0DD] px-4 py-2 text-sm font-semibold text-[#649EC4] shadow">
            {species}
          </span>
        </div>

        {/* Favorite */}
        <button
          type="button"
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#FFB1A0] shadow-md backdrop-blur-sm transition hover:bg-[#FFB1A0] hover:text-white"
        >
          <LuHeart size={20} />
        </button>

        {/* Pet Name */}
        <div className="absolute bottom-4 left-5">
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            {petName}
          </h2>

          <p className="text-sm font-medium text-white/90">
            {breed}
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5">

        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-3 mb-4">

          {/* Age */}
          <div className="rounded-xl bg-[#FFF0DD] p-3">
            <p className="text-xs text-gray-500">
              Age
            </p>

            <p className="mt-1 font-semibold text-[#649EC4]">
              {age} {age === 1 ? "year" : "years"}
            </p>
          </div>

          {/* Gender */}
          <div className="rounded-xl bg-[#99CBB8]/30 p-3">
            <p className="text-xs text-gray-500">
              Gender
            </p>

            <div className="mt-1 flex items-center gap-1 font-semibold text-[#649EC4]">
              <FaVenusMars size={13} />
              {gender}
            </div>
          </div>

        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">

          <LuMapPin
            size={18}
            className="text-[#649EC4]"
          />

          <span className="text-sm">
            {location}
          </span>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4" />

        {/* Bottom Section */}
        <div className="flex items-center justify-between gap-3">

          {/* Adoption Fee */}
          <div>
            <p className="text-xs text-gray-500">
              Adoption Fee
            </p>

            <p className="text-2xl font-bold text-[#649EC4]">
              ৳{Number(adoptionFee).toLocaleString()}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">

            {/* View Details */}
            <Link href={`/allPets/${_id}`}>
              <Button
                size="sm"
                className="w-full rounded-xl bg-[#649EC4] text-white font-semibold hover:bg-[#538db4] transition"
              >
                View Details
                <LuArrowUpRight size={17} />
              </Button>
            </Link>

            {/* Adopt Now */}
            <Button
              size="sm"
              onClick={handleAdopt}
              className="w-full rounded-xl bg-[#FFB1A0] text-white font-semibold hover:bg-[#ff9d89] transition"
            >
              Adopt Now
            </Button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default PetCard;