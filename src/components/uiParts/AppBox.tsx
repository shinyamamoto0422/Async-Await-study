import { Box, Text } from '@mantine/core';
import { FC, ReactNode } from 'react';

type Props = {
  title: string;
};

export const AppBox: FC<Props> = ({ title }) => {
  return (
    <span className="flex items-center justify-center rounded bg-gray-800 px-4 py-2">
      <Text size="md" weight="bold" color="white">
        {title}
      </Text>
    </span>
  );
};

type BoxWithTextProps = {
  title: string;
  content: ReactNode;
};
export const BoxWithText: FC<BoxWithTextProps> = ({ title, content }) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
      })}
    >
      <Text size="md" weight="bold">
        {title}
      </Text>
      {content}
    </Box>
  );
};

type CodeBoxWithTextProps = {
  title: string;
};
export const CodeBoxWithText: FC<CodeBoxWithTextProps> = ({ title }) => {
  return <span className=" rounded bg-gray-200 px-2 py-1">{title}</span>;
};
