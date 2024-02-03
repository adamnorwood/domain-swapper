import { useAppDispatch, useAppSelector } from "~store"

export const DomainsView = () => {
  const dispatch = useAppDispatch()

  // Make sure to use "useAppSelector" instead of "useSelector" to automatically get the correct types
  const domains = useAppSelector((state) => state.domains)

  return (
    <div>
      <h2>domains!</h2>

      <ul>
        {domains.domainsList.map((domain) => (
          <li key={domain.id}>{domain.domain}</li>
        ))}
      </ul>
    </div>
  )
}
