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
        'w-full sticky top-0 z-50 bg-background/80 border-b border-border backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm',
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
                  'text-sm font-medium rounded-md px-4 py-2 transition-all duration-200',
                  pathname === '/'
                    ? 'bg-primary/10 text-primary font-semibold shadow-sm ring-1 ring-primary/20'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  'focus:bg-secondary focus:text-foreground outline-none'
                )}
              >
                Inicio
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/departments"
                active={pathname.startsWith('/departments') || pathname.startsWith('/department')}
                className={cn(
                  'text-sm font-medium rounded-md px-4 py-2 transition-all duration-200',
                  pathname.startsWith('/departments') || pathname.startsWith('/department')
                    ? 'bg-primary/10 text-primary font-semibold shadow-sm ring-1 ring-primary/20'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  'focus:bg-secondary focus:text-foreground outline-none'
                )}
              >
                Departamentos
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/cities"
                active={pathname.startsWith('/cities') || pathname.startsWith('/city')}
                className={cn(
                  'text-sm font-medium rounded-md px-4 py-2 transition-all duration-200',
                  pathname.startsWith('/cities') || pathname.startsWith('/city')
                    ? 'bg-primary/10 text-primary font-semibold shadow-sm ring-1 ring-primary/20'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  'focus:bg-secondary focus:text-foreground outline-none'
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
