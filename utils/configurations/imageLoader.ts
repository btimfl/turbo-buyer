export default function imageLoader({ src }: any) {
    return `/images/${src}`;
  }
  
  module.exports = imageLoader;