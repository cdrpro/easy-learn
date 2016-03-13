'use strict';

import 'svg/plus.svg'
import './sidebar-header.less';

import angular from 'angular';
import sidebarHeader from './sidebar-header.component';

const deps = [];

export default angular.module('sidebar.header', deps)
    .component('sidebarHeader', sidebarHeader);
