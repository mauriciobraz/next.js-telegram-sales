import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import API from '../constants/api';
import Product from '../components/Product';
import productsAtom, { APIProduct } from '../atoms/products';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ data }) => {
  const setProducts = useSetRecoilState(productsAtom);
  const router = useRouter();

  useEffect(() => {
    setProducts(data);
  }, [data, setProducts]);

  return (
    <div className="flex flex-col items-center min-h-screen py-6 bg-[#161616]">
      <h1 className="pb-2 text-2xl font-bold text-white">
        Choose Your Preferred Service
      </h1>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mt-4 px-6">
        {data.map(product => (
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

type StaticProps = {
  data: APIProduct[];
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const { data } = await API.get<APIProduct[]>(
    process.env.API_ENDPOINT_PRODUCTS ?? 'products'
  );

  return {
    props: {
      data,
    },
  };
};
