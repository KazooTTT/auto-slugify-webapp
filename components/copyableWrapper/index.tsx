import { FC } from "react";
import { useClipboard } from "./useClipboard";

interface CopyableWrapperProps {
  children: string;
}

function CopyButton({
  handleClick,
  copied,
}: {
  handleClick: () => Promise<void>;
  copied: boolean;
}) {
  return (
    <button
      title="Copy"
      className={`ml-3 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 copy-button`}
      onClick={handleClick}
    >
      {copied ? "✔" : "Copy"}
    </button>
  );
}

const CopyableWrapper: FC<CopyableWrapperProps> = ({ children }) => {
  const { copyToClipboard, hasCopied } = useClipboard();
  return (
    <>
      {children}
      <CopyButton
        handleClick={() => copyToClipboard(children)}
        copied={hasCopied}
      />
    </>
  );
};

export { CopyableWrapper };
