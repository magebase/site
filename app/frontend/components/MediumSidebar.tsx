import { Link } from '@inertiajs/react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import {
  Search,
  PenTool,
  Home,
  BookOpen,
  User,
  FileText,
  BarChart3,
  Heart,
} from 'lucide-react';

interface MediumSidebarProps {
  user?: {
    name: string;
  };
}

export default function MediumSidebar({ user }: MediumSidebarProps) {
  const menuItems = [
    {
      title: 'Search',
      url: '/search',
      icon: Search,
    },
    {
      title: 'Write',
      url: '/write',
      icon: PenTool,
    },
    {
      title: 'Home',
      url: '/',
      icon: Home,
    },
    {
      title: 'Library',
      url: '/library',
      icon: BookOpen,
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: User,
    },
    {
      title: 'Stories',
      url: '/stories',
      icon: FileText,
    },
    {
      title: 'Stats',
      url: '/stats',
      icon: BarChart3,
    },
    {
      title: 'Following',
      url: '/following',
      icon: Heart,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          {user && (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            {user && <h2 className="font-semibold text-sm">{user.name}</h2>}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Discover</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 py-2">
              <p className="text-sm text-gray-600 mb-2">
                Discover more writers and publications to follow.
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                See suggestions
              </button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-2 py-4 border-t">
          <p className="text-sm text-gray-600 mb-2">
            Get unlimited access to the best of Medium for less than $1/week.
          </p>
          <button className="w-full bg-black text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            Become a member
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
