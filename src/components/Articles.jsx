import React from 'react';
import { Calendar, MapPin, Users, Briefcase, Award, Heart } from 'lucide-react';

const Articles = () => {
    return (
        <article className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <div className="max-w-4xl mx-auto px-6 py-16">
                    <div className="flex items-center gap-2 mb-4 text-blue-100">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">June 2025</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        A Year of Growth and Resilience
                    </h1>
                    <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
                        Since our launch in August 2024, SWB Mobile has reached over 10,000 students and partnered with over 300 businesses across Lebanon. Overcoming startup challenges—even during the nation's conflict—has only strengthened our resolve to deliver real value to university life.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* What Makes SWB Different */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <Award className="w-8 h-8 text-blue-600" />
                        What Makes SWB Different?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Community-Driven Updates */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Users className="w-6 h-6 text-blue-600" />
                                Community-Driven Updates
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <strong className="text-gray-900">In-App Feedback Loop:</strong>
                                        <span className="text-gray-700 ml-1">Students vote on features and merchants, ensuring we evolve with your needs.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <strong className="text-gray-900">Weekly Deal Refreshes:</strong>
                                        <span className="text-gray-700 ml-1">100+ promotions added or replaced weekly keep the app exciting and dynamic.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Beyond Offers & Deals */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Briefcase className="w-6 h-6 text-blue-600" />
                                Beyond Offers & Deals
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <strong className="text-gray-900">Job & Internship Listings:</strong>
                                        <span className="text-gray-700 ml-1">Browse part-time roles and on-campus opportunities tailored for students.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <strong className="text-gray-900">Showcase Student Achievements:</strong>
                                        <span className="text-gray-700 ml-1">Share research, projects, and extracurricular wins.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <strong className="text-gray-900">Campus Event Hub:</strong>
                                        <span className="text-gray-700 ml-1">Discover and promote festivals, workshops, and lectures across universities.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Spotlight Event */}
                <section className="mb-16">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-white">
                        <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
                            <MapPin className="w-8 h-8" />
                            Spotlight: LAU Spring Beats Festival
                        </h2>
                        <p className="text-xl mb-6 text-blue-100">
                            On April 30, 2025, SWB Mobile proudly media-sponsored the LAU Spring Beats Festival:
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                                <h4 className="font-semibold text-lg mb-2">Event Promotion</h4>
                                <p className="text-blue-100">Reached students via push notifications, in-app banners, and digital media channels.</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                                <h4 className="font-semibold text-lg mb-2">On-Site Engagement</h4>
                                <p className="text-blue-100">Distributed free vouchers and showcased 20+ job listings.</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                                <h4 className="font-semibold text-lg mb-2">Real Impact</h4>
                                <p className="text-blue-100">Festival attendance rose 20% over 2024, and 70% of vouchers were redeemed within two weeks.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Student Testimonials */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <Heart className="w-8 h-8 text-red-500" />
                        Why Students Love SWB
                    </h2>

                    <div className="grid gap-8">
                        <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-blue-500">
                            <blockquote className="text-lg italic text-gray-700 mb-4">
                                "SWB isn't just an app—it's our campus companion. From exclusive discounts to finding my first student job at my local coffee shop, it's made uni life so much easier."
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                    M
                                </div>
                                <div>
                                    <cite className="font-semibold text-gray-900 not-italic">Maya K.</cite>
                                    <p className="text-gray-600 text-sm">AUB Business Student</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-cyan-500">
                            <blockquote className="text-lg italic text-gray-700 mb-4">
                                "SWB helped me save money every week. I never realized how many offers were just around the corner until I joined. We definitely need something like this."
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                                    T
                                </div>
                                <div>
                                    <cite className="font-semibold text-gray-900 not-italic">Tarek H.</cite>
                                    <p className="text-gray-600 text-sm">LAU Engineering Student</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-purple-500">
                            <blockquote className="text-lg italic text-gray-700 mb-4">
                                "SWB turned my city into a student-friendly zone. From gym memberships to groceries, it's helped me stretch every pound."
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                    Y
                                </div>
                                <div>
                                    <cite className="font-semibold text-gray-900 not-italic">Yara E.</cite>
                                    <p className="text-gray-600 text-sm">UOB Marketing Student</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SWB Promise */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">The SWB Promise: Trust, Voice, Simplicity</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust & Transparency</h3>
                            <p className="text-gray-700">Every deal is vetted; no hidden fees.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Voice & Ownership</h3>
                            <p className="text-gray-700">Student councils and societies co-create content and campaigns.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Briefcase className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">All-In-One App</h3>
                            <p className="text-gray-700">No need to juggle multiple platforms for deals, events, and jobs.</p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-12 text-white">
                        <h2 className="text-4xl font-bold mb-6">Ready to Level Up Your Campus Experience?</h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of students who are already saving money, finding opportunities, and staying connected with their campus community.
                        </p>

                    </div>
                </section>
            </div>
        </article>
    );
};

export default Articles;