/* This example requires Tailwind CSS v2.0+ */
import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";

export default function NftBanner() {
  return (
    <div className="h-16 bg-gradient-to-r from-orange-800 via-pink-400 to-orange-800 flex items-center justify-center">
      <p className="text-lg text-white truncate">
        <span>Play to win exclusive and ultra-rare collectibles.</span>
        <a className="text-white underline ml-2">Register now!</a>
      </p>
    </div>
  );
}
