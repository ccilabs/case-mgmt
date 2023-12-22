import {
  NavigationContainer,
  ListNavItems,
  NavItem,
} from "@keystone-6/core/admin-ui/components";
import type { NavigationProps } from "@keystone-6/core/admin-ui/components";
export function CustomNavigation({
  lists,
  authenticatedItem,
}: NavigationProps) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/home">Home</NavItem>
      <NavItem href="/">Dashboard</NavItem>
      <ListNavItems lists={lists} />
    </NavigationContainer>
  );
}
