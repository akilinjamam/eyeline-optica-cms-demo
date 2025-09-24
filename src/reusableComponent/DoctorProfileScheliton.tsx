import { motion } from "framer-motion";

export default function DoctorProfileSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-xl p-6 md:p-8 max-w-full mx-3 my-3 h-[90vh] overflow-y-scroll hide-scrollbar relative"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 animate-pulse">
        {/* Profile Image */}
        <div className="w-40 h-40 rounded-2xl overflow-hidden border shadow bg-gray-200" />

        {/* Basic Info */}
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-200 rounded w-32" />

          {/* Specialities */}
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="h-6 bg-gray-200 rounded-full w-20" />
            <div className="h-6 bg-gray-200 rounded-full w-16" />
            <div className="h-6 bg-gray-200 rounded-full w-24" />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 animate-pulse">
        {/* Studies */}
        <div className="space-y-3 bg-gray-100 rounded p-3">
          <div className="h-5 bg-gray-200 rounded w-28" />
          <ul className="space-y-2">
            <li className="h-4 bg-gray-200 rounded w-3/4" />
            <li className="h-4 bg-gray-200 rounded w-2/3" />
            <li className="h-4 bg-gray-200 rounded w-1/2" />
          </ul>
        </div>

        {/* Experience */}
        <div className="space-y-3 bg-gray-100 rounded p-3">
          <div className="h-5 bg-gray-200 rounded w-32" />
          <div className="h-4 bg-gray-200 rounded w-40" />
          <div className="h-4 bg-gray-200 rounded w-52" />
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 bg-gray-100 rounded p-3 animate-pulse space-y-2">
        <div className="h-5 bg-gray-200 rounded w-40" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>

      {/* Experience Detail */}
      <div className="mt-6 bg-gray-100 rounded p-3 animate-pulse space-y-2">
        <div className="h-5 bg-gray-200 rounded w-48" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>

      {/* Gallery */}
      <div className="mt-8 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-28 mb-3" />
        <div className="flex flex-wrap gap-4">
          <div className="w-32 h-32 bg-gray-200 rounded-lg" />
          <div className="w-32 h-32 bg-gray-200 rounded-lg" />
          <div className="w-32 h-32 bg-gray-200 rounded-lg" />
        </div>
      </div>

      {/* Floating Edit Icon */}
      <div className="absolute top-5 right-5 h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
    </motion.div>
  );
}
