import Link from "next/link";
import {
  FaHome,
  FaClipboardList,
  FaPlusCircle,
  FaPaw,
} from "react-icons/fa";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-[#FFF0DD]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#649EC4] text-white shadow-lg">
        <div className="p-6 border-b border-white/20">
          <h1 className="text-3xl font-bold">
            Pet<span className="text-[#FFB1A0]">Adopt</span>
          </h1>

          <p className="text-sm text-white/80">
            Dashboard
          </p>
        </div>

        <nav className="flex flex-col p-5 gap-3">
          {/* <Link
            href="/dashboardPage"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#99CBB8]"
          >
            <FaHome />
            Dashboard
          </Link> */}

          <Link
            href="/myRequests"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#99CBB8]"
          >
            <FaClipboardList />
            My Requests
          </Link>

          <Link
            href="/addPet"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#99CBB8]"
          >
            <FaPlusCircle />
            Add Pet
          </Link>

          <Link
            href="/myListingPage"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#99CBB8]"
          >
            <FaPaw />
            My Listings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}