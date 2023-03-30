/* eslint-disable react/display-name */
import React, { useState } from 'react'
// reactstrap components
import { Card, Container, Row, Modal } from 'reactstrap'
import { useQuery, gql } from '@apollo/client'
import Header from '../components/Headers/Header'
import ZoneComponent from '../components/Zone/Zone'
import CustomLoader from '../components/Loader/CustomLoader'
import { getZones, deleteZone } from '../apollo/server'
import DataTable from 'react-data-table-component'
import orderBy from 'lodash/orderBy'
import ActionButton from '../components/ActionButton/ActionButton'


const GET_ZONES = gql`
  ${getZones}
`
const DELETE_ZONE = gql`
  ${deleteZone}
`


function Zone(props) {
  const [editModal, setEditModal] = useState(false)
  const [zones, setZone] = useState(null)
  const toggleModal = zone => {
    setEditModal(!editModal)
    setZone(zone)
  }

  const { data, loading, error } = useQuery(GET_ZONES)

  const onCompleted = data => { }
  const onError = error => {
    console.log(error)
  }

  const customSort = (rows, field, direction) => {
    const handleField = row => {
      if (row[field]) {
        return row[field].toLowerCase()
      }

      return row[field]
    }

    return orderBy(rows, handleField, direction)
  }

  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection)

  const columns = [
    {
      name: 'Title',
      sortable: true,
      selector: 'title'
    },
    {
      name: 'Description',
      sortable: true,
      selector: 'description'
    },
    {
      name: 'Action',
      cell: row => (
        <ActionButton
          deleteButton={true}
          editButton={true}
          row={row}
          mutation={DELETE_ZONE}
          editModal={toggleModal}
          refetchQuery={GET_ZONES}
        />
      )
    }
  ]

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <ZoneComponent />
        {/* Table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="shadow">
              {error &&
                <span>
                  {'Error'}! ${error.message}
                </span>}
                  <DataTable
                    title={'Zones'}
                    columns={columns}
                    data={data?data.zones:[]}
                    pagination
                    progressPending={loading}
                    progressComponent={<CustomLoader />}
                    onSort={handleSort}
                    sortFunction={customSort}
                    defaultSortField="title"
                  />
            </Card>
          </div>
        </Row>
        <Modal
          className="modal-dialog-centered"
          size="lg"
          isOpen={editModal}
          toggle={() => {
            toggleModal()
          }}>
          <ZoneComponent zone={zones} closeModal={setEditModal} />
        </Modal>
      </Container>
    </>
  )
}
export default Zone