// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
function reverseSidebarItems(items) {
    // Reverse items in categories
    const result = items.map((item) => {
        if (item.type === 'category') {
            let index;
            item.items.map((data, cIndex) => {
                if (data.type === 'doc' && /^[\s\S]*\/index$/.test(data.id)) {
                    item.link = { type: 'doc', id: data.id };
                    index = cIndex;
                }
            })
            index !== undefined && item.items.splice(index, 1)
            return { ...item, items: reverseSidebarItems(item.items) };
        }
        return item;
    });
    // Reverse items at current level
    result.reverse();
    return result;
}
/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'IT学习笔记',
    tagline: '记录学习前端和后端知识的笔记',
    url: 'https://guing.github.io',
    baseUrl: '/FED-DOC/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/my.jpg',
    organizationName: 'Guing', // Usually your GitHub org/user name.
    projectName: 'FED-DOC', // Usually your repo name.
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
                    //   args.docs.map(item=>{
                    //     console.log(item.title);
                    //      if(item.title === 'index'){
                    //         item.title = 'test'
                    //      }
                    //   })
                    //   console.log(args.docs)
                    //   const sidebarItems = await defaultSidebarItemsGenerator(args);
                    //   return reverseSidebarItems(sidebarItems);
                    // },

                    exclude: [
                        '**/_*.{js,jsx,ts,tsx,md,mdx}',
                        '**/*.{js,jsx,ts,tsx,css,html}',
                        '**/_*/**',
                        '**/source/**',
                        '**/*.test.{js,jsx,ts,tsx}',
                        '**/__tests__/**',
                    ],
                    editUrl: 'https://github.com/Guing/FED-DOC',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/Guing/FED-DOC',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'IT学习笔记',
                logo: {
                    alt: 'IT学习笔记',
                    src: 'img/my.jpg',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro',
                        position: 'left',
                        label: '前端',
                    },
                    { to: '/blog', label: '博客', position: 'left' },
                    {
                        href: 'https://github.com/Guing/FED-DOC',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: '笔记',
                        items: [
                            {
                                label: '前端',
                                to: '/docs/intro',
                            },
                        ],
                    },
                    {
                        title: '社区',
                        items: [
                            {
                                label: '关于我',
                                href: 'https://github.com/Guing',
                            },

                        ],
                    },
                    {
                        title: '更多',
                        items: [
                            {
                                label: '博客',
                                to: '/blog',
                            },

                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} FED-DOCS, Inc. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },

        }),
};

module.exports = config;
