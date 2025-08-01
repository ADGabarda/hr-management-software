import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Building2,
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  Award,
  UserPlus,
  GraduationCap,
  FileText,
  Settings,
  User,
  LogOut,
  Bell,
  Menu,
  X,
} from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["all"],
    },
    {
      name: "User  Management",
      href: "/user-management",
      icon: Users,
      roles: ["Master Admin"],
    },
    {
      name: "Employees",
      href: "/employees",
      icon: Users,
      roles: [
        "Master Admin",
        "President/CEO",
        "Vice President",
        "IT Head",
        "HR",
        "Admin",
      ],
    },
    {
      name: "Leave Management",
      href: "/leave",
      icon: Calendar,
      roles: ["all"],
    },
    {
      name: "Payroll",
      href: "/payroll",
      icon: DollarSign,
      roles: [
        "Master Admin",
        "President/CEO",
        "Vice President",
        "IT Head",
        "HR",
        "Admin",
      ],
    },
    { name: "Performance", href: "/performance", icon: Award, roles: ["all"] },
    {
      name: "Recruitment",
      href: "/recruitment",
      icon: UserPlus,
      roles: [
        "Master Admin",
        "President/CEO",
        "Vice President",
        "IT Head",
        "HR",
        "Admin",
      ],
    },
    {
      name: "Training",
      href: "/training",
      icon: GraduationCap,
      roles: ["all"],
    },
    {
      name: "Reports",
      href: "/reports",
      icon: FileText,
      roles: [
        "Master Admin",
        "President/CEO",
        "Vice President",
        "IT Head",
        "HR",
        "Admin",
      ],
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const canAccess = (roles: string[]) => {
    if (roles.includes("all")) return true;
    return user?.role && roles.includes(user.role);
  };

  const filteredNavigation = navigation.filter((item) => canAccess(item.roles));

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link to="/dashboard" className="flex items-center">
            <Building2 className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <div className="text-lg font-bold text-gray-900">
                Afflatus Realty
              </div>
              <div className="text-xs text-gray-500">HR System</div>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {filteredNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="space-y-1">
              <Link
                to="/profile"
                className={`nav-link ${isActive("/profile") ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <User className="w-5 h-5 mr-3" />
                Profile
              </Link>
              {canAccess([
                "President/CEO",
                "Vice President",
                "IT Head",
                "HR",
                "Admin",
              ]) && (
                <Link
                  to="/settings"
                  className={`nav-link ${
                    isActive("/settings") ? "active" : ""
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.role}</p>
            </div>
            <button
              onClick={logout}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex-1 lg:flex lg:items-center lg:justify-between">
              <div className="hidden lg:block">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {navigation.find((item) => isActive(item.href))?.name ||
                    "Dashboard"}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Bell className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
