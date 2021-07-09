import Head from 'next/head';
import styles from '/styles/Home.module.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import js64 from '/components/js64';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

export async function getStaticPaths() {
  //const res = await fetch('https://.../posts')
  //const posts = await res.json()

  const posts = [
    {
      id: '1'
    },
    {
      id: '2'
    }
  ];

  const paths = posts.map(post => ({
    params: { id: post.id }
  }));
  return { paths, fallback: true };
}

const page0 = 'https://data-six.vercel.app/0OSLWF';
export async function getStaticProps() {
  const res = await fetch(page0);
  const enc = await res.text();
  const data = await js64(enc);
  return { props: { data } };
}

export default function Post({ data }) {
  const [getID, IDNew] = useState(false);
  const router = useRouter();
  var { id } = router.query;

  useEffect(() => {
    if (id != null) {
      console.log(id);
    }
  });
  return <p>Post: {id}</p>;
}
