import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Users, 
  MessageSquare, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  Play,
  Star,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "HD Video Conferencing",
      description: "Crystal clear video calls with up to 10 participants simultaneously"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Real-time Chat",
      description: "Built-in messaging system to complement your video discussions"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Flexible Layouts",
      description: "Resize and rearrange video windows to suit your needs"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "End-to-end encryption ensures your conversations stay private"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "WebRTC technology for minimal latency and maximum performance"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Cross-Platform",
      description: "Works seamlessly across all devices and browsers"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "Debate has revolutionized our team meetings. The interface is intuitive and the video quality is exceptional.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Startup Founder",
      content: "Perfect for our investor presentations. The ability to rearrange video layouts gives us so much control.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Remote Team Lead",
      content: "Finally, a video conferencing tool that doesn't feel cluttered. Clean, fast, and reliable.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <Video className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Debate
            </span>
          </div>
          <Link to="/conference">
            <Button>
              Start Meeting
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-6">
          <Zap className="w-3 h-3 mr-1" />
          WebRTC Powered
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
          Video Conferencing
          <br />
          <span className="text-primary">Reimagined</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Experience seamless video conferencing with up to 10 participants. 
          Built for teams who value clarity, control, and collaboration.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/conference">
            <Button size="lg" className="gap-2">
              <Play className="w-4 h-4" />
              Start Free Meeting
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="gap-2">
            <Video className="w-4 h-4" />
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need for
            <span className="text-primary"> perfect meetings</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features designed to make your video conferencing experience smooth and productive.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by teams
            <span className="text-primary"> worldwide</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our users have to say about their Debate experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/20">
          <CardContent className="text-center py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to start debating?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of teams who trust Debate for their video conferencing needs. 
              No signup required, start instantly.
            </p>
            <Link to="/conference">
              <Button size="lg" className="gap-2">
                <Video className="w-4 h-4" />
                Start Your First Meeting
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-purple-600 rounded flex items-center justify-center">
                <Video className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-semibold">Debate</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© 2024 Debate. All rights reserved.</span>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;