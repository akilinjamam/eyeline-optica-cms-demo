/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import type { FC } from "react";

interface AccessoryDetailProps {
  accessory: any;
}

const AccessoryDetail: FC<AccessoryDetailProps> = ({ accessory }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mx-auto p-4"
    >
      {/* --- Main Accessory Card --- */}
      <Card className="shadow-xl border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
        <CardHeader className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-gray-50 to-white p-6">
          {/* --- Image Section --- */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center bg-white rounded-xl p-4 border border-gray-100"
          >
            <img
              src={accessory.images?.[0] || "/placeholder-accessory.png"}
              alt="Accessory"
              className="w-full max-h-80 object-contain rounded-lg"
            />
          </motion.div>

          {/* --- Info Section --- */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900">
                Accessory Collection
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1 capitalize">
                Type: {accessory.type}
              </p>
            </div>

            <div>
              {accessory.items.length > 0 && (
                <p className="text-gray-700 text-sm">
                  Total Items:{" "}
                  <span className="font-semibold">{accessory.items.length}</span>
                </p>
              )}
            </div>

            <div>
              <Badge variant="outline" className="capitalize bg-gray-50">
                {accessory.type}
              </Badge>
            </div>
          </div>
        </CardHeader>

        {/* --- Items Section --- */}
        <CardContent className="p-6 space-y-6">
          <h3 className="font-semibold text-gray-800 text-lg mb-2">
            Accessory Items
          </h3>

          {accessory.items.length === 0 ? (
            <p className="text-gray-500 italic">No accessory items added yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {accessory.items.map((item:any, i:any) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md bg-white flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {item.brand} • {item.category}
                    </p>

                    <p className="text-gray-700 text-base font-medium">
                      ৳{item.salesPrice}
                      {item.purchasePrice > item.salesPrice && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ৳{item.purchasePrice}
                        </span>
                      )}
                    </p>

                    {item.discount > 0 && (
                      <Badge
                        variant="secondary"
                        className="mt-1 bg-green-100 text-green-700 text-xs"
                      >
                        -{item.discount}% OFF
                      </Badge>
                    )}
                  </div>

                  <ul className="mt-3 text-xs text-gray-600 space-y-1">
                    <li>Quantity: {item.quantity}</li>
                    <li>Sold: {item.sold}</li>
                    <li>Measurement: {item.measurement}</li>
                    <li>
                      Stock:{" "}
                      {item.stock ? (
                        <span className="text-green-600 font-medium">Available</span>
                      ) : (
                        <span className="text-red-600 font-medium">Out of Stock</span>
                      )}
                    </li>
                  </ul>

                  {item.description && item.description !== "not-added" && (
                    <p className="text-gray-500 text-xs mt-3 italic line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AccessoryDetail;
