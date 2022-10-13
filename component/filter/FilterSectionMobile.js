import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import styles from '@/styles/component/FilterSection.module.scss';
import { useRouter } from 'next/router';

function FilterSectionMoblie({
  productTypes,
  removeFilterHandler,
  checkBoxHandler,
  label,
}) {
  const [language, setLanguage] = useState('');
  const { state } = useContext(Store);
  const [theCheckedArray, setTheCheckedArray] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setTheCheckedArray([...Object.values(router.query)]);
    setLanguage(state.language);
  }, [state.language, router.query]);

  return (
    <>
      <Box className={styles.filterSectionMobile}>
        <Accordion
          defaultExpanded={false}
          dir={language === 'English' ? 'ltr' : 'rtl'}
        >
          <AccordionSummary
            style={{
              backgroundColor: '#f5f5f5',
              width: '100%',
              padding: '4px 10px',
            }}
            // aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={<ExpandMore />}
          >
            <Typography>
              <span style={{ fontFamily: 'IRANsans' }}>{label}</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={language === 'English' ? {} : { paddingRight: 0 }}
          >
            <List>
              {productTypes.map((productType, index) => (
                <ListItem key={index}>
                  <FormGroup>
                    <FormControlLabel
                      // inputProps={{ 'aria-label': 'controlled' }}
                      label={productType}
                      value={productType}
                      control={
                        <Checkbox
                          style={
                            language === 'English'
                              ? { marginRight: '4px' }
                              : { marginLeft: '4px' }
                          }
                          size="small"
                          color="primary"
                          onChange={(e) =>
                            checkBoxHandler(e.target.value, e.target.checked)
                          }
                          checked={
                            theCheckedArray.find((item) => item === productType)
                              ? true
                              : false
                          }
                        />
                      }
                    />
                  </FormGroup>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}

export default FilterSectionMoblie;
