import MotionWrapper from "@/app/helpers/MotionHelper";
import Link from "next/link";

function Banner() {
  return (
    <section
      className="mt-10 bg-gradient-to-br from-[#0a0a0f] via-[#1a0b24] to-[#7a1cac]/70 
    text-gray-100 p-3"
    >
      <div
        className="wrapper flex flex-col md:flex-row items-center gap-5 
        justify-between"
      >
        {/* text */}
        <MotionWrapper
          className="w-full md:w-1/2 flex flex-col items-center 
        md:items-start justify-center md:justify-start"
        >
          <h2 className="text-xl md:text-2xl font-semibold">
            Ready To Get Started?
          </h2>
          <h3 className="text-gray-400 md:text-lg font-medium">
            Create An Account Today.
          </h3>
        </MotionWrapper>

        {/* cta */}
        <MotionWrapper
          className="w-full md:w-1/2 flex flex-col items-center md:items-end 
      justify-center md:justify-end gap-3"
        >
          <Link
            href="/signup"
            className="w-fit text-center bg-[#7a1cac] text-white p-3 md:p-0 md:px-6 md:py-4 rounded-sm 
  font-medium hover:opacity-90 transition duration-200 uppercase"
          >
            Get Started
          </Link>
        </MotionWrapper>
      </div>
    </section>
  );
}

export default Banner;
