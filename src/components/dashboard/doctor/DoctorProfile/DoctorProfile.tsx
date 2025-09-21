/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Briefcase, BookOpen,  MapPin, Edit, UserPlus, BriefcaseBusiness } from "lucide-react";

import useFindUser from "../../../../reusableComponent/useFindUser";
import { useGetSingleDoctorQuery } from "../../../../app/redux/api/doctorApi";
import type { IDoctor } from "../../../../types/interface";

import user from '../../../../images/user.png'
import { useDispatch } from "react-redux";
import { openEdit } from "../../../../app/redux/features/modalSlice";

const DoctorProfile = () => {

  const dispatch = useDispatch();
  const {email} = useFindUser();
  console.log(email)

  const { data, error } = useGetSingleDoctorQuery(email);
  const doctor = data?.data as IDoctor | undefined;
  console.log(doctor);
  console.log(error);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-xl p-6 md:p-8 max-w-full mx-3 my-3 h-[90vh] overflow-y-scroll hide-scrollbar relative"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Image */}
        <div className="w-40 h-40 rounded-2xl overflow-hidden border shadow">
          <img
            src={doctor?.images?.length > 0 ? doctor?.images[0] : user}
            alt={doctor?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Basic Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800">{doctor?.name}</h2>
          <p className="text-blue-600 font-medium mt-1">
            BMDC No: {doctor?.bmdcNumber}
          </p>

          {/* Specialities */}
          {doctor?.specialities?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {doctor?.specialities.map((s:any, i:any) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 ">
        {/* Studies */}
        <div className="space-y-3 bg-gray-100 rounded p-3">
          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <BookOpen size={20} /> Studies
          </div>
          <ul className="list-disc list-inside text-gray-600">
            {doctor?.studies?.map((study:any, i:any) => (
              <li key={i}>{study}</li>
            ))}
          </ul>
        </div>

        {/* Experience */}
        <div className="space-y-3 bg-gray-100 rounded p-3">
          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <Briefcase size={20} /> Experience
          </div>
          <p className="text-gray-600">
            {doctor?.totalExperience} years of practice
          </p>
          {doctor?.currentlyWorking && (
            <p className="flex items-center gap-2 text-gray-600">
              <MapPin size={18} className="text-blue-500" />{" "}
              {doctor?.currentlyWorking}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      {doctor?.description && (
        <div className="mt-8 bg-gray-100 rounded p-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex">
            <UserPlus width={19}/> <p className="ml-1">About Doctor</p>
          </h3>
          <p className="text-gray-600 leading-relaxed">{doctor?.description}</p>
        </div>
      )}

      {/* Experience Detail */}
      {doctor?.experienceDetail && (
        <div className="mt-6 bg-gray-100 p-2 rounded">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex">
            <BriefcaseBusiness width={19}/>
            <p className="ml-2">Experience Detail</p>
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {doctor?.experienceDetail}
          </p>
        </div>
      )}

      {/* Gallery */}
      {doctor?.images?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Gallery
          </h3>
          <div className="flex flex-wrap gap-4">
            {doctor?.images.slice(1).map((img:any, i:any) => (
              <div
                key={i}
                className="w-32 h-32 rounded-lg overflow-hidden border shadow"
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <br />
          
        </div>
      )}

    <Edit onClick={() => {
      dispatch(openEdit({name: 'doctor-profile',data:doctor }));
    }} className="absolute top-5 right-5 cursor-pointer" />
    </motion.div>
  );
};

export default DoctorProfile;
