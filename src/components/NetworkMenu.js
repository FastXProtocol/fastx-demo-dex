import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

function NetworkMenu(props) {
    const { networkName, availableNetworks, onLoadNetwork } = props;
    const networkOptions = availableNetworks.map((network) => {
        return {
            text: network,
            value: network
        }
    })
    console.log(availableNetworks)
    return (
        <Dropdown style={{ width: '170px',margin: '5px 20px' }} placeholder='' fluid selection options={networkOptions} value={networkName} onChange={ (e, target) => onLoadNetwork( target.value ) } />
    )
}

export default NetworkMenu
