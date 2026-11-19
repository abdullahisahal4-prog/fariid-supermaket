import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Visit Us | Fariid Supermarket" },
      {
        name: "description",
        content:
          "Get in touch with Fariid Supermarket for everyday shopping enquiries and store information.",
      },
      { property: "og:title", content: "Contact Fariid Supermarket" },
      { property: "og:description", content: "We’re here to help with your everyday shopping." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <main>
      <section className="page-heading">
        <div className="site-width">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>Contact Us
          </div>
          <h1>Let’s talk. We’re here to help.</h1>
          <p>Questions about a product or your next shopping trip? Get in touch.</p>
        </div>
      </section>
      <section className="site-width content-layout">
        <div>
          <h2>Contact Fariid Supermarket</h2>
          <div className="notice">
            Our store contact details are being added. Phone, WhatsApp ordering, directions and
            social links will be available once confirmed.
          </div>
          <div className="contact-detail">
            <Phone />
            <div>
              <strong>Call our store</strong>
              <p>Phone number to be confirmed</p>
            </div>
          </div>
          <div className="contact-detail">
            <MessageCircle />
            <div>
              <strong>Order on WhatsApp</strong>
              <p>WhatsApp number to be confirmed</p>
            </div>
          </div>
          <div className="contact-detail">
            <MapPin />
            <div>
              <strong>Visit Fariid Supermarket</strong>
              <p>Store address and map to be confirmed</p>
            </div>
          </div>
        </div>
        <div>
          <h2>Send us a message</h2>
          {sent ? (
            <div className="notice flex gap-3">
              <CheckCircle />
              <span>
                Message preview saved for this visit. This demonstration does not send messages to
                the store.
              </span>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label>
                Your name
                <input required placeholder="Full name" />
              </label>
              <label>
                Email address
                <input required type="email" placeholder="you@example.com" />
              </label>
              <label>
                Message
                <textarea required placeholder="How can we help?" />
              </label>
              <p className="text-xs text-muted-foreground">
                Demonstration form — messages are not delivered.
              </p>
              <Button type="submit">
                <Send />
                Preview message
              </Button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
