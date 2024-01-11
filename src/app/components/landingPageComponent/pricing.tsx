import { FaRegGem, FaGem, FaBlackTie, FaFreeCodeCamp } from 'react-icons/fa';

const PricingSection: React.FC = () => {
  const pricingOptions = [
    {
      title: "Free",
      price: "$0/month",
      features: ["5 Projects", "Community Support", "Basic Tools"],
      icon: <FaFreeCodeCamp />
    },
    {
      title: "Basic",
      price: "$9.99/month",
      features: ["10 Projects", "Basic Support", "Community Access"],
      icon: <FaRegGem />
    },
    {
      title: "Pro",
      price: "$29.99/month",
      features: ["Unlimited Projects", "Priority Support", "Team Collaboration"],
      icon: <FaGem />
    },
    {
      title: "Enterprise",
      price: "Custom Pricing",
      features: ["Dedicated Support", "Custom Features", "Advanced Analytics"],
      icon: <FaBlackTie />
    }
  ];
  return (
    <div id="pricing" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {pricingOptions.map((option, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 text-center">
              {/* Centering the icon */}
              <div className="flex justify-center items-center text-4xl text-blue-500 mb-4">
                {option.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
              <p className="text-2xl font-bold mb-4">{option.price}</p>
              <ul className="mb-6">
                {option.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="mb-2">{feature}</li>
                ))}
              </ul>
              <button className="text-white bg-blue-500 px-6 py-2 rounded hover:bg-blue-600 transition duration-300">Choose Plan</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;