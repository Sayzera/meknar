import useCategoriesData from "@/hooks/useCategoriesData";
import useNavbarData from "@/hooks/useNavbarData";
import { cn } from "@/lib/utils";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, PageProps, navigate } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { Fragment, useEffect, useMemo, useState } from "react";

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
  const categories = useCategoriesData();
  const [navigation, setNavigation] = useState<NavigationItem[]>(
    NAVIGATION_ITEMS.map((item) => ({ ...item, current: false }))
  );
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const menuCloseRef = React.useRef<(() => void) | null>(null);

  const logoImage = useMemo(
    () => getImage(navbarData?.logo?.asset),
    [navbarData?.logo?.asset]
  );

  // Get current category from URL
  useEffect(() => {
    if (typeof window !== "undefined" && location.pathname === "/urunler/") {
      const params = new URLSearchParams(location.search);
      const categoryParam = params.get("kategori");
      setCurrentCategory(categoryParam);
    } else {
      setCurrentCategory(null);
    }
  }, [location.pathname, location.search]);

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
                          className="h-18 w-18"
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
                          {item.name === "Ürünlerimiz" ? (
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              {({ open, close }) => {
                                // Store close function in ref
                                menuCloseRef.current = close;
                                return (
                                  <>
                                    <Menu.Button
                                      className={cn(
                                        item.current
                                          ? "a-icon-dropdown-active"
                                          : "a-icon-dropdown",
                                        "inline-flex items-center gap-1"
                                      )}
                                    >
                                      {item.name}
                                      <ChevronDownIcon className="h-4 w-4" />
                                    </Menu.Button>
                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                          <Menu.Item>
                                            {({ active }) => (
                                              <button
                                                onClick={() =>
                                                  navigate("/urunler/")
                                                }
                                                className={cn(
                                                  active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                  currentCategory === null &&
                                                    location.pathname ===
                                                      "/urunler/"
                                                    ? "bg-gray-50 text-primary font-semibold"
                                                    : "",
                                                  "flex items-center gap-2 px-4 py-2 text-sm w-full text-left"
                                                )}
                                              >
                                                {currentCategory === null &&
                                                  location.pathname ===
                                                    "/urunler/" && (
                                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                                  )}
                                                Tüm Ürünler
                                              </button>
                                            )}
                                          </Menu.Item>
                                          {categories?.edges?.map(
                                            (category) => (
                                              <Menu.Item key={category.node.id}>
                                                {({ active }) => (
                                                  <button
                                                    onClick={() =>
                                                      navigate(
                                                        `/urunler/?kategori=${category.node.slug.current}`
                                                      )
                                                    }
                                                    className={cn(
                                                      active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                      currentCategory ===
                                                        category.node.slug
                                                          .current
                                                        ? "bg-gray-50 text-primary font-semibold"
                                                        : "",
                                                      "flex items-center gap-2 px-4 py-2 text-sm w-full text-left"
                                                    )}
                                                  >
                                                    {currentCategory ===
                                                      category.node.slug
                                                        .current && (
                                                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                                    )}
                                                    {
                                                      category.node
                                                        .category_name
                                                    }
                                                  </button>
                                                )}
                                              </Menu.Item>
                                            )
                                          )}
                                        </div>
                                      </Menu.Items>
                                    </Transition>
                                  </>
                                );
                              }}
                            </Menu>
                          ) : (
                            <Link
                              to={item.href}
                              className={cn(
                                item.current ? "a-icon-active" : "a-icon"
                              )}
                              aria-current={item.current ? "page" : undefined}
                              onClick={() => {
                                // Close dropdown menu if open
                                if (menuCloseRef.current) {
                                  menuCloseRef.current();
                                }
                              }}
                            >
                              {item.name}
                            </Link>
                          )}
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
                  <div key={item.name}>
                    {item.name === "Ürünlerimiz" ? (
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={cn(
                                item.current
                                  ? "bg-gray-900 !text-white"
                                  : " hover:bg-gray-700 hover:text-white",
                                "w-full flex items-center justify-between rounded-md px-3 py-2 font-medium"
                              )}
                            >
                              <span>{item.name}</span>
                              <ChevronDownIcon
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  open ? "rotate-180" : ""
                                )}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="pl-4 space-y-1 mt-1">
                              <button
                                onClick={() => navigate("/urunler/")}
                                className={cn(
                                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-700 hover:text-white w-full text-left",
                                  currentCategory === null &&
                                    location.pathname === "/urunler/"
                                    ? "bg-gray-700 text-white font-semibold"
                                    : ""
                                )}
                              >
                                {currentCategory === null &&
                                  location.pathname === "/urunler/" && (
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                  )}
                                Tüm Ürünler
                              </button>
                              {categories?.edges?.map((category) => (
                                <button
                                  key={category.node.id}
                                  onClick={() =>
                                    navigate(
                                      `/urunler/?kategori=${category.node.slug.current}`
                                    )
                                  }
                                  className={cn(
                                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-700 hover:text-white w-full text-left",
                                    currentCategory ===
                                      category.node.slug.current
                                      ? "bg-gray-700 text-white font-semibold"
                                      : ""
                                  )}
                                >
                                  {currentCategory ===
                                    category.node.slug.current && (
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                  )}
                                  {category.node.category_name}
                                </button>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ) : (
                      <Link
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
                    )}
                  </div>
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
