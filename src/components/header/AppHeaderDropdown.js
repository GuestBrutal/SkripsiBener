import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const dropdownItems = [
    { icon: cilUser, text: "Profile", to: "/user/profile" },
    { icon: cilSettings, text: "Settings", to: "#" },
  ];

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        {dropdownItems.map((item, index) => (
          <CDropdownItem component={Link} to={item.to} key={index}>
            <CIcon icon={item.icon} className="me-2" />
            {item.text}
            {item.badgeText && (
              <CBadge color={item.badgeColor} className="ms-2">
                {item.badgeText}
              </CBadge>
            )}
          </CDropdownItem>
        ))}
        <CDropdownDivider />
        <CDropdownItem component={Link} to="/logout">
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown

