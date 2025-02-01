"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { MotionDiv } from "../motion";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

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

const hoverVariants = {
  hover: { y: -5, scale: 1.02 },
  tap: { scale: 0.98 },
};

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: values.name,
          from_email: values.email,
          phone_number: values.phone,
          message: values.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/10"
      id="contact"
    >
      <div className="container mx-auto px-4">
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <MotionDiv variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground">
              Get In Touch
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              Reach out to us – we&apos;re here to help you find your perfect
              space
            </p>
          </MotionDiv>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info Cards */}
            <MotionDiv variants={itemVariants} className="space-y-8">
              <MotionDiv
                variants={hoverVariants}
                whileHover="hover"
                whileTap="tap"
                className="p-6 rounded-xl bg-background border border-muted shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Office</h3>
                    <p className="text-muted-foreground">
                      123 Urban Street
                      <br />
                      Cityville, ST 12345
                    </p>
                  </div>
                </div>
              </MotionDiv>

              <MotionDiv
                variants={hoverVariants}
                whileHover="hover"
                whileTap="tap"
                className="p-6 rounded-xl bg-background border border-muted shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                    <p className="text-muted-foreground">Mon-Fri: 9am - 7pm</p>
                  </div>
                </div>
              </MotionDiv>

              <MotionDiv
                variants={hoverVariants}
                whileHover="hover"
                whileTap="tap"
                className="p-6 rounded-xl bg-background border border-muted shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                    <p className="text-muted-foreground">
                      info@urbanheights.com
                    </p>
                    <p className="text-muted-foreground">
                      Response within 24hrs
                    </p>
                  </div>
                </div>
              </MotionDiv>
            </MotionDiv>

            {/* Contact Form */}
            <MotionDiv variants={itemVariants}>
              <div className="p-8 rounded-2xl bg-background border border-muted shadow-xl">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className="h-12 rounded-lg border-muted focus-visible:ring-primary"
                            />
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              {...field}
                              className="h-12 rounded-lg border-muted focus-visible:ring-primary"
                            />
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="(555) 123-4567"
                              {...field}
                              className="h-12 rounded-lg border-muted focus-visible:ring-primary"
                            />
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            Your Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="I'm interested in learning more about..."
                              className="min-h-[150px] rounded-lg border-muted focus-visible:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary rounded-lg transition-all"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </MotionDiv>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
