import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    themes: {
      default: 'meaty-mexico',
      list: [
        { name: 'meaty-mexico', class: 'theme-meaty light', color: '#9e0000' },
        { name: 'meaty-mexico-dark', class: 'theme-meaty dark', color: '#9e0000' },
        { name: 'carniceria-zapata', class: 'theme-zapata light', color: '#00529b' },
        { name: 'carniceria-zapata-dark', class: 'theme-zapata dark', color: '#00529b' }
      ]
    },
    layout: 'centered',
    controls: { expanded: true },
  }
};

export default preview;