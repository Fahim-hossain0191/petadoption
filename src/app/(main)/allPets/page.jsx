import PetCard from "@/components/PetCard";

const DashboardPage = async () => {
  const res = await fetch("http://localhost:5000/allPetPage", {
    cache: "no-store",
  });

  const collections = await res.json();
  console.log(collections)
  return (
    <div className="min-h-screen bg-[#FFF0DD] p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#649EC4]">
          Available Pets 🐾
        </h1>

        <p className="mt-2 text-gray-600">
          Find a loving companion waiting for a forever home.
        </p>
      </div>

      {/* Pets */}
      {collections.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <PetCard
              key={collection._id}
              collection={collection}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 text-center shadow-md">
          <h2 className="text-xl font-semibold text-[#649EC4]">
            No pets available
          </h2>

          <p className="text-gray-500 mt-2">
            No pets have been added for adoption yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;