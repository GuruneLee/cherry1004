import * as fs from 'fs';

export const getSidebar = () => {
  // read file names
  // const files = fs.readdirSync('../../')
  // console.log(files);
  return [
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
      link: '/experience',
      children: [
        {
          text: 'ComponentTutorials',
          link: '/experience/component_tutorial'
        }
      ]
    }
  ];
};

// TODO - 개선 필요
// - README.md 처리 x
// - ROOT ('Home') 라우팅 처리 x
export const tmp = () => {
  const files = fs.readdirSync('./docs');
  return go('./docs', '')
};

const go = (dirPath: string, parentLink: string) => {
  const sidebarArray = [];
  const files = fs.readdirSync(dirPath)
    .filter(file => !file.startsWith('.'));

  if (files.length === 0) {
    return sidebarArray;
  }

  files.forEach((file) => {
    const isDir = fs.statSync(dirPath + '/' + file).isDirectory();
    if (isDir) {
      sidebarArray.push({
        text: file,
        link: parentLink + '/' + file,
        children: go(dirPath + '/' + file, parentLink + '/' + file)
      });
      return;
    }

    sidebarArray.push({
      text: file,
      link: parentLink + '/' + file
    });
  });

  return sidebarArray
};
