import { Button } from '@/components/ui/button';
import { CheckCircle, InfoIcon } from 'lucide-react';
import Illustration from '/assets/images/illustration.jpg';

const LearnMoreCard = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
            {/* Text Content Section */}
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="rounded-full bg-blue-100 p-4 shadow-sm">
                        <InfoIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Boost your content's impact
                    </h2>
                </div>

                <p className="text-gray-600 mb-4 text-base leading-relaxed" style={{ textAlign: 'justify' }}>
                    See how your writing scores across SEO, readability, tone, and engagement.
                    Our AI helps you optimize your text just like recruiters use tools to scan resumes.
                </p>

                <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-2">
                        <CheckCircle className="text-green-500 w-5 h-5 mt-0.5" />
                        <span className="text-sm text-gray-700">Identify missing keywords and content gaps</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <CheckCircle className="text-green-500 w-5 h-5 mt-0.5" />
                        <span className="text-sm text-gray-700">Match your tone with your target audience</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <CheckCircle className="text-green-500 w-5 h-5 mt-0.5" />
                        <span className="text-sm text-gray-700">Increase clarity and professional impact</span>
                    </div>
                </div>

                <Button
                    onClick={() => window.scrollTo({ top: 2000, behavior: 'smooth' })}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                    Learn how it works
                </Button>
            </div>

            {/* Image Section - Adjusted to optimal medium size */}
            <div className="flex justify-center">
                <img
                    src={Illustration}
                    alt="Content Optimization Illustration"
                    className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] object-cover rounded-2xl shadow-lg"
                />
            </div>
        </div>
    );
};

export default LearnMoreCard;
