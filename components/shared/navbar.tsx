'use client';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

export default function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        'w-full sticky top-0 z-50 bg-white/90 border-b border-border/60 backdrop-blur supports-backdrop-filter:bg-white/80',
        className
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2 2xl:max-w-6xl">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="gap-1 px-2 py-1">
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                active={pathname === '/'}
                className={cn(
                  'text-sm font-normal rounded-lg px-3 py-1.5 transition-colors',
                  pathname === '/'
                    ? 'bg-accent text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-black hover:font-semibold',
                  'data-[state=open]:bg-accent data-[state=open]:text-white data-[state=open]:font-semibold',
                  'focus:bg-gray-200 focus:text-black'
                )}
              >
                Inicio
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/departments"
                active={pathname.startsWith('/departments')}
                className={cn(
                  'text-sm font-normal rounded-lg px-3 py-1.5 transition-colors',
                  pathname.startsWith('/departments')
                    ? 'bg-accent text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-black hover:font-semibold',
                  'data-[state=open]:bg-accent data-[state=open]:text-white data-[state=open]:font-semibold',
                  'focus:bg-gray-200 focus:text-black'
                )}
              >
                Departamentos
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/cities"
                active={pathname.startsWith('/cities')}
                className={cn(
                  'text-sm font-normal rounded-lg px-3 py-1.5 transition-colors',
                  pathname.startsWith('/cities')
                    ? 'bg-accent text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-black hover:font-semibold',
                  'data-[state=open]:bg-accent data-[state=open]:text-white data-[state=open]:font-semibold',
                  'focus:bg-gray-200 focus:text-black'
                )}
              >
                Ciudades
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
