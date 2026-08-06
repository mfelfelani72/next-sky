/*
 * @Author: Mohammad mfelfelani72@gmail.com
 * @Date: 2026-06-02 08:39:28
 * @LastEditors: Mohammad mfelfelani72@gmail.com
 * @LastEditTime: 2026-06-02 08:39:57
 * @FilePath: /next-aimoonhub-dev/src/utils/avatarColor.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-11-02 06:07:10
 * @Description:
 */

// Functions

export const getAvatarColor = (name: string) => {
  if (!name) return "var(--primary-400)"; // Fallback color
  
  // Generate a hash from the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Hue: 0 to 360
  // Saturation: 65-75% (vibrant)
  // Lightness: 45-55% (perfect for white text)
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 50%)`;
};

