
import React from 'react'
import { SearchHeader } from '../../../components'

const navigationOption = props => {
    return {
        headerLeft: () => null,
        headerTitleContainerStyle: {
            flex: 1,
            height: '100%',
            justifyContent: 'center'
        },
        headerTitle: () => <SearchHeader searchCategory={props.searchCategory} />
    }
}

export default navigationOption