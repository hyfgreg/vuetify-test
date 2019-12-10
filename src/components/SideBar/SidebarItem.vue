<template>
  <v-list-item
    v-if="!item.children"
    :to="resolvePath(basePath, item.path)"
    color="primary"
    link
  >
    <v-list-item-icon v-if="!isSubMenu">
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
  <v-list-group
    v-else
    :value="matchedRouteName === item.name"
    :prepend-icon="isSubMenu?'': item.icon"
    :sub-group="isSubMenu"
    no-action
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </template>
    <template v-for="subItem in item.children">
      <SideBarItem
        :key="resolvePath(basePath, item.path, subItem.path)"
        :item="subItem"
        :base-path="resolvePath(basePath, item.path)"
        :is-sub-menu="true"
        :matched-route-name="matchedRouteLeft.length > 0 ? matchedRouteLeft[0].name : ''"
        :matched-route-left="matchedRouteLeft.length > 0 ? matchedRouteLeft.slice(1) : []"
      />
    </template>
  </v-list-group>
</template>

<script>
import path from 'path'

export default {
  name: 'SideBarItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    basePath: {
      type: String,
      default: '/'
    },
    isSubMenu: {
      type: Boolean,
      default: false
    },
    matchedRouteName: {
      type: String,
      default: ''
    },
    matchedRouteLeft: {
      type: Array,
      default() { return [] }
    }
  },
  methods: {
    resolvePath(..._path) {
      return path.resolve(..._path)
    }
  }
}
</script>

<style scoped>

</style>
