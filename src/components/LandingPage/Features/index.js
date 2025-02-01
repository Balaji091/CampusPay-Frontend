import React from 'react';

const Features = () => {
  const features = [
    {
      title: 'Accurate Fee Tracking',
      description:
        'Easily track and manage fee payments with our reliable and transparent system.',
      icon: '💳',
    },
    {
      title: 'Real-Time Reporting',
      description:
        'Get instant insights with real-time updates and detailed reports for administrators.',
      icon: '📊',
    },
    {
      title: 'Automated Receipt Validation',
      description:
        'Simplify fee validation with automated processes, ensuring efficiency and accuracy.',
      icon: '✅',
    },
    {
      title: 'User-Friendly Interface',
      description:
        'Our intuitive design makes navigation effortless for students, parents, and admins.',
      icon: '🌟',
    },
  ];

  return (
    <div id="features" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl  text-left  text-red-600 mb-6">
          Features
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h2 className="text-xl font-bold text-gray-800">{feature.title}</h2>
              <p className="mt-4 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
