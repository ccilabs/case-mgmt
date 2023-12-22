/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@keystone-ui/core";

import type { AdminConfig } from "@keystone-6/core/types";
import { CustomNavigation } from "./components/CustomNavigation";

function CustomLogo() {
  return <h3>CCILabs Case Mgmt</h3>;
}

export const components: AdminConfig["components"] = {
  Navigation: CustomNavigation,
  Logo: CustomLogo,
};
