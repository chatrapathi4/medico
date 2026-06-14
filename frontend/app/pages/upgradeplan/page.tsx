"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";

export default function UpgradePlanPage() {
const [tab, setTab] = useState("personal");

const plans = {
personal: [
{
name: "Medical AI Pro",
description: "Advanced AI analysis and premium models",
price: "₹499",
popular: true,
button: "Get Pro",
features: [
"Unlimited AI Queries",
"Advanced Medical Analysis",
"PDF Upload Support",
"Premium AI Models",
"Priority Support",
"Faster Responses",
],
},
{
name: "Medical AI Max",
description: "Unlimited usage and enterprise-grade AI",
price: "₹1499",
popular: false,
button: "Get Max",
features: [
"Everything in Pro",
"Unlimited File Processing",
"Research Mode",
"Custom Workflows",
"Priority Feature Access",
"Dedicated Support",
],
},
],


education: [
  {
    name: "Student Pro",
    description: "Built for students and researchers",
    price: "₹299",
    popular: true,
    button: "Verify as Student",
    features: [
      "Unlimited Study Queries",
      "Research Assistance",
      "Assignment Support",
      "Medical Learning Tools",
      "PDF Analysis",
      "Premium AI Models",
    ],
  },
  {
    name: "Educator Pro",
    description: "Designed for teachers and institutions",
    price: "₹799",
    popular: false,
    button: "Verify as Educator",
    features: [
      "Everything in Student",
      "Course Material Generation",
      "Research Tools",
      "Priority Support",
      "Institution Access",
      "Custom AI Workflows",
    ],
  },
],

business: [
  {
    name: "Enterprise Pro",
    description: "AI-powered healthcare teams",
    price: "₹2999",
    popular: true,
    button: "Continue with Enterprise",
    features: [
      "Team Collaboration",
      "Advanced Analytics",
      "Unlimited Queries",
      "Admin Controls",
      "Dedicated Support",
      "Healthcare Workflows",
    ],
  },
  {
    name: "Enterprise Max",
    description: "Unlimited performance at scale",
    price: "₹7999",
    popular: false,
    button: "Contact Sales",
    features: [
      "Everything in Enterprise",
      "Custom Integrations",
      "Priority Infrastructure",
      "Dedicated Manager",
      "Advanced Security",
      "Custom AI Models",
    ],
  },
],


};

const currentPlans =
plans[tab as keyof typeof plans];

return ( <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
{/* Background Glow */} <div className="absolute inset-0 pointer-events-none"> <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[120px]" /> <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-accent/10 blur-[120px]" /> </div>


  <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
    {/* Header */}
    <div className="text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        Select your plan
      </h1>

      <p className="mt-4 text-muted-foreground text-lg">
        Upgrade for a broader search experience and premium AI models.
      </p>

      {/* Tabs */}
      <div className="mt-8 inline-flex rounded-xl border border-border bg-card p-1">
        {["personal", "education", "business"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`px-6 py-2 rounded-lg text-sm capitalize transition-all ${
                tab === item
                  ? "bg-primary/10 border border-primary/30 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          )
        )}
      </div>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mt-10">
      {currentPlans.map((plan, index) => (
        <Card
          key={index}
          className={`
            glass
            relative
            flex
            flex-col
            p-5
            rounded-2xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:scale-[1.01]
            ${
              plan.popular
                ? "glow-border border-primary/40"
                : ""
            }
          `}
        >
          {/* Top Row */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-primary text-sm font-medium">
              + Premium Credits
            </span>

            {plan.popular && (
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary">
                Popular
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold">
            {plan.name}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {plan.description}
          </p>

          {/* Price */}
          <div className="mt-6">
            <span className="text-4xl font-bold">
              {plan.price}
            </span>

            <span className="ml-2 text-muted-foreground">
              /month
            </span>
          </div>

          <div className="my-6 border-t border-border" />

          {/* Features */}
          <div className="flex-1 space-y-3">
            {plan.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3"
              >
                <Check className="h-4 w-4 text-primary mt-1 shrink-0" />

                <span className="text-sm text-muted-foreground">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          {plan.popular ? (
            <Button className="mt-8 h-11 rounded-xl bg-primary text-primary-foreground hover:opacity-90">
              <Crown className="w-4 h-4 mr-2" />
              {plan.button}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="mt-8 h-11 rounded-xl"
            >
              {plan.button}
            </Button>
          )}
        </Card>
      ))}
    </div>

    {/* Footer */}
    <div className="mt-10 text-center text-sm text-muted-foreground">
      Secure payments • Cancel anytime • Instant activation
    </div>
  </div>
</div>


);
}
