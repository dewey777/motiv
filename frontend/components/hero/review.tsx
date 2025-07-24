import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ReviewProps {
  avatar: string;
  className: string;
  name: string;
  job: string;
  description: string;
  delay: number;
}

export function Review({
  avatar,
  className,
  name,
  job,
  description,
  delay,
}: ReviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center mb-6">
        <div
          className={cn(
            "w-12 h-12 bg-gradient-to-r rounded-full flex items-center justify-center mr-4",
            className
          )}
        >
          <span className="text-xl">{avatar}</span>
        </div>
        <div>
          <h4 className="font-bold text-vermillion-400 font-baloo-2">{name}</h4>
          <p className="text-sm text-gray-500 font-nunito">{job}</p>
        </div>
      </div>
      <p
        className="text-slate-600 italic"
        style={{ fontFamily: "var(--font-nunito)" }}
      >
        {description}
      </p>
      <div className="flex mt-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">
            ⭐
          </span>
        ))}
      </div>
    </motion.div>
  );
}
