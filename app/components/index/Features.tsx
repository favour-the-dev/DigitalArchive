import MotionWrapper from "@/app/helpers/MotionHelper";
import { FaBook } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { IoShieldOutline } from "react-icons/io5";
import { FaDatabase } from "react-icons/fa";

function Features() {
  return (
    <section className="wrapper flex flex-col items-center gap-5 my-10">
      <MotionWrapper className="flex flex-col w-full md:max-w-[65%] mt-4 gap-2">
        <h2 className="text-brightPurple font-semibold text-2xl md:text-3xl text-center">
          Features
        </h2>
        <h3 className="text-[#EBD3F8] text-lg md:text-xl font-bold text-center">
          Everything you need for academic resource management
        </h3>
        <p className="text-gray-300 text-center">
          Our digital archive system provides a comprehensive solution for
          students, lecturers, and administrators.
        </p>
      </MotionWrapper>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {/* feat-1 */}
        <MotionWrapper className="flex flex-col gap-2 border-[3px] rounded-sm border-dotted border-brightPurple/60 p-4">
          <div className="w-fit bg-brightPurple p-3 rounded-md">
            <FaBook />
          </div>
          <h4 className="font-medium text-[#EBD3F8] md:text-lg">
            Comprehensive Document Repository
          </h4>
          <p className="text-sm text-gray-300">
            Access lecture notes, assignments, past questions, and other
            academic materials in one centralized location.
          </p>
        </MotionWrapper>
        <MotionWrapper className="flex flex-col gap-2 border-[3px] rounded-sm border-dotted border-brightPurple/60 p-4">
          <div className="w-fit bg-brightPurple p-3 rounded-md">
            <FaSearch />
          </div>
          <h4 className="font-medium text-[#EBD3F8] md:text-lg">
            Advanced Search Functionality
          </h4>
          <p className="text-sm text-gray-300">
            Quickly find resources by keyword, course code, department, or
            document type with our powerful search tools.
          </p>
        </MotionWrapper>
        <MotionWrapper className="flex flex-col gap-2 border-[3px] rounded-sm border-dotted border-brightPurple/60 p-4">
          <div className="w-fit bg-brightPurple p-3 rounded-md">
            <MdOutlineFileUpload />
          </div>
          <h4 className="font-medium text-[#EBD3F8] md:text-lg">
            Simple Upload Process
          </h4>
          <p className="text-sm text-gray-300">
            Lecturers can easily upload and manage academic resources with our
            streamlined document submission system.
          </p>
        </MotionWrapper>
        <MotionWrapper className="flex flex-col gap-2 border-[3px] rounded-sm border-dotted border-brightPurple/60 p-4">
          <div className="w-fit bg-brightPurple p-3 rounded-md">
            <FiUsers />
          </div>
          <h4 className="font-medium text-[#EBD3F8] md:text-lg">
            Role-Based Access Control
          </h4>
          <p className="text-sm text-gray-300">
            Different interfaces and permissions for students, lecturers, and
            administrators to ensure proper resource management.
          </p>
        </MotionWrapper>
        <MotionWrapper className="flex flex-col gap-2 border-[3px] rounded-sm border-dotted border-brightPurple/60 p-4">
          <div className="w-fit bg-brightPurple p-3 rounded-md">
            <IoShieldOutline />
          </div>
          <h4 className="font-medium text-[#EBD3F8] md:text-lg">
            Content Moderation
          </h4>
          <p className="text-sm text-gray-300">
            Ensure quality and appropriateness of all uploaded materials through
            our administrator approval system.
          </p>
        </MotionWrapper>
        <MotionWrapper className="flex flex-col gap-2 border-[3px] rounded-sm border-dotted border-brightPurple/60 p-4">
          <div className="w-fit bg-brightPurple p-3 rounded-md">
            <FaDatabase />
          </div>
          <h4 className="font-medium text-[#EBD3F8] md:text-lg">
            Comprehensive Analytics
          </h4>
          <p className="text-sm text-gray-300">
            Track document usage, popular resources, and user activity with
            detailed system reports and logs.
          </p>
        </MotionWrapper>
      </div>
    </section>
  );
}

export default Features;
