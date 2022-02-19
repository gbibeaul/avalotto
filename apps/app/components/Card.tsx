import { getShortenedAddress } from "utils/display.utils";
import Link from "next/link";

type CardProps = {
  name: string;
  Icon: React.ElementType;
  href: string;
  address: string;
  hrefText: string;
};

export const Card: React.VFC<CardProps> = ({
  name,
  Icon,
  href,
  address,
  hrefText,
}) => {
  return (
    <div key={name} className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {name}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {getShortenedAddress(address)}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <Link href={href}>
            <span className="cursor-pointer font-medium text-cyan-700 hover:text-cyan-900 underline">
              See Details
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
