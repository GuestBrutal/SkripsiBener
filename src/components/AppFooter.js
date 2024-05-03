import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter position="sticky" className="mt-2">
      <div>
        <span>&copy; 2023 Badan Nasional Penanggulangan Bencana (BNPB).</span>
      </div>
      <div className="ms-auto">
        <span>Dikembangkan oleh Tim IT BNPB</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
