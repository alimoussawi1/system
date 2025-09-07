import React from 'react';
import { Calendar, Users, Briefcase, Award, Heart, Camera, Lightbulb, Target, Zap, Star } from 'lucide-react';
import limarImage from "../assets/limar.jpeg"
import zeinaImage from "../assets/zeina.jpeg"
import ahmadImage from "../assets/ahmad.jpeg"
const SWBEntrepreneurArticle = () => {
    return (
        <article className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <div className="max-w-4xl mx-auto px-6 py-16">
                    <div className="flex items-center gap-2 mb-4 text-blue-100">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">September 2025</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        SWB Mobile App: Empowering Student Entrepreneurs to Shine
                    </h1>
                    <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
                        SWB mobile app is a free platform for student entrepreneurs to showcase their businesses, gain expert support, and grow through real partnerships.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* A Free Platform for Student Entrepreneurs */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <Lightbulb className="w-8 h-8 text-yellow-500" />
                        A Free Platform for Student Entrepreneurs
                    </h2>

                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-8">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            At <strong className="text-blue-600">Student With Benefits (SWB)</strong>, we believe that every student entrepreneur
                            deserves the chance to showcase their ideas, build their brand, and grow without financial barriers. That's why the
                            SWB mobile app provides students with a <strong className="text-blue-600">100% free platform</strong> to promote their
                            businesses directly to our growing community of users and partners.
                        </p>

                        <p className="text-lg text-gray-700 leading-relaxed">
                            Through SWB, student entrepreneurs can create visibility for their brands, connect with like-minded individuals,
                            and take their first steps toward building lasting success, all without worrying about costs. At SWB, every student
                            entrepreneur is welcomed, and we're more than happy to be part of their journey and their success.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                                <span className="text-white font-bold text-xl">$0</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2 text-gray-900">100% Free</h3>
                            <p className="text-gray-700">No costs, no barriers - just opportunities to grow</p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                            <Users className="w-8 h-8 text-blue-600 mb-4" />
                            <h3 className="font-semibold text-lg mb-2 text-gray-900">Growing Community</h3>
                            <p className="text-gray-700">Direct access to users and business partners</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                            <Target className="w-8 h-8 text-purple-600 mb-4" />
                            <h3 className="font-semibold text-lg mb-2 text-gray-900">Brand Visibility</h3>
                            <p className="text-gray-700">Showcase ideas and connect with like-minded individuals</p>
                        </div>
                    </div>
                </section>

                {/* Beyond Visibility: Expert Support */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <Award className="w-8 h-8 text-blue-600" />
                        Beyond Visibility: Expert Support from the SWB Team
                    </h2>

                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-8">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            What makes SWB unique is that we don't stop at promotion, we actively support students with our team's expertise.
                        </p>

                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Our community of professionals helps student entrepreneurs with:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Creative Shoots & Media Production */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Camera className="w-6 h-6 text-blue-600" />
                                Creative Shoots & Media Production
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                High-quality photos and videos to showcase products and services with professional studio access.
                            </p>
                        </div>

                        {/* Logistics & Business Connections */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Briefcase className="w-6 h-6 text-blue-600" />
                                Logistics & Business Connections
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Access to trusted partners and networks to help scale your business operations.
                            </p>
                        </div>

                        {/* Editing & Content Creation */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Zap className="w-6 h-6 text-blue-600" />
                                Editing & Content Creation
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                From social posts to campaigns, we make their brand shine with professional content.
                            </p>
                        </div>

                        {/* Strategic Partnerships */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Users className="w-6 h-6 text-blue-600" />
                                Strategic Partnerships
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Opportunities to collaborate with other businesses within the SWB ecosystem.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-6 text-white text-center">
                        <p className="text-xl font-semibold">
                            This hands-on approach ensures that student brands don't just get seen, they get remembered.
                        </p>
                    </div>
                </section>

                {/* A Safe Space to Plan, Build, and Grow */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <Heart className="w-8 h-8 text-red-500" />
                        A Safe Space to Plan, Build, and Grow
                    </h2>

                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-8">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            SWB is more than an app, it's a <strong className="text-blue-600">safe, real space</strong> where student entrepreneurs
                            can plan their ideas in an organized way, guided by an expert team. We help students refine their concepts, maximize results,
                            and build strategies that move their projects from idea to impact.
                        </p>

                        <p className="text-lg text-gray-700 leading-relaxed">
                            By putting student businesses under the spotlight they deserve, SWB provides the tools, exposure, and connections needed for them to thrive.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lightbulb className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Plan & Organize</h3>
                            <p className="text-gray-700">Structure your ideas with expert guidance</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Refine & Maximize</h3>
                            <p className="text-gray-700">Optimize concepts for maximum impact</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Idea to Impact</h3>
                            <p className="text-gray-700">Transform concepts into real success</p>
                        </div>
                    </div>
                </section>

                {/* Success Stories */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <Star className="w-8 h-8 text-yellow-500" />
                        Success Stories from Our Community
                    </h2>

                    <div className="grid gap-8">
                        {/* Ahmad Jammoul Testimony */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-blue-500">
                            <blockquote className="text-lg italic text-gray-700 mb-4">
                                "From the very beginning, they were responsive and professional, and we quickly arranged a meeting to carefully plan every detail of my media campaign. What stood out to me was how personalized the entire process was, SWB ensured that every piece of content was designed to meet my audience's needs and help me build a solid and recognizable online presence."
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
                                    {ahmadImage ? (
                                        <img src={ahmadImage} alt="Ahmad Jammoul" className="w-full h-full object-cover rounded-full" />
                                    ) : (
                                        "A"
                                    )}
                                </div>
                                <div>
                                    <cite className="font-semibold text-gray-900 not-italic">Ahmad Jammoul</cite>
                                    <p className="text-gray-600 text-sm">Physiotherapy Graduate, Beirut</p>
                                </div>
                            </div>
                        </div>

                        {/* Zeina Laham Testimony */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-green-500">
                            <blockquote className="text-lg italic text-gray-700 mb-4">
                                "On a weekly basis, we held multiple sessions together where we carefully prepared every detail of the website, from the overall design to the choice of colors, fonts, and content. SWB's creative and technical support allowed me to feel fully involved in the process while making sure the final product was both polished and personalized."
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
                                    {zeinaImage ? (
                                        <img src={zeinaImage} alt="Zeina Laham" className="w-full h-full object-cover rounded-full" />
                                    ) : (
                                        "Z"
                                    )}
                                </div>
                                <div>
                                    <cite className="font-semibold text-gray-900 not-italic">Zeina Laham</cite>
                                    <p className="text-gray-600 text-sm">Licensed Clinical Therapist</p>
                                    <p className="text-blue-600 text-xs">Zeinalahampsychology.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Limar Bekdash Testimony */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-purple-500">
                            <blockquote className="text-lg italic text-gray-700 mb-4">
                                "Working with SWB was an unforgettable experience! I had the opportunity to showcase my jewelry pieces in a professional photoshoot that truly captured the beauty and intricate details of my creations. The team made me feel supported and confident throughout the entire process, and seeing my brand come to life through their lens was incredibly inspiring."
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
                                    {limarImage ? (
                                        <img src={limarImage} alt="Limar Bekdash" className="w-full h-full object-cover rounded-full" />
                                    ) : (
                                        "L"
                                    )}
                                </div>
                                <div>
                                    <cite className="font-semibold text-gray-900 not-italic">Limar Bekdash</cite>
                                    <p className="text-gray-600 text-sm">LAU Student, Jewelry Designer</p>
                                    <p className="text-purple-600 text-xs">@Limar Jewelry</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-12 text-white">
                        <h2 className="text-4xl font-bold mb-6">Ready to Make Your Business Shine?</h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Whether you're a student with a new idea or a growing business looking for more visibility, SWB is here to help you succeed.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">📱 100% Free Platform</span>
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">🎬 Professional Studio</span>
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">🤝 Expert Support</span>
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">🚀 Real Partnerships</span>
                        </div>
                    </div>
                </section>
            </div>
        </article>
    );
};

export default SWBEntrepreneurArticle;