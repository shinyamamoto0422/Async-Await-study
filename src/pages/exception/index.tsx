import { Button, List, Text } from '@mantine/core';
import { useState } from 'react';

import { Layout } from '@/components/layout/Layout';
import { TwoColumn } from '@/components/uiGroup/TwoColumn';
import { BoxWithText } from '@/components/uiParts/AppBox';
import { AppLink } from '@/components/uiParts/AppLink';

import { AsyncAwait } from './AsyncAwait';
import { PromiseFetchGithubName } from './PromiseFetchGirhubName';

import type { NextPage } from 'next';

type ErrorObj = {
  message: string;
};

const Synchronous: NextPage = () => {
  const [errorText, setErrotText] = useState<string>('start');

  const handleStart = () => {
    setTimeout(() => {
      try {
        throw new Error('oops!!! error occured!');
      } catch (error) {
        setErrotText((error as ErrorObj).message);
      }
    });
  };

  const executor = new Promise((resolve, reject) => {
    resolve('success');
    reject(new Error('error'));
  });
  const onFullfilled = () => {
    // console.log('onFullfilled');
  };
  const onRejected = () => {
    // console.log('onRejected');
  };
  executor.then(onFullfilled, onRejected);

  // thneメソッドについての具体的な実装例
  const dummyFetch = (path: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (path.startsWith('/success')) {
          resolve({ body: `Response body of ${path}` });
        } else {
          reject(new Error(`Error: ${path}`)); //実行されない
        }
      }, 1000 * Math.random());
    });
  };

  dummyFetch('/success/data').then(onFullfilled, (response) => {
    // console.log(response);
  });
  dummyFetch('/failure/data').catch((error) => {
    console.log(error);
  });

  return (
    <Layout>
      <Text weight="bold" size="lg">
        例外処理
      </Text>
      <Text>
        例外処理とは
        非同期処理関係で言うとデータを取得する際などに、エラー（例外）が発生した際にどう処理するかを指定することです。
        {/* それぞれ、PromiseやAsync Await、それらの中で使用するtry catch / pending fulfilled refectedなどありますが、
        それらは例外処理するために使用するものです。
          */}
      </Text>

      <br />

      <TwoColumn
        title="setTimeoutの中で例外処理を行う"
        left={
          <>
            <Button onClick={handleStart}>start</Button>
            <Text>コールバック関数の中なら、エラーをキャッチできる</Text>
          </>
        }
        right={
          <Text weight="bold" size="xl" color="red">
            {errorText}
          </Text>
        }
      />
      <BoxWithText
        title="非同期処理で発生した例外の扱い方"
        content={
          <List withPadding listStyleType="disc">
            <List.Item>
              Promise
              <List withPadding listStyleType="circle">
                <List.Item>
                  ES2015で導入された非同期処理の状態や結果を表現するビルトインオブジェクト
                </List.Item>
                <List.Item>
                  非同期処理はPromiseのインスタンスを返し、そのPromiseインスタンスには状態変化をした際に呼び出されるコールバック関数を登録できる。
                </List.Item>
              </List>
            </List.Item>
          </List>
        }
      />

      <PromiseFetchGithubName />
      <Text weight={700}>
        結局は、非同期処理をした後に成功・失敗がある。成功した時に、thenで次にどういう処理をするのか。失敗した時に、rejectやcatchで次にどういう処理をするのか。を指定して繋いでいくイメージ
      </Text>
      <Text>
        今回は、一つのPromiseに対して繋いでいったが、複数の非同期処理をつなぐこともできる（Promiseチェーン）
        →
        <AppLink title="PromiseChain" href="/PromiseChain" />
      </Text>
      <AsyncAwait />
    </Layout>
  );
};

export default Synchronous;
