"use client";

import Image from "next/image";

export default function AiInDrones() {
    const aiFeatures = [
        {
            title: "Transmission Line Inspection",
            image: "/ai-drones/transmission-line-inspection.png",
        },
        {
            title: "People Counting",
            image: "/ai-drones/people-count.jpg",
        },
        {
            title: "Object Detection",
            image: "/ai-drones/object-detection.jpg",
        },
    ];

    return (
        <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Section Title */}
                <div className="text-center mb-14">
                    <span className="inline-block bg-yellow-400/20 text-yellow-600 font-semibold px-5 py-2 rounded-full text-sm tracking-wide mb-5">
                        AI Powered Solutions
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        AI in Drones
                    </h2>

                    <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Unlock intelligent aerial automation with AI-powered drone capabilities
                        designed for inspection, surveillance, analytics, and real-time decision-making.
                    </p>
                </div>

                {/* 3 Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {aiFeatures.map((item, index) => (
                        <div
                            key={index}
                            className="group bg-gray-50 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200"
                        >
                            <div className="relative h-[380px] overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition duration-700"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />

                                <div className="absolute bottom-5 left-5">
                                    <span className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-full text-sm shadow">
                                        {item.title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Integration Section */}
                <div className="grid lg:grid-cols-5 gap-14 items-center">

                    {/* Left Content */}
                    <div className="lg:col-span-2">
                        <span className="inline-block bg-yellow-400/20 text-yellow-600 font-semibold px-5 py-2 rounded-full text-sm tracking-wide mb-6">
                            Next Generation Intelligence
                        </span>

                        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                            Integrate AI with Our Drones
                        </h3>

                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            Enhance drone capabilities with intelligent automation powered by
                            computer vision, machine learning, and real-time analytics.
                            Detect anomalies, monitor infrastructure, count people,
                            identify objects, and make faster decisions from the sky.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    Real-Time Analytics
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Process live aerial data instantly using AI-powered insights.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    Smart Automation
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Automate inspection, monitoring and detection workflows.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Big AI Image */}
                    <div className="relative lg:col-span-3">
                        <div className="absolute -top-6 -left-6 w-full h-full bg-yellow-400 rounded-[32px]" />

                        <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-gray-200">
                            <div className="relative h-[550px] w-[full]">
                                <Image
                                    src="/ai-drones/main-image.png"
                                    alt="Integrate AI with Our Drones"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}