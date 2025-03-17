import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  BarChart3, 
  Network, 
  BrainCircuit, 
  Lock, 
  Server, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  to: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItem = ({ icon, title, to, isActive, isCollapsed }: NavItemProps) => {
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-x-3 my-1",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground dark:bg-indigo-900/50 dark:text-indigo-100"
            : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground dark:hover:bg-indigo-900/30 dark:hover:text-indigo-100",
          isCollapsed && "justify-center px-2"
        )}
      >
        {icon}
        {!isCollapsed && <span>{title}</span>}
      </Button>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const DashboardLayout = ({ children, title, description }: DashboardLayoutProps) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <DashboardHeader 
        title={title} 
        description={description} 
        onMenuToggle={toggleMobileSidebar}
      />
      
      <div className="flex flex-1 pt-[60px] sm:pt-[72px]">
        <aside
          className={cn(
            "fixed hidden md:flex h-[calc(100vh-4rem)] top-[60px] sm:top-[72px] left-0 flex-col border-r bg-sidebar transition-all duration-300 z-30 dark:bg-slate-900 dark:border-slate-800",
            isCollapsed ? "w-[70px]" : "w-64"
          )}
        >
          <div className="flex flex-col flex-1 p-3">
            <NavItem 
              to="/" 
              icon={<LayoutDashboard size={20} />} 
              title="Dashboard" 
              isActive={location.pathname === '/'} 
              isCollapsed={isCollapsed}
            />
            <NavItem 
              to="/analytics" 
              icon={<BarChart3 size={20} />} 
              title="Analytics" 
              isActive={location.pathname === '/analytics'} 
              isCollapsed={isCollapsed}
            />
            <NavItem 
              to="/network" 
              icon={<Network size={20} />} 
              title="Federation Network" 
              isActive={location.pathname === '/network'} 
              isCollapsed={isCollapsed}
            />
            <NavItem 
              to="/livehealth" 
              icon={<HeartPulse size={20} />}
              title="Live AI" 
              isActive={location.pathname === '/network'} 
              title="LiveHealth AI" 
              isActive={location.pathname === '/livehealth'} 
              isCollapsed={isCollapsed}
            />
            <NavItem 
              to="/models" 
              icon={<BrainCircuit size={20} />} 
              title="Models" 
              isActive={location.pathname === '/models'} 
              isCollapsed={isCollapsed}
            />
            
            {!isCollapsed && (
              <div className="mt-2 mb-2 text-xs font-medium text-sidebar-foreground/50 px-3 dark:text-slate-400">
                MANAGEMENT
              </div>
            )}
            {isCollapsed && <div className="my-2 border-t border-sidebar-border dark:border-slate-700" />}
            
            <NavItem 
              to="/privacy" 
              icon={<Lock size={20} />} 
              title="Privacy Controls" 
              isActive={location.pathname === '/privacy'} 
              isCollapsed={isCollapsed}
            />
            <NavItem 
              to="/institutions" 
              icon={<Users size={20} />} 
              title="Institutions" 
              isActive={location.pathname === '/institutions'} 
              isCollapsed={isCollapsed}
            />
            <NavItem 
              to="/infrastructure" 
              icon={<Server size={20} />} 
              title="Infrastructure" 
              isActive={location.pathname === '/infrastructure'} 
              isCollapsed={isCollapsed}
            />
            
            <div className="flex-1" />
            
            <NavItem 
              to="/settings" 
              icon={<Settings size={20} />} 
              title="Settings" 
              isActive={location.pathname === '/settings'} 
              isCollapsed={isCollapsed}
            />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mt-4 mx-auto hover:bg-sidebar-accent/50 dark:hover:bg-slate-800"
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </Button>
          </div>
        </aside>
        
        <aside
          className={cn(
            "fixed md:hidden h-full inset-y-0 left-0 flex flex-col p-3 border-r bg-sidebar transition-transform duration-300 ease-in-out transform z-40 dark:bg-slate-900 dark:border-slate-800",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col space-y-1 mt-24">
            <NavItem 
              to="/" 
              icon={<LayoutDashboard size={20} />} 
              title="Dashboard" 
              isActive={location.pathname === '/'} 
              isCollapsed={false}
            />
            <NavItem 
              to="/analytics" 
              icon={<BarChart3 size={20} />} 
              title="Analytics" 
              isActive={location.pathname === '/analytics'} 
              isCollapsed={false}
            />
            <NavItem 
              to="/network" 
              icon={<Network size={20} />} 
              title="Federation Network" 
              isActive={location.pathname === '/network'} 
              isCollapsed={false}
            />
            <NavItem 
              to="/livehealth" 
              icon={<HeartPulse size={20} />} 
<<<<<<< HEAD
              title="Live AI" 
              isActive={location.pathname === '/network'} 
              isCollapsed={isCollapsed}
=======
              title="LiveHealth AI" 
              isActive={location.pathname === '/livehealth'} 
              isCollapsed={false}
>>>>>>> 827297c15c08a85820a0c226b015895dccd30d33
            />
            <NavItem 
              to="/models" 
              icon={<BrainCircuit size={20} />} 
              title="Models" 
              isActive={location.pathname === '/models'} 
              isCollapsed={false}
            />
            
            <div className="mt-2 mb-1 text-xs font-medium text-sidebar-foreground/50 px-3 dark:text-slate-400">
              MANAGEMENT
            </div>
            
            <NavItem 
              to="/privacy" 
              icon={<Lock size={20} />} 
              title="Privacy Controls" 
              isActive={location.pathname === '/privacy'} 
              isCollapsed={false}
            />
            <NavItem 
              to="/institutions" 
              icon={<Users size={20} />} 
              title="Institutions" 
              isActive={location.pathname === '/institutions'} 
              isCollapsed={false}
            />
            <NavItem 
              to="/infrastructure" 
              icon={<Server size={20} />} 
              title="Infrastructure" 
              isActive={location.pathname === '/infrastructure'} 
              isCollapsed={false}
            />
            
            <div className="flex-1" />
            
            <NavItem 
              to="/settings" 
              icon={<Settings size={20} />} 
              title="Settings" 
              isActive={location.pathname === '/settings'} 
              isCollapsed={false}
            />
          </div>
        </aside>
        
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/50 z-30 md:hidden"
            onClick={toggleMobileSidebar}
          />
        )}
        
        <main
          className={cn(
            "flex-1 transition-all duration-300 bg-slate-50/40 dark:bg-slate-900/40",
            isCollapsed ? "md:ml-[70px]" : "md:ml-64"
          )}
        >
          <div className="container py-6 px-4 sm:px-6 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
