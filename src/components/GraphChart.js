import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    width: '500px',
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  box: {
    background: '#000000',
    width: '100px',
    height: '100px',
    position: 'absolute',
    zIndex: '2',
  },
  chart: {},
  board: {
    position: 'relative',
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function GraphChart() {
  const classes = useStyles();
  const [nodes, setNodes] = useState([
    {
      name: 'X1',
      cursor: 'pointer',
    },
    {
      name: 'X1table',
      symbolSize: '50',
      symbol:
        'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
    },
    { name: 'X2' },
    { name: 'X3' },
    { name: 'X4' },
    { name: 'X5' },
    { name: 'X6' },
    { name: 'X7' },
    { name: 'X8' },
    { name: 'X9' },
    { name: 'X10' },
    { name: 'X11' },
    { name: 'X12' },
    { name: 'Y1' },
    { name: 'Y2' },
    { name: 'Y3' },
  ]);
  const [option, setOption] = useState({
    title: {},
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'force',
        symbolSize: 50,
        roam: true,
        draggable: true,
        label: {
          normal: {
            show: true,
          },
        },
        force: {
          initLayout: 'circular',
          edgeLength: 100,
          repulsion: 500,
          gravity: 0.1,
          focusNodeAdjacency: true,
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          normal: {
            textStyle: {
              fontSize: 20,
            },
          },
        },
        data: nodes,
        // links: [],
        links: [
          {
            source: 'X1table',
            target: 'X1',
            lineStyle: {
              type: 'dotted',
            },
          },
          {
            source: 'X2',
            target: 'X1',
          },
          {
            source: 'X3',
            target: 'X2',
          },
          {
            source: 'X4',
            target: 'X3',
          },
          {
            source: 'X5',
            target: 'X3',
          },
          {
            source: 'X6',
            target: 'X3',
          },
          {
            source: 'X7',
            target: 'X3',
          },
          {
            source: 'X8',
            target: 'X3',
          },
          {
            source: 'X9',
            target: 'X3',
          },
          {
            source: 'X10',
            target: 'X3',
          },
          {
            source: 'X11',
            target: 'X3',
          },
          {
            source: 'X12',
            target: 'X3',
          },
          {
            source: 'Y1',
            target: 'X1',
          },
          {
            source: 'Y1',
            target: 'X4',
          },
          {
            source: 'Y1',
            target: 'X5',
          },
          {
            source: 'Y2',
            target: 'X9',
          },
          {
            source: 'Y2',
            target: 'X11',
          },
          {
            source: 'Y3',
            target: 'X12',
          },
          {
            source: 'Y3',
            target: 'Y2',
          },
        ],
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 2,
            curveness: 0,
          },
        },
        itemStyle: {
          color: 'pink',
        },
      },
    ],
  });
  const [chartIns, setChartIns] = useState(0);
  const [coverIns, setCoverIns] = useState(0);
  const [testPos, setTestPos] = useState({ x: 150, y: 100 });
  const [testA, setTestA] = useState(0);
  const getOption = () => {
    return option;
  };

  function sleep() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('done');
      }, 1000);
    });
  }

  function outputPos() {
    setInterval(() => {
      let ins = chartIns.getEchartsInstance();
      let what = Object.getOwnPropertyNames(ins._chartsMap)[0];
      let pos = ins._chartsMap[what]._symbolDraw._data._itemLayouts;
      setTestPos({ x: 10, y: 10 });
      setTestA({ x: 10, y: 10 });
    }, 1000);
  }

  async function changeColors(changeNodes) {
    outputPos();
    console.log(chartIns.getEchartsInstance());
    for (let node of changeNodes) {
      let tempNodes = nodes;
      tempNodes.find(item => item.name === node).itemStyle = {};
      tempNodes.find(item => item.name === node).itemStyle.color = 'purple';
      console.log(tempNodes);
      setNodes(tempNodes);
      chartIns.getEchartsInstance().setOption(option);
      await sleep();
    }
  }

  let onEvents = {
    click: e => {
      console.log(e.data.name);
    },
  };
  return (
    <div className="App">
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Graph示例
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.board}>
        <canvas
          ref={e => {
            setCoverIns(e);
          }}
          style={{
            height: '500px',
            width: '800px',
            left: '0',
            top: '0',
            position: 'absolute',
            zIndex: '10',
            pointerEvents: 'none',
          }}
        ></canvas>
        <ReactEcharts
          ref={e => {
            setChartIns(e);
          }}
          option={option}
          style={{
            height: '500px',
            width: '800px',
            position: 'absolute',
            zIndex: '1',
          }}
        ></ReactEcharts>
        <button
          onClick={() => {
            changeColors(['X8', 'X3', 'X2', 'X1']);
          }}
          style={{ position: 'absolute', zIndex: '10' }}
        ></button>
        <Paper className={classes.paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
}

export default GraphChart;
