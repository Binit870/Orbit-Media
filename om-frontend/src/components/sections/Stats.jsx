import { Eye, Star, Video } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: <Eye strokeWidth={2.5} className="h-7 w-7" />,
    badgeColor: "#D9F5C5",
    iconColor: "#0B0F1A",
    title: "500M+ views generated",
  },
  {
    icon: <Star strokeWidth={2.5} className="h-7 w-7" fill="currentColor" />,
    badgeColor: "#B8B5FF",
    iconColor: "#0B0F1A",
    title: "3 Years of Building Brands",
  },
  {
    icon: <Video strokeWidth={2.5} className="h-7 w-7" fill="currentColor" />,
    badgeColor: "#F5E663",
    iconColor: "#0B0F1A",
    title: "6000+ Videos Created",
  },
];

// Badge Component
function ScallopedBadge({ color, children, iconColor }) {
  return (
    <div className="relative h-[88px] w-[88px]">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
      >
        <path
          fill={color}
          d="M50 2 L58 8 L67 5 L72 13 L82 14 L83 24 L91 30 L88 39 L94 47 L88 55 L92 65 L84 70 L83 80 L73 81 L67 89 L58 86 L50 92 L42 86 L33 89 L27 81 L17 80 L16 70 L8 65 L12 55 L6 47 L12 39 L9 30 L17 24 L18 14 L28 13 L33 5 L42 8 Z"
        />
      </svg>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ color: iconColor }}
      >
        {children}
      </div>
    </div>
  );
}

// Main Component
function StatsSection() {
  return (
    <section
      className="relative w-full overflow-hidden py-16"
      style={{
        backgroundColor: "#0A0E1A",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-3">

        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-6 px-2"
          >
            <ScallopedBadge
              color={stat.badgeColor}
              iconColor={stat.iconColor}
            >
              {stat.icon}
            </ScallopedBadge>

            <h3 className="max-w-[260px] text-2xl font-bold leading-snug text-white">
              {stat.title}
            </h3>
          </motion.div>
        ))}

      </div>
    </section>
  );
}

export default StatsSection;