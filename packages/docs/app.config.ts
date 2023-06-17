export default defineAppConfig({
  docus: {
    title: 'Language kit',
    description: 'The best tools to create custom and extended languages',
    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',
    socials: {
      // twitter: 'nuxtstudio',
      github: 'sidekick-coder/language-kit'
    },
    github: {
      dir: 'packages/docs',
      branch: 'main',
      repo: 'language-kit',
      owner: 'sidekick-coder',
      edit: true
    },
    layout: 'default',
    aside: {
      level: 1,
      collapsed: false,
      exclude: []
    },
    main: {
      padded: true,
      fluid: true
    },
    header: {
      padded: true,
      logo: true,
      fluid: true,
    },
    // footer: {
    //   iconLinks: [
    //     {
    //       href: 'https://nuxt.com',
    //       icon: 'simple-icons:nuxtdotjs'
    //     }
    //   ]
    // }
  }
})
