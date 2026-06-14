"use client"

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Large orb - top right */}
      <div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl animate-pulse-glow"
        style={{ animationDelay: "0s" }}
      />
      
      {/* Medium orb - bottom left */}
      <div 
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-tr from-accent/30 to-primary/20 blur-3xl animate-pulse-glow"
        style={{ animationDelay: "1s" }}
      />
      
      {/* Small orb - center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/10 via-transparent to-accent/10 blur-3xl animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      
      {/* Additional floating orb */}
      <div 
        className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl animate-float"
        style={{ animationDelay: "0.5s" }}
      />
      
      {/* Bottom right accent */}
      <div 
        className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-gradient-to-tl from-accent/20 to-transparent blur-3xl animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />
    </div>
  )
}
