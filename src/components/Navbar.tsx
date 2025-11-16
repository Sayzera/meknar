import useNavbarData from "@/hooks/useNavbarData";
import { cn } from "@/lib/utils";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, PageProps } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useMemo, useState } from "react";

interface NavbarProps {
  location: PageProps["location"];
}

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const NAVIGATION_ITEMS: Omit<NavigationItem, "current">[] = [
  { name: "Anasayfa", href: "/" },
  { name: "Hakkımızda", href: "/hakkimizda/" },
  { name: "Ürünlerimiz", href: "/urunler/" },
  { name: "Galeri", href: "/galeri/" },
  { name: "İletişim", href: "/iletisim/" },
];

/**
 * Navbar component with responsive design and active state management
 * @param {NavbarProps} props - Component props
 */
const Navbar: React.FC<NavbarProps> = ({ location }) => {
  const navbarData = useNavbarData();
  const [navigation, setNavigation] = useState<NavigationItem[]>(
    NAVIGATION_ITEMS.map((item) => ({ ...item, current: false }))
  );

  const logoImage = useMemo(
    () => getImage(navbarData?.logo?.asset),
    [navbarData?.logo?.asset]
  );

  useEffect(() => {
    setNavigation((prev) =>
      prev.map((nav) => ({
        ...nav,
        current: nav.href === location.pathname,
      }))
    );
  }, [location.pathname]);

  return (
    <div className="min-h-full">
      <Disclosure
        as="nav"
        className="bg-white bg-opacity-80 text-[#212B36] text-base leading-6"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo and Desktop Navigation */}
                <div className="flex items-center">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <Link to="/" aria-label="Go to homepage">
                      {logoImage && (
                        <GatsbyImage
                          image={logoImage}
                          className="h-10 w-10"
                          alt={`${process.env.GATSBY_SITE_NAME} Logo`}
                        />
                      )}
                    </Link>
                  </div>

                  {/* Desktop Navigation */}
                  <nav className="hidden md:block">
                    <ul className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          className="rounded-md px-3 py-2 text-inherit font-medium relative"
                        >
                          <Link
                            to={item.href}
                            className={cn(
                              item.current ? "a-icon-active" : "a-icon"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* Mobile menu button */}
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">
                      {open ? "Close main menu" : "Open main menu"}
                    </span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Mobile Navigation------ */}
            <Disclosure.Panel className="md:hidden">
              <nav className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      item.current
                        ? "bg-gray-900 !text-white"
                        : " hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Navbar;
