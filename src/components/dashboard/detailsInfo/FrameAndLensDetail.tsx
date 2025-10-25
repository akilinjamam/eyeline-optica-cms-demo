/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/FrameAndLensDetail.tsx
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import type { IFrame, ILens } from "../../../types/interface";
import type { FC } from "react";


interface FrameAndLensDetailProps {
  frame: IFrame;
  lens: ILens;
}

const FrameAndLensDetail: FC<FrameAndLensDetailProps> = ({ frame, lens }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mx-auto p-4"
    >
      {/* ---------------- Frame Section ---------------- */}
      <Card className="shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-gray-50 to-white p-6">
          <div className="w-full md:w-1/2">
            <motion.img
              src={frame.images?.[0]}
              alt={frame.name}
              className="w-full h-72 object-contain rounded-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="w-full md:w-1/2 space-y-3">
            <CardTitle className="text-xl font-semibold">{frame.name}</CardTitle>

            {frame.badge && (
              <Badge variant="secondary" className="capitalize">
                {frame.badge}
              </Badge>
            )}

            <div className="text-lg font-semibold text-gray-700">
              ৳{frame.salesPrice}
              {frame.discount > 0 && (
                <span className="ml-2 text-sm line-through text-gray-400">
                  ৳{frame.purchase}
                </span>
              )}
            </div>

            <div className="text-sm text-gray-600">
              <p>Brand: <span className="font-medium">{frame.brand}</span></p>
              <p>Color: {frame.color}</p>
              <p>Type: {frame.type}</p>
              <p>Stock: {frame.stock ? "Available ✅" : "Out of Stock ❌"}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4 text-sm md:text-base">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Frame Details</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Material: {frame.materialsCategory}</li>
              <li>Frame: {frame.frameCategory}</li>
              <li>Shape: {frame.shapeCategory}</li>
              <li>Size: {frame.sizeCategory}</li>
              <li>Gender: {frame.biologyCategory}</li>
            </ul>
          </div>

          {frame.features?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {frame.features.map((f:any, i:any) => (
                  <Badge key={i} variant="outline" className="capitalize">
                    {f}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ---------------- Lens Section ---------------- */}
      <Card className="shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-gray-50 to-white p-6">
          <div className="w-full md:w-1/2">
            <motion.img
              src={lens.images?.[0] || "/placeholder-lens.png"}
              alt={lens.name}
              className="w-full h-72 object-contain rounded-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="w-full md:w-1/2 space-y-3">
            <CardTitle className="text-xl font-semibold">{lens.name}</CardTitle>

            <div className="text-lg font-semibold text-gray-700">
              ৳{lens.salesPrice}
              {lens.discount > 0 && (
                <span className="ml-2 text-sm line-through text-gray-400">
                  ৳{lens.purchasePrice}
                </span>
              )}
            </div>

            <div className="text-sm text-gray-600">
              <p>Brand: {lens.brand || "N/A"}</p>
              <p>Type: {lens.lensType}</p>
              <p>Material: {lens.material}</p>
              <p>Stock: {lens.stock ? "Available ✅" : "Out of Stock ❌"}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4 text-sm md:text-base">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Lens Details</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Coatings: {lens.coatings?.join(", ") || "N/A"}</li>
              <li>Prescription Range: {lens.prescriptionRange || "N/A"}</li>
              <li>Index: {lens.index || "N/A"}</li>
              <li>Thickness: {lens.thickness || "N/A"}</li>
              <li>Diameter: {lens.diameter ? `${lens.diameter}mm` : "N/A"}</li>
              <li>Warranty: {lens.warranty || "N/A"}</li>
              <li>Delivery Time: {lens.deliveryTime || "N/A"}</li>
            </ul>
          </div>

          {lens.coatings?.length && lens.coatings.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Coatings</h3>
              <div className="flex flex-wrap gap-2">
                {lens.coatings.map((c, i) => (
                  <Badge key={i} variant="outline" className="capitalize">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FrameAndLensDetail;
