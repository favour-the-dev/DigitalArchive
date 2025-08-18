import Image from "next/image";
import Link from "next/link";
import MotionWrapper from "@/app/helpers/MotionHelper";
function Hero() {
  return (
    <section className="mb-10 wrapper flex flex-col md:flex-row items-center justify-between gap-8">
      {/* text */}
      <MotionWrapper className="w-full md:w-1/2 flex flex-col gap-4">
        <h4 className="text-sm font-medium text-brightPurple">
          Academic Research Management
        </h4>
        <h1 className="text-[#EBD3F8] text-4xl md:text-5xl font-bold">
          Empowering Smarter Research, Instantly.
        </h1>
        <p className="text-lg text-gray-300">
          A comprehensive digital archive system for managing, sharing, and
          accessing academic resources across departments and courses.
        </p>
        {/* cta */}
        <div className="w-full flex items-center justify-between gap-3">
          <Link
            href="/login"
            className="w-full text-center bg-[#EBD3F8] text-brightPurple p-3 md:p-4 rounded-sm 
            font-medium hover:opacity-80 transition duration-200 uppercase"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="w-full text-center bg-brightPurple text-white p-3 md:p-4 rounded-sm 
            font-medium hover:bg-brightPurple/90 transition duration-200 uppercase"
          >
            Sign Up
          </Link>
        </div>
      </MotionWrapper>
      {/* image */}
      <MotionWrapper
        className="w-full md:w-1/2 h-[300px] md:h-[450px] border-[3px] 
      border-dotted border-brightPurple rounded-md p-2"
      >
        <Image
          alt="Hero Image"
          src={"/hero-bg.jpg"}
          width={500}
          height={500}
          className="object-cover w-full h-full rounded-md"
        />
      </MotionWrapper>
    </section>
  );
}

export default Hero;
