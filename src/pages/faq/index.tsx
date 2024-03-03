// 'use client'

// ** React Imports
import { Fragment, useEffect, useState, SyntheticEvent } from 'react'

// ** Next Imports
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { useAxios } from '../../hooks/useAxios'
import FaqHeader from 'src/views/faq/FaqHeader'
import FAQS from 'src/views/faq/Faqs'
import FaqFooter from 'src/views/faq/FaqFooter'

// ** Types
import { FaqType } from 'src/@core/components/types'
import endpoints from 'src/configs/endpoints'

const FAQ = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // ** States
  const [data, setData] = useState<FaqType[] | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activeTab, setActiveTab] = useState<string>('Payment')

  useEffect(() => {
    if (searchTerm !== '') {
      useAxios.get(endpoints.allFaqUrl).then(response => {
        if (response?.data?.data?.faqs?.content && Object.values(response.data.data.faqs.content).length) {
          const faqs: FaqType[] = response.data.data.faqs.content

          const queryLowered = searchTerm.toLowerCase()

          const filteredData: FaqType[] = faqs.filter(
            (qandA: FaqType) =>
              qandA.category.toLowerCase().includes(queryLowered) ||
              qandA.title.toLowerCase().includes(queryLowered) ||
              qandA.qandAs.some(qA => qA.answer.toLowerCase().concat(qA.question.toLowerCase()).includes(queryLowered))
          )

          setData(filteredData)

          // @ts-ignore
          setActiveTab(filteredData[0]?.category)
        } else {
          setData(null)
        }
      })
    } else {
      setData(apiData)
    }
  }, [apiData, searchTerm])

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  }

  const renderNoResult = (
    <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', '& svg': { mr: 2 } }}>
      <Icon icon='mdi:alert-circle-outline' />
      <Typography variant='h6'>No Results Found!!</Typography>
    </Box>
  )

  return (
    <Fragment>
      <FaqHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {data !== null ? <FAQS data={data} activeTab={activeTab} handleChange={handleChange} /> : renderNoResult}
      <FaqFooter />
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await useAxios.get(endpoints.allFaqUrl)
  const apiData: FaqType = res?.data?.data?.faqs?.content

  if (!res || !apiData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      apiData
    },
    revalidate: 150
  }
}

export default FAQ
