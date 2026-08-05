import { FaHeart, FaHome, FaPaw } from "react-icons/fa";

const reasons = [
  {
    icon: <FaHeart size={35} />,
    title: "Save a Life",
    description:
      "Every adoption gives a homeless pet a second chance at happiness and a loving family.",
  },
  {
    icon: <FaHome size={35} />,
    title: "Find a Loyal Companion",
    description:
      "Adopted pets become lifelong friends who bring unconditional love and joy.",
  },
  {
    icon: <FaPaw size={35} />,
    title: "Support Animal Welfare",
    description:
      "Choosing adoption helps shelters care for more rescued animals in need.",
  },
];

const WhyAdopt = () => {
  return (
    <section className="bg-[#FFF0DD] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[#649EC4] font-semibold uppercase tracking-wider">
            Why Choose Adoption
          </span>

          <h2 className="text-4xl font-bold mt-3 text-gray-800">
            Why Adopt a Pet?
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Bringing home a rescued pet changes two lives—theirs and yours.
            Discover the benefits of giving a loving animal a forever home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-full bg-[#99CBB8] flex items-center justify-center text-white mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold text-[#649EC4] mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;