import { List, Text } from '@mantine/core';

import { Layout } from '@/components/layout/Layout';
import { BoxWithText, CodeBoxWithText } from '@/components/uiParts/AppBox';
import { AppLink } from '@/components/uiParts/AppLink';

import type { NextPage } from 'next';

const Explanation: NextPage = () => {
  // todo: 説明
  const d = new Date();
  const year = d.getFullYear();
  console.log(year);

  // todo: プリミティブの値に.ドットが付くとJSの自動型変換機能によって文字列からStringオブジェクトに変換される
  const lower = 'HeLLOO'.toLowerCase();
  console.log(lower);

  // todo: オブジェクト
  const dyna = {
    //オブジェクト
    name: 'dyna', //プロパティ
    age: 20, //プロパティ
    favorite: 'music', //プロパティ
    speak: function () {
      //メソッド→オブジェクトの操作・プロパティに関数を設定したもの
      console.log('hello');
    },
  };
  dyna.speak();

  // todo:インスタンス・コンストラクタ
  const obj = new Object();
  console.log('インスタンスからの呼び出しはできない', obj.length);
  console.log('コンストラクタからの呼び出しはできる', Object.length);

  function Man(name: string, age: number) {
    //コンストラクタ
    this.name = name;
    this.age = age;
  }
  const harry = new Man('Harry', 18); //インスタンスを作成
  console.log(harry.age, harry.name);

  return (
    <Layout>
      <BoxWithText
        title="ビルトインオブジェクト"
        content={
          <div>
            <p>JavaScriptに組み込まれている基本的な機能を提供するためのオブジェクト</p>
            <p>オブジェクトを指定すれば、すぐに呼び出して利用できる。</p>
            <CodeBoxWithText title="例： String・Array・Number・Math・Date・RegExp・Object・Boolean・Function" />

            <div>
              <Text weight={700}>参考リンク</Text>
              <AppLink
                title="ビルトインオブジェクト"
                href="https://rfs.jp/sb/javascript/02js/biltinobj.html"
              />
              <AppLink
                title="クラス-jsprimer"
                href="https://jsprimer.net/basic/class/#extends-built-in"
              />
            </div>
          </div>
        }
      />
      <BoxWithText
        title="コンストラクタ・インスタンス"
        content={
          <div>
            <Text weight={600}>インスタンス</Text>
            <List withPadding listStyleType="disc">
              <List.Item>
                インスタンス→オブジェクト（配列・関数・オブジェクトリテラル・ラッパーオブジェクトアド、プリミティブでない全ての値）のコピー
              </List.Item>
              <List.Item>
                例：function()は、Functionのインスタンス・[]は、Arrayのインスタンス・newは、コンストラクタのインスタンス
              </List.Item>
            </List>

            <Text weight={600}>コンストラクタ</Text>
            <List withPadding listStyleType="disc">
              <List.Item>関数オブジェクト・インスタンスを作成する関数のこと</List.Item>
              <List.Item>
                コンストラクターを使用すると、他のメソッドを呼び出す前に行う必要のある独自の初期化を提供することができる。
              </List.Item>
            </List>

            <Text weight={700}>インスタンス</Text>
            <List withPadding listStyleType="disc">
              <List.Item>
                new演算子を使用すると、組み込みオブジェクト型のインスタンスを作成することができる。
              </List.Item>
              <List.Item>
                <CodeBoxWithText title="new constructor[([arguments])]" />
              </List.Item>
            </List>
          </div>
        }
      />
    </Layout>
  );
};

export default Explanation;
