"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@heroui/react";
import {
  LuMapPin,
  LuHeart,
  LuArrowUpRight,
  LuShieldCheck,
} from "react-icons/lu";
import { FaVenusMars } from "react-icons/fa";

const PetCard = ({ collection }) => {
  const {
    _id,
    petName,
    species,
    breed,
    age,
    gender,
    healthStatus,
    vaccinationStatus,
    location,
    adoptionFee,
    imageUrl,
  } = collection;

  return (
    <div className="group w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-[#99CBB8]/40">

      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden bg-[#99CBB8]">

        <Image
          src={imageUrl}
          alt={petName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 400px"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Species Badge */}
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-[#FFF0DD] px-4 py-2 text-sm font-semibold text-[#355C7D] shadow">
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

      {/* Content */}
      <div className="p-5">

        {/* Basic Information */}
        <div className="grid grid-cols-3 gap-2 mb-5">

          <div className="rounded-xl bg-[#FFF0DD] p-3 text-center">
            <p className="text-xs text-gray-500">Age</p>
            <p className="mt-1 font-semibold text-[#355C7D]">
              {age} {age === 1 ? "yr" : "yrs"}
            </p>
          </div>

          <div className="rounded-xl bg-[#99CBB8]/30 p-3 text-center">
            <p className="text-xs text-gray-500">Gender</p>
            <div className="mt-1 flex items-center justify-center gap-1 font-semibold text-[#355C7D]">
              <FaVenusMars size={13} />
              {gender}
            </div>
          </div>

          <div className="rounded-xl bg-[#649EC4]/15 p-3 text-center">
            <p className="text-xs text-gray-500">Status</p>
            <p className="mt-1 font-semibold text-[#355C7D]">
              Available
            </p>
          </div>

        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <LuMapPin
            size={18}
            className="text-[#649EC4]"
          />

          <span className="text-sm">
            {location}
          </span>
        </div>

        {/* Health */}
        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center gap-2">
            <LuShieldCheck
              size={18}
              className="text-[#99CBB8]"
            />

            <div>
              <p className="text-xs text-gray-400">
                Health
              </p>

              <p className="text-sm font-medium text-[#355C7D]">
                {healthStatus}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">
              Vaccination
            </p>

            <p className="text-sm font-medium text-[#355C7D]">
              {vaccinationStatus}
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4" />

        {/* Bottom */}
        <div className="flex items-center justify-between gap-4">

          {/* Fee */}
          <div>
            <p className="text-xs text-gray-500">
              Adoption Fee
            </p>

            <p className="text-2xl font-bold text-[#649EC4]">
              ৳{Number(adoptionFee).toLocaleString()}
            </p>
          </div>

          {/* Details Button */}
          <Link href={`/pets/${_id}`}>
            <Button
              className="rounded-xl bg-[#FFB1A0] px-5 font-semibold text-white shadow-sm hover:bg-[#ff9d89] transition"
            >
              View Details
              <LuArrowUpRight size={18} />
            </Button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default PetCard;