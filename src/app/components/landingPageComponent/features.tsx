import { FaProjectDiagram, FaRegMoneyBillAlt, FaTasks, FaChartLine } from 'react-icons/fa';

interface FeatureCardProps {
  Icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description }) => {
  return (
    <div className="text-center p-4">
      <Icon className="mx-auto text-4xl text-blue-500 mb-2" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <div id="features" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <FeatureCard 
            Icon={FaProjectDiagram} 
            title="Project Management" 
            description="Easily manage all your projects in one place."
          />
          <FeatureCard 
            Icon={FaRegMoneyBillAlt} 
            title="Budget Tracking" 
            description="Keep track of your project budgets effectively."
          />
          <FeatureCard 
            Icon={FaTasks} 
            title="Task Assignments" 
            description="Assign and manage tasks within your team."
          />
          <FeatureCard 
            Icon={FaChartLine} 
            title="Performance Indicators" 
            description="Monitor key metrics for better decision-making."
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
