import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../redux/actions';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 300,
    height: 400,
    overflow: 'auto',
    paddingTop: 30,
    paddingLeft: 30,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 500,
  },
  con: { margin: '10px auto', width: '1000px', position: 'relative' },
  stepCon: { position: 'absolute', left: 120 },
  step2paper: { width: 700, margin: '10px auto' },
  table: {
    minWidth: 650,
  },
  tableInput: {
    marginBottom: 15,
    width: 50,
    height: 10,
  },
  resize: {
    fontSize: 13,
  },
}));

function getSteps() {
  return ['第一步', '第二步', '第三步', '第四步'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return '说明：上面展示为系统预设的指标类型，可以通过多选并转移自定义指标类型，点击下一步完成提交修改';
    case 1:
      return '说明：此处为Y类型指标的离散分界值，每一项均为必填项，点击下一步完成提交';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#9ccaf5',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#9ccaf5',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#9ccaf5',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#9ccaf5',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

/**
 * step1
 */
function TransferList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([
    { id: 0, name: 'A' },
    { id: 1, name: 'B' },
    { id: 2, name: 'C' },
    { id: 3, name: 'D' },
  ]);
  const [right, setRight] = React.useState([
    { id: 4, name: 'E' },
    { id: 5, name: 'F' },
    { id: 6, name: 'G' },
    { id: 7, name: 'H' },
  ]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const GreenCheckbox = withStyles({
    root: {
      color: '#666666',
      '&$checked': {
        color: '#9ccaf5',
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

  const customList = (items, title) => (
    <Paper className={classes.paper}>
      <Typography variant="h6" component="h3">
        {title}
      </Typography>
      <List dense component="div" role="list">
        {items.map(value => {
          const labelId = `transfer-list-item-${value.id}-label`;

          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <GreenCheckbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{customList(left, '指标X')}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right, '指标Y')}</Grid>
    </Grid>
  );
}

/**
 * step2
 */

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('下单等待时间', 159, 6.0, 24, '正向'),
  createData('商品价格', 237, 9.0, 37, '负向'),
];

function Step2Card() {
  const classes = useStyles();
  return (
    <Paper className={classes.step2paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>指标名称</TableCell>
            <TableCell>临界值</TableCell>
            <TableCell align="right">最小值</TableCell>
            <TableCell align="right">最大值</TableCell>
            <TableCell align="right">极性</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>
                <TextField
                  id="standard-basic"
                  placeholder="请输入"
                  className={classes.tableInput}
                  onChange={e => {
                    console.log(e.target.value);
                  }}
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                />
              </TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

/**
 * step3
 */

function Modeling() {
  const classes = useStyles();
  const dispatch = useDispatch();

  let matches = {
    step1: useRouteMatch({
      path: '/modeling/step1',
      strict: true,
      sensitive: true,
    }),
    step2: useRouteMatch({
      path: '/modeling/step2',
      strict: true,
      sensitive: true,
    }),
  };
  let history = useHistory();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [isTitleChanged, setIsTitleChanged] = React.useState(false);
  const steps = getSteps();

  useEffect(() => {
    if (!isTitleChanged) {
      dispatch(setTitle('建模'));
      setIsTitleChanged(true);
    }
  });

  useEffect(() => {
    switch (activeStep) {
      case 0:
        history.push('/modeling/step1');
        break;
      default:
        history.push('/modeling/step2');
    }
  }, [activeStep, history]);

  const isStepOptional = step => {
    return false;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const ColorButton = withStyles(theme => ({
    root: {
      color: '#ffffff',
      backgroundColor: '#9ccaf5',
      '&:hover': {
        backgroundColor: '#9ccaf5',
      },
    },
  }))(Button);

  return (
    <div className={classes.con}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {matches.step1 && <TransferList />}
      {matches.step2 && <Step2Card />}
      <div className={classes.stepCon}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <ColorButton
                variant="contained"
                disabled={activeStep === 0}
                color="primary"
                onClick={handleBack}
                className={classes.button}
              >
                上一步
              </ColorButton>

              <ColorButton
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? '完成' : '下一步'}
              </ColorButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modeling;
