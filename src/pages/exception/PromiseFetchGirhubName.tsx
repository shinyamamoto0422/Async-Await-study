import { List } from '@mantine/core';
import Image from 'next/image';

import { BoxWithText } from '@/components/uiParts/AppBox';

// 非同期処理を行う関数を定義--一段ネストが深くなる
const getGitUserName = () => {
  const url = 'https://api.github.com/users/shinyamamoto0422';

  return new Promise((resolve, reject) => {
    const json = fetch(url);
    json
      .then((res) => res.json())
      .then((json: { id: number }) => {
        // 成功
        return resolve(json.id);
      })
      .catch((error) => {
        // 失敗
        return reject(error);
      });
  });
};
// resolveかrejectが呼び出されるまで次に進まない

void getGitUserName();

export const PromiseFetchGithubName = () => {
  return (
    <BoxWithText
      title="Promise"
      content={
        <List withPadding listStyleType="disc">
          <List.Item>後で値を返すから待っててね」という約束を持つ</List.Item>
          <List.Item>
            Promiseの状態（完了を待つ方法）
            <List withPadding listStyleType="circle">
              <List.Item>pending：new Promiseでインスタンスを作成した時の初期状態</List.Item>
              <List.Item>fulfilled：処理が成功して完了（resolve）したと時の状態</List.Item>
              <List.Item>
                rejected：処理が失敗して完了（rejectまたは例外が発生）した時の状態
              </List.Item>
              <List.Item>一度でもsettledになった場合は、それ以降変化しない</List.Item>
            </List>
          </List.Item>
          <List.Item>
            Promiseの状態
            <List withPadding listStyleType="disc">
              <List.Item>
                決定したプロミス（Promiseインスタンスの状態が変化したとき）にさらなるアクションを結びつける（一度だけ呼ばれるコールバック関数を登録する）ためのメソッド
                <List withPadding listStyleType="circle">
                  <List.Item>
                    then→
                    成功時と失敗時のコールバック関数の二つを受け取る（ただ、失敗時だけの時はcatch推奨）
                  </List.Item>
                  <List.Item>catch</List.Item>
                  <List.Item>finally</List.Item>
                  <Image src={'/promiseChain.png'} alt="chain" width={700} height={300} />
                </List>
              </List.Item>

              <List.Item>
                状態が変化済みのPromiseインスタンスを作成する方法
                <List withPadding listStyleType="disc">
                  <List.Item>
                    resolve：Fullfiledの状態になったPromiseインスタンスを作成する
                  </List.Item>
                  <List.Item>reject</List.Item>
                </List>
              </List.Item>
            </List>
          </List.Item>
        </List>
      }
    />
  );
};
