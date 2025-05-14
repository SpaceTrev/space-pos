import withMDX from '@next/mdx'({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [require('rehype-slug'), require('rehype-autolink-headings')],
  },
});
 
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);