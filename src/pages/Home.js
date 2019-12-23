import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 300,
    margin: 20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  con: {
    display: 'flex',
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  let history = useHistory();

  return (
    <div className={classes.con}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            建模
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              history.push('/modeling/step1');
            }}
          >
            进入
          </Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            溯源
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              history.push('/tracing');
            }}
          >
            进入
          </Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            协商
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              history.push('/negotiate/step1');
            }}
          >
            进入
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
