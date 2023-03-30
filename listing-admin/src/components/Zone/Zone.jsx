import React, { useState, useRef, useCallback } from 'react'
import { useMutation, gql } from '@apollo/client'
import { validateFunc } from '../../constraints/constraints'

// reactstrap components
import {
    Alert,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from 'reactstrap'
import { GoogleMap, Polygon } from '@react-google-maps/api'
import { transformCoordinates, transformPath } from '../../utils/transform'

// core components
import { createZone, editZone, getZones } from '../../apollo/server'
const CREATE_ZONE = gql`
  ${createZone}
`
const EDIT_ZONE = gql`
  ${editZone}
`
const GET_ZONE = gql`
  ${getZones}
`

const Zone = (props) => {
    const [mutation] = useState(props.zone ? EDIT_ZONE : CREATE_ZONE)
    const [title, setTitle] = useState(props.zone ? props.zone.title : '')
    const [description, setDescription] = useState(
        props.zone ? props.zone.description : ''
    )
    const [path, setPath] = useState(props.zone ? transformCoordinates(props.zone.location.coordinates) : [])
    const [mutate, { loading }] = useMutation(mutation, {
        onCompleted,
        onError,
        refetchQueries: [{ query: GET_ZONE }]
    })
    const [errors, setErrors] = useState('')
    const [succes, setSuccess] = useState('')
    const [titleError, setTitleError] = useState(null)
    const [descriptionError, setDescriptionError] = useState(null)
    const [center] = useState(
        props.zone
            ? setCenter(props.zone.location.coordinates[0])
            : { lat: 33.684422, lng: 73.047882 }
    )
    const polygonRef = useRef(null)
    const listenersRef = useRef([]);

    const onClick = e => {
        setPath([...path, { lat: e.latLng.lat(), lng: e.latLng.lng() }])
        console.log(e.latLng.lat(), e.latLng.lng())
    }

    function setCenter(coordinates) {
        return { lat: coordinates[0][1], lng: coordinates[0][0] }
    }

    const onBlur = field => {
        // this.setState({ [field + 'Error']: !validateFunc({ [field]: this.state[field] }, field) })
    }

    // Call setPath with new edited path
    const onEdit = useCallback(() => {
        if (polygonRef.current) {
            const nextPath = polygonRef.current
                .getPath()
                .getArray()
                .map(latLng => {
                    return { lat: latLng.lat(), lng: latLng.lng() };
                });
            setPath(nextPath);
        }
    }, [setPath]);

    // Bind refs to current Polygon and listeners
    const onLoadPolygon = useCallback(
        polygon => {
            polygonRef.current = polygon;
            const path = polygon.getPath();
            listenersRef.current.push(
                path.addListener("set_at", onEdit),
                path.addListener("insert_at", onEdit),
                path.addListener("remove_at", onEdit)
            );
        },
        [onEdit]
    );

    // Clean up refs
    const onUnmount = useCallback(() => {
        listenersRef.current.forEach(lis => lis.remove());
        polygonRef.current = null;
    }, []);

    const onSave = () => {
        var paths = polygonRef.current.state.polygon.getPaths()
        if (paths.i.length === 0) return
        const polygonBounds = paths.i[0].i
        var bounds = []
        for (var i = 0; i < polygonBounds.length; i++) {
            var point = [polygonBounds[i].lng(), polygonBounds[i].lat()]
            bounds.push(point)
        }
        bounds.push(bounds[0])
        return [bounds]
    }

    const onSubmitValidaiton = () => {
        const titleErrors = !validateFunc({ title: title }, 'title')
        const descriptionErrors = !validateFunc(
            { description: description },
            'description'
        )
        let zoneErrors = true

        if (path.length < 3) {
            zoneErrors = false
            setErrors('Please set 3 point to make zone')
        }

        setTitleError(titleErrors)
        setDescriptionError(descriptionErrors)
        return titleErrors && descriptionErrors && zoneErrors
    }
    const clearFields = () => {
        setTitle('')
        setDescription('')
        setTitleError(null)
        setDescriptionError(null)
        setPath([])
    }
    const onCompleted = data => {
        if (!props.zone) clearFields()
        const message = props.zone
            ? 'Zones updated successfully'
            : 'Zone added successfully'
        setErrors('')
        setSuccess(message)
        setTimeout(hideAlert, 5000)
    }

    const onError = ({ graphQLErrors, networkError }) => {
        setErrors(networkError.result.errors[0].message)
        setSuccess('')
        setTimeout(hideAlert, 5000)
    }
    const hideAlert = () => {
        setErrors('')
        setSuccess('')
    }

    return (
        <Row>
            <Col className="order-xl-1">
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col xs="8">
                                <h3 className="mb-0">
                                    {props.zone ? 'Edit Zone' : 'Add Zone'}
                                </h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-title">
                                            {'Title'}
                                        </label>
                                        <br />
                                        <small>{'Character limit of max length 30'}</small>
                                        <FormGroup
                                            className={
                                                titleError === null
                                                    ? ''
                                                    : titleError
                                                        ? 'has-success'
                                                        : 'has-danger'
                                            }>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-title"
                                                placeholder="e.g Title"
                                                maxLength="30"
                                                type="title"
                                                value={title}
                                                onChange={event => {
                                                    setTitle(event.target.value)
                                                }}
                                                onBlur={event => {
                                                    onBlur('title')
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-description">
                                            {'Description'}
                                        </label>
                                        <br />
                                        <small>{'Character limit of max length 20'}</small>
                                        <FormGroup
                                            className={
                                                descriptionError === null
                                                    ? ''
                                                    : descriptionError
                                                        ? 'has-success'
                                                        : 'has-danger'
                                            }>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-description"
                                                placeholder="e.g Description"
                                                maxLength="20"
                                                type="text"
                                                value={description}
                                                onChange={event => {
                                                    setDescription(event.target.value)
                                                }}
                                                onBlur={event => {
                                                    onBlur('description')
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <h3 className="mb-0">{'Coordinates'}</h3>
                                        <br />
                                    </Col>
                                </Row>

                                <Row>
                                    <GoogleMap
                                        mapContainerStyle={{
                                            height: '500px',
                                            width: '100%'
                                        }}
                                        id="example-map"
                                        zoom={14}
                                        center={center}
                                        onClick={onClick}>
                                        <Polygon
                                            draggable
                                            editable
                                            paths={path}
                                            onMouseUp={onEdit}
                                            // Event used when dragging the whole Polygon
                                            onDragEnd={onEdit}
                                            // onLoad={onLoadPolygon}
                                            onUnmount={onUnmount}
                                        />
                                    </GoogleMap>
                                </Row>

                                <Row className="pt-5">
                                    <Col className="text-right" lg="6">
                                        <Button
                                            disabled={loading}
                                            color="primary"
                                            href="#pablo"
                                            onClick={async e => {
                                                e.preventDefault()
                                                if (onSubmitValidaiton()) {
                                                    // const coordinates = onSave()
                                                    // const t = transformPolygon(path)
                                                    // setPath(t)
                                                    // console.log(coordinates)
                                                    mutate({
                                                        variables: {
                                                            zone: {
                                                                _id: props.zone ? props.zone._id : '',
                                                                title,
                                                                description,
                                                                coordinates: transformPath(path)
                                                            }
                                                        }
                                                    })
                                                }
                                            }}
                                            size="md">
                                            {props.zone ? 'Update' : 'Save'}
                                        </Button>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg="6">
                                        <Alert
                                            color="success"
                                            isOpen={!!succes}
                                            toggle={hideAlert}>
                                            <span className="alert-inner--icon">
                                                <i className="ni ni-like-2" />
                                            </span>{' '}
                                            <span className="alert-inner--text">
                                                <strong>{'Success'}!</strong> {succes}
                                            </span>
                                        </Alert>
                                        <Alert
                                            color="danger"
                                            isOpen={!!errors}
                                            toggle={hideAlert}>
                                            <span className="alert-inner--icon">
                                                <i className="ni ni-like-2" />
                                            </span>{' '}
                                            <span className="alert-inner--text">
                                                <strong>{'Danger'}!</strong> {errors}
                                            </span>
                                        </Alert>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Zone