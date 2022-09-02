/* eslint-disable @next/next/no-img-element */
import { Center, List, Text } from '@mantine/core';

import { Layout } from '@/components/layout/Layout';
import { BoxWithText } from '@/components/uiParts/AppBox';
import { AppLink } from '@/components/uiParts/AppLink';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Layout>
      <Center>
        <div className="rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-2">
          <h1 className="text-2xl font-extrabold text-white">非同期処理：Promise/Async Function</h1>
        </div>
      </Center>
      <div className="flex w-full items-center justify-center">
        <img className="w-52 rounded-full opacity-60" src={'/wizard.png'} alt="wizard" />
      </div>
      <BoxWithText
        title="非同期処理とは"
        content={
          <>
            <List withPadding listStyleType="disc">
              <List.Item>通信が発生する処理で起きる</List.Item>
              <List withPadding listStyleType="revert">
                <List.Item>WebAPIを叩く</List.Item>
                <List.Item>データベースへクエリを叩く</List.Item>
              </List>

              <AppLink title="まずは非同期を体験してみる！Demoへ" href="/demos" className="" />
              <br />
              <List.Item>実行完了を待たない</List.Item>
              <List.Item>時間がかかるので、並行して次の処理を実行する</List.Item>
            </List>
          </>
        }
      />

      <BoxWithText
        title="非同期処理を使うメリット・デメリット"
        content={
          <List withPadding listStyleType="disc">
            <List.Item>メリット</List.Item>
            <List withPadding listStyleType="revert">
              <List.Item>ユーザーを待たせない→Demoへ</List.Item>
            </List>
            <List.Item>デメリット</List.Item>
            <List withPadding listStyleType="revert">
              <List.Item>制御が難しい</List.Item>
              <List.Item>非同期処理の実行完了を制御する必要がある</List.Item>
            </List>
          </List>
        }
      />

      <BoxWithText
        title="Promiseで完了を待つ方法"
        content={<Text>→ExceptionのPromiseの部分へ</Text>}
      />
    </Layout>
  );
};

export default Home;
