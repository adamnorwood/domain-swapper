import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  addHost,
  selectHosts
} from './hostsSlice'

export function HostsUpdate() {
  const hosts = useSelector(selectHosts);
  const dispatch = useDispatch();

  return (
    <div>

      <ul>
        {hosts.hosts.map((host, index) => (
          <li key={index}>
            <input
              type="text"
              defaultValue={host} />
          </li>
        ))}
      </ul>

      <button
        className="button--add"
        onClick={() => dispatch(addHost('adamnorwood.test'))}
      >Add Host</button>
    </div>
  );
}
