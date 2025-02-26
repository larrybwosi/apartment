'use client'
import { motion } from "framer-motion";
import { Code } from "lucide-react";

const projects = [
  {
    title: "Orion Property Suite",
    description:
      "A cutting-edge property management platform revolutionizing hospitality operations. Features real-time visitor tracking with facial recognition, automated check-in/out via mobile integration, and smart delivery management with IoT-enabled lockers. The financial dashboard provides AI-driven cash flow predictions and expense optimization insights. Integrated chat system enables direct communication with guests, while our reputation management module boosts online ratings by 65% through automated review responses and sentiment analysis.",
    tech: ["Next.js 15", "Hono", "TypeScript", "PostgreSQL", "AWS", "Redis"],
    image: "/hotel-management.jpg",
    icon: <Code className="h-6 w-6 text-indigo-600" />,
    color: "indigo",
  },
  // Add other projects following the same structure
];

const fadeInVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

const ProjectSection = () => (
  <section className="relative py-24 px-4 md:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold text-slate-900 mb-16 text-center"
      >
        Featured Innovations
      </motion.h2>

      <div className="space-y-20">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-500 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } flex flex-col`}
          >
            {/* Image Section */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:w-1/2 relative overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-transparent" />
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-96 object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-white/90 px-4 py-2 rounded-full">
                {project.icon}
                <span className="text-slate-800 font-medium">
                  {project.title}
                </span>
              </div>
            </motion.div>

            {/* Content Section */}
            <div className="md:w-1/2 p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  {project.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-10">
                  <h4 className="text-sm font-semibold text-slate-500 uppercase mb-4">
                    Tech Architecture
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-indigo-600">
                      65%
                    </div>
                    <div className="text-sm text-slate-500">
                      Faster Operations
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-indigo-600">
                      40%
                    </div>
                    <div className="text-sm text-slate-500">Cost Reduction</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Decorative Elements */}
    <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-indigo-500/10 to-transparent -z-10" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
  </section>
);

export default ProjectSection;
