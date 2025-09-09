import React from 'react';
import { Calendar, MapPin, Users, Briefcase, Award, Heart, Cake, Globe, Coffee } from 'lucide-react';
import hunchies from "../assets/hunchies.gif"
import image1 from "../assets/localbusiness1.jpeg"
import image2 from "../assets/localbusiness2.jpeg"
import image3 from "../assets/localbusiness3.jpeg"

import gouowner from "../assets/gouowner.jpg"
const SWBAnniversaryArticle = () => {
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
                        SWB Turns One: Celebrating a Year of Love, Connection and Growth
                    </h1>
                    <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
                        Student With Benefits app marks its first anniversary with partners, curated menu, music, a themed cake, and a vision for global expansion.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* A Milestone Celebration */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <Award className="w-8 h-8 text-blue-600" />
                        A Milestone Celebration
                    </h2>

                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-8">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            The <strong className="text-blue-600">Student With Benefits (SWB) mobile app</strong> has officially
                            turned <strong className="text-blue-600">one year old</strong>, and we marked the occasion with a memorable
                            gathering at <strong className="text-blue-600">GOU Life</strong>. The event brought together students, friends,
                            and business owners from our network, highlighting the strong community that powers SWB.
                        </p>

                        <p className="text-lg text-gray-700 leading-relaxed">
                            Guests enjoyed a <strong>specially curated SWB menu and drinks</strong>, paired with
                            chill house music that set the perfect atmosphere. More than just a party, it was a moment
                            of reflection and collaboration, listening to our users, collecting feedback, and exchanging
                            ideas for the future of the app.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                            <Users className="w-8 h-8 text-blue-600 mb-4" />
                            <h3 className="font-semibold text-lg mb-2 text-gray-900">Community Gathering</h3>
                            <p className="text-gray-700">Students, friends, and business owners celebrating together</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                            <Coffee className="w-8 h-8 text-purple-600 mb-4" />
                            <h3 className="font-semibold text-lg mb-2 text-gray-900">Curated Experience</h3>
                            <p className="text-gray-700">Special SWB menu, drinks, and chill house music</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
                            <Heart className="w-8 h-8 text-green-600 mb-4" />
                            <h3 className="font-semibold text-lg mb-2 text-gray-900">Feedback & Ideas</h3>
                            <p className="text-gray-700">Listening to users and planning the future together</p>
                        </div>
                    </div>
                </section>

                {/* Deep Connections with Local Businesses */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <Briefcase className="w-8 h-8 text-blue-600" />
                        Deep Connections with Local Businesses
                    </h2>

                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            What makes SWB unique is the <strong className="text-blue-600">bond we share with every business
                                owner</strong> on the platform. The gathering was a reminder that these aren't just partnerships,
                            they're friendships built on trust, love, and shared values.
                        </p>

                        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-6 text-white">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                {/* Text */}
                                <div className="flex-1 order-1">
                                    <MapPin className="w-6 h-6 mb-3" />
                                    <p className="text-blue-100 leading-relaxed">
                                        The owner of <strong>GOU Life</strong>, for example, is not only a host but also an
                                        integral part of the SWB movement, representing the resilience and creativity of
                                        Lebanese entrepreneurs.
                                    </p>
                                </div>

                                {/* Image */}
                                <div className="order-2 w-full h-40 md:w-32 md:h-32 md:flex-shrink-0">
                                    <img
                                        src={gouowner}
                                        alt="Owner Gou"
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>


                    </div>
                </section>
                <section className="mb-16">
                    <div className=" bg-white  shadow-lg rounded-2xl p-8 text-white overflow-hidden">
                        {/* 220px is just an example; tweak to taste */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[300px]">
                            {/* Left: spans 2 rows to equal right column height */}
                            <div className="md:col-span-2 md:row-span-2">
                                <img
                                    src={image1}
                                    alt="Business 1"
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>


                            {/* Right: two equal tiles */}
                            <div>
                                <img
                                    src={image2}
                                    alt="Business 2"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                            <div>
                                <img
                                    src={image3}
                                    alt="Business 3"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>



                {/* Sweet Highlight */}
                <section className="mb-16">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Text left */}
                            <div className="text-left">
                                <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
                                    A Sweet Highlight: The SWB-Themed Cake
                                </h2>

                                <p className="text-xl mb-4 text-pink-100">
                                    No anniversary is complete without cake. Our community celebrated with
                                    a <strong>SWB-themed cake</strong>, crafted by <strong>Hunchies Cakes</strong> which
                                    is one of our partner businesses on the app.
                                </p>

                                <p className="text-pink-100">
                                    Featuring a delicious <strong>raspberry-purple filling</strong>, it captured the
                                    spirit of SWB and quickly became a crowd favorite.
                                </p>
                                <Cake className="w-8 h-8" />
                            </div>

                            {/* Image right */}
                            <div className="flex justify-end">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                    <img
                                        src={hunchies}
                                        alt="Cake GIF"
                                        className="w-64 h-[32rem] md:w-72 md:h-[40rem] rounded-lg object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                </section>




                {/* Looking Ahead */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <Globe className="w-8 h-8 text-blue-600" />
                        Looking Ahead: SWB Expands to Europe
                    </h2>

                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-8">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            This anniversary was not just about celebrating the past, it marked
                            the <strong className="text-blue-600">beginning of a new chapter</strong>. SWB is proud to announce
                            its <strong className="text-blue-600">expansion into the European market</strong>, starting with <strong className="text-blue-600">France</strong>.
                        </p>

                        <p className="text-lg text-gray-700 leading-relaxed">
                            By taking Lebanese entrepreneurship abroad, we aim to showcase to the world what our
                            community stands for: <strong className="text-blue-600">love, creativity, resilience, and faith</strong>.
                        </p>
                    </div>


                </section>



                {/* Call to Action */}
                <section className="text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-12 text-white">
                        <h2 className="text-4xl font-bold mb-6">The Journey is Just Getting Started</h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                            <em>One year down, many more to come. The <strong>SWB journey is just getting started</strong>.</em>
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">🇱🇧 Lebanon</span>
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">🇫🇷 France</span>

                        </div>
                    </div>
                </section>
            </div>
        </article >
    );
};

export default SWBAnniversaryArticle;