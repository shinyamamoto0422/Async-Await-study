import { List, Text } from '@mantine/core';
import Image from 'next/image';

import { Layout } from '@/components/layout/Layout';
import { BoxWithText } from '@/components/uiParts/AppBox';

//todo: --------------------------------------

async function asyncMain00() {
  const value = await Promise.resolve(42);
  // console.log(value); // => 42
}
// asyncMain00(); // Promiseインスタンスを返す

function asyncMain000() {
  return Promise.resolve(42).then((value) => {
    // console.log(value); // => 42
  });
}
//asyncMain000(); // Promiseインスタンスを返す

//todo: --------------------------------------
// async function asyncMain() {
// PromiseがFulfilledまたはRejectedとなるまで待つ
//   await Promiseインスタンス;
// Promiseインスタンスの状態が変わったら処理を再開する
// }

//todo: --------------------------------------
// async functionは必ずPromiseを返す
async function doAsync() {
  // 非同期処理
}
async function asyncMain() {
  // doAsyncの非同期処理が完了するまでまつ
  await doAsync();
  // 次の行はdoAsyncの非同期処理が完了されるまで実行されない
  // console.log('この行は非同期処理が完了後に実行される');
}

//todo: --------------------------------------
async function asyncMain2() {
  // `await`式で評価した右辺のPromiseがRejectedとなったため、例外がthrowされる
  const value = await Promise.reject(new Error('エラーメッセージ'));
  // await式で例外が発生したため、この行は実行されません
}
// Async Functionは自動的に例外をキャッチできる
asyncMain().catch((error) => {
  // console.log(error.message); // => "エラーメッセージ"
});

//todo: --------------------------------------
async function asyncMain3() {
  // await式のエラーはtry...catchできる
  try {
    // `await`式で評価した右辺のPromiseがRejectedとなったため、例外がthrowされる
    const value = await Promise.reject(new Error('エラーメッセージ'));
    // await式で例外が発生したため、この行は実行されません
  } catch (error) {
    // console.log(error.message); // => "エラーメッセージ"
  }
}
// asyncMainはResolvedなPromiseを返す
asyncMain().catch((error) => {
  // すでにtry...catchされているため、この行は実行されません
});

const AsyncFunction = () => {
  return (
    <Layout>
      <Text weight={700}>AsyncFunction</Text>
      <List withPadding listStyleType="disc">
        <List.Item>通常の関数とは異なり、必ずPromiseインスタンスを返す関数を定義する構文</List.Item>
        <List.Item>await式というPromiseの非同期処理が完了するまで待つ構文が利用できる。</List.Item>
        <List withPadding listStyleType="disc">
          <List.Item>
            awaitを使うことで、非同期処理を同期処理のように扱えるので、Promiseチェーンで実現してた処理の流れを読みやすくかける
          </List.Item>
        </List>
      </List>

      <BoxWithText
        title="AsyncFunctionはPromiseを返すただの関数"
        content={
          <List withPadding listStyleType="orderd">
            <List.Item>値をreturnした場合、その返り値をもつFulfilledなPromiseを返す</List.Item>
            <List.Item>Promiseをreturnした場合、その返り値のPromiseをそのまま返す</List.Item>
            <List.Item>例外が生じた場合、そのエラーをもつRejectedなPromiseを返す</List.Item>
          </List>
        }
      />
      <BoxWithText
        title="await式"
        content={
          <>
            <List withPadding listStyleType="disc">
              <List.Item>使い所</List.Item>
              <List withPadding listStyleType="orderd">
                <List.Item>AsyncFunctionの関数の直下</List.Item>
                <List.Item>ESMA Scriptモジュールの直下</List.Item>
              </List>
            </List>
            <List withPadding listStyleType="disc">
              <List.Item>比較をしてみる</List.Item>
              <Image src={'/member-site.png'} alt="比較" width={300} height={400} />
              <List.Item>Promiseを使うと、どうしてもネストしてしまい、見にくい状態</List.Item>
              <List.Item>
                Await式を使うと、ほぼ同期処理と同じような書き方をできるので見やすい
              </List.Item>
            </List>
          </>
        }
      />
    </Layout>
  );
};
export default AsyncFunction;
