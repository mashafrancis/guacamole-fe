import { TripCardProps } from '@components/TripCard/interfaces';
// interfaces
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
// components
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';
import * as React from 'react';

const img = 'https://lh5.googleusercontent.com/proxy/_ECWS_wDS0aup4RSiWrlSYSBQYCfk5iBAc4n16cpZxzqb3RDrIAgvqVs9Yb4Ee3vceslfiFd_dzq_P1RCaGbzr7BSqRyhLM8ev_5KFf2oD4avw7xPNuuhc94N7XVrn66bgvCw8KzMT63RbVE_KUjF2QMRY8ar08PCwRxSCI8ySpr=w1024-h328-n-k-no';

const useStyles = makeStyles((theme: Theme) =>
 createStyles({
   card: {
     maxWidth: 'auto',
     maxHeight: 300,
   },
   media: {
     height: 0,
     paddingTop: '56.25%', // 16:9
   },
   expand: {
     transform: 'rotate(0deg)',
     marginLeft: 'auto',
     transition: theme.transitions.create('transform', {
       duration: theme.transitions.duration.shortest,
     }),
   },
   expandOpen: {
     transform: 'rotate(180deg)',
   },
   avatar: {
     backgroundColor: red[500],
   },
 })
);

const SingleTripCard: React.SFC<TripCardProps> = (props) => {
  const classes = useStyles(props);
  const [modalOpen, setModalOpen] = React.useState(false);
  const { trip, requestTrip } = props;
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleRequestTrip = () => {
    handleModalClose();
    requestTrip(trip.id);
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={img}
      >
        <div className="card-header">
          <Typography variant="h4" noWrap={true} className="card-header__main">
            {`${props.trip.origin} to ${props.trip.destination}`}
          </Typography>
          <h5 className="card-header__sub">
            {`${moment(props.trip.departure_date).format('LL')} - ${moment(props.trip.arrival_date).format('LL')}`}
          </h5>
        </div>
      </CardMedia>
    </Card>
  );
};
export default SingleTripCard;
