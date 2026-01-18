"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Shield, ArrowRight, Zap, TrendingUp } from "lucide-react"

export default function LandingPage({ onGetStarted, onSignIn }: { onGetStarted: () => void; onSignIn: () => void }) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const handleGetStarted = () => {
    return null;
  }

  const handleSignIn = () => {
    return null;
  }

  return (
    <div className = "min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className = "sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <div className="inline-flex items-center whitespace-nowrap">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl item-center">
             <div className = "flex justify-center items-center">
              <img
                src       = "/basenalu_logo.png"
                alt       = "Customer and Courier Connection"
                className = "max-w-sm w-full h-auto  transition-transform duration-300"
              />
            </div>
          </div>
          <div className="ml-1">
            <div className = "text-2xl font-bold text-black">Basenalu</div>
            <p className=" text-xs text-muted-foreground">Fast, reliable courier service at your fingertips</p>
          </div>        
      </div>
      <div className = "hidden md:flex gap-8">
      <a   href      = "#features" className = "text-foreground/70 hover:text-foreground transition">
              Features
            </a>
            <a href = "#how-it-works" className = "text-foreground/70 hover:text-foreground transition">
              How it Works
            </a>
            <a href = "#pricing" className = "text-foreground/70 hover:text-foreground transition">
              Pricing
            </a>
          </div>
          <div className = "flex items-center gap-4">
            <Button
              variant   = "ghost"
              onClick   = {handleSignIn}
              className = "hidden sm:inline-flex hover:bg-muted transition-colors font-medium"
            >
              Sign In
            </Button>
            <Button
              onClick   = {handleGetStarted}
              className = "rounded-full px-6 bg-primary hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className = "pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <div     className = "max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div     className = "space-y-8">
      <div     className = "inline-block px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-full text-sm font-medium text-secondary">
              Fast • Reliable • Trusted
            </div>
            <h1 className = "text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Delivery made{" "}
              <span className = "text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                simple & fast
              </span>
            </h1>
            <p className = "text-xl text-foreground/60 leading-relaxed">
              Connect with verified couriers near you. Track your deliveries in real-time. Ship anything, anytime.
            </p>
            <div    className = "flex flex-col sm:flex-row gap-4 pt-4">
            <Button onClick = {handleGetStarted} size = "lg" className = "rounded-full gap-2">
            Start   Delivering <ArrowRight className = "w-4 h-4" />
              </Button>
              <Button variant = "outline" size = "lg" className = "rounded-full bg-transparent">
                Learn More
              </Button>
            </div>
            <div className = "flex gap-8 pt-8">
              <div>
                <div className = "text-2xl font-bold text-primary">100+</div>
                <p   className = "text-sm text-foreground/60">Active Deliveries</p>
              </div>
              <div>
                <div className = "text-2xl font-bold text-secondary">98%</div>
                <p   className = "text-sm text-foreground/60">On-time Rate</p>
              </div>
              <div>
                <div className = "text-2xl font-bold text-primary">30+</div>
                <p   className = "text-sm text-foreground/60">Trusted Couriers</p>
              </div>
            </div>
          </div>

          <div className = "relative h-96 lg:h-full flex items-center justify-center">
          <div className = "absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent rounded-3xl blur-3xl" />
          <div className = "relative">
          <div className = "absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent rounded-full blur-2xl" />
              <img
                src       = "/istockphoto-1297325715-612x612.jpg"
                alt       = "Professional Courier with Package"
                className = "relative w-100 h-100 object-cover rounded-full shadow-2xl border-8 border-background/50 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id        = "features" className = "py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div     className = "max-w-7xl mx-auto">
      <div     className = "text-center mb-16">
      <h2      className = "text-4xl lg:text-5xl font-bold mb-4">Why Choose Us</h2>
      <p       className = "text-xl text-foreground/60 max-w-2xl mx-auto">
              Everything you need for fast, reliable deliveries
            </p>
          </div>

          <div className = "grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon       : Zap,
                title      : "Lightning Fast",
                description: "Get matched with nearby couriers instantly",
              },
              {
                icon       : Shield,
                title      : "Fully Verified",
                description: "All couriers undergo KYC and verification",
              },
              {
                icon       : Clock,
                title      : "Real-time Tracking",
                description: "Track every delivery step with live updates",
              },
              {
                icon       : TrendingUp,
                title      : "Earn More",
                description: "Couriers earn competitive rates with bonuses",
              },
            ].map((feature, idx) => (
              <div
                key          = {idx}
                onMouseEnter = {() => setHoveredFeature(idx)}
                onMouseLeave = {() => setHoveredFeature(null)}
                className    = {`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  hoveredFeature === idx
                    ? "bg-card border-primary/50 shadow-lg shadow-primary/10"
                    :  "bg-background border-border hover:border-primary/30"
                }`}
              >
                <div          className = "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                <feature.icon className = "w-6 h-6 text-primary" />
                </div>
                <h3 className = "text-lg font-semibold mb-2">{feature.title}</h3>
                <p  className = "text-foreground/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id        = "how-it-works" className = "py-20 px-4 sm:px-6 lg:px-8">
      <div     className = "max-w-7xl mx-auto">
      <div     className = "text-center mb-16">
      <h2      className = "text-4xl lg:text-5xl font-bold mb-4">Two Ways to Use <u>Basenalu</u></h2>
      <p       className = "text-xl text-foreground/60">Whether you're sending or delivering, it's simple</p>
          </div>

          <div className = "grid md:grid-cols-2 gap-12">
            {/* Customer Flow */}
            <div  className = "space-y-6">
            <h3   className = "text-2xl font-bold text-primary flex items-center gap-2">
            <span className = "w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  C
                </span>
                For Customers
              </h3>
              {[
                { num: 1, title: "Enter Details", desc: "Tell us what you need delivered" },
                { num: 2, title: "Get Matched", desc: "We find verified couriers nearby" },
                { num: 3, title: "Track Live", desc: "See your package in real-time" },
                { num: 4, title: "Delivered", desc: "Receive confirmation instantly" },
              ].map((step) => (
                <div key       = {step.num} className = "flex gap-4 group hover:bg-muted/50 p-3 rounded-lg transition">
                <div className = "flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary/30 transition">
                    {step.num}
                  </div>
                  <div>
                    <p className = "font-semibold text-foreground group-hover:text-primary transition">{step.title}</p>
                    <p className = "text-sm text-foreground/60">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Central Illustration
            <div className = "flex justify-center items-center">
              <img
                src       = "/delivery-courier-ordering-groceries-vector-44588162_copy.jpg"
                alt       = "Customer and Courier Connection"
                className = "max-w-sm w-full h-auto  transition-transform duration-300"
              />
            </div> */}

            {/* Courier Flow */}
            <div  className = "space-y-6">
            <h3   className = "text-2xl font-bold text-secondary flex items-center gap-2">
            <span className = "w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-sm font-bold text-secondary">
                  D
                </span>
                For Couriers
              </h3>
              {[
                { num: 1, title: "Create Account", desc: "Quick registration with KYC docs" },
                { num: 2, title: "Find Nearby", desc: "See all delivery requests around you" },
                { num: 3, title: "Accept Jobs", desc: "Pick jobs that suit your schedule" },
                { num: 4, title: "Earn Money", desc: "Get paid instantly after delivery" },
              ].map((step) => (
                <div key       = {step.num} className = "flex gap-4 group hover:bg-muted/50 p-3 rounded-lg transition">
                <div className = "flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-bold text-secondary group-hover:bg-secondary/30 transition">
                    {step.num}
                  </div>
                  <div>
                    <p className = "font-semibold text-foreground group-hover:text-secondary transition">{step.title}</p>
                    <p className = "text-sm text-foreground/60">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connection Flow Visualization */}
          <div className = "mt-16 pt-12 border-t border-border">
          <div className = "grid md:grid-cols-3 gap-6">
          <div className = "text-center p-6">
          <div className = "w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4">
          <svg className = "w-8 h-8 text-primary" fill = "none" stroke = "currentColor" viewBox = "0 0 24 24">
                    <path
                      strokeLinecap  = "round"
                      strokeLinejoin = "round"
                      strokeWidth    = {2}
                      d              = "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h4 className = "font-semibold mb-2">Request Created</h4>
                <p  className = "text-sm text-foreground/60">Customer submits a delivery request with package details</p>
              </div>
              <div className = "text-center p-6">
              <div className = "w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-secondary/10 flex items-center justify-center mx-auto mb-4">
              <svg className = "w-8 h-8 text-primary" fill = "none" stroke = "currentColor" viewBox = "0 0 24 24">
                    <path
                      strokeLinecap  = "round"
                      strokeLinejoin = "round"
                      strokeWidth    = {2}
                      d              = "M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h4 className = "font-semibold mb-2">Instant Matching</h4>
                <p  className = "text-sm text-foreground/60">System finds nearby verified couriers instantly</p>
              </div>
              <div  className     = "text-center p-6">
              <div  className     = "w-16 h-16 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mx-auto mb-4">
              <svg  className     = "w-8 h-8 text-secondary" fill = "none" stroke       = "currentColor" viewBox = "0 0 24 24">
              <path strokeLinecap = "round" strokeLinejoin        = "round" strokeWidth = {2} d                  = "M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className = "font-semibold mb-2">Delivery Happens</h4>
                <p  className = "text-sm text-foreground/60">Courier picks up and delivers with real-time tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className = "py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
      <div     className = "max-w-7xl mx-auto">
      <div     className = "grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              // { label: "Cities", value: "150+" },
              // { label: "Deliveries", value: "2M+" },
              // { label: "Couriers", value: "50K+" },
              // { label: "Rating", value: "4.9★" },
              { label: "Cities", value: "10+" },
              { label: "Deliveries", value: "100+" },
              { label: "Couriers", value: "30+" },
              { label: "Rating", value: "4.9★" },
            ].map((stat, idx) => (
              <div key       = {idx}>
              <div className = "text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className = "text-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className = "py-20 px-4 sm:px-6 lg:px-8">
      <div     className = "max-w-4xl mx-auto text-center">
      <h2      className = "text-4xl lg:text-5xl font-bold mb-6">Ready to Ship Smarter?</h2>
      <p       className = "text-xl text-foreground/60 mb-8">
            Join thousands of customers and couriers already using <b><u>Basenalu</u></b> for fast, reliable deliveries.
          </p>
          <Button onClick= {handleGetStarted} size = "lg" className = "rounded-full gap-2">
          Get     Started Now <ArrowRight className = "w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className = "py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-muted/30">
      <div    className = "max-w-7xl mx-auto">
      <div    className = "grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className = "font-semibold mb-4">Basenalu</h4>
              <p  className = "text-foreground/60 text-sm">Fast, reliable delivery for everyone.</p>
            </div>
            <div>
              <h4 className = "font-semibold mb-4">Product</h4>
              <ul className = "space-y-2 text-sm text-foreground/60">
                <li>
                  <a href = "#" className = "hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href = "#" className = "hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href = "#" className = "hover:text-foreground transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className = "font-semibold mb-4">Company</h4>
              <ul className = "space-y-2 text-sm text-foreground/60">
                <li>
                  <a href = "#" className = "hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href = "#" className = "hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href = "#" className = "hover:text-foreground transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className = "font-semibold mb-4">Legal</h4>
              <ul className = "space-y-2 text-sm text-foreground/60">
                <li>
                  <a href = "#" className = "hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href = "#" className = "hover:text-foreground transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href = "#" className = "hover:text-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className = "border-t border-border pt-8 flex justify-between items-center">
          <p   className = "text-foreground/60 text-sm">© 2025 Basenalu. All rights reserved.</p>
          <div className = "flex gap-4">
          <a   href      = "#" className = "text-foreground/60 hover:text-foreground transition">
                Twitter
              </a>
              <a href = "#" className = "text-foreground/60 hover:text-foreground transition">
                LinkedIn
              </a>
              <a href = "#" className = "text-foreground/60 hover:text-foreground transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
