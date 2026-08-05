// /*
//  * @Author: Mohammad Felfelani
//  * @Email: mfelfelani72@gmail.com
//  * @Team:
//  * @Date: 2025-10-25 16:06:33
//  * @Description:
//  */

// "use client";

// import { useEffect, memo } from "react";

// // Components

// import { Modal, Drawer } from "forma-ui";
// import { Sonner } from "@/components/ui/core/sonner";
// import SyncLoader from "@/components/ui/core/SyncLoader";

// // Hooks

// import { useToolsStore } from "@/Store/ToolsStore";
// import { useZustandStorageSync } from "@/hooks/useZustandStorageSync";
// import { useAuthSync } from "@/hooks/auth/useAuthSync";

// // Zustand

// import { useAppStore } from "@/Store/AppStore";

// const Tools = memo(() => {
//   // Hooks

//   const {
//     drawerContent,
//     drawerLocation,
//     drawerClassName,
//     modalContent,
//     modalClassName,
//   } = useToolsStore();

//   const { syncing } = useAppStore();

//   // ManageSyncData

//   useAuthSync();
//   useZustandStorageSync();

//   // Prevent Right Click
//   useEffect(() => {
//     const disableContextMenu = (e: MouseEvent) => {
//       e.preventDefault();
//     };

//     document.addEventListener("contextmenu", disableContextMenu);

//     // Cleanup function
//     return () => {
//       document.removeEventListener("contextmenu", disableContextMenu);
//     };
//   }, []);

//   return (
//     <>
//       {syncing && <SyncLoader />}

//       <div className="w-screen h-screen absolute top-0 left-0 bg-transparent overflow-hidden z-990 pointer-events-none">
//         <div className="h-screen w-screen">
//           <Sonner />

//           <Drawer
//             id="app-drawer"
//             overlayId="app-overlay"
//             location={drawerLocation}
//             className={drawerClassName}
//           >
//             {drawerContent}
//           </Drawer>

//           <Modal
//             id="app-modal"
//             className={`${modalClassName} pointer-events-auto`}
//           >
//             {modalContent}
//           </Modal>
//         </div>
//       </div>
//     </>
//   );
// });

// Tools.displayName = "Tools";

// export default Tools;
