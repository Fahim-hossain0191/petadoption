"use client";

import React, { useEffect, useState } from "react";
import { Card, Button } from "@heroui/react";
import {
  LuCalendarDays,
  LuCheck,
  LuClock,
  LuMail,
  LuUser,
  LuX,
  LuPawPrint,
} from "react-icons/lu";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch all adoption requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const res = await fetch(
          "http://localhost:5000/adoption-requests",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch adoption requests");
        }

        const data = await res.json();

        console.log("Adoption Requests:", data);

        setRequests(data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setErrorMessage("Failed to load adoption requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Approve / Reject request
  const updateRequestStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/adoption-requests/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update request");
      }

      // Update UI immediately
      setRequests((previousRequests) =>
        previousRequests.map((request) =>
          request._id === id
            ? {
                ...request,
                status: status,
              }
            : request
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update request.");
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF0DD] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#649EC4] border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-[#649EC4] font-semibold">
            Loading adoption requests...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (errorMessage) {
    return (
      <div className="min-h-screen bg-[#FFF0DD] p-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl bg-[#FFB1A0]/30 border border-[#FFB1A0] p-6 text-center">
            <p className="text-red-600 font-semibold">
              {errorMessage}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF0DD] p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-[#649EC4] flex items-center justify-center text-white">
              <LuPawPrint size={25} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-[#649EC4]">
                My Requests
              </h1>

              <p className="text-gray-600 mt-1">
                Manage adoption requests for your pets.
              </p>
            </div>

          </div>
        </div>

        {/* No Requests */}
        {requests.length === 0 ? (
          <Card className="p-10 rounded-3xl bg-white border border-[#99CBB8]/40 shadow-md">

            <div className="text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-[#99CBB8]/30 flex items-center justify-center">
                <LuPawPrint
                  size={30}
                  className="text-[#649EC4]"
                />
              </div>

              <h2 className="text-xl font-bold text-[#649EC4] mt-5">
                No Adoption Requests
              </h2>

              <p className="text-gray-500 mt-2">
                There are currently no adoption requests.
              </p>

            </div>

          </Card>
        ) : (

          /* Requests */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {requests.map((request) => (

              <Card
                key={request._id}
                className="rounded-3xl bg-white border border-[#99CBB8]/40 shadow-md overflow-hidden"
              >

                {/* Header */}
                <div className="bg-[#649EC4] px-6 py-5 text-white">

                  <div className="flex justify-between items-center">

                    <div>
                      <p className="text-sm text-white/80">
                        Adoption Request
                      </p>

                      <h2 className="text-2xl font-bold">
                        {request.petName}
                      </h2>
                    </div>

                    <StatusBadge
                      status={request.status}
                    />

                  </div>

                </div>

                {/* Body */}
                <div className="p-6">

                  {/* User Name */}
                  <div className="flex items-center gap-3 mb-4">

                    <div className="w-10 h-10 rounded-xl bg-[#99CBB8]/30 flex items-center justify-center">
                      <LuUser
                        size={20}
                        className="text-[#649EC4]"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Requested User
                      </p>

                      <p className="font-semibold text-gray-800">
                        {request.userName}
                      </p>
                    </div>

                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 mb-4">

                    <div className="w-10 h-10 rounded-xl bg-[#FFF0DD] flex items-center justify-center">
                      <LuMail
                        size={20}
                        className="text-[#649EC4]"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Email
                      </p>

                      <p className="font-medium text-gray-700 break-all">
                        {request.userEmail}
                      </p>
                    </div>

                  </div>

                  {/* Pickup Date */}
                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-10 h-10 rounded-xl bg-[#FFB1A0]/30 flex items-center justify-center">
                      <LuCalendarDays
                        size={20}
                        className="text-[#649EC4]"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Pickup Date
                      </p>

                      <p className="font-semibold text-gray-800">
                        {request.pickupDate}
                      </p>
                    </div>

                  </div>

                  {/* Message */}
                  {request.message && (
                    <div className="bg-[#FFF0DD] rounded-2xl p-4 mb-6">

                      <p className="text-xs text-gray-500 mb-1">
                        Message
                      </p>

                      <p className="text-sm text-gray-700">
                        {request.message}
                      </p>

                    </div>
                  )}

                  {/* Approve / Reject */}
                  {request.status === "pending" ? (

                    <div className="flex gap-3">

                      <Button
                        onPress={() =>
                          updateRequestStatus(
                            request._id,
                            "approved"
                          )
                        }
                        className="flex-1 rounded-xl bg-[#99CBB8] text-white font-semibold"
                      >
                        <LuCheck size={18} />
                        Approve
                      </Button>

                      <Button
                        onPress={() =>
                          updateRequestStatus(
                            request._id,
                            "rejected"
                          )
                        }
                        className="flex-1 rounded-xl bg-[#FFB1A0] text-white font-semibold"
                      >
                        <LuX size={18} />
                        Reject
                      </Button>

                    </div>

                  ) : (

                    <div
                      className={`rounded-xl p-4 text-center font-semibold ${
                        request.status === "approved"
                          ? "bg-[#99CBB8]/30 text-green-700"
                          : "bg-[#FFB1A0]/30 text-red-700"
                      }`}
                    >

                      {request.status === "approved"
                        ? "✓ This request has been approved."
                        : "✕ This request has been rejected."}

                    </div>

                  )}

                </div>

              </Card>

            ))}

          </div>

        )}

      </div>
    </div>
  );
};


/* Status Badge */
const StatusBadge = ({ status }) => {

  if (status === "approved") {
    return (
      <span className="flex items-center gap-1 rounded-full bg-[#99CBB8] px-3 py-1 text-xs font-semibold text-white">
        <LuCheck size={14} />
        Approved
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className="flex items-center gap-1 rounded-full bg-[#FFB1A0] px-3 py-1 text-xs font-semibold text-white">
        <LuX size={14} />
        Rejected
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 rounded-full bg-[#FFF0DD] px-3 py-1 text-xs font-semibold text-[#649EC4]">
      <LuClock size={14} />
      Pending
    </span>
  );
};

export default MyRequests;