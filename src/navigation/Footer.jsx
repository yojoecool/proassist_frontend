import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { facebook, linkedIn, twitter } from '../img';
import { useWindowDimensions } from '../modules';

const useStyles = makeStyles(theme => ({
  footer: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    bottom: 0,
    position: 'absolute',
    height: 215
  },
  footerHeight: {
    height: 215
  },
  bottomSection: {
    height: 35
  },
  colSection: {
    height: 215,
    // marginBottom: 15
  },
  colSection2: {
    width: '50%'
  },
  mediaDiv: {
    height: 35
  },
  typeSection: {
    width: 250
  }
}));

const picSize = "30";

function Footer(props) {
  const { width } = useWindowDimensions();
  const mobileView = width <= 425;

  const classes = useStyles();

  const bodyType = mobileView ? 'caption' : 'body2';

  return (
    <section className={classNames(classes.footer, classes.footerHeight)}>
      <div className={classNames('row', 'w-100')}>
        <div
          className={classNames(
              classes.colSection, 'pl-5',
              { 'col-8': !mobileView }, { 'col-6': mobileView },
              'd-flex', 'align-items-start', 
              'justify-content-center', 'flex-column'
          )}
        >
          <Typography variant="h6" className={classNames('text-uppercase', 'w-100')}>
            contact us
          </Typography>
          <div
            className={
              classNames('w-100',
                'd-flex', 'align-items-center', 
                'justify-content-center'
            )}
          >
            <div
              className={classNames(
                  { [classes.colSection2]: !mobileView }, { 'w-100': mobileView },
                  'd-flex', 'align-items-start', 
                  'justify-content-center', 'flex-column'
              )}
            >
              <Typography variant={bodyType} className={classNames('text-uppercase', 'mt-2')}>
                PROASSIST HEALTHCARE<br />SOLUTIONS, INC
              </Typography>
              <Typography variant={bodyType} className={classNames('text-uppercase', 'mt-2')}>
                hr@pro-assist.com<br />(866) 664-9119
              </Typography>
            </div>

            <div
              className={
                classNames(classes.colSection2, 'ml-3',
                  { 'd-flex': !mobileView }, 'align-items-start', 
                  'justify-content-center', 'flex-column',
                  { 'd-none': mobileView }
              )}
            >
              <Typography variant={bodyType} className={classNames('text-uppercase', 'mt-2')}>
                2212 jordan lane sw<br />huntsville, al 35805
              </Typography>
              <Typography variant={bodyType} className={classNames('text-uppercase', 'mt-2')}>
                m - f&nbsp;&nbsp;&nbsp;&nbsp;8am - 5pm cst
                <br />
                sat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10am - 3pm cst
              </Typography>
            </div>
          </div>
        </div>

        <div
          className={
            classNames('col', 'd-flex', 'align-items-center', 
              'justify-content-center', classes.colSection,
              'flex-column'
          )}
        >
          <Typography variant="h6" className={classNames('w-100', 'text-center')}>
            FOLLOW US
          </Typography>
          <div className={classNames('mt-2', 'w-100', 'text-center')}>
            <img src={twitter} className="mr-3" alt="twitter" height={picSize} width={picSize} />
            <img src={facebook} className="mr-3" alt="facebook" height={picSize} width={picSize} />
            <img src={linkedIn} alt="linkedIn" height={picSize} width={picSize} />
          </div>
        </div>
      </div>

     {/* <div className={classNames(classes.bottomSection)}>
      </div>*/}
    </section>
  );
}

export default Footer;