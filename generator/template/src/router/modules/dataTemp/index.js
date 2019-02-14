const PointTypeHome = r => require.ensure([], () => r(require('@/views/dataTemp/PointTypeHome')), 'dataTemp');
const PointFieldHome = r => require.ensure([], () => r(require('@/views/dataTemp/PointFieldHome')), 'dataTemp');


export default [{
  path: '/',
  name: 'PointTypeHome',
  component: PointTypeHome,
  meta: {
    menuIdAndBreadcrumb: {
      menuId: '1-1',
      breadcrumbList: [{
        url: '',
        name: '数据模板配置',
        code: 'dataTemp'
      }, {
        url: '/pointTypeHome',
        name: '测点类型分配',
        code: 'pointTypeHome'
      }],
    }
  }
}, {
  path: '/pointTypeHome',
  name: 'PointTypeHome',
  component: PointTypeHome,
  meta: {
    menuIdAndBreadcrumb: {
      menuId: '1-1',
      breadcrumbList: [{
        url: '',
        name: '数据模板配置',
        code: 'dataTemp'
      }, {
        url: '/pointTypeHome',
        name: '测点类型分配',
        code: 'pointTypeHome'
      }],
    }
  }
},{
  path: '/pointFieldHome/:pointType',
  name: 'PointFieldHome',
  component: PointFieldHome,
  meta: {
    menuIdAndBreadcrumb: {
      menuId: '1-2',
      breadcrumbList: [{
        url: '',
        name: '数据模板配置',
        code: 'dataTemp'
      }, {
        url: '/pointFieldHome/:pointType',
        name: '测点字段配置',
        code: 'pointFieldHome'
      }],
    }
  }
}];
