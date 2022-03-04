import { React } from 'react'
import { motion } from 'framer-motion';
import cx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useQuery } from '@apollo/client';
import { GET_HUNT_ITEMS } from '../utils/queries';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 343,
    margin: 'auto',
    borderRadius: 12,
    padding: 12,
    paddingTop: 50,
  },
  media: {
    borderRadius: 6,
  },
}));

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
}));


const SeattleExploreHunt = () => {
  const navigate = useNavigate()
  const styles = useStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });
  const gridStyles = useGridStyles();
  const { button: buttonStyles } = useBlogTextInfoContentStyles();

  const { loading, data } = useQuery(GET_HUNT_ITEMS)

    // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
    const huntItems = data?.huntItems || [];

    console.log(huntItems)

    if (loading) {
        return <h2>LOADING.....</h2>
    }

    const goToItem = (huntId) => {
      console.log(huntId)
      navigate(`../hints/${huntId}`)

    }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
            <TextInfoContent
              classes={textCardContentStyles}
              overline={'SEATTLE'}
              heading={'EXPLORE HUNT'}
              body={
                <div>
                  <h2>FIND YER BOOTY!</h2>
                </div>
              }
            />

          <Grid style={{ justifyContent: 'center' }} classes={gridStyles} container spacing={2}>
          {huntItems &&
                    huntItems.map((huntItem) => (
            <Grid item xs={12} sm={6} md={4}>
              <Card className={cx(styles.root, shadowStyles.root)}>
                <CardContent>
                  <TextInfoContent
                    classes={textCardContentStyles}
                    overline={huntItem.city}
                    heading={huntItem.name}
                    body={
                      <div>
                        <Button onClick={() => goToItem(huntItem._id)} className={buttonStyles}>Start Now!</Button>
                      </div>
                    }
                  />
                </CardContent>
              </Card>
            </Grid>
))}
          </Grid>
      </motion.div>
    </>
  );
};


export default SeattleExploreHunt