/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-12 15:00:49
 * @Description:
 */
import type { ReactNode } from "react";
import { type Lang } from "@/configs/app/language";

// Interfaces

import { Dictionary } from "@/interfaces/app/dictionary";

export interface LangLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export interface LangWrapperProps {
  langFromUrl: Lang;
  dictionary: Dictionary;
  children: ReactNode;
}

export interface Image {
  src?: string | any;
  alt?: string;
  width?: number;
  height?: number;
}

export interface VerticalNewsBox {
  title?: string;
  link?: string;
  image?: Image | string;
}

export interface AdvertiseBoxType {
  title?: string;
  content?: string;
  sponsored?: string;
  link?: string;
  image?: Image | string;
}

export type FrontBackPair = {
  front: (props: any) => ReactNode;
  back: (props: any) => ReactNode;
};

// sonner 

export type SonnerType = "basic" | "success" | "error" | "warning" | "info" | 'loading';
export type SonnerPosition =
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"
  | "top-left"
  | "top-right"
  | "top-center";

export interface SonnerItem {
  id: string;
  title: ReactNode;
  action: ReactNode | null;
  type: SonnerType;
  duration: number;
  position: SonnerPosition;
  createdAt?: any;
  isPaused?: boolean;
  remainingDuration?:any ;

}

export interface OpenSonnerParams {
  title: ReactNode;
  action?: ReactNode;
  type?: SonnerType;
  duration?: number;
  position?: SonnerPosition;
  allowDuplicate?:boolean ;
  onDismiss?: (...args: any[]) => void;
}
