import { List } from '@mantine/core';
import { useEffect } from 'react';

import { BoxWithText } from '@/components/uiParts/AppBox';

// 非同期処理を行う関数を定義
const getGitUserName = async () => {
  // 非同期処理を実行するときにawaitを使う→Promiseの結果が返ってくるまで待つ
  const url = 'https://api.github.com/users/shinyamamoto0422';
  const json = await fetch(url);
  json
    .json()
    .then((json: { id: number }) => {
      // 成功
      return json.id;
    })
    .catch((err: Error) => {
      // 失敗
      return err;
    });
};

// async awaitを使っているのに、eslintのpromises must be awaitedというエラーが出る

export const AsyncAwait = () => {
  useEffect(() => {
    void getGitUserName();
  }, []);
  return (
    <BoxWithText
      title="Async Await"
      content={
        <List listStyleType="disc" withPadding>
          <List.Item>
            Promsieよりもasync/awaitがおすすめ
            <List withPadding listStyleType="circle">
              <List.Item>直感的でわかりやすい</List.Item>
            </List>
          </List.Item>
          <List.Item>
            使い方
            <List withPadding listStyleType="circle">
              <List.Item>関数定義にasyncをつける</List.Item>
              <List.Item>関数実行時にawaitをつける</List.Item>
              <List.Item>ルール：awaitはasync付きの関数でしか実行できない</List.Item>
            </List>
          </List.Item>
        </List>
      }
    />
  );
};
