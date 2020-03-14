import React, { useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Modeling from './pages/Modeling';
import Tracing from './pages/Tracing';
import GraphTest from './pages/GraphTest';
import ModelGraph from './pages/ModelGraph';
import Home from './pages/Home';
import Negotiate from './pages/Negotiate';
import Login from './pages/Login';
import Register from './pages/Register';
import ChoseDB from './pages/ChoseDB';
import UploadData from './pages/UploadData';

import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from './redux/actions';

const useStyles = makeStyles(theme => ({
  App: {
    minWidth: 1300
  },
  root: {
    flexGrow: 1
  },
  paper: {
    width: '500px',
    overflowX: 'auto'
  },
  table: {
    minWidth: 300
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: '#000000'
  },
  appBar: {
    minWidth: 1300,
    background: '#9CCAF5'
  },
  box: {
    background: '#000000',
    width: '100px',
    height: '100px',
    position: 'absolute',
    zIndex: '2'
  },
  chart: {},
  board: {
    position: 'relative'
  }
}));

function App() {
  const classes = useStyles();
  let matches = {
    index: useRouteMatch({
      path: '/',
      exact: true
    }),
    login: useRouteMatch({
      path: '/login',
      exact: true
    }),
    register: useRouteMatch({
      path: '/register',
      exact: true
    }),
    chosedb: useRouteMatch({
      path: '/chosedb',
      exact: true
    }),
    home: useRouteMatch({
      path: '/home',
      strict: true,
      sensitive: true
    }),
    graphtest: useRouteMatch({
      path: '/graph',
      strict: true,
      sensitive: true
    }),
    graphori: useRouteMatch({
      path: '/graphori',
      strict: true,
      sensitive: true
    }),
    modeling: useRouteMatch({
      path: '/modeling',
      strict: true,
      sensitive: true
    }),
    traceabiliting: useRouteMatch({
      path: '/tracing',
      strict: true,
      sensitive: true
    }),
    modelgraph: useRouteMatch({
      path: '/modelgraph',
      strict: true,
      sensitive: true
    }),
    negotiate: useRouteMatch({
      path: '/negotiate',
      strict: true,
      sensitive: true
    }),
    uploaddata: useRouteMatch({
      path: '/uploaddata',
      strict: true
    })
  };

  const { barTitle } = useSelector(state => ({
    barTitle: state.text.barTitle
  }));
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div className='App'>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Button>
            <Typography
              variant='h6'
              className={classes.title}
              onClick={() => {
                history.push('/');
              }}
            >
              {barTitle}
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      {matches.index && <Home />}
      {matches.login && <Login />}
      {matches.register && <Register />}
      {matches.graphtest && <GraphTest />}
      {matches.modeling && <Modeling />}
      {matches.traceabiliting && <Tracing />}
      {matches.modelgraph && <ModelGraph />}
      {matches.negotiate && <Negotiate />}
      {matches.chosedb && <ChoseDB />}
      {matches.uploaddata && <UploadData />}
    </div>
  );
}

export default App;
