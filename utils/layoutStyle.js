import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  containedPrimary: {
    border: '2px solid red',
    backgroundColor: 'red',
  },
  navbar: {
    boxSizing: 'border-box',
    backgroundColor: '#2d4159',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },

  brand: {
    fontSize: '1.5rem',
    fontFamily: 'GooglesansBold',
    '@media(max-width: 7680px)': {
      fontSize: '1.1rem',
    },
  },

  addToCartButton: {
    backgroundColor: '#000240',
    color: '#ffffff',
  },

  carouselContainer: {
    marginTop: '50px',
    padding: '30px 50px ',
    border: '1px solid transparent',
    borderRadius: '10px',
    boxShadow: ' rgba(0, 0, 0, 0.07) 0px 10px 50px',
  },

  carousel: {
    padding: '0px',
  },

  carouselCard: {
    cursor: 'pointer',
    border: '1px solid  rgba(0, 0, 0, 0.1)',
    // boxShadow: ' rgba(0, 0, 0, 0.1) 0px 4px 12px',
    margin: 'auto',
    marginTop: '1px',
    marginLeft: '2px',
    marginBottom: '50px',
    height: '340px',
    width: '250px',
    transition: '.4s ease',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
});

export default useStyles;
