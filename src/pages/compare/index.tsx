import { Button, Text } from '@mantine/core';
import { useState } from 'react';

import { Layout } from '@/components/layout/Layout';

import type { NextPage } from 'next';

const Compare: NextPage = () => {
  const [time, setTime] = useState<number | string>(0);
  const [time2, setTime2] = useState<number | string>(0);
  const [time3, setTime3] = useState<number | string>(0);

  // コールバック関数で非同期処理を実現する
  const timeStart = () => {
    // timeに1秒ごとに3・2・1と表示する
    setTimeout(() => {
      setTime(1);
      setTimeout(() => {
        setTime(2);
        setTimeout(() => {
          setTime(3);
          setTimeout(() => {
            setTime('ネストがすごい');
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  // Promiseを使って非同期処理を実現する
  const timeStartPromise = () => {
    new Promise((resolve) => {
      setTimeout(() => {
        setTime2(3);
        resolve('3');
      }, 1000);
    })
      .then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            setTime2(2);
            resolve('2');
          }, 1000);
        });
      })
      .then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            setTime2(1);
            resolve('1');
          }, 1000);
        });
      })
      .then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            setTime2('ただ、読みづらい');
            resolve('ただ、読みづらい');
          }, 1000);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // async/awaitを使って非同期処理を実現する
  const timeStartAsync = async () => {
    const setTextTime = (num: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          setTime3(num);
          resolve(num);
        }, 1000);
      });
    };
    await setTextTime(3);
    await setTextTime(2);
    await setTextTime(1);
  };

  return (
    <Layout>
      <Text weight="bold" size="lg">
        コールバック関数（引数にとる関数）で非同期処理を実現する
      </Text>
      <Text>{time}</Text>
      <Button size="xs" onClick={timeStart}>
        start
      </Button>

      <Text weight="bold" size="lg">
        Promiseで非同期処理を実現する
      </Text>
      <Text>{time2}</Text>
      <Button size="xs" onClick={timeStartPromise}>
        start
      </Button>

      <Text weight="bold" size="lg">
        Async Awaitで非同期処理を実現する
      </Text>
      <Text>{time3}</Text>
      <Button size="xs" onClick={void timeStartAsync}>
        start
      </Button>
    </Layout>
  );
};

export default Compare;
