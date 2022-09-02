import { Button, List, Text } from '@mantine/core';
import { useState } from 'react';
// Promiseチェーンを実装する （参考文献：jsprimer）

import { Layout } from '@/components/layout/Layout';
import { AppLink } from '@/components/uiParts/AppLink';

// ランダムでFullfiled or Rejectedを返す関数を定義
const randomFullfilledOrReject = () => {
  return Math.random() > 0.5 ? Promise.resolve('成功') : Promise.reject(new Error('失敗'));
};
randomFullfilledOrReject()
  .then(function onFullfilled(value) {
    console.log(value);
  })
  .catch(function onRejected(error: Error) {
    console.log(error.message);
  });

// 失敗した時にthenは呼び出されるのか？
const rejectedPromsie = Promise.reject(new Error('thenは呼び出されるか：失敗'));
rejectedPromsie
  .then(() => {
    // console.log('then1');
  })
  .then(() => {
    // console.log('then2');
  })
  .catch((error: Error) => {
    // console.log(error.message);
  }); //→ 失敗した時には、thenは無視されてcatchの方にいく

// 失敗時の処理をcatchで一度キャッチすると、次に呼ばれるのは何？
Promise.reject(new Error('エラー'))
  .catch((error) => {
    console.log(error);
  }) // thenやcatchメソッドはFulfilled状態のPromiseインスタンスを作成して返すので一度キャッチすると、その次はthenになる
  .then(() => {
    console.log('thenのコールバック関数');
  })
  .catch((error) => {
    console.log(error);
  });

// Promiseチェーンで値を返すこともできる
const valuePromiseChain = Promise.resolve(1)
  .then((value) => {
    return Number(value) * 2;
  })
  .then((value) => {
    return Number(value) * 2;
  })
  .catch((error: Error) => {
    console.log(error.message);
  });

valuePromiseChain
  .then((value) => {
    console.log('aas', value);
  })
  .catch((error: Error) => {
    console.log(error.message);
  });

// コーヅバック関数内でPromiseインスタンス・例えばRejectedなPromiseインスタンスを返すと、
// 失敗時のままなので、次に呼ばれるのはcatchになる
const exampleRejectedPromise = () => {
  return Promise.reject(new Error('exampleRejectedPromiseのエラー'));
};
exampleRejectedPromise().catch((error: Error) => {
  console.log(error.message);
});

const PromiseChain = () => {
  const [result, setResult] = useState<string>('デフォルト');

  // finallyを使って実装
  const finnallyPromise = (path: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (path.startsWith('/resorce')) {
          resolve({ body: `Response body of ${path}` });
          setResult('成功');
        } else {
          reject(new Error('NOT FOUND'));
          setResult('失敗');
        }
      }, 1000 * Math.random());
    });
  };

  const handleOnclick = () => {
    finnallyPromise('/resorce/A')
      .then((response) => {
        console.log(response);
      })
      .catch((error: Error) => {
        console.log(error.message);
      })
      .finally(() => {
        console.log('finally');
      });
  };

  // Promise.allを使って実装
  const delay = (time: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(time);
      }, time);
    });
  };
  const promiseDelay1 = delay(1000);
  const promiseDelay2 = delay(2000);
  const promiseDelay3 = delay(3000);
  Promise.all([promiseDelay1, promiseDelay2, promiseDelay3])
    .then((values) => {
      console.log('promise all', values);
      // 複数のPromiseの結果を一つの配列で受け取ることができる
    })
    .catch((error: Error) => {
      console.log('promise all', error.message);
    });

  return (
    <Layout>
      <Text>コードを見ながらPromiseチェーンを説明します</Text>
      <List withPadding listStyleType="disc">
        <List.Item>
          成功したとき、失敗した時にどうするかをPromiseチェーンを使用して実装することができる
        </List.Item>
        <List withPadding listStyleType="disc">
          <List.Item>
            コールバック関数内で何を返すかによって、次にどのチェーンに行くかが変化
          </List.Item>
          <List.Item>値を入れて渡すことも可能</List.Item>
          <List.Item>
            then・catchだけでなく、finallyメソッドを使用してPromiseチェーンの最後に処理を書くこともできる（try
            catch finallyと同様）
          </List.Item>
        </List>
      </List>
      <Text>{result}</Text>
      <Button onClick={handleOnclick}>Finally Button</Button>

      <List withPadding listStyleType="disc">
        <List.Item>Promise.all</List.Item>
        <List withPadding listStyleType="disc">
          <List.Item>
            Promiseインスタンスの配列を受け取って、新しいPromiseインスタンスを返す
          </List.Item>
          <List.Item>複数のPromiseが完了するまで待つ処理</List.Item>
        </List>
      </List>

      <List withPadding listStyleType="disc">
        <List.Item>Promise.race</List.Item>
        <List withPadding listStyleType="disc">
          <List.Item>
            複数のPromiseを受け取るが、Promiseが一つでも完了した段階で次の処理を実行する
          </List.Item>
          <List.Item>
            Promiseインスタンスの配列を受け取り、新しいPromiseインスタンスを返す
          </List.Item>
          <List.Item>具体例</List.Item>
          <List withPadding listStyleType="disc">
            <List.Item>複数のAPIを叩いて、最初に返ってきたデータを使うときに使用する</List.Item>
            <List.Item>
              Promiseを使った非同期処理のタイムアウト（一定時間経過しても処理が終わってないからエラーとして扱う処理）が実装できる
            </List.Item>
          </List>
        </List>
      </List>

      <br />
      <br />
      <Text weight={700}>
        Promiseは元から組み込まれているものであるので、非同期処理間の連携をするには、チェーンをするなど特殊な書き方になってしまう！
      </Text>
      <Text weight={700}>
        → 不格好な見た目を解決するために、Async Functionという構文が導入された
      </Text>
      <AppLink title="AsyncFunction" href="/AsyncFunction" />
    </Layout>
  );
};
export default PromiseChain;
