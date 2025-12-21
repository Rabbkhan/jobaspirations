import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Privacypolicy = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">
              Your Privacy Matters
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8 text-sm leading-relaxed text-muted-foreground">
            {/* Intro */}
            <p>
              At <span className="font-medium text-foreground">Job Aspirations</span>,
              we respect your privacy and are committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, and
              safeguard your data when you use our platform.
            </p>

            <Separator />

            {/* Section 1 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                1. Information We Collect
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Personal details such as name and email address</li>
                <li>Resume, skills, and job preferences</li>
                <li>Account activity and usage data</li>
              </ul>
            </section>

            <Separator />

            {/* Section 2 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To connect job seekers with recruiters</li>
                <li>To improve platform functionality and experience</li>
                <li>To send important updates and notifications</li>
              </ul>
            </section>

            <Separator />

            {/* Section 3 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                3. Data Protection
              </h2>
              <p>
                We use industry-standard security measures to protect your data
                from unauthorized access, alteration, or disclosure.
              </p>
            </section>

            <Separator />

            {/* Section 4 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                4. Sharing of Information
              </h2>
              <p>
                We do not sell your personal data. Your information is shared
                only with recruiters when you apply for jobs or where required
                by law.
              </p>
            </section>

            <Separator />

            {/* Section 5 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                5. Cookies
              </h2>
              <p>
                We use cookies to enhance your experience, analyze usage, and
                improve our services.
              </p>
            </section>

            <Separator />

            {/* Section 6 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                6. Your Rights
              </h2>
              <p>
                You may access, update, or delete your personal information at
                any time by contacting us.
              </p>
            </section>

            <Separator />

            {/* Contact */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                7. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <p className="mt-1 font-medium text-foreground">
                info@jobaspirations.in
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacypolicy;
