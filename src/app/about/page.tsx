import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, TrendingUp, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | New Way Infotech",
  description: "Learn about New Way Infotech and our mission to provide quality tech products.",
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">About New Way Infotech</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground text-center mb-12">
              We are a premier destination for technology products and services,
              dedicated to bringing you the latest innovations at competitive prices.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card>
                <CardContent className="p-6">
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Our Team</h3>
                  <p className="text-muted-foreground text-sm">
                    A dedicated team of tech enthusiasts committed to helping you find the perfect products.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Award className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
                  <p className="text-muted-foreground text-sm">
                    We stand behind every product with our quality guarantee and excellent warranty support.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <TrendingUp className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Growth & Innovation</h3>
                  <p className="text-muted-foreground text-sm">
                    Continuously expanding our product range to bring you the latest technology trends.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Heart className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Customer First</h3>
                  <p className="text-muted-foreground text-sm">
                    Your satisfaction is our top priority. We strive to exceed expectations every day.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To provide accessible, high-quality technology products that empower our customers
                to achieve more in their personal and professional lives. We believe technology
                should be simple, affordable, and enhance the way people live and work.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}