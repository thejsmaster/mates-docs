'use client';

import { useEffect, useRef } from 'react';
import sdk from '@stackblitz/sdk';
import { Box, Container, Title } from '@mantine/core';

export default function PlaygroundPage() {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      const project = {
        title: 'Mates JS Playground',
        description: 'JavaScript playground with Mates for creating reactive UIs',
        template: 'node' as const,
        files: {
          'package.json': `{
  "name": "mates-playground",
  "private": true,
  "version": "1.0.0",
  "description": "Playground for experimenting with Mates library",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "mates": "latest"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}`,
          'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mates Playground</title>
    <style>
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        line-height: 1.5;
        padding: 2rem;
      }
      button {
        padding: 0.5rem 1rem;
        margin: 0.5rem 0;
        border-radius: 0.25rem;
        background: #3b82f6;
        color: white;
        font-weight: 500;
        cursor: pointer;
        border: none;
      }
      button:hover {
        background: #2563eb;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./index.ts"></script>
  </body>
</html>`,
          'index.ts': `import { view, atom, html, renderView } from "mates";

// Create a view that uses this state
const CounterView = (props) => {
  let count = 0;
  const incr = setter(() => count++);
  return () => {
    // This function renders the template
    return html\`
      <div>
        <h1>Count: \${count}</h1>
        <button @click=\${incr}>Increment</button>
      </div>
    \`;
  };
};

// Render the view in your app in an element
// second param should be id of the element
renderView(CounterView, "app");`,
          'vite.config.js': `import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true
  },
  optimizeDeps: {
    include: ['mates']
  }
});`,
          'README.md': `# Mates Playground

This playground demonstrates using the Mates library to create reactive UIs with a simple counter example.

## Getting Started

1. The project has the Mates library installed
2. index.ts contains a simple counter implementation
3. Run \`npm run dev\` to start the development server

## About Mates

Mates is a JavaScript library for building reactive UIs with a simple API.
`,
        },
        settings: {
          compile: {
            trigger: 'auto',
            clearConsole: false,
          },
        },
      };

      sdk.embedProject(editorRef.current, project, {
        openFile: 'index.ts',
        height: 600,
        hideNavigation: true,
        hideDevTools: true,
        view: 'editor',
        hideExplorer: false,
        forceEmbedLayout: true,
      });
    }
  }, []);

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="lg">
        Mates Playground
      </Title>
      <Box ref={editorRef} h={600} mb="lg" style={{ width: '100%' }} />
    </Container>
  );
}
