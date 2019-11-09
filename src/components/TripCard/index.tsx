import * as React from 'react';

// third-party libraries
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  Cell,
} from '@material/react-layout-grid';
import * as moment from 'moment';

// components
import TripsModal from '@components/TripsModal';

// interfaces
import { TripCardProps } from './interfaces';

// styles
import './TripCard.scss';

const useStyles = makeStyles({
  root: {
    fontFamily: `"Google Sans", Roboto, "Helvetica Neue", sans-serif`,
    fontWeight: 'normal',
    lineHeight: '1.5em',
  },
  card: {
    maxWidth: 345,
    fontFamily: `"Google Sans", Roboto, "Helvetica Neue", sans-serif`,
  },
});

const img = 'https://res.cloudinary.com/almondgreen/image/upload/v1570631064/Mobilities/connected_world_auu3ui.svg';

const TripCard: React.SFC<TripCardProps> = (props) => {
  const classes = useStyles(props);
  const [modalOpen, setModalOpen] = React.useState(false);
  const { trip, requestTrip, setShowingSingleTrip, setSelectedTrip } = props;
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const onSelectTripCard = () => {
    setShowingSingleTrip(true)
    setSelectedTrip(trip.id)
  }

  const handleRequestTrip = () => {
    handleModalClose();
    requestTrip(trip.id);
  };

  return (
      <Cell
        desktopColumns={3}
        tabletColumns={4}
        phoneColumns={2}
      >
        <Card className={`${classes.card} trip-card`}>
          <CardActionArea onClick={onSelectTripCard}>
            <CardMedia
              component="img"
              alt="Request Trip"
              height="140"
              image={img}
              title="Request Trip"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h4">
                {/*{`Trip to ${trip.destination}`}*/}
                {`${props.trip.origin} to ${props.trip.destination}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {`${moment(props.trip.departure_date).format('LL')} - ${moment(props.trip.arrival_date).format('LL')}`}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions disableSpacing>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary" onClick={handleModalOpen}>
              Request
            </Button>
            <TripsModal open={modalOpen} handleClose={handleModalClose} handleSubmitRequest={handleRequestTrip} />
          </CardActions>
        </Card>
    </Cell>
  );
};
export default TripCard;
