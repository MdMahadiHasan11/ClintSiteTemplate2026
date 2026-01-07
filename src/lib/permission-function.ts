/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type CRUDOperation,
  menuData,
  type MenuItem,
  type SubMenuItem,
} from "@/constants";

type PermissionsObject = Record<string, CRUDOperation[]>;

/**
 * Recursively extracts all href values from a menu hierarchy
 */
export function getHrefValues(data: any[]): string[] {
  const hrefs: string[] = [];

  function traverse(items: any) {
    if (!Array.isArray(items)) return;

    for (const item of items) {
      if (Array.isArray(item)) {
        traverse(item);
        continue;
      }

      const hasChildren =
        item?.children &&
        Array.isArray(item.children) &&
        item.children.length > 0;

      if (item?.href && !hasChildren) {
        hrefs.push(item.href);
      }

      if (hasChildren) {
        traverse(item.children);
      }
    }
  }

  traverse(data);
  return hrefs;
}

/**
 * Gets all accessible hrefs based on user permissions
 */
export function sidebarAllHref({
  permissions,
}: {
  permissions: PermissionsObject;
}) {
  const middlewareHref = menuData
    ?.map((item) => filterByPermissions(item.items, permissions))
    .filter((section) => section.length > 0);

  return getHrefValues(middlewareHref);
}

/**
 * Checks if a user has a specific permission
 */
export function hasPermissionSet(
  permissions: PermissionsObject,
  permissionKey?: string,
  requiredOperation: CRUDOperation = "READ"
): boolean {
  if (!permissionKey) return true;

  const operations = permissions[permissionKey] || [];
  if (!operations || operations.length === 0) return false;

  return operations.includes(requiredOperation);
}

/**
 * Filters submenu items based on permissions
 */
const filterSubMenuByPermissions = (
  items: SubMenuItem[],
  permissions: PermissionsObject
): SubMenuItem[] => {
  return items
    .filter((item) =>
      hasPermissionSet(permissions, item.permissionKey, item.requiredOperation)
    )
    .map((item) => {
      if (item.children) {
        const filteredChildren = filterSubMenuByPermissions(
          item.children,
          permissions
        );
        return {
          ...item,
          children: filteredChildren.length > 0 ? filteredChildren : undefined,
        };
      }
      return item;
    });
};

/**
 * Filters menu items based on permissions
 */
const filterByPermissions = (
  items: MenuItem[],
  permissions: PermissionsObject
): MenuItem[] => {
  return items
    .filter((item) =>
      hasPermissionSet(permissions, item.permissionKey, item.requiredOperation)
    )
    .map((item) => {
      if (item.children) {
        const filteredChildren = filterSubMenuByPermissions(
          item.children,
          permissions
        );
        return {
          ...item,
          children: filteredChildren.length > 0 ? filteredChildren : undefined,
        };
      }
      return item;
    });
};

/**
 * Filters menu items by search query
 */
const filterMenuItems = (items: MenuItem[], query: string): MenuItem[] => {
  if (!query.trim()) return items;

  const searchLower = query.toLowerCase();

  const filterRecursive = (
    item: MenuItem | SubMenuItem
  ): MenuItem | SubMenuItem | null => {
    const matchesLabel = item.label.toLowerCase().includes(searchLower);

    if (item.children) {
      const filteredChildren = item.children
        .map((child) => filterRecursive(child))
        .filter(Boolean) as SubMenuItem[];

      if (matchesLabel || filteredChildren.length > 0) {
        return {
          ...item,
          children:
            filteredChildren.length > 0 ? filteredChildren : item.children,
        };
      }
    } else if (matchesLabel) {
      return item;
    }

    return null;
  };

  return items
    .map((item) => filterRecursive(item))
    .filter(Boolean) as MenuItem[];
};

/**
 * Gets filtered menu data based on permissions and search query
 */
export function mainMenuData({
  searchQuery,
  permissions,
}: {
  searchQuery: string;
  permissions: PermissionsObject;
}) {
  const filteredMenuData = menuData
    .map((section) => ({
      ...section,
      items: filterMenuItems(
        filterByPermissions(section.items, permissions),
        searchQuery
      ),
    }))
    .filter((section) => section.items.length > 0);

  return filteredMenuData;
}
