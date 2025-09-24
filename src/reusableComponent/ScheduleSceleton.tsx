// SlotCardSkeleton.tsx
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { motion } from "framer-motion";

export const SlotCardSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4" // ✅ grid layout with 3 columns
    >
      {Array.from({ length: 20 }).map((_, i: number) => (
        <Card
          key={i}
          className="rounded-2xl shadow-sm border p-2 h-[100px] w-full"
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center text-sm">
              {/* Date & Time skeleton */}
              <Skeleton className="h-4 w-40 rounded-md" />
              {/* Badge skeleton */}
              <Skeleton className="h-5 w-16 rounded-full" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Patient info skeleton (optional) */}
            <Skeleton className="h-3 w-28 rounded-md" />
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
};
