"use client"

import React from "react";
import { useTranslation } from "@/hooks/app/useTranslation";

interface TransProps {
  i18nKey: string;
  values?: Record<string, any>;
  children?: React.ReactNode;
}

export function Trans({ i18nKey, values = {}, children }: TransProps) {
  const { t } = useTranslation();
  let text = t(i18nKey);

  for (const [key, value] of Object.entries(values)) {
    text = text.replace(new RegExp(`{{${key}}}`, "g"), String(value));
  }

  // ✅ normalize children to array
  const childrenArray = React.Children.toArray(children);

  const parts = text.split(/(<\d+>|<\/\d+>)/g).filter(Boolean);
  const elementStack: React.ReactNode[][] = [[]];

  for (const part of parts) {
    const openTag = part.match(/^<(\d+)>$/);
    const closeTag = part.match(/^<\/(\d+)>$/);

    if (openTag) {
      elementStack.push([]);
    } else if (closeTag) {
      const childrenInside = elementStack.pop()!;
      const index = Number(closeTag[1]);
      const element = childrenArray[index];

      if (React.isValidElement(element)) {
        elementStack[elementStack.length - 1].push(
          React.cloneElement(element, {}, childrenInside)
        );
      }
    } else {
      elementStack[elementStack.length - 1].push(part);
    }
  }

  return (
    <>
      {elementStack[0].map((child, index) =>
        React.isValidElement(child) ? (
          React.cloneElement(child, { key: index })
        ) : (
          <React.Fragment key={index}>{child}</React.Fragment>
        )
      )}
    </>
  );
}
