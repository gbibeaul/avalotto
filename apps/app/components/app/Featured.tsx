import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Avascratch",
    href: "/",
    imageSrc: "/Avascratch.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 2,
    name: "Avalotto",
    href: "/games/lotto",
    imageSrc: "/Avalotto.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 3,
    name: "NFT Battle",
    href: "/",
    imageSrc: "/NftBattle.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
];

export const Featured = () => {
  return (
    <div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            Trending games
          </h2>
          <a
            href="#"
            className="hidden text-sm font-medium text-white  md:block"
          >
            See all games<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.map((product) => (
            <Link passHref key={product.id} href={product.href}>
              <div className="group cursor-pointer relative drop-shadow-[0_70px_70px_rgba(242,180,176,0.25)]">
                <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    height={800}
                    width={600}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <h3 className="mt-4 text-sm text-white cursor-pointer">
                  <span> {product.name}</span>
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a href="#" className="font-medium text-white hover:text-white">
            See all games<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};
