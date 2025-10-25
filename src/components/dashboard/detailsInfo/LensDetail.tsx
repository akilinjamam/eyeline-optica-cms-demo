import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import type { ILens } from "../../../types/interface";
import type { FC } from "react";

interface LensDetailProps {
  lens: ILens;
}

const LensDetail: FC<LensDetailProps> = ({ lens }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mx-auto p-4"
    >
      <Card className="shadow-xl border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
        <CardHeader className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-gray-50 to-white p-6">
          {/* --- Lens Image --- */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center bg-white rounded-xl p-4 border border-gray-100"
          >
            <img
              src={lens.images?.[0] || "/placeholder-lens.png"}
              alt={lens.name}
              className="w-full max-h-80 object-contain rounded-lg"
            />
          </motion.div>

          {/* --- Lens Info --- */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900">
                {lens.name}
              </CardTitle>

              <p className="text-sm text-gray-500 mt-1 capitalize">
                {lens.lensType} • {lens.material}
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">
                ৳{lens.salesPrice}
                {lens.discount > 0 && (
                  <span className="ml-3 text-sm text-gray-400 line-through">
                    ৳{lens.purchasePrice}
                  </span>
                )}
              </p>
              {lens.discount > 0 && (
                <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700">
                  -{lens.discount}% OFF
                </Badge>
              )}
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>Brand: {lens.brand || "N/A"}</p>
              <p>Stock: {lens.stock ? "✅ Available" : "❌ Out of Stock"}</p>
              <p>Category: {lens.category}</p>
              <p>Sold: {lens.sold}</p>
            </div>
          </div>
        </CardHeader>

        {/* --- Lens Details --- */}
        <CardContent className="p-6 space-y-6 text-sm md:text-base">
          <section>
            <h3 className="font-semibold text-gray-800 mb-2">Lens Details</h3>
            <ul className="text-gray-600 grid sm:grid-cols-2 gap-x-8 gap-y-2">
              <li>Prescription Range: {lens.prescriptionRange || "N/A"}</li>
              <li>Index: {lens.index || "N/A"}</li>
              <li>Thickness: {lens.thickness || "N/A"}</li>
              <li>Diameter: {lens.diameter ? `${lens.diameter}mm` : "N/A"}</li>
              <li>Warranty: {lens.warranty || "N/A"}</li>
              <li>Delivery Time: {lens.deliveryTime || "N/A"}</li>
            </ul>
          </section>

          {lens.coatings?.length && lens.coatings?.length  > 0 && (
            <section>
              <h3 className="font-semibold text-gray-800 mb-2">Coatings</h3>
              <div className="flex flex-wrap gap-2">
                {lens.coatings.map((c, i) => (
                  <Badge key={i} variant="outline" className="capitalize bg-gray-50">
                    {c}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {lens.description && (
            <section>
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{lens.description}</p>
            </section>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LensDetail;
