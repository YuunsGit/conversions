import React from "react";
import { Disclosure } from "@headlessui/react";
import { ReactComponent as Logo } from "../img/Logo.svg";
import { Link } from "react-router-dom";

import {
  Bars3Icon,
  HomeIcon,
  Square2StackIcon,
  BookmarkIcon,
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Home",
    to: "/",
    icon: HomeIcon,
  },
  {
    name: "Split",
    to: "/split",
    icon: Square2StackIcon,
  },
  {
    name: "Rotate",
    to: "/rotate",
    icon: ArrowPathRoundedSquareIcon,
  },
  {
    name: "Stamp",
    to: "/",
    icon: BookmarkIcon,
  },
  {
    name: "Convert",
    to: "/",
    icon: ArrowsRightLeftIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-stone-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-stone-400 hover:bg-stone-700 hover:text-white">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <Link to="/">
                <Logo className="ml-3 block h-8 w-auto fill-white" />
              </Link>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      to={item.to}
                      key={item.name}
                      className="flex rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-stone-700 active:bg-stone-600 active:text-stone-300"
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link to={item.to} key={item.to}>
                  <Disclosure.Button
                    as="div"
                    className={classNames(
                      item.current
                        ? "bg-stone-900 text-white"
                        : "text-stone-300 hover:bg-stone-700 hover:text-white",
                      "flex justify-end rounded-md px-3 py-2 text-right text-base font-medium transition-transform"
                    )}
                  >
                    {item.name}
                    <item.icon className="ml-2 h-5 w-5" />
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
