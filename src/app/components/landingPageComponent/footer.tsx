const Footer: React.FC = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="mb-4">© {new Date().getFullYear()} OPI Project Management</p>
            <div className="mb-4">
              {/* Placeholder for social media links */}
              <a href="#" className="mr-4 hover:text-gray-300">Facebook</a>
              <a href="#" className="mr-4 hover:text-gray-300">Twitter</a>
              <a href="#" className="mr-4 hover:text-gray-300">LinkedIn</a>
            </div>
            <p>Contact us at <a href="mailto:info@opimanagement.com" className="hover:text-gray-300">info@opimanagement.com</a></p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  