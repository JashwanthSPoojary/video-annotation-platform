import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-md border-b border-white/10">
      <div className="max-w-5xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-landingWhite">
            <div className="absolute inset-2 rounded-full bg-landingBlack"></div>
          </div>
          <span className="text-base sm:text-lg font-medium">VideoAno</span>
        </Link>

        {/* Sign In Button */}
        <div className="flex items-center">
          <Link
            href="/signin"
            className="text-sm sm:text-base font-medium bg-landingWhite text-landingBlack px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition hover:opacity-90"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
