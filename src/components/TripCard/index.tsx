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
import { Link, NavLink } from 'react-router-dom';

// components
import TripsModal from '@components/TripsModal';

// interfaces
import { TripCardProps } from './interfaces';

// utils
import countryString from '@utils/helpers/countryString';

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

const TripCard: React.FunctionComponent<TripCardProps> = (props) => {
  const classes = useStyles(props);
  const [modalOpen, setModalOpen] = React.useState(false);
  const {
    trip,
    requestTrip,
    handleDeleteTrip,
    redirect,
    isOwner,
    link,
  } = props;

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

  const renderCardActionNotOwner = () => (
    <React.Fragment>
      <Button size="small" color="primary">
        Share
      </Button>
      <Button size="small" color="primary" onClick={handleModalOpen}>
        Request
      </Button>
    </React.Fragment>
  );

  const renderCardActionsOwner = () => (
    <React.Fragment>
      <Button size="small" color="primary">
        <Link to={link}>
          Edit
        </Link>
      </Button>
      <Button size="small" color="primary" onClick={handleDeleteTrip}>
        Delete
      </Button>
    </React.Fragment>
  );

  return (
      <Cell
        desktopColumns={3}
        tabletColumns={4}
        phoneColumns={2}
      >
        <Card className={`${classes.card} trip-card`}>
          <CardActionArea onClick={() => redirect(trip.id) }>
            <CardMedia
              component="img"
              alt="Request Trip"
              height="140"
              image={img}
              title="Request Trip"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h4">
                {`${countryString(trip.origin)} to ${countryString(trip.destination)}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {`${moment(trip.departure_date).format('LL')} - ${moment(trip.arrival_date).format('LL')}`}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions disableSpacing>
            {isOwner ? renderCardActionsOwner() : renderCardActionNotOwner()}
            <TripsModal
              open={modalOpen}
              handleClose={handleModalClose}
              handleSubmitRequest={handleRequestTrip}
            />
          </CardActions>
        </Card>
    </Cell>
  );
};
export default TripCard;
