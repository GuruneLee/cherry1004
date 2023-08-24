import { defaultTheme, defineUserConfig, NavbarConfig, SidebarConfigArray, viteBundler } from 'vuepress';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { getDirname, path, fs } from '@vuepress/utils'
import { getSidebar, tmp } from './config/sidebar';

// //@ts-ignore
// const __dirname = getDirname(import.meta.url)

const navbarArray: NavbarConfig = [
  {
    text: 'Home',
    link: '/'
  },
  {
    text: 'Introduce',
    link: '/introduce'
  },
  {
    text: 'Experience',
    link: '/experience'
  },
  {
    text: 'My velog',
    link: 'https://velog.io/@chlee4858'
  }
];

const sidebarArray: SidebarConfigArray = tmp()
// const sidebarArray: SidebarConfigArray = getSidebar()

export default defineUserConfig({
  base: '/cherry1004/',
  lang: 'en-US',
  title: 'Cherry1004/archive',
  description: '개인화된 저장소',
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: [
          {
            find: '@docs',
            replacement: path.resolve(__dirname, '../../docs')
          },
        ],
      },
    },
    vuePluginOptions: {},
  }),
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    }),
  ],
  theme: defaultTheme({
    colorMode: 'light',
    colorModeSwitch: true,
    navbar: navbarArray,
    sidebar: sidebarArray
  })
});

