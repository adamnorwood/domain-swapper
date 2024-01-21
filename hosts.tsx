import { useAppDispatch, useAppSelector } from "~store"

export const HostsView = () => {
  const dispatch = useAppDispatch()

  // Make sure to use "useAppSelector" instead of "useSelector" to automatically get the correct types
  const hosts = useAppSelector((state) => state.hosts)

  return (
    <div>
      <h2>Hosts!</h2>

      <ul>
        {hosts.hosts.map((host) => (
          <li>{host}</li>
        ))}
      </ul>
    </div>
  )
}
