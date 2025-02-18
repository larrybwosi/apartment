"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Award, Building2, Users, Clock } from "lucide-react";

const stats = [
  { icon: Building2, label: "Properties", value: "50+" },
  { icon: Users, label: "Happy Residents", value: "1000+" },
  { icon: Clock, label: "Years Experience", value: "15+" },
  { icon: Award, label: "Awards", value: "20+" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 },
  },
};

export function AboutSection() {
  return (
    <section
      className="py-16 md:py-24 bg-linear-to-b from-background to-muted/10"
      id="about"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Heading Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-primary to-foreground">
              Redefining Urban Living
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium">
              Where contemporary design meets unparalleled comfort
            </p>
          </motion.div>

          {/* Description Text */}
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto mb-16 text-center"
          >
            <div className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed font-medium text-muted-foreground">
                <span className="text-primary font-semibold">
                  Urban Heights
                </span>{" "}
                stands as a testament to modern architectural brilliance,
                offering a curated living experience that harmonizes luxury with
                functionality. Our spaces are designed to inspire and elevate
                everyday life.
              </p>
              <p className="text-lg md:text-xl leading-relaxed font-medium text-muted-foreground">
                With over a decade of excellence, we&apos;ve crafted environments
                that don&apos;t just meet expectations, but redefine them through
                innovative design and meticulous attention to detail.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Card className="p-8 rounded-xl bg-background border border-muted/50 shadow-xs hover:shadow-lg transition-all">
                  <div className="flex flex-col items-center">
                    <div className="mb-6 p-4 bg-primary/10 rounded-full">
                      <stat.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-r from-primary to-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-semibold space-x-3 bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              <span>Download Brochure</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
