/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-28 13:55:52
 * @Description:
 */

// Functions

import { ShowDrawer, CloseDrawer } from "forma-ui";

type FormaDrawerLocation = "right" | "bottom" | "top" | "left";

// Drawer

export function showAppDrawer(location: FormaDrawerLocation) {
  ShowDrawer({
    drawerId: "app-drawer",
    overlayId: "app-overlay",
    drawerLocation: location,
  });
}
export function closeAppDrawer() {
  CloseDrawer({
    drawerId: "app-drawer",
    overlayId: "app-overlay",
    drawerLocation: "left",
  });
}
