/* eslint-disable react/display-name */
import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import orderBy from 'lodash/orderBy'
import CustomLoader from '../Loader/CustomLoader'
import { transformToNewline } from '../../utils/stringManipulations'
import { subscribeCreateAd } from '../../apollo/server'
import { gql } from '@apollo/client'
const SUBSCRICE_CREATE_ITEM = gql`
  ${subscribeCreateAd}
`

const AdsData = props => {
  const { selected, updateSelected } = props

  const propExists = (obj, path) => {
    return path.split('.').reduce((obj, prop) => {
      return obj && obj[prop] ? obj[prop] : ''
    }, obj)
  }

  const customSort = (rows, field, direction) => {
    const handleField = row => {
      if (field && isNaN(propExists(row, field))) {
        return propExists(row, field).toLowerCase()
      }

      return row[field]
    }

    return orderBy(rows, handleField, direction)
  }

  const handleSort = (column, sortDirection) => {
    console.log(column.selector, sortDirection)
  }

  const columns = [
    {
      name: 'Ad ID',
      sortable: true,
      selector: 'itemId',
      cell: row => <span className="mb-0 text-sm">{row.itemId}</span>
    },
    {
      name: 'Image',
      center: true,
      grow: 0,
      cell: row => (
        <>{<img src={row.images[0]} className="img-fluid img-thumbnail" />}</>
      )
    },
    {
      name: 'User',
      sortable: true,
      selector: 'user.name',
      cell: row => (
        <>{`${row.user.name}\n${row.user.email}\n${
          row.user.showPhone ? row.user.phone : ''
        }`}</>
      )
    },
    {
      name: 'Title',
      cell: row => <>{row.title}</>
    },
    {
      name: 'Description',
      selector: 'description',
      center: true
    },
    {
      name: 'Condition',
      selector: 'condition',
      grow: 0,
      center: true
    },
    {
      name: 'Address',
      cell: row => <>{transformToNewline(row.address.address, 3)}</>
    }
  ]

  useEffect(() => {
    props.subscribeToMore({
      document: SUBSCRICE_CREATE_ITEM,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        // console.log("data subscribe", JSON.stringify(subscriptionData))
        if (subscriptionData.data.subscribeCreateAd.origin === 'new') {
          return {
            allItems: [
              subscriptionData.data.subscribeCreateAd.item,
              ...prev.allItems
            ]
          }
        } else {
          const itemIndex = prev.allItems.findIndex(
            o => subscriptionData.data.subscribeCreateAd.item._id === o._id
          )
          prev.allItems[itemIndex] =
            subscriptionData.data.subscribeCreateAd.item
          return { allItems: [...prev.allItems] }
        }
      },
      onError: error => {
        console.log('onError', JSON.stringify(error))
      }
    })
  }, [])

  useEffect(() => {
    if (selected) {
      const item = props.ads.find(o => o._id === selected._id)
      updateSelected(item)
    }
  }, [props.ads])

  return (
    <DataTable
      title={'Ads'}
      columns={columns}
      data={props.ads}
      onRowClicked={props.toggleModal}
      progressPending={props.loading}
      progressComponent={<CustomLoader />}
      onSort={handleSort}
      sortFunction={customSort}
      pagination
      pointerOnHover
    />
  )
}
export default AdsData
