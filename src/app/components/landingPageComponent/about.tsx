import Image from 'next/image';

const AboutSection: React.FC = () => {
  return (
    <div id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-6">About OPI Project Management</h2>
          <p className="mb-4 text-lg">OPI Project Management is a comprehensive tool designed to streamline project management processes. Ideal for teams looking to improve productivity and collaboration.</p>
          <p className="text-lg">With our software, you can easily manage projects, track expenses, generate reports, and more. Our goal is to provide a seamless experience for managing all aspects of your projects.</p>
        </div>

        {/* Image Placeholder */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <Image
            src="/close-up-designer-working-layout.jpg" // Replace with your image path
            alt="Project Management"
            width={500}
            height={300}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
