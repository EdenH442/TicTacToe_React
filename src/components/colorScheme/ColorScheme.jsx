// src/components/ColorScheme.jsx
import React, { useEffect } from 'react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Sun, Moon } from 'react-bootstrap-icons';

function ColorScheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    document.body.className = colorScheme;
  }, [colorScheme]);

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      {colorScheme === 'dark' ? <Sun /> : <Moon />}
    </ActionIcon>
  );
}

export default ColorScheme;
