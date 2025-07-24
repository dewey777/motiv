import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureProps {
  title: string;
  description: string;
  delay: number;
  className: string;
  icon: string;
}

export function Feature({
  title,
  delay,
  className,
  icon,
  description,
}: FeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.8, delay }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "w-16 h-16 bg-gradient-to-r rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg",
          className
        )}
      >
        <span className="text-2xl">{icon}</span>
      </motion.div>
      <h4 className="text-xl font-bold text-vermillion-400 mb-4 font-baloo-2">
        {title}
      </h4>
      <p className="text-slate-600 font-nunito">{description}</p>
    </motion.div>
  );
}
