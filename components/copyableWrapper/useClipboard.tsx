import { useEffect, useState } from "react";

const copyToClipboardFallBack = (strToCopy: string): Promise<void> => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(strToCopy);
  } else {
    const textAreaElement = document.createElement("textarea");
    textAreaElement.value = strToCopy;
    textAreaElement.style.position = "fixed";
    textAreaElement.style.left = "-999999px";
    textAreaElement.style.top = "-999999px";
    document.body.appendChild(textAreaElement);
    textAreaElement.focus();
    textAreaElement.select();
    return new Promise<void>((resolve, reject) => {
      document.execCommand("copy") ? resolve() : reject();
      textAreaElement.remove();
    });
  }
};

export const useClipboard = () => {
  const copiedDuration = 2000;
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = async (strToCopy: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(strToCopy);
      setHasCopied(true);
    } else {
      try {
        await copyToClipboardFallBack(strToCopy);
        setHasCopied(true);
      } catch {
        throw new Error("Failed to copy text");
      }
    }
  };

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, copiedDuration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [hasCopied, copiedDuration]);

  return { copyToClipboard, hasCopied };
};
