import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
      <Link href="/" className="flex items-center">
          <Image
              src="/OPI copy png.png"
              alt="OPI Project Management Logo"
              layout='fill'
              objectFit='contain'
            />
            <span className="text-xl font-bold ml-3 hover:text-blue-600 transition duration-300 cursor-pointer">
              OPI Project Management
            </span>
         
        </Link>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="#features">
                <span className="hover:text-blue-500 transition duration-300 cursor-pointer">Features</span>
              </Link>
            </li>
            <li>
              <Link href="#pricing">
                <span className="hover:text-blue-500 transition duration-300 cursor-pointer">Pricing</span>
              </Link>
            </li>
            <li>
              <Link href="#about">
                <span className="hover:text-blue-500 transition duration-300 cursor-pointer">About</span>
              </Link>
            </li>
            <li>
              <Link href="/signin">
                <span className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition duration-300 cursor-pointer">Sign In</span>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <span className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition duration-300 cursor-pointer">Sign Up</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
