import Link from "next/link";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-[#FFF0DD]">
      {/* Decorative Shapes */}
      <div className="absolute -top-28 -left-20 h-72 w-72 rounded-full bg-[#99CBB8]/30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#649EC4]/20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center rounded-full bg-[#99CBB8]/40 px-4 py-2 text-sm font-semibold text-[#31546D]">
              🐾 Adopt • Rescue • Love
            </span>

            <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold leading-tight text-[#31546D]">
              Find Your
              <span className="text-[#649EC4]"> Forever </span>
              Friend Today.
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#5F6F65] max-w-xl">
              Explore hundreds of adorable pets waiting for a loving home.
              Browse detailed pet profiles, send adoption requests, and
              give a rescued pet the family they deserve.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/pets">
                <button className="rounded-xl bg-[#FFB1A0] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                  🐶 Adopt Now
                </button>
              </Link>

              <Link href="/about">
                <button className="rounded-xl border-2 border-[#649EC4] bg-white px-8 py-4 text-lg font-semibold text-[#649EC4] transition hover:bg-[#649EC4] hover:text-white">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-14 flex flex-wrap gap-10">
              <div>
                <h3 className="text-3xl font-bold text-[#649EC4]">500+</h3>
                <p className="text-[#6B7280]">Pets Adopted</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#649EC4]">120+</h3>
                <p className="text-[#6B7280]">Happy Families</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#649EC4]">60+</h3>
                <p className="text-[#6B7280]">Shelters</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative flex justify-center">
            {/* Background Card */}
            <div className="absolute top-10 h-[420px] w-[420px] rounded-full bg-[#99CBB8]/40 blur-xl"></div>

            <div className="relative">
              <img
                src="/assets/Logo.png"
                alt="Happy Pet"
                className="relative z-10 w-full max-w-md"
              />

              {/* Floating Card */}
              <div className="absolute -bottom-5 -left-6 rounded-2xl bg-white p-5 shadow-xl">
                <p className="text-3xl">❤️</p>
                <h3 className="font-bold text-[#31546D]">
                  Adopt with Love
                </h3>
                <p className="text-sm text-gray-500">
                  Every adoption saves a life.
                </p>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-8 -right-5 rounded-2xl bg-[#649EC4] px-5 py-3 text-white shadow-lg">
                <p className="text-xl font-bold">🐾 100%</p>
                <p className="text-sm">Trusted Adoption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;