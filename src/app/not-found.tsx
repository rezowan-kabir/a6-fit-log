import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <h1 className="text-[160px] font-bold text-[#a3e635] mb-2">404</h1>
      <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-400 text-sm mb-6">
        The page or workout you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-[#a3e635] text-black font-semibold rounded-md text-sm hover:bg-[#8ece28]"
      >
        Back to Home
      </Link>
    </div>
  );
}
