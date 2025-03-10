import { SWR_NO_REFRESH_OPTIONS } from '@cowprotocol/common-const'

import useSWR, { SWRResponse } from 'swr'

import { useENSRegistrarContract } from './useENSRegistrarContract'

export function useENSResolver(node: string | undefined): SWRResponse<string | undefined> {
  const registrarContract = useENSRegistrarContract()

  return useSWR(
    ['useENSResolver', node, registrarContract],
    async () => {
      if (!registrarContract || !node) return undefined

      return registrarContract.callStatic.resolver(node)
    },
    SWR_NO_REFRESH_OPTIONS
  )
}
