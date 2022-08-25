/* eslint-disable @next/next/no-img-element */
import { Center } from '@mantine/core';

import { Layout } from '@/components/layout/Layout';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Layout>
      <Center>
        {/* 色を橙色から緑色が混ざった色にする */}
        <div className="rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-2">
          <h1 className="text-2xl font-extrabold text-white">非同期処理：Promise/Async Function</h1>
        </div>
      </Center>
      <div className="mt-5 flex items-center justify-center transition-all">
        <img
          className="rounded-full opacity-80"
          src={'/wizard.png'}
          alt="wizard"
          width={900}
          height={900}
        />
      </div>
    </Layout>
  );
};

export default Home;
