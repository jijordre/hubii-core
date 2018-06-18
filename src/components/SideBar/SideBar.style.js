import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';

const SideBarLayout = styled(Layout)`
  .ant-layout-sider {
    background-color: ${({ theme }) => theme.palette.dark};
  }
  .ant-layout-sider.ant-layout-sider-collapsed {
    width: 72px !important;
    max-width: 72px !important;
    min-width: 72px !important;
  }
`;
const SideBarMenu = styled(Menu)`
  width: 72px;
  border-right: none;
  background-color: ${({ theme }) => theme.palette.dark};
  .menu-logo {
    min-height: 70px;
    margin: 0px !important;
    padding: 0px 15px !important;
    .logo-icon {
      width: 43px;
      margin-top: 15px !important;
    }
  }
  .menu-wallet {
    min-height: 70px;
    padding: 0px 20px !important;
    .wallet-icon {
    }
  }
  .menu-setting {
    bottom: 0px;
    width: 72px;
    height: 72px;
    line-height: 91px;
    padding: 0px 20px !important;
    margin-bottom: 0px !important;
    position: absolute !important;
    .setting-icon {
      font-size: 32px !important;
    }
  }
  .ant-menu-item a {
    opacity: 0.6;
    color: ${({ theme }) => theme.palette.dark2};
  }
  .ant-menu-item a:hover {
    opacity: 1;
    color: ${({ theme }) => theme.palette.info} !important;
  }
  .ant-menu-item-selected a {
    opacity: 1;
    color: ${({ theme }) => theme.palette.info} !important;
  }
  .ant-menu-item.menu-logo {
    opacity: 1;
    color: ${({ theme }) => theme.palette.dark2};
  }
  .ant-menu-item-selected {
    opacity: 1;
    color: ${({ theme }) => theme.palette.info};
    background: ${({ theme }) => theme.palette.dark1} !important;
    border-right: 2px solid ${({ theme }) => theme.palette.info};
  }
  // .ant-menu-item-selected.menu-logo {
  //   border-right: none;
  //   background: ${({ theme }) => theme.palette.dark} !important;
  // }
`;

const MenuItemIcon = styled(Icon)`
  font-size: 32px !important;
  line-height: 70px !important;
`;

export { SideBarLayout, SideBarMenu, MenuItemIcon };