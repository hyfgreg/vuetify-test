// import MENU from "../menu"
// import { routerPermissionMap } from "../router"

// function checkPermissionsAndGroup(menu, permissions, groups) {
//   if (!menu.to || !menu.to.name) {
//     return false
//   }
//   if (!routerPermissionMap[menu.to.name]) {
//     return false
//   }
//   if (routerPermissionMap[menu.to.name].ignoreAuth) {
//     return true
//   }
//   if (
//     routerPermissionMap[menu.to.name].permission.length === 0 &&
//     routerPermissionMap[menu.to.name].group.length === 0
//   ) {
//     return true
//   }
//   // if (routerPermissionMap[menu.to.name].group.indexOf('allow_any') !== -1) {
//   //   return true
//   // }
//   for (let p of routerPermissionMap[menu.to.name].permission) {
//     if (permissions.indexOf(p) !== -1) {
//       return true
//     }
//   }
//   for (let g of routerPermissionMap[menu.to.name].group) {
//     if (groups.indexOf(g) !== -1) {
//       return true
//     }
//   }
//   return false
// }

export const getters = {
  // menu: (state, getters) => {
  //   if (!getters["permissions-by-db/inited"]) return []
  //   let ret = []
  //   MENU.forEach(menu => {
  //     if (menu.group) {
  //       let _ = {
  //         icon: menu.icon,
  //         title: menu.title,
  //         group: menu.group,
  //         children: []
  //       }
  //       if (menu.children) {
  //         menu.children.forEach(child => {
  //           if (
  //             checkPermissionsAndGroup(
  //               child,
  //               state["permissions-by-db"].permissionsByDB.permissions,
  //               state["permissions-by-db"].permissionsByDB.groups
  //             )
  //           ) {
  //             _.children.push(child)
  //           }
  //         })
  //       }
  //       if (_.children.length > 0) {
  //         ret.push(_)
  //       }
  //     } else {
  //       if (
  //         checkPermissionsAndGroup(
  //           menu,
  //           state["permissions-by-db"].permissionsByDB.permissions,
  //           state["permissions-by-db"].permissionsByDB.groups
  //         )
  //       ) {
  //         ret.push(menu)
  //       }
  //     }
  //   })
  //   return ret
  // }
}
