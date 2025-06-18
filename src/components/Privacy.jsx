import React, { useState } from "react";
import { ChevronDown, ChevronUp, Shield, Users, FileText, Lock, Mail, MapPin } from "lucide-react";

const Privacy = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const Section = ({ id, title, icon: Icon, children }) => {
    const isExpanded = expandedSections[id];

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <Icon className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>

        {isExpanded && (
          <div className="px-6 pb-6 border-t border-gray-100">
            <div className="pt-4">
              {children}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600 text-lg">Student with Benefits</p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-sm font-medium text-blue-800">Last Updated: December 30, 2024</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            This Privacy Policy describes how Student with Benefits (operating as SWB, "we", "us", or "our")
            collects, uses, and discloses your personal information when you use our services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using our services, you acknowledge that you have read, understood, and agreed to the terms of this Policy.
          </p>
        </div>

        {/* Definitions */}
        <Section id="definitions" title="Definitions" icon={FileText}>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800">Student with Benefits Account</h4>
              <p className="text-gray-600">Your account on the Student with Benefits App.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800">Student with Benefits App</h4>
              <p className="text-gray-600">The mobile application providing deals, offers, and promotions to university students and eligible users.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800">Partners</h4>
              <p className="text-gray-600">Businesses or organizations offering promotions via the Student with Benefits App.</p>
            </div>
          </div>
        </Section>

        {/* Information Collection */}
        <Section id="information" title="Information We Collect and Use" icon={Users}>
          <div className="space-y-6">
            {/* Users */}
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Users
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Information We Collect:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Full name</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Email address</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Date of birth</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>University name</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Phone number</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Account credentials</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Location data</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Technical information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">How We Use Your Information:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Provide app services</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Personalized recommendations</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Verify eligibility</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Analyze usage</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Communications</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Non-Users */}
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Non-Users
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Information We Collect:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Name and contact information</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Referral information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">How We Use Your Information:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Deliver offers and promotions</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Respond to inquiries</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Partners */}
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Partners & Service Providers
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Information We Collect:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Business details</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Financial information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">How We Use Your Information:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Facilitate offer listings</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Process payments</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>Analyze services</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Legal Basis */}
        <Section id="legal" title="Legal Basis for Processing" icon={FileText}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Consent</h4>
              <p className="text-sm text-blue-700">Where you explicitly consent to data collection</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Contractual Obligations</h4>
              <p className="text-sm text-green-700">To fulfill services or agreements made with you</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-2">Legal Compliance</h4>
              <p className="text-sm text-orange-700">To adhere to applicable laws and regulations</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">Legitimate Interests</h4>
              <p className="text-sm text-purple-700">For business purposes and operational efficiency</p>
            </div>
          </div>
        </Section>

        {/* Data Retention */}
        <Section id="retention" title="Data Retention" icon={FileText}>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-gray-700">
              We retain personal data only as long as necessary for the purposes outlined in this Policy
              or to comply with legal obligations. Once the retention period expires, your data will be securely deleted.
            </p>
          </div>
        </Section>

        {/* Data Sharing */}
        <Section id="sharing" title="Data Sharing" icon={Users}>
          <div className="space-y-4">
            <p className="text-gray-700 mb-4">We may share your personal information with:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Service Providers</h4>
                <p className="text-sm text-blue-700">For data analysis, payment processing, or marketing</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Partners</h4>
                <p className="text-sm text-green-700">To provide offers and promotions</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">Legal Authorities</h4>
                <p className="text-sm text-red-700">If required by law or to protect rights and safety</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Third Parties</h4>
                <p className="text-sm text-purple-700">With your explicit consent</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Data Security */}
        <Section id="security" title="Data Security" icon={Lock}>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Lock className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Security Measures</h4>
                <p className="text-gray-700 leading-relaxed">
                  We take reasonable measures to protect your personal information, including encryption and secure storage.
                  However, no system is entirely secure, and we cannot guarantee absolute data protection.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Your Rights */}
        <Section id="rights" title="Your Rights" icon={Shield}>
          <div className="space-y-4">
            <p className="text-gray-700">Under applicable data protection laws, you have the right to:</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-blue-800 mb-2">Access & Correct</h4>
                <p className="text-sm text-blue-700">Access, correct, or delete your personal data</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-green-800 mb-2">Withdraw Consent</h4>
                <p className="text-sm text-green-700">Withdraw your consent at any time</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-purple-800 mb-2">Object Processing</h4>
                <p className="text-sm text-purple-700">Object to processing for legitimate interests</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <a href="mailto:studentwithbenefits@gmail.com" className="text-blue-100 hover:text-white transition-colors">
                  studentwithbenefits@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-blue-100">Beirut, Lebanon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;