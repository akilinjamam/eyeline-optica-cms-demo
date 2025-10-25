import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { Badge } from "../../../components/ui/badge";
import type { FC } from "react";

interface IEyeInfo {
  sphere: string;
  cylinder: string;
  axis: string;
}

interface EyePrescriptionDetailProps {
  pd: string;
  prescriptionImg: string[];
  submitType: string;
  leftEye: IEyeInfo;
  rightEye: IEyeInfo;
}

const EyePrescriptionDetail: FC<EyePrescriptionDetailProps> = ({
  pd,
  prescriptionImg,
  submitType,
  leftEye,
  rightEye,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mx-auto p-4"
    >
      <Card className="shadow-xl border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white">
        {/* ---------------- Header ---------------- */}
        <CardHeader className="bg-gradient-to-br from-gray-50 to-white">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Eye Prescription Details
          </CardTitle>
          <p className="text-gray-500 text-sm mt-1">
            PD: <span className="font-medium text-gray-800">{pd || "Not provided"}</span>
          </p>
          <Badge variant="outline" className="mt-3 capitalize bg-gray-50">
            {submitType || "unknown"}
          </Badge>
        </CardHeader>

        <Separator className="my-2" />

        {/* ---------------- Content ---------------- */}
        <CardContent className="p-6 space-y-8">
          {/* Left Eye Table */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-gray-800">Left Eye</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
              <table className="min-w-full border-collapse text-sm text-gray-700">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">Sphere</th>
                    <th className="px-4 py-2 text-left font-medium">Cylinder</th>
                    <th className="px-4 py-2 text-left font-medium">Axis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">{leftEye?.sphere || "-"}</td>
                    <td className="px-4 py-2">{leftEye?.cylinder || "-"}</td>
                    <td className="px-4 py-2">{leftEye?.axis || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Right Eye Table */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-gray-800">Right Eye</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
              <table className="min-w-full border-collapse text-sm text-gray-700">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">Sphere</th>
                    <th className="px-4 py-2 text-left font-medium">Cylinder</th>
                    <th className="px-4 py-2 text-left font-medium">Axis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">{rightEye?.sphere || "-"}</td>
                    <td className="px-4 py-2">{rightEye?.cylinder || "-"}</td>
                    <td className="px-4 py-2">{rightEye?.axis || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Prescription Images */}
          {prescriptionImg && prescriptionImg.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold text-gray-800">Prescription Image(s)</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {prescriptionImg.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-gray-50"
                  >
                    <img
                      src={img}
                      alt={`Prescription ${i + 1}`}
                      className="w-full h-48 object-contain bg-white"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EyePrescriptionDetail;
