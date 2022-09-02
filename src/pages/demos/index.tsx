/* eslint-disable @next/next/no-img-element */
import { Box, Button, Text } from '@mantine/core';
import { Dispatch, useState } from 'react';

import { Layout } from '@/components/layout/Layout';
import { TwoColumn } from '@/components/uiGroup/TwoColumn';
import { BoxWithText } from '@/components/uiParts/AppBox';

import type { NextPage } from 'next';

type Props = {
  timeout: number;
};
const blockTimeFunc = ({ timeout }: Props) => {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    // do nothing
  }
};

type setTimeoutFuncProps = {
  timeout: number;
  setBlockText: Dispatch<React.SetStateAction<string>>;
};
const setTimeoutFunc = ({ timeout, setBlockText }: setTimeoutFuncProps) => {
  setTimeout(() => {
    setBlockText('4.setTimeout end');
    // 外部のスコープにアクセスできる
    // →非同期処理がメインスレッドで行われていることを示す
  }, timeout);
};

type pokemonType = {
  name: string;
  url: string;
  abilities: { ability: { name: string; url: string } }[];
};
type pokemonData = {
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: Array<{ ability: { name: string; url: string } }>;
};

const Demos: NextPage = () => {
  const [blockText, setBlockText] = useState<string>('1.start');
  const [timeoutText, setTimeoutText] = useState<string>('1.start');
  const [pokeArray, setPokeArray] = useState<pokemonType[] | undefined>();
  const [two, setTwo] = useState<pokemonType[] | undefined>();

  const handleStart = () => {
    blockTimeFunc({ timeout: 3000 });
    setBlockText('2: done');
  };

  const handleStart2 = () => {
    setTimeoutFunc({ timeout: 2000, setBlockText: setTimeoutText });
    setTimeoutText('2.同期的な処理');
  };

  // poke api
  const fetchPokemon = async () => {
    // 1~150のidを指定して、forで回して、それぞれのポケモンを取得し、それを配列に入れる。その後、それぞれの画像を表示させる
    const pokeArray: pokemonType[] = [];
    for (let i = 1; i <= 300; i++) {
      // awaitは既存の構文と組み合わせて利用することができる・Promiseのみの場合は、Promiseチェーン・コールバック関数を使った反復処理を実装する必要がある
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: pokemonData = await res.json();
      // console.log('data', data);

      pokeArray.push({
        name: data.name,
        url: data.sprites.front_default,
        abilities: data.abilities,
      });
    }
    setPokeArray(pokeArray);
  };

  const fetchPokemon2 = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/1`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: pokemonData = await res.json();
    // console.log('2', data);
    setTwo([
      {
        name: data.name,
        url: data.sprites.front_default,
        abilities: data.abilities,
      },
    ]);
  };

  return (
    <Layout>
      <Text weight="bold" size="lg">
        動作を実際に動かして確認します
      </Text>

      <TwoColumn
        title="block"
        left={
          <>
            <Button onClick={handleStart}>start</Button>
            <Text>3秒間ブロックされる。「1.start」→「2.done」</Text>
            <br />
            <Text>ブロック中に、Homeに移動してみようとしてください。</Text>
          </>
        }
        right={
          <Text weight="bold" size="xl" color="blue">
            {blockText}
          </Text>
        }
      />

      <TwoColumn
        title="setTimeout"
        left={
          <>
            <Button onClick={handleStart2}>start</Button>
            <Text>コードの順番とは異なる順番で実行される。</Text>
          </>
        }
        right={
          <Text weight="bold" size="xl" color="blue">
            {timeoutText}
          </Text>
        }
      />

      <BoxWithText
        title="非同期処理がどのようにメインスレッドで実行されるか"
        content={<p>コードを用いて解説</p>}
      />

      {/* poke apiを使ってポケモンの写真をフェッチしてくる */}
      <BoxWithText
        title="ポケモンの画像と名前をフェッチする"
        content={
          <>
            {two?.map((poke) => {
              return (
                <div key={poke.name}>
                  <img src={poke.url} alt={poke.name} />
                  <p>{poke.name}</p>
                </div>
              );
            })}
            <Button
              onClick={() => {
                void fetchPokemon();
                void fetchPokemon2();
                // exceptionの「決定したプロミスにさらなるアクションを結びつけるためのメソッド」を説明する時に使う
                // .then(() => {})
                // .catch(() => {});
              }}
            >
              fetch pokemon
            </Button>
            <div className="flex flex-wrap">
              {pokeArray &&
                pokeArray.map((pokemon, index) => {
                  return (
                    <Box key={index} className="m-2  rounded bg-gray-200 px-2">
                      <Text weight="bold" color="gray" size="sm" className="pt-2 text-center">
                        {pokemon.name.toUpperCase()}
                      </Text>
                      <img src={pokemon.url} alt={pokemon.name} />
                      {pokemon.abilities.map((item, index) => {
                        return (
                          <Text
                            key={index}
                            weight="bold"
                            color="gray"
                            size="sm"
                            className="pt-2 text-center"
                          >
                            {item.ability.name}
                          </Text>
                        );
                      })}
                    </Box>
                  );
                })}
            </div>
          </>
        }
      />
    </Layout>
  );
};

export default Demos;
