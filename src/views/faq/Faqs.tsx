// ** React Imports
import { SyntheticEvent } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { FaqType } from 'src/@core/components/types'

// ** Types

interface Props {
  activeTab: string
  data: FaqType[]
  handleChange: (event: SyntheticEvent, newValue: string) => void
}

// Styled TabList component
const MuiBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}))

const GetIcon = (category: string) => {
  if (category === 'Payment') {
    return 'mdi:credit-card-outline'
  } else if (category === 'Job Opportunities') {
    return 'eos-icons:cronjob'
  } else if (category === 'Health Insurance') {
    return 'solar:health-bold'
  } else if (category === 'Tax Card') {
    return 'tabler:receipt-tax'
  } else if (category === 'Residence Permit') {
    return 'mdi:card'
  } else if (category === 'Mandate') {
    return 'material-symbols:list'
  } else if (category === 'Life in Hungary') {
    return 'mdi:lifebuoy'
  } else if (category === 'Passport') {
    return 'mdi:passport'
  } else {
    return 'mdi:rotate-right'
  }
}

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  overflow: 'visible',
  '& .MuiTabs-flexContainer': {
    flexDirection: 'column'
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minHeight: 40,
    minWidth: 280,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: theme.shape.borderRadius,
    '& svg': {
      marginBottom: 0,
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%'
    }
  }
}))

const Faqs = ({ data, activeTab, handleChange }: Props) => {
  const renderTabContent = () => {
    return data.map(tab => {
      return (
        <TabPanel
          key={tab.title}
          value={tab.category}
          sx={{ p: 6, width: '100%', pt: { xs: 6, md: 0 }, pl: { xs: 0, md: 6 } }}
        >
          <Box key={tab.title}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' sx={{ height: 50, width: 50 }}>
                <Icon icon={GetIcon(tab.category)} fontSize={30} />
              </CustomAvatar>
              <Box sx={{ ml: 4 }}>
                <Typography variant='h5'>{tab.category}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{tab.title}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 5 }}>
              {tab.qandAs.map(item => {
                return (
                  <Accordion key={item.id}>
                    <AccordionSummary expandIcon={<Icon icon='mdi:chevron-down' />}>
                      <Typography sx={{ fontWeight: '500' }}>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ color: 'text.secondary' }}>{item.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                )
              })}
            </Box>
          </Box>
        </TabPanel>
      )
    })
  }

  const renderTabs = () => {
    if (data !== null) {
      return Object.values(data).map(tab => {
        if (tab.qandAs.length) {
          return (
            <Tab
              key={tab.title}
              value={tab.category}
              label={tab.category}
              icon={<Icon icon={GetIcon(tab.category)} fontSize={20} />}
            />
          )
        } else {
          return null
        }
      })
    } else {
      return null
    }
  }

  return (
    <MuiBox>
      <TabContext value={activeTab}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TabList onChange={handleChange}>{renderTabs()}</TabList>
          <Box sx={{ mt: 2.5, '& img': { maxWidth: '100%', display: { xs: 'none', md: 'block' } } }}>
            <img src='/images/cards/illustration-john.png' alt='illustration' width='250' />
          </Box>
        </Box>
        {renderTabContent()}
      </TabContext>
    </MuiBox>
  )
}

export default Faqs
