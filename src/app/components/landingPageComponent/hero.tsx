import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gray-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Manage Your Projects with Ease</h1>
        <p className="mb-8 text-lg md:text-xl">OPI Project Management helps you track and collaborate on projects efficiently.</p>
        <div className="space-x-4">
          <button className="text-white bg-blue-500 px-6 py-3 rounded hover:bg-blue-600 transition duration-300">Get Started</button>
          <button className="text-blue-500 border border-blue-500 px-6 py-3 rounded hover:bg-blue-100 transition duration-300">Learn More</button>
        </div>
      </div>

      {/* Image Placeholder */}
      {/* <div className="absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden">
        <Image
          src="/path-to-your-image.jpg" // Replace with your image path
          alt="Project Management"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
      </div> */}
    </div>
  );
};

export default HeroSection;
