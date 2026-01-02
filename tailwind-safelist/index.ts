/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-02 13:00:41
 * @Description:
 */
import formaUiSafelist from "./forma-ui";

const safelist = [...formaUiSafelist] as const;

export type Safelist = (typeof safelist)[number];
export default safelist;
