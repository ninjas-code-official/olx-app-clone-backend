import React, { useState } from 'react'
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Collapse,
  FormGroup,
  Input,
  Form,
  Alert,
  Button,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'
import { GoogleMap, Marker } from '@react-google-maps/api'
import {TailSpin} from 'react-loader-spinner'
import { gql, useMutation } from '@apollo/client'
import { updateItemStatus } from '../../apollo/server'

const UPDATE_ITEM_STATUS = gql`${updateItemStatus}`

function AdDetails(props) {
  const [customerCollapse, setCustomerCollapse] = useState(true)
  const [adDetails, setAdDetails] = useState(true)
  const [adAction, setAdAction] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [
    updateItemStatus,
    { loading: updateItemLoading }
  ] = useMutation(UPDATE_ITEM_STATUS, { onCompleted, onError })
  const data = props ? props.ads : ''
  const locData = data ? data.address.location.coordinates : null
  var center = { lat: 0, lng: 0 }
  if (locData) {
    center = { lat: Number(locData[1]), lng: Number(locData[0]) }
  }

  function onCompleted({ updateItemStatus }) {
    setSuccess('Status Updated')
  }

  function onError(error) {
    setError(error.message)
  }

  const validateStatus = () => {
    return !!selectedStatus
  }

  const onDismiss = () => {
    console.log('onDismiss')
    setError('')
    setSuccess('')
  }

  const onChangeStatus = event => {
    setSelectedStatus(event.target.value)
  }

  return (
    <>
      {data &&
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">
                  {'Ad ID: ' + data ? data.itemId : ''}
                </h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <Row className="align-items-center">
                <Col xs="12">
                  {(error || success) && (
                    <Row>
                      <Col lg="12">
                        <Alert
                          color="success"
                          isOpen={!!success}
                          fade={true}
                          toggle={onDismiss}>
                          <span className="alert-inner--text">{success}</span>
                        </Alert>
                        <Alert
                          color="danger"
                          isOpen={!!error}
                          fade={true}
                          toggle={onDismiss}>
                          <span className="alert-inner--text">{error}</span>
                        </Alert>
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col xs="8">
                  <h3 className="mb-1">{'User'}</h3>
                </Col>
                <Col xs="4" className='text-right'>
                  <Button
                    color="primary"
                    onClick={() => {
                      setCustomerCollapse(prev => !prev)
                    }}
                    style={{ marginBottom: '1rem' }}>
                    Show/Hide
                </Button>
                </Col>
              </Row>
              <Collapse isOpen={customerCollapse}>
                <Row>
                  <Col lg="4">
                    <label className="form-control-label" htmlFor="input-name">
                      {'Name'}
                    </label>
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        id="input-name"
                        type="text"
                        disabled={true}
                        defaultValue={data.user.name}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <label className="form-control-label" htmlFor="input-phone">
                      {'Phone'}
                    </label>
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        id="input-phone"
                        type="text"
                        disabled={true}
                        defaultValue={data.user.phone}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <label className="form-control-label" htmlFor="input-email">
                      {'Email'}
                    </label>
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        id="input-email"
                        type="text"
                        disabled={true}
                        defaultValue={data.user.email}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="12">
                    <label className="form-control-label" htmlFor="input-address">
                      {'Address'}
                    </label>
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        id="input-address"
                        type="text"
                        disabled={true}
                        defaultValue={data.address.address}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Collapse>
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-1">{'Actions'}</h3>
                </Col>
                <Col xs="4" className='text-right'>
                  <Button
                    color="primary"
                    onClick={() => {
                      setAdAction(prev => !prev)
                    }}
                    style={{ marginBottom: '1rem' }}>
                    Show/Hide
                </Button>
                </Col>
              </Row>
              <Collapse isOpen={adAction}>
                <Row>
                  <Col lg="6">
                    <label
                      className="form-control-label"
                      htmlFor="input-rider">
                      {'Select Status'}
                    </label>
                    <FormGroup>
                      <InputGroup>
                        <Input
                          type="select"
                          name="select"
                          id="input-rider"
                          defaultValue={data.status}
                          onChange={onChangeStatus}>
                          <option></option>
                          <option value=""></option>
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="DELETE">DELETE</option>
                          <option value="DEACTIVATED">DEACTIVATED</option>
                          <option value="SOLD">SOLD</option>
                        </Input>

                        <div className="input-group-append">
                          {updateItemLoading ? (
                            <Button color="primary" onClick={() => null}>
                              <TailSpin
                                className="text-center"
                               
                                color="#FFF"
                                height={20}
                                width={40}
                                visible={updateItemLoading}
                              />
                            </Button>
                          ) : (
                              <Button
                                color="primary"
                                disabled={data.status === selectedStatus}
                                onClick={() => {
                                  if (validateStatus()) {
                                    updateItemStatus({
                                      variables: {
                                        id: data._id,
                                        status: selectedStatus
                                      }
                                    })
                                  }
                                }}>
                                {'Assign'}
                              </Button>
                            )}
                        </div>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <label
                      className="form-control-label"
                      htmlFor="status_Selected">
                      {'Current Status'}
                    </label>
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        id="status_Selected"
                        type="text"
                        readOnly
                        value={data.status || ''}
                      />
                    </FormGroup>
                  </Col>
                </Row>

              </Collapse>
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-1">{'Details'}</h3>
                </Col>
                <Col xs="4" className='text-right'>
                  <Button
                    color="primary"
                    onClick={() => {
                      setAdDetails(prev => !prev)
                    }}
                    style={{ marginBottom: '1rem' }}>
                    Show/Hide
                </Button>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col>
                  <Collapse isOpen={adDetails}>
                    <Row className="align-items-center">
                      <Col lg="3">
                        <label className="form-control-label" htmlFor="input-name">
                          {'Name'}
                        </label>
                        <FormGroup>
                          <Input
                            className="form-control-alternative"
                            id="input-name"
                            type="text"
                            disabled={true}
                            defaultValue={data.title}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <label className="form-control-label" htmlFor="input-Description">
                          {'Description'}
                        </label>
                        <FormGroup>
                          <Input
                            className="form-control-alternative"
                            id="input-Description"
                            rows={1}
                            // cols={50}
                            type="textarea"
                            readOnly
                            disabled={true}
                            defaultValue={data.address.address}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <label className="form-control-label" htmlFor="input-name">
                          {'Condition'}
                        </label>
                        <FormGroup>
                          <Input
                            className="form-control-alternative"
                            id="input-name"
                            type="text"
                            disabled={true}
                            defaultValue={data.condition}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg='6'>
                        <Row>
                          {data && data.images.map((image, index) =>
                            <Col key={index} lg='6'>
                              <div className="thumbnail mt-2">
                                <img src={image} width='100%' className='img-thumbnail' />
                              </div>
                            </Col>)}
                        </Row>
                      </Col>
                      <Col lg='6'>
                        {locData &&
                          <GoogleMap
                            mapContainerStyle={{
                              height: '350px',
                              width: '100%'
                            }}
                            id="example-map"
                            zoom={14}
                            center={center}
                          // onLoad={onLoad}
                          // onUnmount={onUnmount}
                          >
                            <Marker
                              position={center}
                            />
                          </GoogleMap>
                        }
                      </Col>
                    </Row>
                  </Collapse>
                </Col>
              </Row>
              <Row>

              </Row>
            </Form>
          </CardBody>
        </Card>}
    </>
  )
}
export default AdDetails
