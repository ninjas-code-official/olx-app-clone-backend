import React from 'react'
import { Container } from 'reactstrap'
import Header from 'components/Headers/Header.jsx'
import { getConfiguration } from '../apollo/server'
import OrderConfiguration from '../components/Configuration/Order/Order'
import EmailConfiguration from '../components/Configuration/Email/Email'
import CurrencyConfiguration from '../components/Configuration/Currency/Currency'
import Loader from 'react-loader-spinner'
import { gql, useQuery } from '@apollo/client'

const GET_CONFIGURATION = gql`
  ${getConfiguration}
`

const Configuration = props => {
  const { data, loading, error } = useQuery(GET_CONFIGURATION)
  return (
    <>
      <Header />
      {error ? (
        'Error :('
      ) : loading ? (
        <Container className="text-center mt-10" fluid>
          <Loader
            type="TailSpin"
            color="#002f34"
            height={300}
            width={300}
            visible={loading}
          />
        </Container>
      ) : (
        <Container className="mt--7" fluid>
          <Loader
            type="TailSpin"
            color="#FFF"
            height={25}
            width={30}
            visible={loading}
          />
          <OrderConfiguration prefix={data.configuration.itemPrefix} />
          <EmailConfiguration
            email={data.configuration.email}
            password={data.configuration.password}
            enabled={data.configuration.enableEmail}
          />
          <CurrencyConfiguration
            currencyCode={data.configuration.currency}
            currencySymbol={data.configuration.currencySymbol}
          />
        </Container>
      )}
    </>
  )
}

export default Configuration
