import type { NavigationItem } from '../types/navigation';

export function isCurrentPath(href: string, currentPath: string): boolean {
  if (href === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(href);
}

export function getActiveClass(isActive: boolean): string {
  return isActive ? 'text-white' : 'text-gray-300 hover:text-white';
}