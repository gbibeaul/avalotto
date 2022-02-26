import { ShareIcon } from "@heroicons/react/solid";
import { VFC } from "react";

type Props = {
  title: string;
  text: string;
};

export const SocialShare: VFC<Props> = (props) => {
  const handleShare = async () => {
    try {
      await navigator.share({ ...props, url: window.location.href });
    } catch (err) {}
  };
  return (
    <button onClick={handleShare}>
      <ShareIcon className="h-6" aria-hidden="true" />
    </button>
  );
};
