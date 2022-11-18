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
    <div className="flex min-h-screen flex-col items-center bg-[#161616] py-6">
      <h1 className="pb-2 text-2xl font-bold text-white">
        Choose Your Preferred Service
      </h1>

      <div className="mt-4 grid w-full max-w-6xl grid-cols-1 gap-4 px-6 md:grid-cols-2 lg:grid-cols-3">
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
