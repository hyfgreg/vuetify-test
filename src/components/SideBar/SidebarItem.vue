<template>
  <v-list-item
    v-if="!item.children"
    :key="item.path"
    :to="resolvePath(basePath, item.path)"
    color="primary"
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
    :key="item.title"
    :prepend-icon="item.icon"
    no-action
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </template>
    <template v-for="subItem in item.children">
      <SideBarItemList :key="`${item.title}/${subItem.title}`" :item="subItem" :base-path="resolvePath(basePath, item.path)" :is-sub-menu="true" />
    </template>
  </v-list-group>
</template>

<script>
import path from 'path'

export default {
  name: 'SideBarItemList',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    basePath: {
      type: String,
      default: ''
    },
    isSubMenu: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    resolvePath(basePath, subPath) {
      return path.resolve(basePath, subPath)
    }
  }
}
</script>

<style scoped>

</style>
