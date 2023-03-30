import React, { useState } from 'react'
import { Container, Row, Card, Modal } from 'reactstrap'
import AdDetails from '../components/Ad/AdDetails'
import AdsData from '../components/Ad/AdsData'
import Header from 'components/Headers/Header.jsx'
import { allItems } from '../apollo/server'
import { useQuery, gql } from '@apollo/client'

const GET_ITEMS = gql`
  ${allItems}
`
function Ads() {
  const [detailsModal, setDetailModal] = useState(false)
  const [ad, setAd] = useState(null)
  const { data, loading, error, subscribeToMore } = useQuery(GET_ITEMS)

  const toggleModal = ad => {
    setAd(ad)
    setDetailModal(prev => !prev)
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              {error ? (
                <tr>
                  <td>
                    {'Error'}! ${error.message}
                  </td>
                </tr>
              ) : (
                <AdsData
                  ads={data ? data.allItems : []}
                  toggleModal={toggleModal}
                  subscribeToMore={subscribeToMore}
                  loading={loading}
                  selected={ad}
                  updateSelected={setAd}
                />)}
            </Card>
          </div>
        </Row>
        <Modal
          className="modal-dialog-centered"
          size="lg"
          isOpen={detailsModal}
          toggle={() => {
            toggleModal(null)
          }}>
          <AdDetails ads={ad} />
        </Modal>
      </Container>
    </>
  )
}

export default Ads
