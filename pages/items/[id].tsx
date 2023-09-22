/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Checkout } from "../../components/checkout";
import { ProductContext } from "../_app";
const products = [
  {
    name: "Superteam Tee",
    price: 20,
    image:
      "https://merch.superteam.fun/wp-content/uploads/2023/06/Solana-Purple-Back.png",
    description: "Grab for FREE with Superteam Coupon NFT",
  },
];

const Item = () => {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const prodContext = useContext(ProductContext);
  const [quantity, setQuantity] = useState<number>(1);
  useEffect(() => {
    if (router.query.id) {
      setProduct(products[parseInt(router.query.id as string) - 1]);
    }
  }, [router.query.id]);
  const [open, setOpen] = useState<boolean>(false);
  if (product !== null) {
    return (
      <>
        <Checkout products={prodContext.prod} open={open} setOpen={setOpen} />
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              <Tab.Group as="div" className="flex flex-col-reverse">
                <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                  <Tab.Panel>
                    <img
                      src={product?.image}
                      alt="Hot Coffee"
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>

              {/* Product info */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {product?.name}
                </h1>

                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    $ {product?.price}
                  </p>
                </div>
                <div className="mt-10 text-lg font-medium tracking-tight text-gray-700">
                  {product.description} 🎁
                </div>
                <div className="mt-3 text-lg font-medium tracking-tight text-gray-700">
                  Rewards: <span className="text-indigo-600">SAMO, ISC</span> &{" "}
                  <span className="text-indigo-600 ml-1">BONK</span> instantly
                  sent to your wallet on purchase 💸!
                </div>

                <h1 className="mb-3 mt-10">Quantity</h1>
                <select
                  defaultValue={1}
                  onChange={(e) => {
                    setQuantity(parseInt(e.target.value));
                  }}
                  className="w-44 h-12 border rounded-lg px-2"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val, index) => {
                    return <option value={val}>{val}</option>;
                  })}
                </select>

                <div className="sm:flex-col1 mt-10 flex">
                  <button
                    onClick={() => {
                      prodContext.setProd([
                        ...prodContext.prod,
                        {
                          id: parseInt(router.query.id as string) - 1,
                          name: product?.name,
                          image: product.image,
                          price: product.price,
                          quantity: quantity,
                          description: product.description,
                        },
                      ]);
                      setOpen(true);
                    }}
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add to bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  }
};

export default Item;
