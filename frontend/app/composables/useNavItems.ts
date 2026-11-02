export interface NavItem {
  to: string
  label: string
  icon: string
}

export function useNavItems(): NavItem[] {
  return [
    { to: '/', label: 'Search', icon: 'search' },
    { to: '/favorites', label: 'Favorites', icon: 'heart' },
    { to: '/history', label: 'History', icon: 'history' },
    { to: '/review', label: 'Review', icon: 'review' },
  ];
}
