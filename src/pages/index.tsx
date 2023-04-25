import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import productsAtom from "../atoms/products";
import Product from "../components/Product";

// type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage = () => {
  const data = useRecoilValue(productsAtom)!;
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#161616] py-6">
      <h1 className="pb-2 text-2xl font-bold text-white">
        Choose Your Preferred Service
      </h1>

      <div className="mt-4 grid w-full max-w-6xl grid-cols-1 gap-4 px-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <Product
            key={product.id}
            product={product}
            onClick={() => router.push(`/products/${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

// type StaticProps = {
//   data: APIProduct[];
// };

// export const getStaticProps: GetStaticProps<StaticProps> = async () => {
//   const { data } = await API.get<APIProduct[]>(
//     process.env.API_ENDPOINT_PRODUCTS ?? "products"
//   );

//   return {
//     props: {
//       data,
//     },
//   };
// };
