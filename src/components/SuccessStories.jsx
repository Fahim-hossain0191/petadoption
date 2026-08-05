import { FaStar } from "react-icons/fa";

const stories = [
  {
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500",
    pet: "Bella",
    owner: "Emma",
    story:
      "Bella filled our home with happiness. Adopting her was the best decision our family ever made.",
  },
  {
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500",
    pet: "Rocky",
    owner: "David",
    story:
      "Rocky quickly became my best friend. Every day is an adventure with him by my side.",
  },
  {
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500",
    pet: "Luna",
    owner: "Sophia",
    story:
      "Luna brought warmth and love into our family. She truly found her forever home.",
  },
];

const SuccessStories = () => {
  return (
    <section className="bg-[#99CBB8] py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <span className="text-white font-semibold uppercase tracking-wider">
            Happy Families
          </span>

          <h2 className="text-4xl font-bold text-[#31546D] mt-3">
            Success Stories
          </h2>

          <p className="text-[#31546D] mt-4 max-w-2xl mx-auto">
            Every adoption creates a beautiful story. Meet families who found
            their perfect furry companions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >
              <img
                src={story.image}
                alt={story.pet}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <div className="flex text-[#FFB1A0] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-[#649EC4]">
                  {story.pet} & {story.owner}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  "{story.story}"
                </p>

                <button className="mt-6 bg-[#FFB1A0] text-white px-5 py-2 rounded-xl hover:scale-105 transition">
                  Read Story
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;