import React, { useRef, useState, useEffect } from "react";
import { EnvelopeSimple, User, ChatText, Tag } from "@phosphor-icons/react";
import { useMutation } from "@animaapp/playground-react-sdk";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const subjects = [
  "Partnership",
  "Governance",
  "General",
  "Technical",
  "Investment",
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "General",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    create,
    isPending,
    error: mutationError,
  } = useMutation("ContactSubmission");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        },
      );
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }
    try {
      await create(formData);
      setSubmitted(true);
      setFormData({ fullName: "", email: "", subject: "General", message: "" });
    } catch {
      setFormError("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-neutral py-24 px-8"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-3xl mx-auto">
        <div ref={titleRef} className="text-center mb-12 opacity-0">
          <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">
            Contact
          </span>
          <h2
            id="contact-heading"
            className="text-foreground font-bold font-sans text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-4"
            style={{ letterSpacing: "-0.025em", lineHeight: "1.2" }}
          >
            Get in{" "}
            <span className="bg-gradient-1 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-muted-foreground font-serif text-lg">
            Whether you're a partner, investor, or community member — we'd love
            to hear from you.
          </p>
        </div>

        <div ref={formRef} className="opacity-0">
          {submitted ? (
            <div className="text-center p-12 rounded-lg bg-card border border-border">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                <EnvelopeSimple
                  size={36}
                  weight="fill"
                  className="text-success"
                />
              </div>
              <h3 className="text-foreground font-bold font-sans text-xl mb-2">
                Message Sent!
              </h3>
              <p className="text-muted-foreground font-sans text-base">
                Thank you for reaching out. We'll get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-3 text-sm font-normal rounded-md bg-cta-primary text-cta-primary-foreground hover:bg-tertiary/80 transition-colors duration-200 cursor-pointer font-sans"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-lg bg-card border border-border space-y-6"
              noValidate
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-foreground font-sans text-sm font-medium mb-2"
                >
                  Full Name <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <User
                    size={18}
                    weight="regular"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-200"
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-foreground font-sans text-sm font-medium mb-2"
                >
                  Email Address <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <EnvelopeSimple
                    size={18}
                    weight="regular"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-200"
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-foreground font-sans text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <div className="relative">
                  <Tag
                    size={18}
                    weight="regular"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-md bg-input border border-border text-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-200 appearance-none cursor-pointer"
                  >
                    {subjects.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className="bg-input text-foreground"
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-foreground font-sans text-sm font-medium mb-2"
                >
                  Message <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <ChatText
                    size={18}
                    weight="regular"
                    className="absolute left-3 top-4 text-muted-foreground"
                  />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry..."
                    required
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-200 resize-none"
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Errors */}
              {(formError || mutationError) && (
                <p className="text-warning font-sans text-sm" role="alert">
                  {formError || mutationError?.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 text-base font-normal rounded-md bg-cta-primary text-cta-primary-foreground hover:bg-tertiary/80 disabled:opacity-60 transition-colors duration-200 cursor-pointer font-sans"
                aria-label="Send message"
              >
                {isPending ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
