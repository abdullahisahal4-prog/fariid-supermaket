import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Tag, HeartHandshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/fresh-market.jpg";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Fariid Supermarket" },
      {
        name: "description",
        content:
          "Fariid Supermarket brings quality products, affordable prices and excellent customer service to your everyday shopping.",
      },
      { property: "og:title", content: "Get to know Fariid Supermarket" },
      {
        property: "og:description",
        content: "Your trusted store for quality, value and friendly service.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});
function About() {
  return (
    <main>
      <section className="page-heading">
        <div className="site-width">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>About Us
          </div>
          <h1>Your neighbourhood. Your supermarket.</h1>
          <p>Good products, fair prices and a warm welcome.</p>
        </div>
      </section>
      <section className="site-width content-layout">
        <div>
          <h2>Everyday needs, thoughtfully met.</h2>
          <p>
            At Fariid Supermarket, we believe shopping for your home should be simple and
            affordable. We bring together fresh produce, pantry staples and household essentials so
            you can find what you need in one place.
          </p>
          <p>
            Our commitment is simple: quality products, affordable prices and excellent customer
            service. Whether you’re picking up a few essentials or filling your family’s basket,
            we’re here to help.
          </p>
          {[
            {
              Icon: Leaf,
              title: "Quality in every aisle",
              text: "Fresh produce and thoughtfully selected everyday products.",
            },
            {
              Icon: Tag,
              title: "Value for your home",
              text: "Affordable prices that make everyday shopping go further.",
            },
            {
              Icon: HeartHandshake,
              title: "Service with a smile",
              text: "A friendly team that puts your shopping needs first.",
            },
          ].map(({ Icon, title, text }) => (
            <div className="value-row" key={title}>
              <Icon />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
          <Button asChild>
            <Link to="/shop" search={{ q: "", category: "all", offers: false }}>
              Explore our shelves
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <img
          className="about-image"
          src={hero}
          alt="A basket of fresh produce"
          width={1600}
          height={912}
          loading="lazy"
        />
      </section>
    </main>
  );
}
