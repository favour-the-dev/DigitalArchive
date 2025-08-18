import MotionWrapper from "@/app/helpers/MotionHelper";
import { CiUser } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import { MdSchool } from "react-icons/md";
import { AiOutlineControl } from "react-icons/ai";

function UserRoles() {
  return (
    <section className="wrapper flex flex-col items-center gap-5 my-10">
      <MotionWrapper className="flex flex-col w-full md:max-w-[65%] mt-4 gap-2">
        <h2 className="text-brightPurple font-semibold text-2xl md:text-3xl text-center">
          User Roles
        </h2>
        <h3 className="text-[#EBD3F8] text-lg md:text-xl font-bold text-center">
          Tailoured for different academic needs.
        </h3>
        <p className="text-gray-300 text-center">
          Our system supports different user roles with specific permissions and
          interfaces.
        </p>
      </MotionWrapper>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {/* students */}
        <MotionWrapper className="flex flex-col gap-2 border-[3px] border-brightPurple/30 rounded-sm shadow-md p-4">
          <div className="w-full flex items-center gap-5">
            <div className="w-fit bg-blue-500 text-white p-3 rounded-md">
              <CiUser className="text-xl" />
            </div>
            <span className="text-blue-200 font-medium">Students</span>
          </div>
          <ul className="list-none flex flex-col gap-3 mt-2">
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <FaCircleCheck className="text-blue-500" />
              Browse academic materials
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <FaCircleCheck className="text-blue-500" />
              Search and filter documents
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <FaCircleCheck className="text-blue-500" />
              Download resources
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <FaCircleCheck className="text-blue-500" />
              Track download history
            </li>
          </ul>
        </MotionWrapper>

        {/* lecturers */}
        <MotionWrapper className="flex flex-col gap-2 border-[3px] border-brightPurple/30 rounded-sm shadow-md p-4">
          <div className="w-full flex items-center gap-5">
            <div className="w-fit bg-green-500 text-white p-3 rounded-md">
              <MdSchool className="text-xl" />
            </div>
            <span className="text-green-200 font-medium">Lecturers</span>
          </div>
          <ul className="list-none flex flex-col gap-3 mt-2">
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <FaCircleCheck className="text-green-500" />
              Upload academic materials
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <FaCircleCheck className="text-green-500" />
              Manage uploaded documents
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <FaCircleCheck className="text-green-500" />
              Track document usage
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <FaCircleCheck className="text-green-500" />
              View approval status of uploads
            </li>
          </ul>
        </MotionWrapper>

        {/* admin */}
        <MotionWrapper className="flex flex-col gap-2 border-[3px] border-brightPurple/30 rounded-sm shadow-md p-4">
          <div className="w-full flex items-center gap-5">
            <div className="w-fit bg-red-500 text-white p-3 rounded-md">
              <AiOutlineControl className="text-xl" />
            </div>
            <span className="text-red-200 font-medium">Administrators</span>
          </div>
          <ul className="list-none flex flex-col gap-3 mt-2">
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <FaCircleCheck className="text-red-500" />
              Manage user accounts
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <FaCircleCheck className="text-red-500" />
              Approve or reject document uploads
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <FaCircleCheck className="text-red-500" />
              View system logs and analytics
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <FaCircleCheck className="text-red-500" />
              Configure system settings
            </li>
          </ul>
        </MotionWrapper>
      </div>
    </section>
  );
}

export default UserRoles;
