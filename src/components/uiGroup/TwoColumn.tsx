import { Text } from '@mantine/core';
import { FC, ReactNode } from 'react';

type TwoColumnProps = {
  title: string;
  left: ReactNode;
  right: ReactNode;
};
export const TwoColumn: FC<TwoColumnProps> = ({ title, left, right }) => {
  return (
    <div className="mx-4 mb-5">
      <Text size="md" weight="bold">
        {title}
      </Text>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded  p-1 md:col-span-1">
          <div className="rounded bg-white p-5 md:col-span-1">{left}</div>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-200 p-5 md:col-span-1">
          {right}
        </div>
      </div>
    </div>
  );
};
