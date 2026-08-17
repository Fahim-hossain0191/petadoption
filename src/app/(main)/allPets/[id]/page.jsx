import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LuMapPin, LuShieldCheck, LuSyringe, LuArrowLeft } from "react-icons/lu";
import PetAdoptionPanel from "@/components/PetAdoptionPanel";

const PetDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/allPetPage/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen bg-[#FFF0DD] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#649EC4]">
            Pet Not Found
          </h1>

          <p className="mt-2 text-gray-600">
            We couldn't find this pet.
          </p>

          <Link href="/pets">
            <button className="mt-6 rounded-xl bg-[#FFB1A0] px-6 py-3 text-white font-semibold">
              Back to Pets
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const pet = await res.json();

  return (
    <div className="min-h-screen bg-[#FFF0DD] py-10 px-6">

      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-6">
        <Link
          href="/allPets"
          className="inline-flex items-center gap-2 text-[#649EC4] font-medium hover:text-[#FFB1A0]"
        >
          <LuArrowLeft />
          Back to All Pets
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

              {/* Pet Image */}
              <div className="relative h-[420px] w-full bg-[#99CBB8]">

                <Image
                  src={pet.imageUrl}
                  alt={pet.petName}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />

                {/* Species */}
                <div className="absolute top-5 left-5">
                  <span className="bg-[#FFF0DD] text-[#649EC4] px-5 py-2 rounded-full font-semibold shadow">
                    {pet.species}
                  </span>
                </div>
              </div>

              {/* Pet Information */}
              <div className="p-8">

                {/* Name */}
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-[#649EC4]">
                    {pet.petName}
                  </h1>

                  <p className="text-gray-500 mt-1">
                    {pet.breed}
                  </p>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                  <div className="bg-[#FFF0DD] rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                      Age
                    </p>

                    <p className="font-bold text-[#649EC4] mt-1">
                      {pet.age} {pet.age == 1 ? "year" : "years"}
                    </p>
                  </div>

                  <div className="bg-[#99CBB8]/40 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                      Gender
                    </p>

                    <p className="font-bold text-[#649EC4] mt-1">
                      {pet.gender}
                    </p>
                  </div>

                  <div className="bg-[#649EC4]/10 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                      Species
                    </p>

                    <p className="font-bold text-[#649EC4] mt-1">
                      {pet.species}
                    </p>
                  </div>

                  <div className="bg-[#FFB1A0]/30 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                      Adoption Fee
                    </p>

                    <p className="font-bold text-[#649EC4] mt-1">
                      ৳{Number(pet.adoptionFee).toLocaleString()}
                    </p>
                  </div>

                </div>

                {/* Location */}
                <div className="flex items-center gap-3 mb-6">

                  <div className="w-10 h-10 rounded-full bg-[#99CBB8]/40 flex items-center justify-center">
                    <LuMapPin className="text-[#649EC4]" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Location
                    </p>

                    <p className="font-semibold text-gray-700">
                      {pet.location}
                    </p>
                  </div>

                </div>

                {/* Health & Vaccination */}
                <div className="grid md:grid-cols-2 gap-5 mb-8">

                  <div className="border border-[#99CBB8] rounded-2xl p-5">

                    <div className="flex items-center gap-3">

                      <LuShieldCheck
                        className="text-[#649EC4]"
                        size={24}
                      />

                      <div>
                        <p className="text-sm text-gray-500">
                          Health Status
                        </p>

                        <p className="font-semibold text-gray-700">
                          {pet.healthStatus}
                        </p>
                      </div>

                    </div>

                  </div>

                  <div className="border border-[#99CBB8] rounded-2xl p-5">

                    <div className="flex items-center gap-3">

                      <LuSyringe
                        className="text-[#649EC4]"
                        size={24}
                      />

                      <div>
                        <p className="text-sm text-gray-500">
                          Vaccination Status
                        </p>

                        <p className="font-semibold text-gray-700">
                          {pet.vaccinationStatus}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Description */}
                <div>

                  <h2 className="text-2xl font-bold text-[#649EC4] mb-3">
                    About {pet.petName}
                  </h2>

                  <p className="text-gray-600 leading-7">
                    {pet.description}
                  </p>

                </div>

              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="lg:col-span-1">

            {/* <PetAdoptionPanel pet={pet} /> */}
            <PetAdoptionPanel pet={pet}></PetAdoptionPanel>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;