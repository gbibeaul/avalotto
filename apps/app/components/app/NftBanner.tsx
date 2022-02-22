import Link from "next/link";

export default function NftBanner() {
  return (
    <div className="h-16 bg-gradient-to-r from-orange-800 via-pink-400 to-orange-800 flex items-center justify-center">
      <p className="text-lg text-white truncate flex sm:flex-row flex-col">
        <span>Play to win exclusive and ultra-rare collectibles.</span>
        <Link passHref href="/mint">
          <span className="text-white underline sm:ml-2 cursor-pointer">
            Get on the allow list!
          </span>
        </Link>
      </p>
    </div>
  );
}
