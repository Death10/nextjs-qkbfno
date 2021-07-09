import React from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '/styles/Home.module.css';
import js64 from '/components/js64';
import dateColor from '/components/dateColor';
import { withStyles, makeStyles, alpha } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  circle: {
    width: '44px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

const page0 = 'https://data-six.vercel.app/0OSLWF';
var linkstorage = [page0];
var jsonstorage = [''];

const CustomTooltip = withStyles(theme => ({
  arrow: {
    color: theme.palette.common.black
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: 16
  }
}))(Tooltip);

export async function getStaticProps() {
  const res = await fetch(page0);
  const getjson = await res.json();
  return { props: { getjson } };
}

export default function Home({ getjson }) {
  const [data, dataNew] = useState(getjson);
  if (jsonstorage[0] == '') {
    jsonstorage[0] = getjson;
  }

  const loading = React.createRef();
  var isLoading = false;

  async function fetchData(url) {
    const index = linkstorage.indexOf(url);
    if (index == -1) {
      const select = loading.current;
      select.style.display = 'initial';
      const res = await fetch(url);
      const newJson = await res.json();
      linkstorage.push(url);
      jsonstorage.push(newJson);
      dataNew(newJson);
      //dataNew(data => [...data, ...newJson]);
      if (!isLoading) {
        setTimeout(() => (select.style.display = 'none'), 1000);
        isLoading = true;
      }
    } else {
      //dataNew(jsonstorage[index]);
      dataNew(data => [...data, ...jsonstorage[index]]);
    }
  }

  const classes = useStyles();
  return (
    <div className={styles.body}>
      <Head>
        <title>Danh sách Light Novel</title>
      </Head>
      <div className={styles.container}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                Material-UI
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Toolbar>
          </AppBar>
        </div>

        <main className={styles.main}>
          <div className={styles.nav}>
            <button
              onClick={async () => {
                fetchData(data[data.length - 1].prev);
              }}
              // dataNew(data => [...data, ...data2]);
            >
              <ChevronLeftIcon />
            </button>
            {data[data.length - 1].month}
            <button
              onClick={async () => {
                fetchData(data[data.length - 1].next);
              }}
            >
              <ChevronRightIcon />
            </button>
          </div>
          <CircularProgress
            ref={loading}
            color="white"
            style={{ display: 'none' }}
            className={classes.circle}
          />
          <div className={styles.grid}>
            {data.map((book, key) => (
              <CustomTooltip title={book.name} arrow>
                <a href={book.link} className={styles.card} key={key}>
                  <img src={book.cover} className={styles.cover} />
                  <div className={styles.vol}>{book.vol}</div>
                  <div
                    className={styles.date}
                    style={{ background: dateColor(book.date) }}
                  >
                    {book.date.replaceAll('/', ' — ')}
                  </div>
                  <div className={styles.name}>{book.name}</div>
                </a>
              </CustomTooltip>
            ))}
          </div>
        </main>

        <footer className={styles.footer}>
          <a href="https://www.facebook.com/mango.tttq">Mango-chan</a>
        </footer>

        <button
          title="Back to top"
          className={styles.scroll}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }}
        >
          <KeyboardArrowUpIcon />
        </button>
      </div>
    </div>
  );
}

console.error = (...x) => {
  return;
};
