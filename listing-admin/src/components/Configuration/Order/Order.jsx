import React, { useState } from 'react'
import {
  Row,
  Col,
  Card,
  CardHeader,
  FormGroup,
  Form,
  Input,
  Button
} from 'reactstrap'
import { validateFunc } from '../../../constraints/constraints'
import { saveOrderConfiguration } from '../../../apollo/server'
import {TailSpin} from 'react-loader-spinner'
import { gql, useMutation } from '@apollo/client'

const SAVE_ORDER_CONFIGURATION = gql`
  ${saveOrderConfiguration}
`

function Order(props) {
  const [prefix, prefixSetter] = useState(props.prefix || '')
  const [prefixError, prefixErrorSetter] = useState(null)
  const [
    saveConfiguration,
    { loading, error }
  ] = useMutation(SAVE_ORDER_CONFIGURATION, { onCompleted, onError })

  const validateInput = () => {
    let result = true
    result = !validateFunc({ prefix: prefix }, 'prefix')
    prefixErrorSetter(result)
    return result
  }

  const onBlur = (setter, field, event) => {
    setter(!validateFunc({ [field]: event.target.value.trim() }, field))
  }
  function onCompleted(data) {
    console.log(data)
  }
  function onError(error) {
    console.log(error)
  }
  return (
    <Row className="mt-3">
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">{'Ad'}</h3>
          </CardHeader>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col md="8">
                  <label className="form-control-label" htmlFor="input-orderid">
                    {'AdID prefix'}
                  </label>
                  <FormGroup
                    className={
                      prefixError === null
                        ? ''
                        : prefixError
                          ? 'has-success'
                          : 'has-danger'
                    }>
                    <Input
                      className="form-control-alternative"
                      id="input-orderid"
                      placeholder="e.g EC-"
                      type="text"
                      readOnly
                      defaultValue={prefix}
                      onChange={event => {
                        prefixSetter(event.target.value)
                      }}
                      onBlur={event => {
                        onBlur(prefixErrorSetter, 'prefix', event)
                      }}></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  {error ? (
                    'Error :('
                  ) : loading ? (
                    <Button
                      className="btn-block mb-2"
                      color="primary"
                      onClick={() => null}>
                      <TailSpin                        
                        color="#FFF"
                        height={25}
                        width={30}
                        visible={loading}
                      />
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="btn-block mb-2"
                      type="button"
                      color="primary"
                      onClick={e => {
                        e.preventDefault()
                        if (validateInput()) {
                          saveConfiguration({
                            variables: {
                              configurationInput: {
                                itemPrefix: prefix
                              }
                            }
                          })
                        }
                      }}
                      size="lg">
                      {'Save'}
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
          </Form>
        </Card>
      </div>
    </Row>
  )
}
export default Order
