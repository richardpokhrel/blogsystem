import { Search, User, LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { logout } from "@/utils/auth";
import { useRouter } from "next/navigation";


const logoutButton = () => {
    const router = useRouter();


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        router.push('/sign-in');
    }
     return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">
      Logout
    </button>
  );
  
};

export default logoutButton;





const Header = ({ setIsMobileOpen }) => (

    
  <header className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between">
      <HeaderLeft setIsMobileOpen={setIsMobileOpen} />
      <HeaderRight />
    </div>
  </header>
);

const HeaderLeft = ({ setIsMobileOpen }) => (
  <div className="flex items-center">
    <Button 
      onClick={() => setIsMobileOpen(true)}
      className="lg:hidden mr-4"
    >
      <Menu className="h-6 w-6" />
    </Button>
    <SearchBar />
  </div>
);

const SearchBar = () => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search..."
      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

const HeaderRight = () => (
  <div className="flex items-center space-x-4">
    <NotificationButton />
    <UserProfile />
  </div>
);

const NotificationButton = () => (
  <button className="relative p-2 text-gray-600 hover:text-gray-900">
    <Bell className="h-5 w-5" />
    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
  </button>
);

const UserProfile = () => (

    
    
    
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
      <User className="h-4 w-4" />
    </div>
    <span className="text-sm font-medium text-gray-700">Admin User</span>
    <button className="p-2 text-gray-600 hover:text-gray-900">
      
     
     <logoutButton/>
    
    </button>
  </div>
);
