export const transformPath = (path) => {
    const geometry = path.map(coordinates => {
        return [coordinates.lng, coordinates.lat]
    })
    geometry.push(geometry[0])
    return [geometry]
}

export const transformCoordinates = (path) => {
    const geometry = path[0].map(coordinates => {
        return { lng: coordinates[0], lat: coordinates[1] }
    })
    geometry.pop()
    return geometry
}