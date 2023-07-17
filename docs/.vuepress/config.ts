import { defaultTheme, defineUserConfig, NavbarConfig, SidebarConfigArray } from 'vuepress';

const navbarArray: NavbarConfig = [
  {text: 'Home', link: '/'},
  {text: 'Introduce', link: '/introduce'},
  {text: 'Experience', link: '/experience'},
  {text: 'My velog', link: 'https://velog.io/@chlee4858'}
]

const sidebarArray: SidebarConfigArray= [
  {
    text: 'Home',
    link: '/'
  },
  {
    text: 'Introduce',
    link: '/introduce'
  }
]

export default defineUserConfig({
  base: '/cherry1004/',
  lang: 'en-US',
  title: 'Cherry1004/archive',
  description: '개인화된 저장소',
  theme: defaultTheme({
    colorMode: 'light',
    colorModeSwitch: false,
    navbar: navbarArray,
    sidebar: sidebarArray
  })
})

